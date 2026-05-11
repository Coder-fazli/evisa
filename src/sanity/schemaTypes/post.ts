 import { defineField, defineType } from "sanity";

const blockContent = {
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "Heading 2", value: "h2" },
    { title: "Heading 3", value: "h3" },
    { title: "Heading 4", value: "h4" },
    { title: "Quote", value: "blockquote" },
  ],
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Numbered", value: "number" },
  ],
  marks: {
    decorators: [
      { title: "Bold", value: "strong" },
      { title: "Italic", value: "em" },
      { title: "Underline", value: "underline" },
      { title: "Strike", value: "strike-through" },
      { title: "Code", value: "code" },
    ],
    annotations: [
      {
        name: "link",
        type: "object",
        title: "Link",
        fields: [
          { name: "href", type: "url", title: "URL" },
          { name: "blank", type: "boolean", title: "Open in new tab", initialValue: true },
        ],
      },
    ],
  },
};

export const postType = defineType({
  name: "post",
  title: "Blog Posts",
  type: "document",
  groups: [
    { name: "general", title: "⚙️ General", default: true },
    { name: "english", title: "🇬🇧 English" },
    { name: "spanish", title: "🇪🇸 Spanish" },
    { name: "arabic", title: "🇸🇦 Arabic" },
  ],
  fields: [
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "english.title_en", maxLength: 96 },
      validation: (r) => r.required(),
      group: "general",
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (r) => r.required(),
      group: "general",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      group: "general",
    }),

    // ENGLISH FIELDS
    {
      name: "english",
      title: "🇬🇧 English Content",
      type: "object",
      group: "english",
      fields: [
        defineField({
          name: "title_en",
          title: "Title",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "category_en",
          title: "Category",
          type: "string",
        }),
        defineField({
          name: "excerpt_en",
          title: "Excerpt (short summary)",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "body_en",
          title: "Article Body",
          type: "array",
          of: [blockContent, { type: "image", options: { hotspot: true } }],
        }),
        defineField({
          name: "metaTitle_en",
          title: "Meta Title (SEO)",
          type: "string",
        }),
        defineField({
          name: "metaDescription_en",
          title: "Meta Description (SEO)",
          type: "text",
          rows: 2,
        }),
      ],
    },

    // SPANISH FIELDS
    {
      name: "spanish",
      title: "🇪🇸 Spanish Content",
      type: "object",
      group: "spanish",
      fields: [
        defineField({
          name: "title_es",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "category_es",
          title: "Category",
          type: "string",
        }),
        defineField({
          name: "excerpt_es",
          title: "Excerpt (short summary)",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "body_es",
          title: "Article Body",
          type: "array",
          of: [blockContent, { type: "image", options: { hotspot: true } }],
        }),
        defineField({
          name: "metaTitle_es",
          title: "Meta Title (SEO)",
          type: "string",
        }),
        defineField({
          name: "metaDescription_es",
          title: "Meta Description (SEO)",
          type: "text",
          rows: 2,
        }),
      ],
    },

    // ARABIC FIELDS
    {
      name: "arabic",
      title: "🇸🇦 Arabic Content",
      type: "object",
      group: "arabic",
      fields: [
        defineField({
          name: "title_ar",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "category_ar",
          title: "Category",
          type: "string",
        }),
        defineField({
          name: "excerpt_ar",
          title: "Excerpt (short summary)",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "body_ar",
          title: "Article Body",
          type: "array",
          of: [blockContent, 
            { type: "image", options: { hotspot: true } 
          }
        ],
        }),
        defineField({
          name: "metaTitle_ar",
          title: "Meta Title (SEO)",
          type: "string",
        }),
        defineField({
          name: "metaDescription_ar",
          title: "Meta Description (SEO)",
          type: "text",
          rows: 2,
        }),
      ],
    },
  ],
  preview: {
    select: { title: "english.title_en", subtitle: "slug.current" },
    prepare({ title, subtitle }) {
      return { title, subtitle: `/${subtitle}` };
    },
  },
});
 