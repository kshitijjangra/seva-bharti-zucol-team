import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PillarCard from "@/components/PillarCard";
import StatCounter from "@/components/StatCounter";
import SectionHeading from "@/components/SectionHeading";
import { getGlobal, getPillars, mediaAlt, mediaUrl } from "@/lib/cms";
import { siteLogo } from "@/lib/site-data";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getGlobal("home-page");
  const meta: Metadata = {};
  if (home?.seo?.metaTitle) meta.title = { absolute: home.seo.metaTitle };
  if (home?.seo?.metaDescription) meta.description = home.seo.metaDescription;
  return meta;
}

export default async function HomePage() {
  const [home, settings, ui, pillars] = await Promise.all([
    getGlobal("home-page"),
    getGlobal("site-settings"),
    getGlobal("ui-strings"),
    getPillars(),
  ]);

  const hero = home?.hero;
  const logo = siteLogo(settings);
  const heroImage = mediaUrl(hero?.image, "card") ?? logo.url;
  const heroAlt = hero?.image ? mediaAlt(hero.image, logo.alt) : logo.alt;
  const heroMedia = hero?.image && typeof hero.image === "object" ? hero.image : null;
  const primary = hero?.primaryCta;
  const secondary = hero?.secondaryCta;
  const stats = home?.stats ?? [];
  const teaser = home?.eventsTeaser;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-saffron-50 via-cream to-sewablue-50">
        <div className="container-page grid items-center gap-10 py-14 md:grid-cols-[1.3fr_1fr] md:py-12">
          <div>
            {hero?.badge && (
              <span
                lang="hi"
                className="inline-flex items-center gap-2 rounded-full border border-saffron-200 bg-white/70 px-3 py-1 text-xs font-semibold text-saffron-700 shadow-sm"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 1 3 5v6c0 5.25 3.75 10.16 9 11 5.25-.84 9-5.75 9-11V5l-9-4Zm-1.2 14.4L7 11.6l1.4-1.4 2.4 2.4 5-5L17.2 9l-6.4 6.4Z" />
                </svg>
                {hero.badge}
              </span>
            )}
            {hero?.tagline && (
              <p
                lang="hi"
                className="mt-3 text-xl font-semibold text-saffron-700 md:text-2xl"
              >
                {hero.tagline}
              </p>
            )}
            {hero?.title && (
              <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
                {hero.title}
              </h1>
            )}
            {hero?.intro && (
              <p lang="hi" className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                {hero.intro}
              </p>
            )}
            {((primary?.label && primary.href) || (secondary?.label && secondary.href)) && (
              <div className="mt-8 flex flex-wrap gap-4">
                {primary?.label && primary.href && (
                  <Link
                    href={primary.href}
                    lang="hi"
                    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-saffron-400 to-saffron-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-saffron-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-saffron-500/35 active:translate-y-0"
                  >
                    {primary.label}
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                )}
                {secondary?.label && secondary.href && (
                  <Link
                    href={secondary.href}
                    lang="hi"
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-sewablue-500 bg-white px-7 py-3.5 text-base font-semibold text-sewablue-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-sewablue-500 hover:text-white hover:shadow-lg hover:shadow-sewablue-500/25 active:translate-y-0"
                  >
                    {secondary.label}
                  </Link>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src={heroImage}
              alt={heroAlt}
              width={heroMedia?.width ?? 320}
              height={heroMedia?.height ?? 356}
              priority
              className="h-auto w-56 drop-shadow-sm md:w-72"
            />
          </div>
        </div>
      </section>

      {/* Trust / credentials band */}
      {stats.length > 0 && (
        <section className="border-y-2 border-saffron-500/70 bg-white">
          <div className="container-page grid grid-cols-2 divide-y divide-saffron-100 py-2 md:grid-cols-4 md:divide-x md:divide-y-0">
            {stats.map((s, i) => {
              const n = Number(s.value);
              return (
                <div key={s.id ?? i} className="flex flex-col items-center gap-1 px-4 py-6 text-center">
                  {s.animate && Number.isFinite(n) ? (
                    <StatCounter
                      value={n}
                      suffix={s.suffix ?? ""}
                      className="text-3xl font-bold text-saffron-600 md:text-4xl"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-saffron-600 md:text-4xl">
                      {s.value}
                      {s.suffix ?? ""}
                    </span>
                  )}
                  <span lang="hi" className="text-sm font-medium text-ink-soft">
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Four pillars */}
      {pillars.length > 0 && (
        <section className="container-page py-14">
          <div className="mb-8 flex justify-center">
            <SectionHeading
              eyebrow={home?.pillarsHeading?.eyebrow}
              title={home?.pillarsHeading?.title}
              align="center"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <PillarCard key={p.id} pillar={p} ctaLabel={ui?.pillarCardCta} />
            ))}
          </div>
        </section>
      )}

      {/* Events teaser */}
      {teaser && (teaser.title || teaser.text || (teaser.cta?.label && teaser.cta.href)) && (
        <section className="bg-cream">
          <div className="container-page flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-center">
            <div>
              {teaser.title && (
                <h2 lang="hi" className="text-2xl font-bold text-ink">
                  {teaser.title}
                </h2>
              )}
              {teaser.text && (
                <p lang="hi" className="mt-1 text-ink-soft">
                  {teaser.text}
                </p>
              )}
            </div>
            {teaser.cta?.label && teaser.cta.href && (
              <Link
                href={teaser.cta.href}
                lang="hi"
                className="rounded-lg bg-sewablue-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sewablue-600"
              >
                {teaser.cta.label}
              </Link>
            )}
          </div>
        </section>
      )}
    </>
  );
}
