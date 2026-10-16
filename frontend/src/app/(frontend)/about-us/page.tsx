import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import RichText from "@/components/RichText";
import { getGlobal, getPillars } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const [about, settings] = await Promise.all([getGlobal("about-page"), getGlobal("site-settings")]);
  return {
    title: about?.seo?.metaTitle || about?.header?.eyebrow || about?.header?.title || undefined,
    description:
      about?.seo?.metaDescription || settings?.introEn || about?.header?.subtitle || undefined,
  };
}

export default async function AboutPage() {
  const [about, pillars] = await Promise.all([getGlobal("about-page"), getPillars()]);
  const sections = about?.sections ?? [];
  const details = about?.details ?? [];

  return (
    <>
      <PageHeader
        title={about?.header?.title}
        eyebrow={about?.header?.eyebrow}
        subtitle={about?.header?.subtitle}
      />

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-8">
          {sections.map((s, i) => (
            <section key={s.id ?? i}>
              <h2 lang="hi" className="text-xl font-bold text-ink">{s.heading}</h2>
              <RichText data={s.body} className="mt-3" />
            </section>
          ))}

          {pillars.length > 0 && (
            <section>
              {about?.pillarsHeading && (
                <h2 lang="hi" className="text-xl font-bold text-ink">
                  {about.pillarsHeading}
                </h2>
              )}
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {pillars.map((p) => (
                  <li
                    key={p.id}
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
          )}
        </div>

        {details.length > 0 && (
          <aside className="h-fit space-y-4 rounded-xl border border-sewablue-100 bg-sewablue-50 p-6">
            {about?.detailsHeading && (
              <h2 lang="hi" className="text-lg font-bold text-sewablue-800">
                {about.detailsHeading}
              </h2>
            )}
            <dl className="space-y-3 text-sm">
              {details.map((d, i) => (
                <div key={d.id ?? i}>
                  <dt lang="hi" className="font-semibold text-ink">{d.label}</dt>
                  <dd className="text-ink-soft">{d.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
      </div>
    </>
  );
}
