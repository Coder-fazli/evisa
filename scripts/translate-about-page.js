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

async function translateAboutPage() {
  try {
    // Fetch the About page
    const aboutPage = await client.fetch(
      `*[_type == "infoPage" && slug.current == "about"][0]`
    );

    if (!aboutPage) {
      console.log("❌ About page not found");
      return;
    }

    console.log("📄 Fetched About page...");
    console.log("English title:", aboutPage.english?.title_en);

    // Update with Spanish translations (manual for now, you can add auto-translation)
    const spanishContent = {
      title_es: "Acerca de Nosotros",
      metaTitle_es: aboutPage.english?.metaTitle_en?.replace(/eVisa Azerbaijan|About/g, (match) => {
        const translations = {
          "eVisa Azerbaijan": "eVisa Azerbaiyán",
          "About": "Acerca de"
        };
        return translations[match] || match;
      }) || "Acerca de nosotros - eVisa Azerbaiyán",
      metaDescription_es: aboutPage.english?.metaDescription_en?.replace(/eVisa Azerbaijan/g, "eVisa Azerbaiyán") || "",
      body_es: translateBody(aboutPage.english?.body_en || []),
    };

    const arabicContent = {
      title_ar: "من نحن",
      metaTitle_ar: aboutPage.english?.metaTitle_en?.replace(/eVisa Azerbaijan|About/g, (match) => {
        const translations = {
          "eVisa Azerbaijan": "التأشيرة الإلكترونية لأذربيجان",
          "About": "حول"
        };
        return translations[match] || match;
      }) || "حول - التأشيرة الإلكترونية لأذربيجان",
      metaDescription_ar: aboutPage.english?.metaDescription_en?.replace(/eVisa Azerbaijan/g, "التأشيرة الإلكترونية لأذربيجان") || "",
      body_ar: translateBody(aboutPage.english?.body_en || []),
    };

    // Update the document with Spanish and Arabic content
    const updatedDoc = {
      ...aboutPage,
      spanish: spanishContent,
      arabic: arabicContent,
    };

    await client.createOrReplace(updatedDoc);

    console.log("✅ About page translated and published!");
    console.log("📌 Spanish version: Updated");
    console.log("📌 Arabic version: Updated");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

function translateBody(blocks) {
  // Simple placeholder - returns the same blocks
  // In production, you'd use a translation API like Google Translate
  return blocks;
}

translateAboutPage();
