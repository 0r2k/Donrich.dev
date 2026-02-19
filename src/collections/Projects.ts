import type { CollectionConfig } from "payload";

import { slugify } from "../lib/utils.ts";

const lazyLexicalEditor = () => {
  return async (args: any) => {
    const { lexicalEditor } = await import("@payloadcms/richtext-lexical");
    return lexicalEditor({})(args);
  };
};

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "featured", "year"]
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: "title",
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
            if (typeof data?.title === "string") {
              return slugify(data.title);
            }
            return value;
          }
        ]
      }
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true
    },
    {
      name: "content",
      type: "textarea"
    },
    {
      name: "caseStudyMode",
      type: "select",
      required: true,
      defaultValue: "short",
      options: [
        { label: "Full", value: "full" },
        { label: "Short", value: "short" }
      ],
      index: true
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      index: true
    },
    {
      name: "featuredOrder",
      type: "number"
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: "stack",
      type: "array",
      fields: [
        {
          name: "name",
          type: "text",
          required: true
        }
      ]
    },
    {
      name: "year",
      type: "number",
      index: true
    },
    {
      name: "client",
      type: "text"
    },
    {
      name: "role",
      type: "text"
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: "links",
      type: "group",
      fields: [
        {
          name: "liveUrl",
          type: "text"
        },
        {
          name: "repoUrl",
          type: "text"
        }
      ]
    },
    {
      name: "metrics",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text"
        },
        {
          name: "value",
          type: "text"
        }
      ]
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft"
        },
        {
          label: "Published",
          value: "published"
        }
      ],
      index: true
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        {
          slug: 'textBlock',
          fields: [
            { name: 'content', type: 'richText', editor: lazyLexicalEditor() },
          ],
        },
        {
          slug: 'imageBlock',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            { name: 'caption', type: 'text' },
          ],
        },
        {
          slug: 'videoBlock',
          fields: [
            { name: 'videoUrl', type: 'text' },
          ],
        },
        {
          slug: 'statsBlock',
          fields: [
            {
              name: 'items',
              type: 'array',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'value', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
  ]
};
