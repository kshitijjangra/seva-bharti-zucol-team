import Image from "next/image";
import Link from "next/link";
import type { Navigation, SiteSetting } from "@/payload-types";
import SocialIcon, { socialLabels } from "@/components/SocialIcon";
import { siteLogo, telHref } from "@/lib/site-data";

// Links the organisation name inside the copyright text (if present) to orgUrl.
function Copyright({ text, name, url }: { text: string; name: string; url?: string | null }) {
  const linkClass = "font-semibold text-saffron-400 hover:underline";
  const at = name && url ? text.toLowerCase().indexOf(name.toLowerCase()) : -1;
  if (at === -1 || !url) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <a href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {text.slice(at, at + name.length)}
      </a>
      {text.slice(at + name.length)}
    </>
  );
}

export default function Footer({
  settings,
  navigation,
}: {
  settings: SiteSetting | null;
  navigation: Navigation | null;
}) {
  const main = settings?.offices?.[0];
  const phones = main?.phones ?? [];
  const logo = siteLogo(settings);
  const quickLinks = navigation?.footerLinks ?? [];
  const socials = settings?.socials ?? [];
  const email = settings?.primaryEmail;

  return (
    <footer className="mt-16 bg-footer text-neutral-300">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src={logo.url}
              alt={logo.alt}
              width={96}
              height={106}
              className="h-24 w-auto"
            />
            <div>
              {settings?.brandTitle && <p className="font-bold text-white">{settings.brandTitle}</p>}
              {settings?.tagline && (
                <p lang="hi" className="text-sm text-saffron-300">
                  {settings.tagline}
                </p>
              )}
            </div>
          </div>
          {settings?.introHi && (
            <p lang="hi" className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              {settings.introHi}
            </p>
          )}
        </div>

        <nav aria-label="Footer">
          {settings?.footerQuickLinksHeading && (
            <h2 lang="hi" className="text-sm font-semibold uppercase tracking-wide text-white">
              {settings.footerQuickLinksHeading}
            </h2>
          )}
          {quickLinks.length > 0 && (
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {quickLinks.map((item, i) => (
                <li key={item.id ?? `${item.href}-${i}`}>
                  <Link
                    href={item.href}
                    lang="hi"
                    className="text-neutral-300 hover:text-saffron-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>

        <div>
          {settings?.footerContactHeading && (
            <h2 lang="hi" className="text-sm font-semibold uppercase tracking-wide text-white">
              {settings.footerContactHeading}
            </h2>
          )}
          <address className="mt-4 space-y-2 text-sm not-italic text-neutral-400">
            {main?.address && <p>{main.address}</p>}
            {phones.length > 0 && (
              <p>
                {phones.map((p, i) => (
                  <span key={p.id ?? `${p.number}-${i}`}>
                    <a href={telHref(p.number)} className="hover:text-saffron-300">
                      {p.number}
                    </a>
                    {i < phones.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
            {email && (
              <p>
                <a href={`mailto:${email}`} className="hover:text-saffron-300">
                  {email}
                </a>
              </p>
            )}
          </address>

          {socials.length > 0 && (
            <ul className="mt-5 flex items-center gap-3">
              {socials.map((s, i) => (
                <li key={s.id ?? `${s.platform}-${i}`}>
                  <a
                    href={s.url}
                    aria-label={socialLabels[s.platform] ?? s.platform}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded border border-white/25 text-neutral-300 transition-colors hover:border-saffron-400 hover:text-saffron-300"
                  >
                    <SocialIcon platform={s.platform} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-saffron-500/60">
        <div className="container-page flex flex-col gap-1 py-5 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {settings?.copyrightText && (
              <Copyright text={settings.copyrightText} name={settings.name} url={settings.orgUrl} />
            )}
            {settings?.developerName && (
              <>
                {settings.copyrightText ? ". " : ""}{settings.developerCreditPrefix ?? "Developed & Managed by"}{" "}
                {settings.developerUrl ? (
                  <a
                    href={settings.developerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-saffron-400 hover:underline"
                  >
                    {settings.developerName}
                  </a>
                ) : (
                  <span className="font-semibold text-saffron-400">{settings.developerName}</span>
                )}
              </>
            )}
          </p>
          {settings?.nameHi && (
            <p lang="hi" className="text-neutral-500">
              {settings.nameHi}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
