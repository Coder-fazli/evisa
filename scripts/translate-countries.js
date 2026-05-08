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

// Country name translations
const countryTranslations = {
  "United States": { es: "Estados Unidos", ar: "الولايات المتحدة" },
  "United Kingdom": { es: "Reino Unido", ar: "المملكة المتحدة" },
  Canada: { es: "Canadá", ar: "كندا" },
  Australia: { es: "Australia", ar: "أستراليا" },
  Germany: { es: "Alemania", ar: "ألمانيا" },
  France: { es: "Francia", ar: "فرنسا" },
  Spain: { es: "España", ar: "إسبانيا" },
  Italy: { es: "Italia", ar: "إيطاليا" },
  Japan: { es: "Japón", ar: "اليابان" },
  China: { es: "China", ar: "الصين" },
  India: { es: "India", ar: "الهند" },
  Brazil: { es: "Brasil", ar: "البرازيل" },
  Mexico: { es: "México", ar: "المكسيك" },
  Netherlands: { es: "Países Bajos", ar: "هولندا" },
  Belgium: { es: "Bélgica", ar: "بلجيكا" },
  Switzerland: { es: "Suiza", ar: "سويسرا" },
  Sweden: { es: "Suecia", ar: "السويد" },
  Norway: { es: "Noruega", ar: "النرويج" },
  Denmark: { es: "Dinamarca", ar: "الدنمارك" },
  Finland: { es: "Finlandia", ar: "فنلندا" },
  Poland: { es: "Polonia", ar: "بولندا" },
  Greece: { es: "Grecia", ar: "اليونان" },
  Portugal: { es: "Portugal", ar: "البرتغال" },
  Ireland: { es: "Irlanda", ar: "أيرلندا" },
  Austria: { es: "Austria", ar: "النمسا" },
  "Czech Republic": { es: "República Checa", ar: "جمهورية التشيك" },
  Hungary: { es: "Hungría", ar: "المجر" },
  Romania: { es: "Rumania", ar: "رومانيا" },
  Bulgaria: { es: "Bulgaria", ar: "بلغاريا" },
  Croatia: { es: "Croacia", ar: "كرواتيا" },
  Serbia: { es: "Serbia", ar: "صربيا" },
  Ukraine: { es: "Ucrania", ar: "أوكرانيا" },
  Russia: { es: "Rusia", ar: "روسيا" },
  Turkey: { es: "Turquía", ar: "تركيا" },
  "South Korea": { es: "Corea del Sur", ar: "كوريا الجنوبية" },
};

function translateText(text, language) {
  if (!text) return "";

  // Simple template-based translation
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
    },
  };

  let translated = text;
  const langTranslations = translations[language] || {};

  for (const [en, trans] of Object.entries(langTranslations)) {
    translated = translated.replace(new RegExp(en, "gi"), trans);
  }

  // If no specific translation found, return as is (will need manual review)
  return translated;
}

async function translateCountries() {
  try {
    console.log("🌐 Translating countries...\n");

    // Get all countries with their English content
    const countries = await client.fetch(`*[_type == "country"]{ _id, english { name_en, description_en, overview_en, metaTitle_en, metaDescription_en, infoCards_en, faqs_en, steps_en } }`);

    console.log(`Found ${countries.length} countries to translate\n`);

    for (const country of countries) {
      const countryName = country.english?.name_en;
      if (!countryName) {
        console.log(`⚠️  Skipping country without English name`);
        continue;
      }

      const translation = countryTranslations[countryName] || {};
      const en = country.english;

      const updates = {
        spanish: {
          name_es: translation.es || countryName,
          description_es: en?.description_en ? `${translation.es || countryName} - ${translateText(en.description_en, "es")}` : "",
          overview_es: en?.overview_en ? translateText(en.overview_en, "es") : "",
          metaTitle_es: en?.metaTitle_en ? translateText(en.metaTitle_en, "es") : "",
          metaDescription_es: en?.metaDescription_en ? translateText(en.metaDescription_en, "es") : "",
          infoCards_es: en?.infoCards_en || [],
          faqs_es: (en?.faqs_en || []).map(faq => ({
            q: translateText(faq.q, "es"),
            a: translateText(faq.a, "es"),
          })),
          steps_es: (en?.steps_en || []).map(step => ({
            title: translateText(step.title, "es"),
            desc: translateText(step.desc, "es"),
          })),
        },
        arabic: {
          name_ar: translation.ar || countryName,
          description_ar: en?.description_en ? `${translation.ar || countryName} - ${translateText(en.description_en, "ar")}` : "",
          overview_ar: en?.overview_en ? translateText(en.overview_en, "ar") : "",
          metaTitle_ar: en?.metaTitle_en ? translateText(en.metaTitle_en, "ar") : "",
          metaDescription_ar: en?.metaDescription_en ? translateText(en.metaDescription_en, "ar") : "",
          infoCards_ar: en?.infoCards_en || [],
          faqs_ar: (en?.faqs_en || []).map(faq => ({
            q: translateText(faq.q, "ar"),
            a: translateText(faq.a, "ar"),
          })),
          steps_ar: (en?.steps_en || []).map(step => ({
            title: translateText(step.title, "ar"),
            desc: translateText(step.desc, "ar"),
          })),
        },
      };

      await client.patch(country._id).set(updates).commit();
      console.log(`✅ Translated: ${countryName}`);
    }

    console.log("\n✨ Translation complete!");
    console.log("⚠️  Note: Machine-generated translations. Review and refine in Sanity Studio.");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

translateCountries();
