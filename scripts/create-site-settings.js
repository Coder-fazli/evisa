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

async function createSiteSettings() {
  try {
    const doc = {
      _id: "siteSettings",
      _type: "siteSettings",
      siteName: "eVisa Azerbaijan",
    };
    await client.createIfNotExists(doc);
    console.log("✅ Site settings created!");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

createSiteSettings();
