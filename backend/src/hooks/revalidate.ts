import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

// On-demand cache invalidation for the separate frontend app.
//
// The frontend caches every CMS read with `use cache` + cacheTag. These hooks
// tell it which tags to expire whenever an editor saves, publishes or deletes
// content, by calling its webhook:
//
//   POST {FRONTEND_URL}/api/revalidate
//   Authorization: Bearer {REVALIDATE_SECRET}
//   Content-Type: application/json
//   {"tags": ["global:home-page", "globals"]}
//
// Tags: collection X → "X"; global Y → "global:Y" (+ "globals").
// The request is fire-and-forget (5 s timeout) so a slow/down frontend never
// blocks or fails a save; failures are logged as `revalidate.failed`.
// Skipped silently when FRONTEND_URL or REVALIDATE_SECRET is unset
// (e.g. scripts, or a backend running without a frontend).

const TIMEOUT_MS = 5000;

function warn(details: Record<string, unknown>) {
  console.warn(JSON.stringify({ msg: "revalidate.failed", ...details }));
}

export function revalidate(...tags: string[]): Promise<void> {
  const frontendUrl = process.env.FRONTEND_URL?.trim().replace(/\/+$/, "");
  const secret = process.env.REVALIDATE_SECRET;
  const unique = [...new Set(tags)];
  if (!frontendUrl || !secret || unique.length === 0) return Promise.resolve();

  return fetch(`${frontendUrl}/api/revalidate`, {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
    body: JSON.stringify({ tags: unique }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  })
    .then((res) => {
      if (!res.ok) warn({ status: res.status, tags: unique });
      // Release the connection; the body is not needed.
      return res.body?.cancel();
    })
    .catch((error: unknown) => {
      warn({ error: error instanceof Error ? error.name + ": " + error.message : String(error), tags: unique });
    });
}

// Hooks don't await the webhook — the save returns immediately.
export const revalidateCollection =
  (...tags: string[]): CollectionAfterChangeHook =>
  ({ doc, req }) => {
    if (!req.context?.disableRevalidate) void revalidate(...tags);
    return doc;
  };

export const revalidateCollectionDelete =
  (...tags: string[]): CollectionAfterDeleteHook =>
  ({ doc, req }) => {
    if (!req.context?.disableRevalidate) void revalidate(...tags);
    return doc;
  };

export const revalidateGlobal =
  (...tags: string[]): GlobalAfterChangeHook =>
  ({ doc, req }) => {
    if (!req.context?.disableRevalidate) void revalidate(...tags);
    return doc;
  };
