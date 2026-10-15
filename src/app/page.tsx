import Image from "next/image";
import Link from "next/link";
import PillarCard from "@/components/PillarCard";
import StatCounter from "@/components/StatCounter";
import { pillars } from "@/content/pillars";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-saffron-50 via-cream to-sewablue-50">
        <div className="container-page grid items-center gap-10 py-14 md:grid-cols-[1.3fr_1fr] md:py-20">
          <div>
            <p
              lang="hi"
              className="text-xl font-semibold text-saffron-700 md:text-2xl"
            >
              {site.tagline}
            </p>
            <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              {site.name}
            </h1>
            <p lang="hi" className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              {site.introHi}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about-us"
                lang="hi"
                className="rounded-lg bg-saffron-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-saffron-600"
              >
                हमारे बारे में
              </Link>
              <Link
                href="/contact"
                lang="hi"
                className="rounded-lg border border-sewablue-300 px-6 py-3 text-sm font-semibold text-sewablue-700 transition-colors hover:bg-sewablue-50"
              >
                संपर्क करें
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src={site.logo}
              alt={`${site.name} logo`}
              width={320}
              height={356}
              priority
              className="h-auto w-56 drop-shadow-sm md:w-72"
            />
          </div>
        </div>
      </section>

      {/* Reach / verified figure */}
      <section className="border-y border-saffron-100 bg-white">
        <div className="container-page flex flex-col items-center gap-2 py-8 text-center">
          <StatCounter
            value={Number(site.sewaKaaryCount)}
            suffix="+"
            className="text-4xl font-bold text-saffron-600"
          />
          <p lang="hi" className="max-w-xl text-sm text-ink-soft">
            संपूर्ण राजस्थान में प्रत्यक्ष रूप से एवं संलग्न संस्थाओं के माध्यम से
            संचालित सेवा कार्य।
          </p>
        </div>
      </section>

      {/* Four pillars */}
      <section className="container-page py-14">
        <div className="mb-8 text-center">
          <p className="font-semibold text-sewablue-600">Our Four Pillars</p>
          <h2 lang="hi" className="mt-1 text-2xl font-bold text-ink md:text-3xl">
            हमारे चार आयाम
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <PillarCard key={p.slug} pillar={p} />
          ))}
        </div>
      </section>

      {/* Events teaser */}
      <section className="bg-cream">
        <div className="container-page flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-center">
          <div>
            <h2 lang="hi" className="text-2xl font-bold text-ink">
              सेवा गतिविधियाँ
            </h2>
            <p lang="hi" className="mt-1 text-ink-soft">
              राज्य भर में संचालित सेवा कार्यों की एक झलक।
            </p>
          </div>
          <Link
            href="/events"
            lang="hi"
            className="rounded-lg bg-sewablue-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sewablue-600"
          >
            कार्यक्रम देखें
          </Link>
        </div>
      </section>
    </>
  );
}
