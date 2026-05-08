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

const countryData = [
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "Canada", code: "ca" },
  { name: "Australia", code: "au" },
  { name: "Germany", code: "de" },
  { name: "France", code: "fr" },
  { name: "Spain", code: "es" },
  { name: "Italy", code: "it" },
  { name: "Japan", code: "jp" },
  { name: "China", code: "cn" },
  { name: "India", code: "in" },
  { name: "Brazil", code: "br" },
  { name: "Mexico", code: "mx" },
  { name: "Netherlands", code: "nl" },
  { name: "Belgium", code: "be" },
  { name: "Switzerland", code: "ch" },
  { name: "Sweden", code: "se" },
  { name: "Norway", code: "no" },
  { name: "Denmark", code: "dk" },
  { name: "Finland", code: "fi" },
  { name: "Poland", code: "pl" },
  { name: "Greece", code: "gr" },
  { name: "Portugal", code: "pt" },
  { name: "Ireland", code: "ie" },
  { name: "Austria", code: "at" },
  { name: "Czech Republic", code: "cz" },
  { name: "Hungary", code: "hu" },
  { name: "Romania", code: "ro" },
  { name: "Bulgaria", code: "bg" },
  { name: "Croatia", code: "hr" },
  { name: "Serbia", code: "rs" },
  { name: "Ukraine", code: "ua" },
  { name: "Russia", code: "ru" },
  { name: "South Korea", code: "kr" },
];

async function createCountries() {
  try {
    console.log("🌍 Creating 34 countries with new schema...\n");

    for (const country of countryData) {
      const slug = country.name.toLowerCase().replace(/\s+/g, "-");

      const doc = {
        _type: "country",
        slug: { _type: "slug", current: slug },
        countryCode: country.code,
        heroImage: null,
        applyLink: "",
        publishedDate: new Date().toISOString().split("T")[0],
        english: {
          name_en: country.name,
          metaTitle_en: `Azerbaijan Visa for ${country.name}`,
          metaDescription_en: `Learn about Azerbaijan visa requirements and application process for citizens of ${country.name}.`,
          description_en: `Azerbaijan e-Visa for ${country.name}`,
          overview_en: `Applying for an Azerbaijan visa is simple and can be done online.`,
          body_en: [],
          infoCards_en: [],
          faqs_en: [],
          steps_en: [],
        },
        spanish: {
          name_es: "",
          metaTitle_es: "",
          metaDescription_es: "",
          description_es: "",
          overview_es: "",
          body_es: [],
          infoCards_es: [],
          faqs_es: [],
          steps_es: [],
        },
        arabic: {
          name_ar: "",
          metaTitle_ar: "",
          metaDescription_ar: "",
          description_ar: "",
          overview_ar: "",
          body_ar: [],
          infoCards_ar: [],
          faqs_ar: [],
          steps_ar: [],
        },
      };

      const created = await client.create(doc);
      console.log(`✅ Created: ${country.name}`);
    }

    console.log("\n✨ Created 34 countries!");
    console.log("📝 Next: Run 'node scripts/translate-countries.js' to add Spanish and Arabic translations");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

createCountries();
