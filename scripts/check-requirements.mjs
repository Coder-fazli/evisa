import { createClient } from "next-sanity";
import { config } from "dotenv";
config({ path: ".env.local" });
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
const r = await client.fetch('*[_type == "infoPage" && slug.current == "requirements"][0]{ _id, slug, "title": english.title_en, "bodyLen": length(english.body_en), "metaTitle": english.metaTitle_en }');
console.log(JSON.stringify(r, null, 2));
