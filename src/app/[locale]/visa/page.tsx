import { notFound } from "next/navigation";
import { NavbarServer as Navbar } from "@/components/NavbarServer";
import { Footer7Server as Footer7 } from "@/components/ui/footer-7-server";
import { InfoPageHero } from "@/components/infopage/InfoPageHero";
import { InfoPageStats } from "@/components/infopage/InfoPageStats";
import { NationalitySection } from "@/components/NationalitySection";
import { FAQSection } from "@/components/ui/faqs-component";
import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";

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
  const baseUrl = "https://azerbaijan-evisa.com";
  const currentUrl = `${baseUrl}/${locale}/visa`;

  const metadataByLocale: Record<string, { title: string; description: string }> = {
    es: {
      title: "Países Elegibles para e-Visa de Azerbaiyán | Lista Completa 2026",
      description: "Descubre qué países son elegibles para la e-visa de Azerbaiyán. Verifica si tu país está en la lista. Egipto, Arabia Saudita, Paquistán y más. Requisistos ASAN visa.",
    },
    ar: {
      title: "الدول المؤهلة للتأشيرة الإلكترونية لأذربيجان | قائمة كاملة",
      description: "اكتشف الدول المؤهلة للحصول على التأشيرة الإلكترونية لأذربيجان. مصر وأراضي المملكة العربية السعودية وباكستان والمزيد. متطلبات تأشيرة ASAN.",
    },
  };

  const meta = metadataByLocale[locale] || {
    title: "Azerbaijan e-Visa Eligible Countries - Complete List 2026",
    description: "Check which countries are eligible for Azerbaijan e-visa. Egypt, Saudi Arabia, Pakistan, Malaysia, China and 100+ countries. ASAN visa eligibility list.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      languages: {
        en: `${baseUrl}/en/visa`,
        es: `${baseUrl}/es/visa`,
        ar: `${baseUrl}/ar/visa`,
      },
      canonical: currentUrl,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: currentUrl,
      type: "website",
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

      {page.body && (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>
          <article style={{ fontSize: "17px", color: "#4b5563", lineHeight: "1.85" }}>
            <PortableText
              value={page.body}
              components={{
                block: {
                  h2: ({ children }) => (
                    <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1a1a2e", margin: "40px 0 14px", paddingLeft: "14px", borderLeft: "3px solid #E8671A", lineHeight: "1.3" }}>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#1a1a2e", margin: "28px 0 10px" }}>
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a2e", margin: "24px 0 8px" }}>
                      {children}
                    </h4>
                  ),
                  normal: ({ children }) => (
                    <p style={{ fontSize: "17px", color: "#4b5563", lineHeight: "1.85", marginBottom: "18px" }}>
                      {children}
                    </p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote style={{ borderLeft: "4px solid #E8671A", margin: "28px 0", padding: "16px 24px", background: "#fff8f4", borderRadius: "0 12px 12px 0", fontSize: "17px", color: "#4b5563", fontStyle: "italic", lineHeight: "1.8" }}>
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong style={{ color: "#1a1a2e", fontWeight: "600" }}>
                      {children}
                    </strong>
                  ),
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
              }}
            />
          </article>
        </div>
      )}

      {countries.length > 0 && <NationalitySection countries={countries} />}

      {faqs.length > 0 && (
        <section style={{ padding: "60px 20px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "40px", textAlign: "center", color: "#1a1a2e" }}>
              {locale === "es" ? "Preguntas Frecuentes" : locale === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h2>
            <FAQSection faqs={faqs} />
          </div>
        </section>
      )}

      <section style={{ padding: "60px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px", textAlign: "center", color: "#1a1a2e" }}>
            {locale === "es"
              ? "Países Elegibles para e-Visa"
              : locale === "ar"
              ? "الدول المؤهلة"
              : "Eligible Countries"}
          </h2>
          <p style={{ fontSize: "15px", color: "#666", textAlign: "center", marginBottom: "30px", lineHeight: "1.6" }}>
            {locale === "es"
              ? "Más de 100 países son elegibles. Egipto, Arabia Saudita, Paquistán, Malasia, China, Irán y muchos más."
              : locale === "ar"
              ? "أكثر من 100 دول مؤهلة. مصر والمملكة العربية السعودية وباكستان وماليزيا والصين وإيران والمزيد."
              : "Over 100 countries eligible. Egypt, Saudi Arabia, Pakistan, Malaysia, China, Iran and more."}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
            <div style={{ padding: "20px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#1a1a2e", marginBottom: "8px" }}>
                {locale === "es" ? "Países Populares" : locale === "ar" ? "الدول الشهيرة" : "Popular Countries"}
              </h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>
                {locale === "es"
                  ? "Egipto, Arabia Saudita, Paquistán, Malasia, China, Irán, UAE, Francia, Alemania, Reino Unido"
                  : locale === "ar"
                  ? "مصر والمملكة العربية السعودية وباكستان وماليزيا والصين وإيران والإمارات"
                  : "Egypt, Saudi Arabia, Pakistan, Malaysia, China, Iran, UAE, France, Germany, UK"}
              </p>
            </div>

            <div style={{ padding: "20px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#1a1a2e", marginBottom: "8px" }}>
                {locale === "es" ? "Cómo Verificar" : locale === "ar" ? "كيفية التحقق" : "How to Check"}
              </h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>
                {locale === "es"
                  ? "Selecciona tu país arriba. Revisa los requisitos. Solicita tu e-visa."
                  : locale === "ar"
                  ? "حدد دولتك. راجع المتطلبات. تقدم بطلب."
                  : "Select your country. Review requirements. Apply for e-visa."}
              </p>
            </div>

            <div style={{ padding: "20px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#1a1a2e", marginBottom: "8px" }}>
                {locale === "es" ? "Proceso Rápido" : locale === "ar" ? "عملية سريعة" : "Fast Process"}
              </h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>
                {locale === "es"
                  ? "5 minutos para aplicar. 3 horas aprobación. Sin visita a embajada."
                  : locale === "ar"
                  ? "5 دقائق للتقديم. 3 ساعات موافقة. بدون زيارة سفارة."
                  : "5 min to apply. 3 hrs approval. No embassy visit."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer7 />
    </>
  );
}
