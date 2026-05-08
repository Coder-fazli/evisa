import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
});

const pages = [
  {
    slug: "privacy",
    en: {
      title: "Privacy Policy",
      metaTitle: "Privacy Policy - eVisa Azerbaijan",
      metaDescription: "Learn how eVisa Azerbaijan collects, uses, and protects your personal information when you apply for an Azerbaijan e-Visa.",
    },
    es: {
      title: "Política de Privacidad",
      metaTitle: "Política de Privacidad - eVisa Azerbaiyán",
      metaDescription: "Conoce cómo eVisa Azerbaiyán recopila, utiliza y protege tu información personal cuando solicitas una e-Visa de Azerbaiyán.",
    },
    ar: {
      title: "سياسة الخصوصية",
      metaTitle: "سياسة الخصوصية - التأشيرة الإلكترونية لأذربيجان",
      metaDescription: "تعرف على كيفية جمع التأشيرة الإلكترونية لأذربيجان لمعلوماتك الشخصية واستخدامها وحمايتها عند تقديم طلب التأشيرة.",
    },
  },
  {
    slug: "terms",
    en: {
      title: "Terms & Conditions",
      metaTitle: "Terms & Conditions - eVisa Azerbaijan",
      metaDescription: "Read the terms and conditions for using eVisa Azerbaijan services and applying for your Azerbaijan e-Visa online.",
    },
    es: {
      title: "Términos y Condiciones",
      metaTitle: "Términos y Condiciones - eVisa Azerbaiyán",
      metaDescription: "Lee los términos y condiciones para usar los servicios de eVisa Azerbaiyán y solicitar tu e-Visa de Azerbaiyán en línea.",
    },
    ar: {
      title: "الشروط والأحكام",
      metaTitle: "الشروط والأحكام - التأشيرة الإلكترونية لأذربيجان",
      metaDescription: "اقرأ الشروط والأحكام لاستخدام خدمات التأشيرة الإلكترونية لأذربيجان وتقديم طلب التأشيرة الإلكترونية عبر الإنترنت.",
    },
  },
];

async function createPages() {
  console.log("Creating legal pages in Sanity...");

  for (const page of pages) {
    try {
      const doc = {
        _type: "infoPage",
        slug: { _type: "slug", current: page.slug },
        english: {
          title_en: page.en.title,
          metaTitle_en: page.en.metaTitle,
          metaDescription_en: page.en.metaDescription,
          body_en: [
            {
              _type: "block",
              style: "normal",
              _key: "intro",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  text: `${page.en.title} content goes here. Add your content in Sanity Studio.`,
                  marks: [],
                  _key: "0",
                },
              ],
            },
          ],
        },
        spanish: {
          title_es: page.es.title,
          metaTitle_es: page.es.metaTitle,
          metaDescription_es: page.es.metaDescription,
          body_es: [
            {
              _type: "block",
              style: "normal",
              _key: "intro",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  text: `${page.es.title} contenido aquí. Agregue su contenido en Sanity Studio.`,
                  marks: [],
                  _key: "0",
                },
              ],
            },
          ],
        },
        arabic: {
          title_ar: page.ar.title,
          metaTitle_ar: page.ar.metaTitle,
          metaDescription_ar: page.ar.metaDescription,
          body_ar: [
            {
              _type: "block",
              style: "normal",
              _key: "intro",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  text: `محتوى ${page.ar.title} يذهب هنا. أضف محتواك في Sanity Studio.`,
                  marks: [],
                  _key: "0",
                },
              ],
            },
          ],
        },
      };

      await client.create(doc);
      console.log(`✅ Created: ${page.slug}`);
    } catch (error) {
      console.error(`❌ Error creating ${page.slug}:`, error.message);
    }
  }

  console.log("Done!");
}

createPages();
