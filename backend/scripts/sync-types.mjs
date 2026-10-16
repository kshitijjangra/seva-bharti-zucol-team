// Copies the generated Payload types to the frontend app so both sides share
// one content shape. Run via `npm run generate:types` (from backend/).
// The trailing `declare module 'payload'` augmentation is dropped because the
// frontend does not install payload.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const backendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(backendDir, "src/payload-types.ts");
const dest = path.resolve(backendDir, "../frontend/src/payload-types.ts");

let types = readFileSync(src, "utf8");
const idx = types.search(/^declare module ['"]payload['"]\s*\{/m);
if (idx !== -1) types = types.slice(0, idx);
types = types.trimEnd() + "\n";

const header =
  "// Generated from backend — do not edit; run `npm run generate:types` in backend/.\n";

mkdirSync(path.dirname(dest), { recursive: true });
writeFileSync(dest, header + types);
console.log(`sync-types: wrote ${path.relative(backendDir, dest)}`);
