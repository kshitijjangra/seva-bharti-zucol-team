import type { CollectionConfig } from "payload";
import { isAdminOrEditor, publishedOrStaff } from "@/access";
import { guestFields, seoField, slugField } from "@/fields";
import { revalidateCollection, revalidateCollectionDelete } from "@/hooks/revalidate";

// Events / seva activities. Listed on /events, each renders at /blog/<slug>.
export const Events: CollectionConfig = {
  slug: "events",
  labels: { singular: "Event", plural: "Events" },
  admin: {
    group: "Content",
    useAsTitle: "titleHi",
    defaultColumns: ["titleHi", "date", "location", "_status"],
  },
  defaultSort: "-date",
  // Draft → publish workflow. Public visitors only ever get published events.
  // Drafts are validated too, so bad slugs/links can never be stored.
  versions: { drafts: { validate: true }, maxPerDoc: 25 },
  access: {
    read: publishedOrStaff,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    { name: "titleHi", type: "text", required: true, maxLength: 200, label: "Title (Hindi)" },
    { name: "titleEn", type: "text", maxLength: 200, label: "Title (English)" },
    slugField("URL, e.g. kishangarh-chikitsa-shivir → /blog/kishangarh-chikitsa-shivir"),
    {
      name: "date",
      type: "date",
      required: true,
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    { name: "location", type: "text", maxLength: 200, admin: { position: "sidebar" } },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            { name: "summaryHi", type: "textarea", required: true, maxLength: 800, label: "Summary (card text)" },
            { name: "coverImage", type: "upload", relationTo: "media", label: "Card image" },
            { name: "content", type: "richText", label: "Full description" },
          ],
        },
        {
          label: "Photos",
          fields: [
            {
              name: "photos",
              type: "upload",
              relationTo: "media",
              hasMany: true,
              maxRows: 40,
              admin: { description: "Gallery on the event page. Drag to reorder." },
            },
          ],
        },
        {
          label: "Guests (अतिथिगण)",
          fields: [
            { name: "guests", type: "array", admin: { initCollapsed: true }, fields: guestFields },
          ],
        },
        { label: "SEO", fields: [seoField] },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateCollection("events")],
    afterDelete: [revalidateCollectionDelete("events")],
  },
};
