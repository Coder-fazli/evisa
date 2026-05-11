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

  const visaStats = [
    {
      value: "10,450+",
      label: "Visa Approved",
      description: locale === "es" ? "Solicitudes aprobadas este año" : locale === "ar" ? "الطلبات الموافق عليها هذا العام" : "Applications approved this year"
    },
    {
      value: "540+",
      label: "Legal Matters",
      description: locale === "es" ? "Asuntos legales resueltos" : locale === "ar" ? "المسائل القانونية المحلولة" : "Legal matters handled"
    },
    {
      value: "100%",
      label: "Client Satisfaction",
      description: locale === "es" ? "Clientes completamente satisfechos" : locale === "ar" ? "رضا العملاء الكامل" : "Customer satisfaction rate"
    },
    {
      value: "99.99%",
      label: "Success Rate",
      description: locale === "es" ? "Tasa de aprobación de visas" : locale === "ar" ? "معدل الموافقة على التأشيرات" : "Visa approval success"
    },
  ];

  return (
    <>
      <Navbar />
      <InfoPageHero title={page.title} heroImage="/baku-country-hero.jpg" />

      <section className="relative z-30 bg-white -mt-10 md:-mt-16 rounded-t-[40px] md:rounded-t-[80px] px-5 md:px-12 lg:px-20 pt-4 pb-16">
        <div className="max-w-5xl mx-auto -mt-[40px] md:-mt-[80px]">
          <InfoPageStats stats={visaStats} />
        </div>

        <div className="max-w-3xl mx-auto mt-12 md:mt-16">
          {page.body && JSON.stringify(page.body).toLowerCase().indexOf("add your content") === -1 ? (
            <article className="prose prose-sm md:prose-base max-w-none">
              <PortableText
                value={page.body}
                components={{
                  block: {
                    h2: ({ children }) => (
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-3 pl-4 border-l-4 border-orange-600">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold text-gray-900 mt-7 mb-2">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-lg font-bold text-gray-900 mt-6 mb-2">
                        {children}
                      </h4>
                    ),
                    normal: ({ children }) => (
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-orange-600 pl-6 py-4 my-7 italic text-gray-700 bg-orange-50 rounded-r">
                        {children}
                      </blockquote>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-semibold text-gray-900">
                        {children}
                      </strong>
                    ),
                    link: ({ children, value }) => (
                      <a
                        href={value?.href}
                        target={value?.blank ? "_blank" : undefined}
                        rel={value?.blank ? "noopener noreferrer" : undefined}
                        className="text-orange-600 underline hover:text-orange-700"
                      >
                        {children}
                      </a>
                    ),
                    code: ({ children }) => (
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
                        {children}
                      </code>
                    ),
                  },
                }}
              />
            </article>
          ) : (
            <article className="prose prose-sm md:prose-base max-w-none">
              <h2>
                {locale === "es"
                  ? "Información sobre Visas para Azerbaiyán"
                  : locale === "ar"
                  ? "معلومات التأشيرة إلى أذربيجان"
                  : "Azerbaijan e-Visa Information"}
              </h2>
              <p>
                {locale === "es"
                  ? "Obtén tu visa electrónica para Azerbaiyán de forma rápida y segura. Más de 100 países son elegibles para solicitar la e-visa. El proceso es simple y se puede completar en línea en minutos."
                  : locale === "ar"
                  ? "احصل على تأشيرتك الإلكترونية إلى أذربيجان بسرعة وأمان. أكثر من 100 دول مؤهلة للتقدم بطلب للحصول على التأشيرة الإلكترونية. العملية بسيطة ويمكن إكمالها عبر الإنترنت في دقائق."
                  : "Get your Azerbaijan e-Visa quickly and securely. Over 100 countries are eligible to apply for the e-visa. The process is simple and can be completed online in minutes."}
              </p>
              <p>
                {locale === "es"
                  ? "Nuestro servicio ofrece procesos de aprobación rápidos con una tasa de éxito del 99.99%. Con más de 10,450 visas aprobadas este año, somos el servicio de visa más confiable."
                  : locale === "ar"
                  ? "تقدم خدمتنا عمليات موافقة سريعة بمعدل نجاح 99.99%. مع أكثر من 10,450 تأشيرة موافق عليها هذا العام، نحن خدمة التأشيرة الأكثر موثوقية."
                  : "Our service offers fast approval processes with a 99.99% success rate. With over 10,450 visas approved this year, we are the most reliable visa service."}
              </p>
            </article>
          )}
        </div>
      </section>

      {countries.length > 0 && <NationalitySection countries={countries} />}

      {faqs.length > 0 && <FAQSection faqs={faqs} />}

      <section className="py-12 md:py-16 px-5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            {locale === "es"
              ? "Países Elegibles para e-Visa"
              : locale === "ar"
              ? "الدول المؤهلة"
              : "Eligible Countries"}
          </h2>
          <p className="text-center text-gray-600 mb-10 leading-relaxed">
            {locale === "es"
              ? "Más de 100 países son elegibles. Egipto, Arabia Saudita, Paquistán, Malasia, China, Irán y muchos más."
              : locale === "ar"
              ? "أكثر من 100 دول مؤهلة. مصر والمملكة العربية السعودية وباكستان وماليزيا والصين وإيران والمزيد."
              : "Over 100 countries eligible. Egypt, Saudi Arabia, Pakistan, Malaysia, China, Iran and more."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">
                {locale === "es" ? "Países Populares" : locale === "ar" ? "الدول الشهيرة" : "Popular Countries"}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {locale === "es"
                  ? "Egipto, Arabia Saudita, Paquistán, Malasia, China, Irán, UAE, Francia, Alemania, Reino Unido"
                  : locale === "ar"
                  ? "مصر والمملكة العربية السعودية وباكستان وماليزيا والصين وإيران والإمارات"
                  : "Egypt, Saudi Arabia, Pakistan, Malaysia, China, Iran, UAE, France, Germany, UK"}
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">
                {locale === "es" ? "Cómo Verificar" : locale === "ar" ? "كيفية التحقق" : "How to Check"}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {locale === "es"
                  ? "Selecciona tu país arriba. Revisa los requisitos. Solicita tu e-visa."
                  : locale === "ar"
                  ? "حدد دولتك. راجع المتطلبات. تقدم بطلب."
                  : "Select your country. Review requirements. Apply for e-visa."}
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">
                {locale === "es" ? "Proceso Rápido" : locale === "ar" ? "عملية سريعة" : "Fast Process"}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
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
