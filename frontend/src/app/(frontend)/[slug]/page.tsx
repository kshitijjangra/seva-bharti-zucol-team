import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import PillarPage from "@/components/PillarPage";
import { getGlobal, getPillarBySlug, getPillars } from "@/lib/cms";

// One page per pillar document, at /<slug>. Static siblings (about-us,
// events, contact, blog) take precedence over this dynamic segment.
//
// Under Cache Components generateStaticParams must return at least one param
// (an empty list is a build error). If the DB has no pillars at build time we
// return a placeholder that can never match a real slug (slugs are validated
// to [a-z0-9-]); it renders notFound(). Pillars added later are rendered on
// first request and cached (ISR with Cache Components).
const PLACEHOLDER_SLUG = "__placeholder__";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const pillars = await getPillars();
  return pillars.length > 0 ? pillars.map((p) => ({ slug: p.slug })) : [{ slug: PLACEHOLDER_SLUG }];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const pillar = await getPillarBySlug(slug);
  if (!pillar) return {};
  return {
    title: pillar.seo?.metaTitle || `${pillar.nameEn} (${pillar.nameHi})`,
    description: pillar.seo?.metaDescription || pillar.summaryEn || pillar.summaryHi,
  };
}

// `params` is awaited inside <Suspense> so the route's App Shell can prerender
// for slugs not known at build time (Partial Prefetching is enabled).
export default function Page({ params }: { params: Params }) {
  return (
    <Suspense fallback={<div className="min-h-[50vh]" aria-busy="true" />}>
      <PillarContent params={params} />
    </Suspense>
  );
}

async function PillarContent({ params }: { params: Params }) {
  const { slug } = await params;
  const [pillar, ui] = await Promise.all([getPillarBySlug(slug), getGlobal("ui-strings")]);
  if (!pillar) notFound();
  return <PillarPage pillar={pillar} labels={ui?.pillarPage} />;
}
