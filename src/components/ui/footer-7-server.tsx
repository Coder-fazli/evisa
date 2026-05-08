import { Footer7 } from "./footer-7";
import { getSiteSettings } from "@/lib/getSiteSettings";

export async function Footer7Server() {
  const settings = await getSiteSettings();
  return <Footer7 logoUrl={settings.logoUrl} />;
}
