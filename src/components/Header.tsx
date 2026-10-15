"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

// Sewa Kaary groups the four pillars under one nav entry, using the
// organisation's public labels (Education / Health / Self Reliance / Social).
const sewaKaary = {
  label: "Sewa Kaary",
  children: [
    { label: "Education", href: "/shiksha" },
    { label: "Health", href: "/swasthya" },
    { label: "Self Reliance", href: "/swavalamban" },
    { label: "Social", href: "/samajik" },
  ],
};

const pillarRoutes = sewaKaary.children.map((c) => c.href);

const mainNav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pillarsOpen, setPillarsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const pillarsActive = pillarRoutes.some((h) => pathname.startsWith(h));

  // Close the desktop dropdown on route change and outside clicks.
  useEffect(() => {
    setPillarsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPillarsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const linkClass = (active: boolean) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      active
        ? "bg-saffron-100 text-saffron-800"
        : "text-ink hover:bg-saffron-50 hover:text-saffron-700"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-saffron-100 bg-white/95 backdrop-blur">
      <div className="container-page flex items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${site.name} — home`}
        >
          <Image
            src={site.logo}
            alt={`${site.name} logo`}
            width={52}
            height={58}
            priority
            className="h-12 w-auto"
          />
          <span className="leading-tight">
            <span className="block text-sm font-bold text-saffron-700 sm:text-base">
              {site.shortName} <span className="text-sewablue-600">Rajasthan</span>
            </span>
            <span lang="hi" className="block text-xs text-ink-soft">
              {site.tagline}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li>
              <Link href="/" aria-current={isActive("/") ? "page" : undefined} className={linkClass(isActive("/"))}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                aria-current={isActive("/about-us") ? "page" : undefined}
                className={linkClass(isActive("/about-us"))}
              >
                About Us
              </Link>
            </li>

            {/* Sewa Kaary dropdown */}
            <li
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setPillarsOpen(true)}
              onMouseLeave={() => setPillarsOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={pillarsOpen}
                onClick={() => setPillarsOpen((v) => !v)}
                className={`flex items-center gap-1 ${linkClass(pillarsActive)}`}
              >
                {sewaKaary.label}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                  className={`transition-transform ${pillarsOpen ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {pillarsOpen && (
                <ul className="absolute left-0 top-full mt-1 min-w-52 rounded-lg border border-saffron-100 bg-white py-2 shadow-lg">
                  {sewaKaary.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        aria-current={isActive(c.href) ? "page" : undefined}
                        className={`block px-4 py-2 text-sm font-medium transition-colors ${
                          isActive(c.href)
                            ? "bg-saffron-50 text-saffron-800"
                            : "text-ink hover:bg-saffron-50 hover:text-saffron-700"
                        }`}
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {mainNav
              .filter((i) => i.href !== "/" && i.href !== "/about-us")
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={linkClass(isActive(item.href))}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="rounded-md p-2 text-ink hover:bg-saffron-50 lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-saffron-100 bg-white lg:hidden"
        >
          <ul className="container-page flex flex-col py-2">
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                aria-current={isActive("/") ? "page" : undefined}
                className={`block rounded-md px-3 py-3 text-sm font-medium ${
                  isActive("/") ? "bg-saffron-100 text-saffron-800" : "text-ink hover:bg-saffron-50"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                onClick={() => setOpen(false)}
                aria-current={isActive("/about-us") ? "page" : undefined}
                className={`block rounded-md px-3 py-3 text-sm font-medium ${
                  isActive("/about-us") ? "bg-saffron-100 text-saffron-800" : "text-ink hover:bg-saffron-50"
                }`}
              >
                About Us
              </Link>
            </li>

            {/* Sewa Kaary group */}
            <li className="mt-1">
              <p className="px-3 pt-2 text-sm font-semibold text-saffron-700">
                {sewaKaary.label}
              </p>
              <ul className="border-l border-saffron-100 pl-3">
                {sewaKaary.children.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(c.href) ? "page" : undefined}
                      className={`block rounded-md px-3 py-3 text-sm font-medium ${
                        isActive(c.href) ? "bg-saffron-100 text-saffron-800" : "text-ink hover:bg-saffron-50"
                      }`}
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {mainNav
              .filter((i) => i.href !== "/" && i.href !== "/about-us")
              .map((item) => (
                <li key={item.href} className="mt-1">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-md px-3 py-3 text-sm font-medium ${
                      isActive(item.href) ? "bg-saffron-100 text-saffron-800" : "text-ink hover:bg-saffron-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
