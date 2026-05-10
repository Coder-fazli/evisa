import { MetadataRoute } from "next";
import { client } from "@/sanity/client";

const BASE_URL = "https://azerbaijan-evisa.com";
const LOCALES = ["en", "es", "ar"];

async function getCountrySlugs() {
  try {
    const countries = await client.fetch(`*[_type == "country"] { "slug": slug.current }`);
    return countries.map((c: any) => `/visa/${c.slug}`);
  } catch {
    return [];
  }
}

async function getBlogSlugs() {
  try {
    const posts = await client.fetch(`*[_type == "post" && !(_id in path("drafts.**"))] { "slug": slug.current }`);
    return posts.map((p: any) => `/${p.slug}`);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const countrySlugs = await getCountrySlugs();
  const blogSlugs = await getBlogSlugs();

  const staticPages = [
    "",
    "/visa",
    "/blog",
    "/about",
    "/contact",
    "/requirements",
    "/visa-types",
    "/faq",
    "/privacy",
    "/terms",
    "/cookies",
    "/refund-policy",
  ];

  const allPages = [...staticPages, ...countrySlugs, ...blogSlugs];

  const entries: MetadataRoute.Sitemap = [];

  allPages.forEach((page) => {
    LOCALES.forEach((locale) => {
      const url = locale === "en" ? `${BASE_URL}${page}` : `${BASE_URL}/${locale}${page}`;

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : page.startsWith("/visa/") ? "monthly" : "weekly",
        priority: page === "" ? 1.0 : page === "/visa" || page === "/blog" ? 0.9 : page.startsWith("/visa/") ? 0.7 : 0.8,
        alternates: {
          languages: {
            en: `${BASE_URL}${page}`,
            es: `${BASE_URL}/es${page}`,
            ar: `${BASE_URL}/ar${page}`,
          },
        },
      });
    });
  });

  return entries;
}
