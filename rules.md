# rules.md — Sewa Bharti website (CMS-driven)

These rules are mandatory for anyone (human or AI agent) changing this codebase.
If a change breaks a rule, the change is wrong — fix the change, not the rule.
Rules that need an exception must be discussed and this file updated in the same PR.

---

## 0. Architecture in one minute

The project is **two separate apps** that run and deploy independently:

```
seva-bharti/
├── backend/    Payload CMS — admin panel, REST API, Postgres, media   (port 3001)
└── frontend/   Public website — reads content from the backend's API   (port 3000)
```

| Piece | Where | Notes |
|---|---|---|
| Public website | `frontend/src/app/(frontend)/` | Next.js 16 App Router, `cacheComponents: true` |
| Data layer | `frontend/src/lib/cms.ts` | **Only** place the frontend reads CMS data (REST `GET ${CMS_URL}/api/*` with `x-frontend-key`) |
| Rich text | `frontend/src/components/RichText.tsx` | Own Lexical JSON → React renderer, safe links only |
| Revalidation endpoint | `frontend/src/app/api/revalidate/route.ts` | `POST`, `Authorization: Bearer REVALIDATE_SECRET`, tag allow-list |
| Media on the site | frontend rewrite `/api/media/file/*` → backend | Images stay same-origin for `next/image` |
| CMS admin panel | backend `/admin` → `backend/src/app/(payload)/` | Payload CMS 3 — **generated files, do not edit** |
| CMS REST API | backend `/api/*` | GraphQL is **disabled** |
| CMS schema | `backend/src/collections/`, `globals/`, `fields/` | Single source of truth for content shape |
| Access control | `backend/src/access/index.ts` | All permission logic lives here |
| Cache invalidation | `backend/src/hooks/revalidate.ts` | On save/publish/delete, POSTs the changed cache tags to the frontend webhook |
| Rate limiting | `backend/src/proxy.ts` | Next 16 "proxy"; frontend server reads bypass it via `x-frontend-key` |
| Database | Postgres (`DATABASE_URL`) | Migrations in `backend/src/migrations/` |
| Media files | `backend/media/` locally, Vercel Blob in prod | Images only |
| Seed | `backend/src/seed/` (`npm run seed`) | Idempotent; loads the original site content |
| Shared types | `backend/src/payload-types.ts` → copied to `frontend/src/payload-types.ts` | `npm run generate:types` in backend does both |
| Frontend-only deploy | `CMS_SNAPSHOT=1` | No backend: frontend reads `frontend/src/content-snapshot/data.json`, images from `frontend/public/media/`. Refresh with `npx payload run scripts/export-snapshot.ts` in `backend/`. |

**Secrets shared by both apps** (must match): `REVALIDATE_SECRET` (webhook auth) and `FRONTEND_API_KEY` (rate-limit bypass for the frontend server). Backend also needs `FRONTEND_URL`; frontend needs `CMS_URL`.

**Content model**

- Collections (many entries): **Pillars** (`/<slug>`), **Events** (`/blog/<slug>`, draft → publish), **Media**, **Users**.
- Globals (one each): **Site Settings** (identity, logo, offices, socials, footer, default SEO), **Navigation** (header menu + footer links), **Home / About / Contact / Events Page**, **UI Text & Labels** (repeated headings, button text).

---

## 1. Content rules — everything is editable from the CMS

1. **No user-visible content in code.** Any text, image, link, label, phone, email, number or SEO string shown on the site must come from the CMS via `frontend/src/lib/cms.ts`. Allowed in code: layout, CSS classes, SVG icons, accessibility-only fallbacks.
2. **New content need → schema first.** Add/extend a field in `backend/src/collections` or `backend/src/globals`, then the seed (`backend/src/seed/`), run `npm run generate:types` in `backend/`, then update the frontend template. Never "temporarily" hardcode.
3. **Every field must be validated**: `required` where the page breaks without it, `maxLength` on every text field, `min/max` on numbers. Links use `hrefField()` / `validateHttpsUrl` from `backend/src/fields` (blocks `javascript:` / `data:` links).
4. **Empty fields must not crash a page.** Templates hide the element or use a documented fallback (e.g. `/logo.png`).
5. **Rich text** is rendered only through `frontend/src/components/RichText.tsx` (React output, no `dangerouslySetInnerHTML`). Never render CMS HTML strings directly.
6. **No fabricated content.** Only organisation-approved facts and photos. Seed/sample entries must be clearly marked (e.g. `guestsNote`) and replaced before launch.
7. **Pillar URLs** come from the pillar `slug`. Changing a slug changes the URL — add a redirect in `next.config.ts` if the old URL was public.

## 2. Data-fetching & caching rules

1. Frontend code **must not** install or import `payload` / `@payloadcms/*`, and must not call the CMS API anywhere except `frontend/src/lib/cms.ts`. The frontend never calls the API from the browser.
2. Every function in `cms.ts` uses `'use cache'` + `cacheLife('max')` + `cacheTag(...)`, and runs with `overrideAccess: false` so **public access rules apply** (drafts are never returned to visitors).
3. **Tags must match the hooks.** Collection `X` → tag `X`; global `Y` → tag `global:Y` (+ `globals`). Adding a collection/global ⇒ add an `afterChange`/`afterDelete` revalidate hook with the same tag.
4. Reads fail soft: errors are logged with `[cms]` prefix and return empty data; pages render with fallbacks instead of 500s. Previously cached pages keep being served if the DB goes down.
5. Before using a Next.js API, read `node_modules/next/dist/docs/` — this Next version differs from older docs (see `AGENTS.md`).

## 3. Security rules (mapped to the backend review checklist)

### 3.1 Broken authorization
- Every collection & global declares `access` explicitly, using helpers from `backend/src/access/index.ts`. **Never** `() => true` except for public **read** of published content.
- Roles: `admin` (everything incl. users) and `editor` (content + media only). The `roles` field is admin-only at field level — editors cannot self-promote.
- Users can only read/update their own account unless admin (`isAdminOrSelf`). No public sign-up: `users.create` is admin-only; only admins can unlock accounts.
- **First-admin takeover is blocked:** the one-time "create first user" route works only when `ALLOW_FIRST_REGISTER=true` (local dev). In production the first admin is created **before traffic** with `SEED_ADMIN_EMAIL` + `SEED_ADMIN_PASSWORD` + `npm run seed`. The first account ever created is always forced to `admin`.
- Media is public by policy: every uploaded file is downloadable even if only used by a draft. Don't upload anything that must stay private.
- Events are drafts until published; public reads are filtered by `publishedOrStaff`.
- Local API calls from server code that act on behalf of a visitor must pass `overrideAccess: false`. Use `overrideAccess: true` only in trusted scripts (seed/migrations).

### 3.2 Rate limiting & abuse
- `backend/src/proxy.ts` limits per IP: auth endpoints 10 / 15 min, uploads 60 / 10 min, admin panel 3000 / 5 min, other API writes 300 / 5 min, API reads 600 / 5 min. Paths are URL-decoded, lower-cased and slash-normalised before matching (no `%6Cogin` bypass). Public files under `/api/media/file/` are not throttled. Blocks log `ratelimit.blocked`.
- Client IP: on Vercel from the edge-set header; **self-hosted you must set `TRUSTED_PROXY_HOPS`**, otherwise all clients share one bucket (`X-Forwarded-For` is never trusted blindly).
- Payload account lockout: 5 failed logins ⇒ account locked 15 min. Login errors are identical for unknown email / wrong password / locked (no account enumeration). Because lockout can be triggered by anyone who knows an email, the Vercel Firewall rule below and lockout alerts are required.
- In-memory limits are **per instance**. In production also enable **Vercel Firewall rate-limit rules** on `/api/users/*` and `/admin` (or move limits to Upstash Redis). Required before launch.

### 3.3 Secrets
- Secrets live **only** in environment variables (`.env` locally, Vercel project env in prod). `.env*` is gitignored; `.env.example` lists names only.
- `PAYLOAD_SECRET` ≥ 32 random chars (`openssl rand -hex 32`); the app refuses to start without it. Rotate it if leaked (this logs everyone out).
- Never print env values, tokens or connection strings in logs, errors or client bundles. Only `NEXT_PUBLIC_*` vars reach the browser — never put secrets in them.
- Pre-commit check: `git diff --cached | grep -iE "secret|password|token|api[_-]?key|postgres://"` must be empty.

### 3.4 Sessions / tokens
- Admin session token lifetime: **15 min** (`tokenExpiration`), refreshed while the editor is active. The token lives only in the HttpOnly cookie (`removeTokenFromResponses`).
- Passwords: **12–128 characters**, enforced server-side on create, update, first-register and reset (PBKDF2-SHA256, 600k iterations by Payload).
- `useSessions: true` — sessions are stored server-side. Logout, password reset **and password change** revoke sessions (a password change keeps only the current session).
- Cookies: `HttpOnly`, `SameSite=Strict`, `Secure` in production. CORS/CSRF restricted to `NEXT_PUBLIC_SERVER_URL` (+ `EXTRA_ALLOWED_ORIGINS`).
- If an account is suspected compromised: reset its password (revokes sessions); if widespread, rotate `PAYLOAD_SECRET`.

### 3.5 Input validation
- All input is validated by the schema on the server (types, `required`, `maxLength`, custom `validate`). Client-side checks are UX only.
- Slugs: `^[a-z0-9]+(-[a-z0-9]+)*$`, max 120. Links (including links inside rich text): safe schemes only — `/path`, `#anchor`, `https://`, `mailto:`, `tel:`; `javascript:`, `data:`, `//host` and `/\host` are rejected. Phones: digits/`+()-` only. Social/external URLs: `https://` only.
- Payload's Drizzle adapter uses parameterised queries — **never** build raw SQL from user input. Never pass user input to `child_process`, `fs` paths or `eval`.

### 3.6 Database
- Production uses a **least-privilege app role**: `SELECT/INSERT/UPDATE/DELETE` on the app schema only — no `SUPERUSER`, no `CREATEROLE`, no access to other databases.
- Schema changes are applied by a separate **migration role** in CI/deploy (`npm run migrate`), not by the running app. Schema auto-push happens only when `PAYLOAD_DB_PUSH=true` (local dev) — never set it for staging/production.
- Schema change workflow: edit schema → `npm run migrate:create <name>` → commit the file in `backend/src/migrations/` → deploy runs `npm run migrate`.
- Enable automated daily backups + point-in-time recovery on the managed Postgres (Neon/Supabase/RDS).

### 3.7 File uploads
- Only `image/jpeg`, `image/png`, `image/webp`, `image/avif`; max **5 MB**; checked by Payload **and** re-checked in a `beforeOperation` hook.
- **SVG is forbidden** (can carry scripts). Do not add PDFs/docs without adding malware scanning first.
- Originals are re-encoded by `sharp` (max 2560px) which **strips EXIF/GPS metadata**, plus sized variants. Images over 40 megapixels are rejected (decompression-bomb guard).
- Uploads require an authenticated editor/admin; media `alt` text is required.

### 3.8 Dependencies
- Dependabot (`.github/dependabot.yml`) opens weekly update PRs; Payload packages are upgraded **together, same version**.
- Run `npm run audit` before every release; no unresolved **high/critical** in production deps. Use `overrides` in `package.json` for transitive fixes and note why.
- Current overrides: `payload → undici 7.29.1`, `monaco-editor → dompurify 3.4.16`, `@payloadcms/email-nodemailer → nodemailer 10.1.1` (patched advisories). Remove them once Payload ships these versions.
- Accepted residual findings (re-check on each Payload upgrade): `braces` (no patched release; only hardcoded globs reach it via sass/findup-sync) and `esbuild` under deprecated `@esbuild-kit` (dev-server advisory; only used by drizzle-kit CLI tooling, never at runtime).
- Payload must stay on a version whose `@payloadcms/next` peer range includes our Next.js version.

### 3.9 Failure handling
- A failed CMS read is cached for seconds only (`cacheLife('seconds')`), so a DB blip never pins empty pages; successful reads are cached until an editor saves.
- DB pool: `connectionTimeoutMillis` 10 s, idle 30 s, `DATABASE_POOL_MAX` (default 10). Use a pooled connection string (e.g. Neon pooler) on serverless.
- CMS read failures degrade to empty data + cached pages; route-level `error.tsx` shows a friendly message and never exposes stack traces. `debug` is off in production.
- If media storage is down, pages still render (images fail individually).

### 3.10 Logging & monitoring
- Structured logs (Payload/pino + JSON `console.warn`): `auth.login.success`, `auth.login.failed`, `auth.password.changed`, `auth.first_register.blocked`, `upload.rejected`, `ratelimit.blocked`, `[cms] … failed` — all with IP where relevant.
- Production: ship logs to a drain (Vercel Log Drains → Better Stack/Datadog) and alert on spikes in `ratelimit.blocked`, 401/403/429 rates, locked accounts, and `[cms]` errors.
- Review the **Users** list monthly; remove staff who left. Admin role only for people who manage accounts.

## 4. Working rules

1. Generated files are never hand-edited: `backend/src/payload-types.ts` and its copy `frontend/src/payload-types.ts` (`npm run generate:types` in backend), `backend/src/app/(payload)/**` (`npm run generate:importmap`). Regenerate both after any schema change and commit them.
2. After a schema change: in `backend/` run `npm run generate:types && npm run generate:importmap && npx tsc --noEmit && npm run build`, then in `frontend/` run `npx tsc --noEmit && npm run build`.
3. Seed script must stay **idempotent** and is updated whenever a field is added that the site needs to look correct.
4. Security headers (incl. CSP `frame-ancestors/object-src/base-uri/form-action`) are set in both apps' `next.config.ts`; don't remove them. A full `script-src` CSP needs per-request nonces (Next inline RSC scripts + Payload admin) — add it via `backend/src/proxy.ts` if required by policy. Payload's public `/api/og` image endpoint and GraphQL are disabled. Don't weaken `cors`/`csrf`, `maxLoginAttempts`, `tokenExpiration`, upload limits or MIME list without review.
5. Keep the visual design system (`frontend/src/app/(frontend)/globals.css` tokens, Noto fonts, saffron/blue palette).

## 5. Local setup

```bash
# Backend (CMS) — terminal 1
cd backend
cp .env.example .env            # DATABASE_URL, PAYLOAD_SECRET, FRONTEND_URL, REVALIDATE_SECRET, FRONTEND_API_KEY
createdb seva_bharti            # local Postgres
npm install
npm run seed                    # loads current site content + images
npm run dev                     # CMS: http://localhost:3001/admin

# Frontend (website) — terminal 2
cd frontend
cp .env.example .env            # CMS_URL=http://localhost:3001 + the SAME REVALIDATE_SECRET / FRONTEND_API_KEY
npm install
npm run dev                     # site: http://localhost:3000
```

The frontend needs the backend running to build (`next build` fetches content), unless built with `CMS_SNAPSHOT=1`.
With `ALLOW_FIRST_REGISTER=true` in `backend/.env` (local only), the first visit to `/admin` asks you to create the first admin. Otherwise set `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` and run `npm run seed`.

## 6. Production checklist (before go-live)

- [ ] First admin created via `SEED_ADMIN_*` + `npm run seed` **before** the site receives traffic; `ALLOW_FIRST_REGISTER` and `PAYLOAD_DB_PUSH` are NOT set
- [ ] `BLOB_STORE_HOSTNAME` set to our Blob store host (pins `next/image`)
- [ ] Managed Postgres with least-privilege app role, backups, PITR
- [ ] Backend env: `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `FRONTEND_URL`, `REVALIDATE_SECRET`, `FRONTEND_API_KEY`, `BLOB_READ_WRITE_TOKEN`, `SMTP_*`
- [ ] Frontend env: `CMS_URL`, `REVALIDATE_SECRET`, `FRONTEND_API_KEY` (same values as backend), `BLOB_STORE_HOSTNAME` if using Blob
- [ ] `npm run migrate` runs in the deploy pipeline before the new build serves traffic
- [ ] Vercel Firewall rate-limit rules on `/api/users/*` and `/admin`
- [ ] Log drain + alerts configured
- [ ] `npm run audit` clean of high/critical
- [ ] Seed/sample content (guests, success stories, padded aayaam, stats) replaced with approved data
- [ ] Real social URLs entered in Site Settings → Social
