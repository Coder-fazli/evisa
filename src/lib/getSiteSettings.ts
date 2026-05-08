import { client } from "@/sanity/client";

export interface SiteSettings {
  logoUrl: string | null;
  faviconUrl: string | null;
  siteName: string;
  metaTitle: string;
  metaDescription: string;
  ogImageUrl: string | null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const data = await client.fetch(
      `*[_type == "siteSettings"][0] {
        "logoUrl": logo.asset->url,
        "faviconUrl": favicon.asset->url,
        "ogImageUrl": ogImage.asset->url,
        siteName,
        metaTitle,
        metaDescription
      }`,
      {},
      { next: { revalidate: 0 } }
    );
    return {
      logoUrl: data?.logoUrl ?? null,
      faviconUrl: data?.faviconUrl ?? null,
      ogImageUrl: data?.ogImageUrl ?? null,
      siteName: data?.siteName ?? "eVisa Azerbaijan",
      metaTitle: data?.metaTitle ?? "eVisa Azerbaijan – Official e-Visa Application Portal",
      metaDescription: data?.metaDescription ?? "Apply for your Azerbaijan e-Visa online. Fast, secure, and trusted by travelers from 100+ countries.",
    };
  } catch {
    return {
      logoUrl: null,
      faviconUrl: null,
      ogImageUrl: null,
      siteName: "eVisa Azerbaijan",
      metaTitle: "eVisa Azerbaijan – Official e-Visa Application Portal",
      metaDescription: "Apply for your Azerbaijan e-Visa online. Fast, secure, and trusted by travelers from 100+ countries.",
    };
  }
}
