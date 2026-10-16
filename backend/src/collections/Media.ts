import { ValidationError, type CollectionConfig } from "payload";
import sharp from "sharp";
import { stat } from "fs/promises";
import path from "path";
import { anyone, isAdminOrEditor } from "@/access";
import { revalidateCollection, revalidateCollectionDelete } from "@/hooks/revalidate";

// Raster images only. SVG is deliberately NOT allowed (it can carry scripts).
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_PIXELS = 40_000_000;

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content", defaultColumns: ["filename", "alt", "updatedAt"] },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  upload: {
    // Local disk in development; Vercel Blob in production (see payload.config).
    staticDir: "media",
    // Missing local file → clean 404 (Payload's fallback logs an ERROR and
    // returns 500, which anyone could use to flood the logs). Skipped when
    // Vercel Blob is configured — its own handler serves files there.
    handlers: [
      // (Payload's handler type only allows Promise<Response> | Promise<void>, not a mix.)
      (async (_req: unknown, { params }: { params: { filename: string } }) => {
        if (process.env.BLOB_READ_WRITE_TOKEN) return;
        const dir = path.resolve("media");
        const file = path.resolve(dir, params.filename);
        if (!file.startsWith(dir + path.sep)) return Response.json({ errors: [{ message: "Not Found" }] }, { status: 404 });
        try {
          await stat(file);
        } catch {
          return Response.json({ errors: [{ message: "Not Found" }] }, { status: 404 });
        }
      }) as unknown as () => Promise<void>,
    ],
    mimeTypes: ALLOWED_MIME,
    // Originals are re-encoded (resizeOptions forces it), which strips EXIF/GPS
    // metadata — important for photos of children and beneficiaries.
    resizeOptions: { width: 2560, height: 2560, fit: "inside", withoutEnlargement: true },
    imageSizes: [
      { name: "thumbnail", width: 400 },
      { name: "card", width: 900 },
      { name: "hero", width: 1920 },
    ],
    // Small images (< 400px) get no generated sizes — fall back to the original.
    adminThumbnail: ({ doc }) =>
      ((doc.sizes as { thumbnail?: { url?: string | null } } | undefined)?.thumbnail?.url ?? (doc.url as string | undefined)) || null,
    focalPoint: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      maxLength: 300,
      admin: { description: "Describe the photo for screen readers." },
    },
  ],
  hooks: {
    beforeOperation: [
async ({ req, operation }) => {
        // Defence in depth: re-check MIME of the incoming file on the server.
        const file = req.file;
        // Anonymous requests are rejected by access control — don't spend CPU on them.
        if (!req.user) return;
        if ((operation === "create" || operation === "update") && file) {
          // Decompression-bomb guard: header-only read, rejects huge pixel counts.
          if (file.data?.length) {
            const { width = 0, height = 0 } = await sharp(file.data).metadata().catch(() => ({ width: 0, height: 0 }));
            if (width * height > MAX_PIXELS) {
              req.payload.logger.warn({ msg: "upload.rejected", reason: "pixels", width, height });
              throw new ValidationError({ errors: [{ path: "file", message: "Image too large (max 40 megapixels)." }] });
            }
          }
          if (!ALLOWED_MIME.includes(file.mimetype)) {
            req.payload.logger.warn({ msg: "upload.rejected", mimetype: file.mimetype });
            throw new ValidationError({ errors: [{ path: "file", message: "Only JPEG, PNG, WebP or AVIF images are allowed." }] });
          }
        }
      },
    ],
    afterChange: [revalidateCollection("media", "pillars", "events", "globals")],
    afterDelete: [revalidateCollectionDelete("media", "pillars", "events", "globals")],
  },
};
