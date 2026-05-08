import { MetadataRoute } from "next";

const BASE_URL = "https://evisa.az";
const LOCALES = ["en", "es", "ar"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [""];

  const entries: MetadataRoute.Sitemap = [];

  pages.forEach((page) => {
    LOCALES.forEach((locale) => {
      const url = locale === "en" ? `${BASE_URL}${page}` : `${BASE_URL}/${locale}${page}`;

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 1.0 : 0.8,
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
