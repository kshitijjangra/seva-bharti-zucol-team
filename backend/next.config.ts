import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Backend-only app: Payload admin (/admin) + REST API (/api/*) + media files.
// The public website is the separate ../frontend app.

// Baseline security headers for every route (admin + API).
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self'",
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // There is no public site here — send visitors of the bare origin to the CMS.
  async redirects() {
    return [{ source: "/", destination: "/admin", permanent: false }];
  },
  turbopack: {
    // Pin the workspace root to this project so stray lockfiles in parent
    // directories (repo root, home directory) are not picked up.
    root: dirname,
  },
};

export default withPayload(nextConfig);
