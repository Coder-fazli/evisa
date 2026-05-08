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

async function migrateBlogPosts() {
  try {
    console.log("📝 Migrating blog posts to new schema...\n");

    // Get all old-format blog posts
    const oldPosts = await client.fetch(`*[_type == "post"] { _id, title, category, excerpt, body, metaTitle, metaDescription, publishedAt, slug, coverImage }`);

    console.log(`Found ${oldPosts.length} blog posts to migrate\n`);

    for (const post of oldPosts) {
      const updates = {
        english: {
          title_en: post.title || "Untitled",
          category_en: post.category || "",
          excerpt_en: post.excerpt || "",
          body_en: post.body || [],
          metaTitle_en: post.metaTitle || "",
          metaDescription_en: post.metaDescription || "",
        },
        spanish: {
          title_es: "",
          category_es: "",
          excerpt_es: "",
          body_es: [],
          metaTitle_es: "",
          metaDescription_es: "",
        },
        arabic: {
          title_ar: "",
          category_ar: "",
          excerpt_ar: "",
          body_ar: [],
          metaTitle_ar: "",
          metaDescription_ar: "",
        },
      };

      await client.patch(post._id).set(updates).commit();
      console.log(`✅ Migrated: ${post.title || "Untitled"}`);
    }

    console.log("\n✨ Migration complete!");
    console.log("📝 Next: Run 'node scripts/translate-blogs.js' to add Spanish and Arabic translations");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

migrateBlogPosts();
