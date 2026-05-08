import { Navbar } from "./Navbar";
import { getSiteSettings } from "@/lib/getSiteSettings";

export async function NavbarServer() {
  const settings = await getSiteSettings();
  return <Navbar logoUrl={settings.logoUrl} />;
}
