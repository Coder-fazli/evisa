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

async function cleanup() {
  try {
    console.log("🧹 Cleaning up countries...\n");

    // Get all ES and AR countries
    const esCountries = await client.fetch(`*[_type == "country" && language == "es"]{ _id }`);
    const arCountries = await client.fetch(`*[_type == "country" && language == "ar"]{ _id }`);

    console.log(`Found ${esCountries.length} Spanish countries to delete`);
    console.log(`Found ${arCountries.length} Arabic countries to delete\n`);

    // Delete all ES countries
    for (const country of esCountries) {
      await client.delete(country._id);
    }
    console.log(`✅ Deleted ${esCountries.length} Spanish countries`);

    // Delete all AR countries
    for (const country of arCountries) {
      await client.delete(country._id);
    }
    console.log(`✅ Deleted ${arCountries.length} Arabic countries`);

    console.log("\n✨ Cleanup complete!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

cleanup();
