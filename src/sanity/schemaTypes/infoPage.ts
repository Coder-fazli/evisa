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

export default defineType({
  name: "infoPage",
  title: "Info Pages",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "english.title_en" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "english",
      title: "🇬🇧 English (EN)",
      type: "object",
      fields: [
        defineField({
          name: "title_en",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "metaTitle_en",
          title: "Meta Title (SEO)",
          type: "string",
        }),
        defineField({
          name: "metaDescription_en",
          title: "Meta Description (SEO)",
          type: "string",
        }),
        defineField({
          name: "body_en",
          title: "Content",
          type: "array",
          of: [blockContent, { type: "image", options: { hotspot: true } }],
        }),
      ],
    }),
    defineField({
      name: "spanish",
      title: "🇪🇸 Spanish (ES)",
      type: "object",
      fields: [
        defineField({
          name: "title_es",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "metaTitle_es",
          title: "Meta Title (SEO)",
          type: "string",
        }),
        defineField({
          name: "metaDescription_es",
          title: "Meta Description (SEO)",
          type: "string",
        }),
        defineField({
          name: "body_es",
          title: "Content",
          type: "array",
          of: [blockContent, { type: "image", options: { hotspot: true } }],
        }),
      ],
    }),
    defineField({
      name: "arabic",
      title: "🇸🇦 Arabic (AR)",
      type: "object",
      fields: [
        defineField({
          name: "title_ar",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "metaTitle_ar",
          title: "Meta Title (SEO)",
          type: "string",
        }),
        defineField({
          name: "metaDescription_ar",
          title: "Meta Description (SEO)",
          type: "string",
        }),
        defineField({
          name: "body_ar",
          title: "Content",
          type: "array",
          of: [blockContent, { type: "image", options: { hotspot: true } }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "english.title_en",
    },
    prepare(selection) {
      return {
        title: selection.title || "Untitled",
      };
    },
  },
});
