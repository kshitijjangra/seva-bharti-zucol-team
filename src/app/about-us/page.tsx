import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { pillars } from "@/content/pillars";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description: site.introEn,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="सेवा भारती समिति, राजस्थान — एक परिचय"
        titleHi="About Us"
        subtitle={site.introHi}
      />

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-8">
          <section>
            <h2 lang="hi" className="text-xl font-bold text-ink">परिचय</h2>
            <p lang="hi" className="mt-3 leading-relaxed text-ink-soft">
              {site.introHi}
            </p>
            <p lang="hi" className="mt-3 leading-relaxed text-ink-soft">
              संस्था द्वारा संपूर्ण राजस्थान क्षेत्र में सीधे ही या संलग्न संस्थाओं
              के माध्यम से {site.sewaKaaryCount} सेवा कार्य संचालित किए जा रहे हैं।
            </p>
          </section>

          <section>
            <h2 lang="hi" className="text-xl font-bold text-ink">हमारा उद्देश्य</h2>
            <p lang="hi" className="mt-3 leading-relaxed text-ink-soft">
              समाज के सामाजिक, शैक्षणिक एवं आर्थिक रूप से पिछड़े, वंचित एवं उपेक्षित
              बंधुओं का विकास कर उन्हें आत्मनिर्भर, स्वाभिमानी एवं स्वावलंबी बनाकर
              स्वस्थ, समरस एवं संगठित समाज का निर्माण करना।
            </p>
            <p lang="hi" className="mt-3 leading-relaxed text-ink-soft">
              सभी सेवा कार्य संप्रदाय, जाति, वर्ग, प्रांत, भाषा एवं मत-मतांतर के
              भेदभाव के बिना संचालित किए जाते हैं। किसी भी प्रकार की दैवीय आपदा —
              जैसे बाढ़, भूकंप, अकाल, अग्निकांड एवं महामारी — में भी यथासंभव सहयोग
              किया जाता है।
            </p>
          </section>

          <section>
            <h2 lang="hi" className="text-xl font-bold text-ink">
              हमारे चार आयाम
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {pillars.map((p) => (
                <li
                  key={p.slug}
                  className="rounded-lg border border-saffron-100 bg-white px-4 py-3"
                >
                  <Link href={`/${p.slug}`} className="hover:underline">
                    <span lang="hi" className="font-semibold text-saffron-700">
                      {p.nameHi}
                    </span>{" "}
                    <span className="text-sm text-ink-soft">({p.nameEn})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="h-fit space-y-4 rounded-xl border border-sewablue-100 bg-sewablue-50 p-6">
          <h2 lang="hi" className="text-lg font-bold text-sewablue-800">
            संस्था का विवरण
          </h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt lang="hi" className="font-semibold text-ink">पंजीयन क्रमांक</dt>
              <dd className="text-ink-soft">{site.registration.number}</dd>
            </div>
            <div>
              <dt lang="hi" className="font-semibold text-ink">पंजीयन दिनांक</dt>
              <dd className="text-ink-soft">{site.registration.date}</dd>
            </div>
            <div>
              <dt lang="hi" className="font-semibold text-ink">80जी छूट</dt>
              <dd className="text-ink-soft">{site.registration.reg80G}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">PAN</dt>
              <dd className="text-ink-soft">{site.registration.pan}</dd>
            </div>
            <div>
              <dt lang="hi" className="font-semibold text-ink">पंजीकृत कार्यालय</dt>
              <dd className="text-ink-soft">{site.registeredOffice}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </>
  );
}
