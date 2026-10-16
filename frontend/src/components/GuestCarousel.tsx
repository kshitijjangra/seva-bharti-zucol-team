"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DEFAULT_A11Y, GUEST_PLACEHOLDER, fillN, type A11yLabels, type GuestView } from "@/lib/view-types";

// अतिथिगण scroller — shows one guest at a time: photo, name, designation and
// testimonial. Auto-advances every few seconds (pauses on hover) and can be
// changed manually via the pill controls (and arrows on the compact variant).
export default function GuestCarousel({
  guests,
  variant = "overlay",
  a11y = DEFAULT_A11Y,
}: {
  guests: GuestView[];
  a11y?: A11yLabels;
  // "overlay" — big photo on the left, tinted detail panel on the right (listing style).
  // "split"   — small circular photo card (detail-page style).
  variant?: "overlay" | "split";
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = guests.length;
  const go = (i: number) => setIndex(((i % count) + count) % count);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(id);
  }, [paused, count]);

  if (count === 0) return null;
  const guest = guests[index];

  return (
    <div
      className={`relative ${variant === "overlay" ? "w-full" : "mx-auto max-w-2xl"}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {variant === "overlay" ? (
        <figure
          key={index}
          className="flex flex-col gap-5 transition-opacity duration-500 md:flex-row md:items-stretch"
        >
          {/* Big photo — left */}
          <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-2xl bg-neutral-100 md:w-64 lg:w-72">
            <Image
              src={guest.photo ?? GUEST_PLACEHOLDER}
              alt={`${guest.name} — ${guest.designation}`}
              fill
              sizes="(max-width: 768px) 100vw, 288px"
              className="object-cover"
            />
          </div>

          {/* Detail panel — right */}
          <figcaption className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-2xl bg-saffron-100/70 p-8 md:p-10">
            <span lang="hi" className="block text-2xl font-bold text-sewablue-800 md:text-3xl">
              {guest.name}
            </span>
            <span lang="hi" className="mt-2 block text-sm font-medium text-ink-soft md:text-base">
              {guest.designation}
            </span>

            <blockquote lang="hi" className="relative mt-6 max-w-2xl pl-9 text-base leading-relaxed text-ink md:text-lg">
              <span aria-hidden className="absolute left-0 top-0 font-serif text-4xl leading-none text-saffron-400">
                &ldquo;
              </span>
              {guest.testimonial}
            </blockquote>

            {/* Decorative corner arrow */}
            <svg
              aria-hidden
              className="pointer-events-none absolute bottom-5 right-5 text-saffron-300"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 7l10 10M17 9v8h-8" />
            </svg>
          </figcaption>
        </figure>
      ) : (
        <figure
          key={index}
          className="flex flex-col items-center rounded-2xl border border-saffron-100 bg-white p-8 text-center shadow-sm transition-opacity duration-500"
        >
          {/* Small circular photo */}
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-saffron-100 bg-saffron-100">
            <Image
              src={guest.photo ?? GUEST_PLACEHOLDER}
              alt={`${guest.name} — ${guest.designation}`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>

          {/* separator */}
          <span className="mt-5 block h-1 w-14 rounded-full bg-saffron-500" />

          <figcaption className="mt-4">
            <span lang="hi" className="block text-lg font-bold text-ink">
              {guest.name}
            </span>
            <span lang="hi" className="mt-1 block text-sm font-medium text-sewablue-600">
              {guest.designation}
            </span>
            <blockquote lang="hi" className="mt-3 text-sm leading-relaxed text-ink-soft">
              “{guest.testimonial}”
            </blockquote>
          </figcaption>
        </figure>
      )}

      {count > 1 && (
        <>
          {/* Arrows — compact (split) variant only */}
          {variant === "split" && (
            <>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label={a11y.prevGuest}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-saffron-100 bg-white/90 p-2 text-sewablue-600 shadow-sm transition hover:bg-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label={a11y.nextGuest}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-saffron-100 bg-white/90 p-2 text-sewablue-600 shadow-sm transition hover:bg-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          {/* Pill controls */}
          <div
            className={`mt-6 flex gap-2 ${
              variant === "overlay" ? "justify-center md:justify-start md:pl-[calc(16rem+1.25rem)] lg:pl-[calc(18rem+1.25rem)]" : "justify-center"
            }`}
          >
            {guests.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={fillN(a11y.showGuest, i + 1)}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-saffron-500" : "w-6 bg-saffron-200 hover:bg-saffron-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
