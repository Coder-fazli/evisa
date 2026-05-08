import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      description: "Logo displayed in the navbar and footer",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      description: "Browser tab icon (recommended: 32x32 or 64x64 PNG)",
      type: "image",
    }),
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "eVisa Azerbaijan",
    }),
    defineField({
      name: "metaTitle",
      title: "Default Meta Title (SEO)",
      description: "Used as the default page title across the site",
      type: "string",
      initialValue: "eVisa Azerbaijan – Official e-Visa Application Portal",
    }),
    defineField({
      name: "metaDescription",
      title: "Default Meta Description (SEO)",
      description: "Used as the default meta description across the site",
      type: "text",
      rows: 3,
      initialValue: "Apply for your Azerbaijan e-Visa online. Fast, secure, and trusted by travelers from 100+ countries.",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image (Social Sharing)",
      description: "Image shown when site is shared on social media (1200x630 recommended)",
      type: "image",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
