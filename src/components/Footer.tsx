import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

const quickLinks = site.nav.filter((n) => n.href !== "/");

const SEWA_BHARTI_URL = "https://sewabhartirajasthan.org";
const ZUCOL_URL = "https://www.zucol.in/";

// Social handles. Replace each "#" with the organisation's real profile URL.
const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.9 2H22l-7.3 8.34L23 22h-6.78l-5.3-6.93L4.85 22H1.74l7.8-8.92L1 2h6.95l4.79 6.33L18.9 2Zm-2.38 18h1.88L7.57 3.9H5.56L16.52 20Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.6 15.57V8.43L15.82 12 9.6 15.57Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const main = site.contact.offices[0];

  return (
    <footer className="mt-16 bg-footer text-neutral-300">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src={site.logo}
              alt={`${site.name} logo`}
              width={96}
              height={106}
              className="h-24 w-auto"
            />
            <div>
              <p className="font-bold text-white">{site.shortName} Rajasthan</p>
              <p lang="hi" className="text-sm text-saffron-300">
                {site.tagline}
              </p>
            </div>
          </div>
          <p lang="hi" className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
            {site.introHi}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
            Quick Links
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-neutral-300 hover:text-saffron-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
            Contact
          </h2>
          <address className="mt-4 space-y-2 text-sm not-italic text-neutral-400">
            <p>{main.address}</p>
            <p>
              {main.phones.map((p, i) => (
                <span key={p}>
                  <a href={`tel:${p.replace(/[^0-9+]/g, "")}`} className="hover:text-saffron-300">
                    {p}
                  </a>
                  {i < main.phones.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p>
              <a
                href={`mailto:${site.contact.primaryEmail}`}
                className="hover:text-saffron-300"
              >
                {site.contact.primaryEmail}
              </a>
            </p>
          </address>

          {/* Social handles — replace "#" with the organisation's real profile URLs. */}
          <ul className="mt-5 flex items-center gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded border border-white/25 text-neutral-300 transition-colors hover:border-saffron-400 hover:text-saffron-300"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-saffron-500/60">
        <div className="container-page flex flex-col gap-1 py-5 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            COPYRIGHT © 2026 ALL RIGHT RESERVED BY{" "}
            <a
              href={SEWA_BHARTI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-saffron-400 hover:underline"
            >
              {site.name.toUpperCase()}
            </a>
            . Developed &amp; Managed by{" "}
            <a
              href={ZUCOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-saffron-400 hover:underline"
            >
              ZUCOL
            </a>
          </p>
          <p lang="hi" className="text-neutral-500">
            {site.nameHi}
          </p>
        </div>
      </div>
    </footer>
  );
}
