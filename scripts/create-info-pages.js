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
    slug: "requirements",
    en: {
      title: "Visa Requirements",
      metaTitle: "Azerbaijan e-Visa Requirements - Documents & Info",
      metaDescription: "Learn what documents and information you need to apply for your Azerbaijan e-Visa online.",
    },
    es: {
      title: "Requisitos de Visa",
      metaTitle: "Requisitos de e-Visa de Azerbaiyán - Documentos e Información",
      metaDescription: "Aprende qué documentos e información necesitas para solicitar tu e-Visa de Azerbaiyán en línea.",
    },
    ar: {
      title: "متطلبات التأشيرة",
      metaTitle: "متطلبات التأشيرة الإلكترونية لأذربيجان - الوثائق والمعلومات",
      metaDescription: "تعرف على الوثائق والمعلومات التي تحتاجها لتقديم طلب التأشيرة الإلكترونية لأذربيجان عبر الإنترنت.",
    },
  },
  {
    slug: "visa-types",
    en: {
      title: "Visa Types",
      metaTitle: "Azerbaijan e-Visa Types - Choose Your Visa Category",
      metaDescription: "Explore different Azerbaijan e-Visa types available for different purposes and durations.",
    },
    es: {
      title: "Tipos de Visa",
      metaTitle: "Tipos de e-Visa de Azerbaiyán - Elige tu Categoría de Visa",
      metaDescription: "Explora los diferentes tipos de e-Visa de Azerbaiyán disponibles para diferentes propósitos y duraciones.",
    },
    ar: {
      title: "أنواع التأشيرة",
      metaTitle: "أنواع التأشيرة الإلكترونية لأذربيجان - اختر فئة التأشيرة الخاصة بك",
      metaDescription: "استكشف أنواع التأشيرة الإلكترونية المختلفة لأذربيجان المتاحة لأغراض ومدد مختلفة.",
    },
  },
  {
    slug: "visa-by-nationality",
    en: {
      title: "Visa by Nationality",
      metaTitle: "Azerbaijan e-Visa by Nationality - Eligibility Check",
      metaDescription: "Check visa eligibility and requirements for citizens of different countries.",
    },
    es: {
      title: "Visa por Nacionalidad",
      metaTitle: "e-Visa de Azerbaiyán por Nacionalidad - Verificación de Elegibilidad",
      metaDescription: "Verifica la elegibilidad de visa y los requisitos para ciudadanos de diferentes países.",
    },
    ar: {
      title: "التأشيرة حسب الجنسية",
      metaTitle: "التأشيرة الإلكترونية لأذربيجان حسب الجنسية - فحص الأهلية",
      metaDescription: "تحقق من أهلية التأشيرة والمتطلبات لمواطني الدول المختلفة.",
    },
  },
  {
    slug: "about",
    en: {
      title: "About Us",
      metaTitle: "About eVisa Azerbaijan - Official Portal Information",
      metaDescription: "Learn about eVisa Azerbaijan, the official and fastest way to apply for your e-Visa online.",
    },
    es: {
      title: "Acerca de Nosotros",
      metaTitle: "Acerca de eVisa Azerbaiyán - Información del Portal Oficial",
      metaDescription: "Aprende sobre eVisa Azerbaiyán, la forma oficial y más rápida de solicitar tu e-Visa en línea.",
    },
    ar: {
      title: "من نحن",
      metaTitle: "حول التأشيرة الإلكترونية لأذربيجان - معلومات البوابة الرسمية",
      metaDescription: "تعرف على التأشيرة الإلكترونية لأذربيجان، الطريقة الرسمية والأسرع لتقديم طلب التأشيرة الإلكترونية عبر الإنترنت.",
    },
  },
];

async function createPages() {
  console.log("Creating info pages in Sanity...");

  for (const page of pages) {
    try {
      const doc = {
        _type: "infoPage",
        slug: {
          _type: "slug",
          current: page.slug,
        },
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
                  text: `${page.en.title} content goes here. Add your content in Sanity studio.`,
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
                  text: `${page.es.title} contenido aquí. Agregue su contenido en Sanity studio.`,
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
                  text: `محتوى ${page.ar.title} يذهب هنا. أضف محتواك في Sanity studio.`,
                  marks: [],
                  _key: "0",
                },
              ],
            },
          ],
        },
      };

      const created = await client.create(doc);
      console.log(`✅ Created: ${page.slug}`);
    } catch (error) {
      console.error(`❌ Error creating ${page.slug}:`, error.message);
    }
  }

  console.log("Done!");
}

createPages();
