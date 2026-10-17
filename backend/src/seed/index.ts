// Seed / migrate the original static content into Payload.
//
//   npm run seed        (= payload run src/seed/index.ts)
//
// Idempotent: collections are upserted by slug, media by filename, globals via
// updateGlobal. Safe to run any number of times.
//
// Optional first admin: set SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD in the env.
// It is only created when the users collection is empty.

import fs from "node:fs";
import path from "node:path";
import { getPayload, type Payload } from "payload";
import config from "@payload-config";

import { site } from "./data/site";
import { pillars as pillarData } from "./data/pillars";
import { events as eventData, galleryImages, mainGuests } from "./data/events";

const ctx = { disableRevalidate: true };
// Seed images live in the frontend app (frontend/public/events, frontend/public/logo.png).
// Run the seed from backend/ inside the full repo checkout.
const PUBLIC_DIR = path.resolve(process.cwd(), "../frontend/public");
const GENERIC_ALT = "सेवा भारती गतिविधि";

// ---------------------------------------------------------------------------
// Lexical helpers
// ---------------------------------------------------------------------------

function paragraph(text: string) {
  return {
    type: "paragraph",
    version: 1,
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    textFormat: 0,
    textStyle: "",
    children: [
      { type: "text", version: 1, detail: 0, format: 0, mode: "normal", style: "", text },
    ],
  };
}

function lexical(paragraphs: readonly string[]) {
  return {
    root: {
      type: "root",
      version: 1,
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      children: paragraphs.map(paragraph),
    },
  };
}

// ---------------------------------------------------------------------------
// Media
// ---------------------------------------------------------------------------

// Alt text from the original content files, keyed by public path.
function buildAltMap(): Map<string, string> {
  const alts = new Map<string, string>();
  alts.set("/logo.png", `${site.nameHi} — लोगो`);
  for (const g of galleryImages) alts.set(g.src, g.alt);
  for (const e of eventData) if (e.image && e.imageAlt) alts.set(e.image, e.imageAlt);
  return alts;
}

type MediaIndex = Map<string, number>; // public path -> media id

async function seedMedia(payload: Payload, stats: Stats): Promise<MediaIndex> {
  const alts = buildAltMap();
  const files: string[] = ["/logo.png"];
  const eventsDir = path.join(PUBLIC_DIR, "events");
  for (const f of fs.readdirSync(eventsDir).sort()) {
    if (/\.(jpe?g|png)$/i.test(f)) files.push(`/events/${f}`);
  }

  const index: MediaIndex = new Map();
  for (const publicPath of files) {
    const filename = path.basename(publicPath);
    const existing = await payload.find({
      collection: "media",
      where: { filename: { equals: filename } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs[0]) {
      index.set(publicPath, existing.docs[0].id as number);
      stats.media.existing++;
      continue;
    }
    const doc = await payload.create({
      collection: "media",
      data: { alt: alts.get(publicPath) ?? GENERIC_ALT },
      filePath: path.join(PUBLIC_DIR, publicPath),
      // Keep the exact filename even if a stale file is already on disk, so
      // the filename lookup above stays a reliable idempotency key.
      overwriteExistingFiles: true,
      context: ctx,
    });
    index.set(publicPath, doc.id as number);
    stats.media.created++;
  }
  return index;
}

function mediaId(index: MediaIndex, publicPath: string | undefined): number | undefined {
  if (!publicPath) return undefined;
  const id = index.get(publicPath);
  if (id === undefined) throw new Error(`Media not found for ${publicPath}`);
  return id;
}

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

async function upsertBySlug(
  payload: Payload,
  collection: "pillars" | "events",
  slug: string,
  data: Record<string, unknown>,
  stats: Stats,
) {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    draft: true,
  });
  if (existing.docs[0]) {
    await payload.update({
      collection,
      id: existing.docs[0].id,
      data: data as never,
      context: ctx,
    });
    stats[collection].updated++;
  } else {
    await payload.create({ collection, data: data as never, context: ctx });
    stats[collection].created++;
  }
}

// Old header dropdown order.
const PILLAR_ORDER = ["shiksha", "swasthya", "swavalamban", "samajik"] as const;

async function seedPillars(payload: Payload, media: MediaIndex, stats: Stats) {
  for (const p of pillarData) {
    const order = PILLAR_ORDER.indexOf(p.slug) + 1;
    await upsertBySlug(
      payload,
      "pillars",
      p.slug,
      {
        nameHi: p.nameHi,
        nameEn: p.nameEn,
        slug: p.slug,
        order,
        accent: p.accent,
        showInNav: true,
        // Old header dropdown used the short label "सामाजिक".
        navLabel: p.slug === "samajik" ? "सामाजिक" : null,
        summaryHi: p.summaryHi,
        summaryEn: p.summaryEn,
        banner: mediaId(media, p.banner),
        content: lexical(p.contentHi),
        activities: p.activities.map((a) => ({ titleHi: a.titleHi, titleEn: a.titleEn, descHi: a.descHi })),
        aayaam: p.aayaam.map((a) => ({ titleHi: a.titleHi, titleEn: a.titleEn })),
        stats: p.stats.map((s) => ({ value: s.value, suffix: s.suffix ?? "", labelHi: s.labelHi })),
        successStories: p.successStories.map((s) => ({
          nameHi: s.nameHi,
          nameEn: s.nameEn,
          age: s.age,
          photo: mediaId(media, s.photo),
          bioHi: s.bioHi,
          storyHi: s.storyHi,
        })),
      },
      stats,
    );
  }
}

// "Published Jan 2, 2021" -> "2021-01-02T12:00:00.000Z" (noon UTC so the
// calendar day is the same in every timezone).
function parsePublishedDate(raw: string): string {
  const m = raw.replace(/^Published\s+/i, "").match(/^([A-Za-z]{3})[a-z]*\s+(\d{1,2}),\s*(\d{4})$/);
  if (!m) throw new Error(`Unparseable event date: ${raw}`);
  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const month = months.indexOf(m[1].toLowerCase());
  if (month < 0) throw new Error(`Unknown month in: ${raw}`);
  return new Date(Date.UTC(Number(m[3]), month, Number(m[2]), 12)).toISOString();
}

const toGuest = (g: { name: string; designation: string; testimonial: string }) => ({
  name: g.name,
  designation: g.designation,
  testimonial: g.testimonial,
});

async function seedEvents(payload: Payload, media: MediaIndex, stats: Stats) {
  for (const e of eventData) {
    await upsertBySlug(
      payload,
      "events",
      e.id,
      {
        titleHi: e.titleHi,
        titleEn: e.titleEn,
        slug: e.id,
        date: parsePublishedDate(e.date),
        location: e.location,
        summaryHi: e.summaryHi,
        coverImage: mediaId(media, e.image),
        content: lexical(e.content ?? []),
        photos: (e.photos ?? []).map((src) => mediaId(media, src)),
        guests: (e.guests ?? []).map(toGuest),
        _status: "published",
      },
      stats,
    );
  }
}

// ---------------------------------------------------------------------------
// Globals
// ---------------------------------------------------------------------------

const GUESTS_NOTE = "नमूना प्रविष्टियाँ — वास्तविक अतिथि विवरण शीघ्र अद्यतन किए जाएंगे।";

function globalsData(media: MediaIndex): Record<string, Record<string, unknown>> {
  const r = site.registration;
  return {
    "site-settings": {
      name: site.name,
      nameHi: site.nameHi,
      shortName: site.shortName,
      brandTitle: "Sewa Bharti Rajasthan",
      tagline: site.tagline,
      taglineEn: site.taglineEn,
      logo: mediaId(media, site.logo),
      introHi: site.introHi,
      introEn: site.introEn,
      primaryEmail: site.contact.primaryEmail,
      offices: site.contact.offices.map((o) => ({
        name: o.name,
        nameHi: o.nameHi,
        address: o.address,
        phones: o.phones.map((number) => ({ number })),
        email: o.email,
        // The old site always rendered the role as this Hindi label.
        role: o.role ? "प्रान्त मंत्री" : undefined,
      })),
      topBarText: `पंजीकृत समाजसेवी संस्था · Reg. No. ${r.number} · 80G आयकर छूट प्राप्त`,
      // Old social URLs were "#" placeholders — intentionally left empty.
      socials: [],
      footerQuickLinksHeading: "त्वरित लिंक",
      footerContactHeading: "संपर्क",
      copyrightText: "COPYRIGHT © 2026 ALL RIGHT RESERVED BY SEWA BHARTI SAMITI RAJASTHAN",
      orgUrl: "https://sewabhartirajasthan.org",
      developerCreditPrefix: "Developed & Managed by",
      developerName: "ZUCOL",
      developerUrl: "https://www.zucol.in/",
      metaTitle: "Sewa Bharti Samiti Rajasthan — Service is the highest duty",
      metaDescription: site.introEn,
    },

    navigation: {
      headerItems: [
        { label: "होम", href: "/", pillarsDropdown: false, children: [] },
        { label: "हमारे बारे में", href: "/about-us", pillarsDropdown: false, children: [] },
        { label: "सेवा कार्य", pillarsDropdown: true, children: [] },
        { label: "कार्यक्रम", href: "/events", pillarsDropdown: false, children: [] },
        { label: "संपर्क", href: "/contact", pillarsDropdown: false, children: [] },
      ],
      footerLinks: site.nav
        .filter((n) => n.href !== "/")
        .map((n) => ({ label: n.labelHi ?? n.label, href: n.href })),
    },

    "home-page": {
      hero: {
        badge: `पंजीकृत समाजसेवी संस्था · स्थापना ${site.establishedYear}`,
        tagline: site.tagline,
        title: site.name,
        intro: site.introHi,
        image: null,
        primaryCta: { label: "हमारे बारे में", href: "/about-us" },
        secondaryCta: { label: "संपर्क करें", href: "/contact" },
      },
      stats: [
        { value: site.establishedYear, suffix: "", animate: false, label: "स्थापना वर्ष" },
        { value: site.sewaKaaryCount, suffix: "+", animate: true, label: "सेवा कार्य" },
        { value: site.districts, suffix: "+", animate: true, label: "जिलों में उपस्थिति" },
        { value: "80G", suffix: "", animate: false, label: "आयकर छूट प्राप्त" },
      ],
      pillarsHeading: { eyebrow: "Our Four Pillars", title: "हमारे चार आयाम" },
      eventsTeaser: {
        title: "कुछ सेवा गतिविधियाँ",
        text: "राज्य भर में संचालित सेवा कार्यों की एक झलक।",
        cta: { label: "बाकी सभी सेवा गतिविधियाँ यहाँ देखें", href: "/events" },
      },
    },

    "about-page": {
      header: {
        eyebrow: "About Us",
        title: "सेवा भारती समिति, राजस्थान — एक परिचय",
        subtitle: site.introHi,
      },
      sections: [
        {
          heading: "परिचय",
          body: lexical([
            site.introHi,
            `संस्था द्वारा संपूर्ण राजस्थान क्षेत्र में सीधे ही या संलग्न संस्थाओं के माध्यम से ${site.sewaKaaryCount} सेवा कार्य संचालित किए जा रहे हैं।`,
          ]),
        },
        {
          heading: "हमारा उद्देश्य",
          body: lexical([
            "समाज के सामाजिक, शैक्षणिक एवं आर्थिक रूप से पिछड़े, वंचित एवं उपेक्षित बंधुओं का विकास कर उन्हें आत्मनिर्भर, स्वाभिमानी एवं स्वावलंबी बनाकर स्वस्थ, समरस एवं संगठित समाज का निर्माण करना।",
            "सभी सेवा कार्य संप्रदाय, जाति, वर्ग, प्रांत, भाषा एवं मत-मतांतर के भेदभाव के बिना संचालित किए जाते हैं। किसी भी प्रकार की दैवीय आपदा — जैसे बाढ़, भूकंप, अकाल, अग्निकांड एवं महामारी — में भी यथासंभव सहयोग किया जाता है।",
          ]),
        },
      ],
      pillarsHeading: "हमारे चार आयाम",
      detailsHeading: "संस्था का विवरण",
      details: [
        { label: "पंजीयन क्रमांक", value: r.number },
        { label: "पंजीयन दिनांक", value: r.date },
        { label: "80जी छूट", value: r.reg80G },
        { label: "PAN", value: r.pan },
        { label: "पंजीकृत कार्यालय", value: site.registeredOffice },
      ],
    },

    "contact-page": {
      header: {
        eyebrow: "Contact Us",
        title: "संपर्क करें",
        subtitle: "नीचे दिए गए कार्यालयों के माध्यम से सेवा भारती समिति, राजस्थान से संपर्क करें।",
      },
      emailBox: { heading: "ईमेल", text: "सामान्य जानकारी हेतु संपर्क करें:" },
    },

    "events-page": {
      header: {
        eyebrow: "Events",
        title: "कार्यक्रम एवं सेवा गतिविधियाँ",
        subtitle: "राजस्थान भर में संचालित सेवा कार्यों की झलक।",
      },
      recentHeading: { eyebrow: "Recent Activities", title: "हाल की सेवा गतिविधियाँ" },
      readMoreLabel: "विस्तार से पढ़ें",
      galleryHeading: { eyebrow: "Photo Gallery", title: "फोटो गैलरी" },
      galleryCaption: "सेवा कार्यों की झलकियाँ",
      gallery: galleryImages.map((g) => mediaId(media, g.src)),
      guestsHeading: { eyebrow: "Our Guests", title: "अतिथिगण" },
      guestsNote: GUESTS_NOTE,
      guests: mainGuests.map(toGuest),
    },

    "ui-strings": {
      skipLink: "Skip to main content",
      a11y: {
        menuOpen: "Open menu",
        menuClose: "Close menu",
        homeLinkLabel: "home",
        eventPhotosHeading: "कार्यक्रम की तस्वीरें",
        showPhoto: "तस्वीर {n} दिखाएं",
        prevGuest: "पिछला अतिथि",
        nextGuest: "अगला अतिथि",
        showGuest: "अतिथि {n} दिखाएं",
      },
      pillarCardCta: "और जानें",
      pillarPage: {
        bannerPrefix: "सेवा कार्य",
        overview: { eyebrow: "Overview", title: "विवरण" },
        successStories: { eyebrow: "Success Stories", title: "सफलता की कहानियाँ" },
        aayaam: { eyebrow: "Areas of Work", title: "कार्य के आयाम" },
        ageSuffix: "वर्ष",
      },
      eventPage: {
        backLabel: "सभी कार्यक्रम",
        descriptionHeading: "विवरण",
        guestsHeading: { eyebrow: "Our Guests", title: "अतिथिगण" },
        guestsNote: GUESTS_NOTE,
      },
    },
  };
}

async function seedGlobals(payload: Payload, media: MediaIndex, stats: Stats) {
  for (const [slug, data] of Object.entries(globalsData(media))) {
    await payload.updateGlobal({ slug: slug as never, data: data as never, context: ctx });
    stats.globals.push(slug);
  }
}

// ---------------------------------------------------------------------------
// Admin user (optional, env-driven)
// ---------------------------------------------------------------------------

async function seedAdmin(payload: Payload): Promise<string> {
  const { totalDocs } = await payload.count({ collection: "users" });
  if (totalDocs > 0) return `skipped (${totalDocs} user(s) already exist)`;
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password) {
    return "none — no users yet; create the first admin at /admin (or set SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD)";
  }
  await payload.create({
    collection: "users",
    data: { email, password, roles: ["admin"], name: "Admin" },
    context: ctx,
  });
  return `created admin ${email}`;
}

// ---------------------------------------------------------------------------

interface Stats {
  media: { created: number; existing: number };
  pillars: { created: number; updated: number };
  events: { created: number; updated: number };
  globals: string[];
}

async function main() {
  const payload = await getPayload({ config });
  const stats: Stats = {
    media: { created: 0, existing: 0 },
    pillars: { created: 0, updated: 0 },
    events: { created: 0, updated: 0 },
    globals: [],
  };

  const media = await seedMedia(payload, stats);
  await seedPillars(payload, media, stats);
  await seedEvents(payload, media, stats);
  await seedGlobals(payload, media, stats);
  const admin = await seedAdmin(payload);

  const line = (k: string, v: string) => payload.logger.info(`seed  ${k.padEnd(8)} ${v}`);
  line("media", `${stats.media.created} created, ${stats.media.existing} already present`);
  line("pillars", `${stats.pillars.created} created, ${stats.pillars.updated} updated`);
  line("events", `${stats.events.created} created, ${stats.events.updated} updated`);
  line("globals", `${stats.globals.length} updated (${stats.globals.join(", ")})`);
  line("admin", admin);
  payload.logger.info("seed  done ✔");
}

try {
  await main();
  process.exit(0);
} catch (err) {
  console.error("Seed failed:", err);
  process.exit(1);
}
