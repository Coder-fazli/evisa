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

// Fetch the draft
const draft = await client.fetch(
  `*[_id == "drafts." + $publishedId][0]`,
  { publishedId: "DbQ0BSvW3j9yRfxfFpEps0" }
);

if (!draft) {
  console.log("No draft found");
  process.exit(0);
}

console.log("Found draft with coverImage:", !!draft.coverImage);

// Publish: copy draft to published, then delete draft
const { _id, _rev, ...rest } = draft;
const publishedId = _id.replace("drafts.", "");

// Replace published with draft content
await client.createOrReplace({
  ...rest,
  _id: publishedId,
});

// Delete the draft
await client.delete(_id);

console.log("Draft published. Cover image should now be live.");
