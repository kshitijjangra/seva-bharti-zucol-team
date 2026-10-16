import type { Field, TextField } from "payload";

// Shared, validated field builders. Reuse these instead of hand-rolling
// link/slug/SEO fields so validation stays consistent everywhere.

// Only allow safe link schemes — blocks `javascript:`, `data:` etc. (stored XSS).
const SAFE_HREF = /^(\/(?![\/\\])[^\s\\]*|#[\w-]*|https?:\/\/[^\s\\]+|mailto:[^\s\\]+|tel:[+\d\s()-]+)$/i;

export const validateHref = (value: unknown, opts?: { required?: boolean }): true | string => {
  if (value == null || value === "") return opts?.required ? "This field is required." : true;
  if (typeof value !== "string" || value.length > 500) return "Link is too long.";
  if (value !== value.trim()) return "Remove leading/trailing spaces.";
  return SAFE_HREF.test(value)
    ? true
    : "Use a site path (/about-us), https:// URL, mailto: or tel: link.";
};

export const validateHttpsUrl = (value: unknown, opts?: { required?: boolean }): true | string => {
  if (value == null || value === "") return opts?.required ? "This field is required." : true;
  if (typeof value !== "string" || value.length > 500) return "URL is too long.";
  return /^https:\/\/[^\s\\]+$/i.test(value) ? true : "Must be an https:// URL.";
};

export const hrefField = (
  overrides: Partial<TextField> & { name?: string } = {},
): TextField => ({
  name: "href",
  type: "text",
  label: "Link",
  maxLength: 500,
  validate: validateHref,
  admin: { description: "Site path like /about-us, or a full https:// URL." },
  ...overrides,
} as TextField);

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const slugField = (description = "URL segment, e.g. shiksha"): TextField => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  maxLength: 120,
  admin: { position: "sidebar", description },
  validate: (value: unknown) =>
    typeof value === "string" && value.length <= 120 && SLUG_RE.test(value)
      ? true
      : "Lowercase letters, numbers and hyphens only (max 120).",
});

export const seoField: Field = {
  name: "seo",
  type: "group",
  label: "SEO",
  admin: { description: "Optional. Falls back to the page title / summary." },
  fields: [
    { name: "metaTitle", type: "text", maxLength: 120 },
    { name: "metaDescription", type: "textarea", maxLength: 320 },
  ],
};

// Hero band used at the top of inner pages (PageHeader component).
export const pageHeaderField: Field = {
  name: "header",
  type: "group",
  label: "Page header",
  fields: [
    { name: "eyebrow", type: "text", maxLength: 120, admin: { description: "Small line above the title" } },
    { name: "title", type: "text", required: true, maxLength: 200 },
    { name: "subtitle", type: "textarea", maxLength: 1000 },
  ],
};

export const sectionHeadingField = (name: string, label: string): Field => ({
  name,
  type: "group",
  label,
  fields: [
    { name: "eyebrow", type: "text", maxLength: 120 },
    { name: "title", type: "text", required: true, maxLength: 200 },
  ],
});

// अतिथि — used by the Events page list and per-event guests.
export const guestFields: Field[] = [
  { name: "name", type: "text", required: true, maxLength: 160 },
  { name: "designation", type: "text", required: true, maxLength: 160 },
  { name: "testimonial", type: "textarea", required: true, maxLength: 1200 },
  {
    name: "photo",
    type: "upload",
    relationTo: "media",
    admin: { description: "Optional headshot. A placeholder is shown when empty." },
  },
];
