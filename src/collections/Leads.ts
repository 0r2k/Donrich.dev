import type { CollectionConfig } from "payload";

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "createdAt", "sourcePath"]
  },
  access: {
    create: () => true,
    read: () => true
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true
    },
    {
      name: "email",
      type: "email",
      required: true,
      index: true
    },
    {
      name: "message",
      type: "textarea",
      required: true
    },
    {
      name: "sourcePath",
      type: "text"
    }
  ]
};
