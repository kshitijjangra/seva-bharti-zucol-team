// Exports the current CMS content to a static snapshot for the frontend app's
// "frontend only" deploys (CMS_SNAPSHOT=1):
//   ../frontend/src/content-snapshot/data.json + ../frontend/public/media/*
// Run from backend/: npx payload run scripts/export-snapshot.ts
import { cpSync, mkdirSync, rmSync, writeFileSync } from "fs";
import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });
const PUBLIC = { overrideAccess: false, depth: 2 } as const;

const globalSlugs = ["site-settings", "navigation", "home-page", "about-page", "contact-page", "events-page", "ui-strings"] as const;
const globals: Record<string, unknown> = {};
for (const slug of globalSlugs) globals[slug] = await payload.findGlobal({ slug, ...PUBLIC });

const pillars = (await payload.find({ collection: "pillars", sort: "order", limit: 50, pagination: false, ...PUBLIC })).docs;
const events = (
  await payload.find({ collection: "events", sort: "-date", limit: 200, pagination: false, draft: false, ...PUBLIC })
).docs;

// Media is served from /media/* (public/) instead of the CMS file API.
const json = JSON.stringify({ exportedAt: new Date().toISOString(), globals, pillars, events }, null, 2)
  .replace(/"https?:\/\/[^"/]+\/api\/media\/file\//g, '"/media/')
  .replace(/"\/api\/media\/file\//g, '"/media/');

// Paths are relative to the backend directory (the cwd of `payload run`).
const FRONTEND = path.resolve("../frontend");
const snapshotDir = path.join(FRONTEND, "src/content-snapshot");
const publicMedia = path.join(FRONTEND, "public/media");

mkdirSync(snapshotDir, { recursive: true });
writeFileSync(path.join(snapshotDir, "data.json"), json + "\n");
rmSync(publicMedia, { recursive: true, force: true });
mkdirSync(publicMedia, { recursive: true });
cpSync(path.resolve("media"), publicMedia, { recursive: true });
console.log(`snapshot: ${globalSlugs.length} globals, ${pillars.length} pillars, ${events.length} events`);
process.exit(0);
