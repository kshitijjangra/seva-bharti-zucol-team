import type { CollectionConfig } from "payload";
import { anyone, isAdmin, isAdminOrEditor } from "@/access";
import { seoField, slugField } from "@/fields";
import { revalidateCollection, revalidateCollectionDelete } from "@/hooks/revalidate";

// The four pillars (chaar aayam). Each document renders at /<slug>.
export const Pillars: CollectionConfig = {
  slug: "pillars",
  labels: { singular: "Pillar", plural: "Pillars" },
  admin: {
    group: "Content",
    useAsTitle: "nameHi",
    defaultColumns: ["nameHi", "nameEn", "slug", "order"],
  },
  defaultSort: "order",
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "nameHi", type: "text", required: true, maxLength: 120, label: "Name (Hindi)" },
        { name: "nameEn", type: "text", required: true, maxLength: 120, label: "Name (English)" },
      ],
    },
    slugField("URL, e.g. shiksha → /shiksha"),
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers show first." },
    },
    {
      name: "accent",
      type: "select",
      required: true,
      defaultValue: "saffron",
      options: [
        { label: "Saffron", value: "saffron" },
        { label: "Blue", value: "blue" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "showInNav",
      type: "checkbox",
      defaultValue: true,
      label: "Show in “सेवा कार्य” menu",
      admin: { position: "sidebar" },
    },
    {
      name: "navLabel",
      type: "text",
      maxLength: 80,
      label: "Menu label",
      admin: { position: "sidebar", description: "Optional shorter name for the menu. Defaults to Name (Hindi)." },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Overview",
          fields: [
            { name: "summaryHi", type: "textarea", required: true, maxLength: 600 },
            { name: "summaryEn", type: "textarea", maxLength: 600 },
            { name: "banner", type: "upload", relationTo: "media", required: true },
            { name: "content", type: "richText", label: "Vivran (long description)" },
          ],
        },
        {
          label: "Programmes",
          fields: [
            {
              name: "activities",
              type: "array",
              labels: { singular: "Programme", plural: "Programmes" },
              admin: { initCollapsed: true },
              fields: [
                { name: "titleHi", type: "text", required: true, maxLength: 200 },
                { name: "titleEn", type: "text", maxLength: 200 },
                { name: "descHi", type: "textarea", required: true, maxLength: 1200 },
              ],
            },
            {
              name: "aayaam",
              type: "array",
              label: "Areas of work (कार्य के आयाम)",
              admin: { initCollapsed: true },
              fields: [
                { name: "titleHi", type: "text", required: true, maxLength: 200 },
                { name: "titleEn", type: "text", maxLength: 200 },
              ],
            },
          ],
        },
        {
          label: "Stats",
          fields: [
            {
              name: "stats",
              type: "array",
              maxRows: 8,
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "value", type: "number", required: true, min: 0 },
                    { name: "suffix", type: "text", maxLength: 8, defaultValue: "+" },
                    { name: "labelHi", type: "text", required: true, maxLength: 80 },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Success stories",
          fields: [
            {
              name: "successStories",
              type: "array",
              admin: { initCollapsed: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "nameHi", type: "text", required: true, maxLength: 120 },
                    { name: "nameEn", type: "text", maxLength: 120 },
                    { name: "age", type: "number", min: 0, max: 130 },
                  ],
                },
                { name: "photo", type: "upload", relationTo: "media" },
                { name: "bioHi", type: "text", maxLength: 200 },
                { name: "storyHi", type: "textarea", required: true, maxLength: 2000 },
              ],
            },
          ],
        },
        { label: "SEO", fields: [seoField] },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateCollection("pillars")],
    afterDelete: [revalidateCollectionDelete("pillars")],
  },
};
