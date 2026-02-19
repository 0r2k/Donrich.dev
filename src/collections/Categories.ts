import type { CollectionConfig } from "payload";

import { slugify } from "../lib/utils.ts";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "order", "active"]
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      index: true
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === "string" && value.length > 0) {
              return slugify(value);
            }
            if (typeof data?.name === "string") {
              return slugify(data.name);
            }
            return value;
          }
        ]
      }
    },
    {
      name: "description",
      type: "textarea"
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0
    },
    {
      name: "colorToken",
      type: "text"
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      index: true
    }
  ]
};
