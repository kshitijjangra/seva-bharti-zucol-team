# Sewa Bharti Website — Build Notes

Next.js (App Router) + TypeScript + Tailwind CSS v4 static website for
**Sewa Bharti Samiti Rajasthan**, built to the spec in `context/seva_bharti_claude_docs/`.

## Stack
- Next.js 16.4.1 (App Router, Turbopack, static export of all routes)
- TypeScript
- Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`)
- Fonts: Noto Sans (Latin) + Noto Sans Devanagari via `next/font/google`

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build (all 8 routes prerender as static)
- `npm run start` — serve the production build

## Routes (exactly the 8 approved pages)
`/` · `/about-us` · `/shiksha` · `/swavalamban` · `/samajik` · `/swasthya` · `/events` · `/contact`

## Content source
All factual content is derived from the official site **sewabhartirajasthan.org**
(approved reference), summarised faithfully — not copied verbatim. Content lives in
typed files, separate from presentation:
- `src/content/site.ts` — org details, mission, registration, nav, contact offices
- `src/content/pillars.ts` — the four pillars and their real programmes
- `src/content/events.ts` — real published seva activities

### Verified facts used
- Reg. No. 106/Rajasthan 1987-88 (16 July 1987); 80G/831/2007-2008; PAN AABTS4114N
- 1610 seva kaary across Rajasthan
- Email sewabhartijpr@gmail.com; offices in Jaipur (Lalkothi) and Kota

## Design
Palette sampled from the live site + logo: saffron `#FF9933`, logo blue `#0789D1`,
dark footer `#0F1115`, cream background. Logo at `public/logo.png` (unaltered).

## Remaining placeholders (replace before publishing)
Search the codebase for `[CONTENT REQUIRED` — current markers:
1. **Pillar pages** (`src/components/PillarPage.tsx`) — official photographs and any
   extra details per pillar.
2. **Events page** (`src/content/events.ts`) — event photographs and newer events.
   Add only organisation-supplied images; do not fetch or invent photos.

## Things to confirm with the organisation
- Exact public spelling/labels of the four pillars (currently Shiksha / Swavalamban /
  Samajik / Swasthya per the provided spec).
- Correct PIN / address for each office (the source site shows minor inconsistencies;
  the registered office PIN is 302015, correspondence address shows 302007).
- Whether pillar/event photographs may be reused from the existing site.

## Not included (per scope lock)
No CMS, admin, login, donation/payment flow, blog, or any page beyond the 8 approved.
