"use client";

// Quotes from the live site (sewabhartirajasthan.org, the CTA banners), rebuilt
// as text + portrait. Auto-advances in a loop (pauses on hover / focus) and can
// be changed with the dots. Portraits live in public/home/.
import Image from "next/image";
import { useEffect, useState } from "react";

type Quote = {
  photo: string;
  quote: string;
  tagline?: string;
  name: string;
  role?: string;
};

const QUOTES: Quote[] = [
  {
    photo: "/home/quote-vivekanand.png",
    quote:
      "जब तक लाखों लोग भूखे और अज्ञानी हैं, तब तक मैं उस व्यक्ति को कृतघ्न मानता हूँ जो उनके बल पर शिक्षित बना और अब उनकी ओर ध्यान नहीं देता है।",
    tagline: "“I dream of a strong and prosperous Bharat”",
    name: "स्वामी विवेकानन्द",
    role: "महान युवा सन्यासी",
  },
  {
    photo: "/home/quote-hedgewar.png",
    quote: "इस समाज को जागृत एवं सुसंघटित करना ही राष्ट्र का जागरण एवं संघटन है। यही राष्ट्र कार्य है।",
    name: "Dr. Keshav Baliram Hedgewar",
  },
  {
    photo: "/home/quote-guruji.png",
    quote:
      "सेवा करने का वास्तविक अर्थ है – हृदय की शुद्धि; अहंभावना का विनाश; सर्वत्र ईश्वरत्व की अनुभूति तथा शांति की प्राप्ति।",
    name: "Shri Guruji Madhav Sadashiv",
    role: "Golwalkar",
  },
];

export default function QuoteCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = QUOTES.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <section className="container-page py-10" aria-roledescription="carousel" aria-label="प्रेरक विचार">
      <div
        className="relative overflow-hidden rounded-2xl bg-[#2b2b2b] bg-[url('/home/bg-vission.jpg')] bg-cover bg-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* Dark wash over the photo, like the live banners */}
        <div aria-hidden className="absolute inset-0 bg-[#262626]/90" />

        {/* All slides share one grid cell, so the card keeps the tallest height */}
        <div className="relative grid">
          {QUOTES.map((q, i) => {
            const active = i === index;
            return (
              <figure
                key={q.name}
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${count}`}
                aria-hidden={!active}
                className={`col-start-1 row-start-1 flex flex-col items-center gap-6 px-6 pb-14 pt-8 transition-opacity duration-700 motion-reduce:transition-none md:flex-row md:gap-10 md:px-10 md:pb-12 md:pt-8 ${
                  active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <div className="relative aspect-[268/300] w-40 shrink-0 overflow-hidden rounded-xl md:w-56 lg:w-64">
                  <Image
                    src={q.photo}
                    alt={q.name}
                    fill
                    sizes="(max-width: 768px) 160px, 256px"
                    className="object-cover object-top"
                  />
                </div>

                <figcaption className="flex flex-1 flex-col items-center text-center">
                  <blockquote
                    lang="hi"
                    className="max-w-2xl text-lg font-bold leading-relaxed text-white md:text-2xl"
                  >
                    {q.quote}
                  </blockquote>
                  {q.tagline && (
                    <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-saffron-400 md:text-base">
                      {q.tagline}
                    </p>
                  )}
                  <span aria-hidden className="mt-5 block h-1 w-14 rounded-full bg-saffron-500" />
                  <span lang="hi" className="mt-4 block text-base font-bold text-white md:text-lg">
                    {q.name}
                  </span>
                  {q.role && (
                    <span lang="hi" className="mt-1 block text-sm text-white/75 md:text-base">
                      {q.role}
                    </span>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Dots */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {QUOTES.map((q, i) => (
            <button
              key={q.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`विचार ${i + 1}: ${q.name}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-7 bg-saffron-500" : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
