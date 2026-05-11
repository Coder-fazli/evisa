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

const slug = "azerbaijan-visa-complete-guide-2026";

const result = await client.fetch(
  `*[slug.current == $slug] {
    _id,
    _type,
    slug,
    coverImage,
    "coverImageUrl": coverImage.asset->url,
    "isDraft": _id in path("drafts.**")
  }`,
  { slug }
);

console.log(JSON.stringify(result, null, 2));
