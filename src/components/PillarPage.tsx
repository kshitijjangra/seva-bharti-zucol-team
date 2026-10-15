import PageHeader from "@/components/PageHeader";
import { getPillar } from "@/content/pillars";

// Renders a single pillar page from typed content. No fabricated sections:
// only activities the organisation actually describes are shown.
export default function PillarPage({ slug }: { slug: string }) {
  const pillar = getPillar(slug);
  if (!pillar) return null;

  return (
    <>
      <PageHeader
        title={pillar.nameHi}
        titleHi={pillar.nameEn}
        subtitle={pillar.summaryHi}
      />
      <div className="container-page py-12">
        <h2 lang="hi" className="text-xl font-bold text-ink">
          कार्यक्रम एवं गतिविधियाँ
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillar.activities.map((a) => (
            <article
              key={a.titleEn}
              className="rounded-xl border border-saffron-100 bg-white p-6 shadow-sm"
            >
              <h3 lang="hi" className="text-lg font-semibold text-saffron-700">
                {a.titleHi}
              </h3>
              <p lang="hi" className="mt-3 text-sm leading-relaxed text-ink-soft">
                {a.descHi}
              </p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
