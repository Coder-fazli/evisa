import { createClient } from "next-sanity";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

function translateText(text, language) {
  if (!text) return "";

  const translations = {
    es: {
      "Azerbaijan e-Visa": "e-Visa de Azerbaiyán",
      "visa requirements": "requisitos de visa",
      "application process": "proceso de solicitud",
      "documents needed": "documentos necesarios",
      "processing time": "tiempo de procesamiento",
      "visa fee": "tarifa de visa",
      "business days": "días hábiles",
      "Apply for your": "Solicita tu",
      "e-Visa online": "e-Visa en línea",
      Guide: "Guía",
      FAQ: "Preguntas Frecuentes",
      Everything: "Todo",
      "You Need": "que Necesitas",
      "to Know": "Saber",
      Complete: "Guía Completa",
      Things: "Cosas",
      Baku: "Bakú",
    },
    ar: {
      "Azerbaijan e-Visa": "التأشيرة الإلكترونية لأذربيجان",
      "visa requirements": "متطلبات التأشيرة",
      "application process": "عملية التقديم",
      "documents needed": "المستندات المطلوبة",
      "processing time": "وقت المعالجة",
      "visa fee": "رسوم التأشيرة",
      "business days": "أيام عمل",
      "Apply for your": "قدم طلبك",
      "e-Visa online": "التأشيرة الإلكترونية عبر الإنترنت",
      Guide: "دليل",
      FAQ: "الأسئلة الشائعة",
      Everything: "كل شيء",
      "You Need": "تحتاج",
      "to Know": "لتعرفه",
      Complete: "الدليل الكامل",
      Things: "الأشياء",
      Baku: "باكو",
    },
  };

  let translated = text;
  const langTranslations = translations[language] || {};

  for (const [en, trans] of Object.entries(langTranslations)) {
    translated = translated.replace(new RegExp(en, "gi"), trans);
  }

  return translated;
}

function translateBlockContent(blocks, language) {
  if (!Array.isArray(blocks)) return [];

  return blocks.map((block) => {
    if (block._type === "block" && block.children) {
      return {
        ...block,
        children: block.children.map((child) => ({
          ...child,
          text: translateText(child.text, language),
        })),
      };
    }
    return block;
  });
}

async function translateBlogs() {
  try {
    console.log("🌐 Translating blog posts...\n");

    const blogs = await client.fetch(`*[_type == "post"] { _id, english { title_en, category_en, excerpt_en, body_en } }`);

    console.log(`Found ${blogs.length} blog posts to translate\n`);

    for (const blog of blogs) {
      if (!blog.english?.title_en) {
        console.log(`⚠️  Skipping blog without English title`);
        continue;
      }

      const en = blog.english;

      const updates = {
        spanish: {
          title_es: translateText(en.title_en, "es"),
          category_es: translateText(en.category_en, "es"),
          excerpt_es: translateText(en.excerpt_en, "es"),
          body_es: translateBlockContent(en.body_en, "es"),
          metaTitle_es: translateText(en.metaTitle_en || "", "es"),
          metaDescription_es: translateText(en.metaDescription_en || "", "es"),
        },
        arabic: {
          title_ar: translateText(en.title_en, "ar"),
          category_ar: translateText(en.category_en, "ar"),
          excerpt_ar: translateText(en.excerpt_en, "ar"),
          body_ar: translateBlockContent(en.body_en, "ar"),
          metaTitle_ar: translateText(en.metaTitle_en || "", "ar"),
          metaDescription_ar: translateText(en.metaDescription_en || "", "ar"),
        },
      };

      await client.patch(blog._id).set(updates).commit();
      console.log(`✅ Translated: ${en.title_en}`);
    }

    console.log("\n✨ Translation complete!");
    console.log("⚠️  Note: Machine-generated translations. Review and refine in Sanity Studio.");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

translateBlogs();
