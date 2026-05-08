import { Inter, Manrope, Roboto } from "next/font/google";
import { getSiteSettings } from "@/lib/getSiteSettings";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["700", "800"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return {
    icons: settings.faviconUrl
      ? { icon: settings.faviconUrl }
      : { icon: "/favicon.ico" },
    title: { default: settings.metaTitle, template: `%s | ${settings.siteName}` },
    description: settings.metaDescription,
    openGraph: {
      title: settings.metaTitle,
      description: settings.metaDescription,
      siteName: settings.siteName,
      images: settings.ogImageUrl ? [{ url: settings.ogImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.metaTitle,
      description: settings.metaDescription,
      images: settings.ogImageUrl ? [settings.ogImageUrl] : undefined,
    },
  };
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${roboto.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans bg-white">{children}</body>
    </html>
  );
}
