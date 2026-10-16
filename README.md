# Sewa Bharti Samiti Rajasthan — Website + CMS

Website for **Sewa Bharti Samiti Rajasthan**, with all content managed from a CMS.
The project is two separate apps:

| App | Folder | What it is | Local URL |
|---|---|---|---|
| **Backend** | [`backend/`](backend/) | Payload CMS 3 — admin panel, REST API, PostgreSQL, media uploads | http://localhost:3001/admin |
| **Frontend** | [`frontend/`](frontend/) | Public website (Next.js 16) — reads all content from the backend API | http://localhost:3000 |

When content is saved in the CMS, the backend calls the frontend's `/api/revalidate` webhook so the website refreshes within seconds.

## Run locally

Requirements: Node.js 22, PostgreSQL 16+.

```bash
# 1. Backend
cd backend
cp .env.example .env     # fill in DATABASE_URL, PAYLOAD_SECRET and the shared secrets
npm install
npm run seed             # load the site content and images
npm run dev              # http://localhost:3001/admin

# 2. Frontend (new terminal, backend must be running)
cd frontend
cp .env.example .env     # CMS_URL + the same REVALIDATE_SECRET / FRONTEND_API_KEY as the backend
npm install
npm run dev              # http://localhost:3000
```

## Deploy

- **Backend:** any Node.js host or server with PostgreSQL (VPS, Railway, Render, …). Run `npx payload migrate`, then `npm run build && npm run start`.
- **Frontend:** Vercel or any Node.js host. Set `CMS_URL` to the backend's public URL.
- **Frontend without a backend:** build with `CMS_SNAPSHOT=1` to serve the exported content snapshot.

## Documentation

- [`rules.md`](rules.md) — architecture, content rules, caching, security and the go-live checklist. **Read before changing code.**
- [`PROJECT_NOTES.md`](PROJECT_NOTES.md) — background, verified facts and open questions.
