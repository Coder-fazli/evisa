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

async function checkContent() {
  try {
    console.log("🔍 Checking Sanity content...\n");

    // Check homePages
    const homePages = await client.fetch(`*[_type == "homePage"]{ language, _id }`);
    console.log(`📄 Home Pages: ${homePages.length}`);
    homePages.forEach((hp) => console.log(`   - ${hp.language}`));

    // Check countries
    const countries = await client.fetch(`*[_type == "country"]{ language, name, _id }`);
    console.log(`\n🌍 Countries: ${countries.length}`);

    // Count by language
    const byLanguage = {
      en: countries.filter((c) => c.language === "en").length,
      es: countries.filter((c) => c.language === "es").length,
      ar: countries.filter((c) => c.language === "ar").length,
    };
    console.log(`   English: ${byLanguage.en}`);
    console.log(`   Spanish: ${byLanguage.es}`);
    console.log(`   Arabic: ${byLanguage.ar}`);

    // Check posts
    const posts = await client.fetch(`*[_type == "post"]{ _id }`);
    console.log(`\n📰 Blog Posts: ${posts.length}`);

    console.log("\n✅ Check complete!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

checkContent();
