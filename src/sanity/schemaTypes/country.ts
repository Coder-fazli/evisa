import { defineField, defineType } from "sanity";

const blockContent = {
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "Heading 2", value: "h2" },
    { title: "Heading 3", value: "h3" },
  ],
  marks: {
    decorators: [
      { title: "Bold", value: "strong" },
      { title: "Italic", value: "em" },
    ],
  },
};

const bulletListObject = {
  type: "object",
  name: "bulletList",
  fields: [{ name: "items", type: "array", of: [{ type: "string" }] }],
};

const infoCardObject = {
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "value", title: "Value", type: "string" }),
  ],
  preview: { select: { title: "label", subtitle: "value" } },
};

const faqObject = {
  type: "object",
  fields: [
    defineField({ name: "q", title: "Question", type: "string" }),
    defineField({ name: "a", title: "Answer", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "q" } },
};

const stepObject = {
  type: "object",
  fields: [
    defineField({ name: "title", title: "Step Title", type: "string" }),
    defineField({ name: "desc", title: "Description", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "title" } },
};

export const countryType = defineType({
  name: "country",
  title: "Country Visa Page",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name_en", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "countryCode",
      title: "Country Code (2-letter, e.g. de)",
      type: "string",
      validation: (r) => r.required().max(2),
    }),
    defineField({
      name: "heroImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "applyLink",
      title: "Apply Now URL",
      type: "url",
    }),
    defineField({
      name: "publishedDate",
      title: "Published Date",
      type: "string",
    }),

    // ENGLISH FIELDS
    {
      name: "english",
      title: "🇬🇧 English Content",
      type: "object",
      fields: [
        defineField({
          name: "name_en",
          title: "Country Name",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({
          name: "metaTitle_en",
          title: "Meta Title",
          type: "string",
        }),
        defineField({
          name: "metaDescription_en",
          title: "Meta Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "description_en",
          title: "Hero Subtitle",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "overview_en",
          title: "Quick Overview",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "body_en",
          title: "Article Body",
          type: "array",
          of: [blockContent, bulletListObject],
        }),
        defineField({
          name: "infoCards_en",
          title: "Info Cards",
          type: "array",
          of: [infoCardObject],
        }),
        defineField({
          name: "faqs_en",
          title: "FAQs",
          type: "array",
          of: [faqObject],
        }),
        defineField({
          name: "steps_en",
          title: "How to Apply Steps",
          type: "array",
          of: [stepObject],
        }),
      ],
    },

    // SPANISH FIELDS
    {
      name: "spanish",
      title: "🇪🇸 Spanish Content",
      type: "object",
      fields: [
        defineField({
          name: "name_es",
          title: "Country Name",
          type: "string",
        }),
        defineField({
          name: "metaTitle_es",
          title: "Meta Title",
          type: "string",
        }),
        defineField({
          name: "metaDescription_es",
          title: "Meta Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "description_es",
          title: "Hero Subtitle",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "overview_es",
          title: "Quick Overview",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "body_es",
          title: "Article Body",
          type: "array",
          of: [blockContent, bulletListObject],
        }),
        defineField({
          name: "infoCards_es",
          title: "Info Cards",
          type: "array",
          of: [infoCardObject],
        }),
        defineField({
          name: "faqs_es",
          title: "FAQs",
          type: "array",
          of: [faqObject],
        }),
        defineField({
          name: "steps_es",
          title: "How to Apply Steps",
          type: "array",
          of: [stepObject],
        }),
      ],
    },

    // ARABIC FIELDS
    {
      name: "arabic",
      title: "🇸🇦 Arabic Content",
      type: "object",
      fields: [
        defineField({
          name: "name_ar",
          title: "Country Name",
          type: "string",
        }),
        defineField({
          name: "metaTitle_ar",
          title: "Meta Title",
          type: "string",
        }),
        defineField({
          name: "metaDescription_ar",
          title: "Meta Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "description_ar",
          title: "Hero Subtitle",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "overview_ar",
          title: "Quick Overview",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "body_ar",
          title: "Article Body",
          type: "array",
          of: [blockContent, bulletListObject],
        }),
        defineField({
          name: "infoCards_ar",
          title: "Info Cards",
          type: "array",
          of: [infoCardObject],
        }),
        defineField({
          name: "faqs_ar",
          title: "FAQs",
          type: "array",
          of: [faqObject],
        }),
        defineField({
          name: "steps_ar",
          title: "How to Apply Steps",
          type: "array",
          of: [stepObject],
        }),
      ],
    },
  ],
  preview: {
    select: { title: "english.name_en", subtitle: "slug.current" },
    prepare({ title, subtitle }) {
      return { title, subtitle: `/${subtitle}` };
    },
  },
});

