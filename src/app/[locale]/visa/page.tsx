import { notFound } from "next/navigation";
import { NavbarServer as Navbar } from "@/components/NavbarServer";
import { Footer7Server as Footer7 } from "@/components/ui/footer-7-server";
import { InfoPageHero } from "@/components/infopage/InfoPageHero";
import { InfoPageStats } from "@/components/infopage/InfoPageStats";
import { NationalitySection } from "@/components/NationalitySection";
import { FAQSection } from "@/components/ui/faqs-component";
import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import styles from "../InfoPage.module.css";

async function getPage(locale: string) {
  const langMap: Record<string, { title: string; body: string; metaTitle: string; metaDescription: string }> = {
    en: { title: "english.title_en", body: "english.body_en", metaTitle: "english.metaTitle_en", metaDescription: "english.metaDescription_en" },
    es: { title: "spanish.title_es", body: "spanish.body_es", metaTitle: "spanish.metaTitle_es", metaDescription: "spanish.metaDescription_es" },
    ar: { title: "arabic.title_ar", body: "arabic.body_ar", metaTitle: "arabic.metaTitle_ar", metaDescription: "arabic.metaDescription_ar" },
  };

  const fields = langMap[locale] || langMap.en;

  try {
    const data = await client.fetch(
      `*[_type == "infoPage" && slug.current == "visa-by-nationality"][0] {
        "title": ${fields.title},
        "body": ${fields.body},
        "metaTitle": ${fields.metaTitle},
        "metaDescription": ${fields.metaDescription},
        slug
      }`,
      {},
      { next: { revalidate: 0 } }
    );
    return data ?? null;
  } catch {
    return null;
  }
}

async function getCountries(locale: string) {
  try {
    let query;
    if (locale === "es") {
      query = `*[_type == "country"] | order(name asc) { "name": spanish.name_es, "slug": slug.current, countryCode }`;
    } else if (locale === "ar") {
      query = `*[_type == "country"] | order(name asc) { "name": arabic.name_ar, "slug": slug.current, countryCode }`;
    } else {
      query = `*[_type == "country"] | order(name asc) { "name": english.name_en, "slug": slug.current, countryCode }`;
    }

    return await client.fetch(
      query,
      {},
      { next: { revalidate: 0 } }
    );
  } catch {
    return [];
  }
}

async function getVisaFAQs(locale: string) {
  try {
    let query;
    if (locale === "es") {
      query = `*[_type == "infoPage" && slug.current == "visa-faq"][0] { "faqs": spanish.faqs_es }`;
    } else if (locale === "ar") {
      query = `*[_type == "infoPage" && slug.current == "visa-faq"][0] { "faqs": arabic.faqs_ar }`;
    } else {
      query = `*[_type == "infoPage" && slug.current == "visa-faq"][0] { "faqs": english.faqs_en }`;
    }

    const result = await client.fetch(query, {}, { next: { revalidate: 0 } });
    return result?.faqs ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getPage(locale);
  const baseUrl = "https://evisa-azerbaijan.com";
  const currentUrl = `${baseUrl}/${locale}/visa`;

  return {
    title: page?.metaTitle ?? page?.title ?? "Visa by Nationality",
    description: page?.metaDescription ?? "",
    alternates: {
      languages: {
        en: `${baseUrl}/en/visa`,
        es: `${baseUrl}/es/visa`,
        ar: `${baseUrl}/ar/visa`,
      },
      canonical: currentUrl,
    },
  };
}

export default async function VisaIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getPage(locale);
  const countries = await getCountries(locale);
  const faqs = await getVisaFAQs(locale);

  if (!page) notFound();

  return (
    <>
      <Navbar />
      <InfoPageHero title={page.title} heroImage="/baku-country-hero.jpg" />
      <InfoPageStats />

      <div className={styles.page}>
        <div className={styles.inner}>
          <main>
            {page.body && (
              <article className={styles.body}>
                <PortableText
                  value={page.body}
                  components={{
                    marks: {
                      link: ({ children, value }) => (
                        <a
                          href={value?.href}
                          target={value?.blank ? "_blank" : undefined}
                          rel={value?.blank ? "noopener noreferrer" : undefined}
                          style={{ color: "#E8671A", textDecoration: "underline" }}
                        >
                          {children}
                        </a>
                      ),
                      code: ({ children }) => (
                        <code style={{ background: "#f3f4f6", padding: "2px 6px", borderRadius: "4px", fontSize: "14px", fontFamily: "monospace" }}>
                          {children}
                        </code>
                      ),
                    },
                    block: {
                      blockquote: ({ children }) => (
                        <blockquote className={styles.blockquote}>{children}</blockquote>
                      ),
                      h4: ({ children }) => (
                        <h4 className={styles.h4}>{children}</h4>
                      ),
                    },
                  }}
                />
              </article>
            )}
          </main>
        </div>
      </div>

      {countries.length > 0 && (
        <section style={{ padding: "60px 20px", backgroundColor: "#f9fafb" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px", textAlign: "center", color: "#1a1a2e" }}>
              {locale === "es" ? "Visados por Nacionalidad" : locale === "ar" ? "التأشيرات حسب الجنسية" : "Visas by Nationality"}
            </h2>
            <p style={{ textAlign: "center", color: "#666", marginBottom: "40px", fontSize: "14px" }}>
              {locale === "es" ? "Encuentra los requisitos de visa específicos para tu país" : locale === "ar" ? "ابحث عن متطلبات التأشيرة المحددة لبلدك" : "Find visa requirements specific to your country"}
            </p>
            <NationalitySection countries={countries} />
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section style={{ padding: "60px 20px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "40px", textAlign: "center", color: "#1a1a2e" }}>
              {locale === "es" ? "Preguntas Frecuentes" : locale === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h2>
            <FAQSection faqs={faqs} />
          </div>
        </section>
      )}

      <Footer7 />
    </>
  );
}
