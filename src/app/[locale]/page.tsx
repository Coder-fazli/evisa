 import { NavbarServer as Navbar } from "@/components/NavbarServer";      
  import { Hero } from "@/components/Hero";          
  import { StepsSection } from                       
  "@/components/StepsSection";                       
  import { WorldMapSection } from                  
  "@/components/WorldMapSection";
  import { NationalitySection } from
  "@/components/NationalitySection";                 
  import { BlogsSection } from
  "@/components/ui/blogs";                           
  import { FAQSection } from                       
  "@/components/ui/faqs-component";
  import { Footer7Server as Footer7 } from "@/components/ui/footer-7-server";
  import { client } from "@/sanity/client";          
  
  // Getting countries list from Sanity
  async function getCountries(locale: string) {
    try {
      let query;
      if (locale === "es") {
        query = `*[_type == "country"] { "name": spanish.name_es, "slug": slug.current, countryCode }`;
      } else if (locale === "ar") {
        query = `*[_type == "country"] { "name": arabic.name_ar, "slug": slug.current, countryCode }`;
      } else {
        query = `*[_type == "country"] { "name": english.name_en, "slug": slug.current, countryCode }`;
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

  // Getting home page content from Sanity
  async function getHomePage(locale: string) {
    try {
      return await client.fetch(
        `*[_type == "homePage" && language == $locale][0]
        { heroTitle,
         heroPrimaryButton,
         heroSecondaryButton,
         processingOptions,
         steps,
         faqs
        }`,
        { locale },
        { next: { revalidate: 0 } }
      );
    } catch (error) {
      return null;
    }
  }

  // Getting blog posts from Sanity
  async function getBlogs(locale: string) {
    try {
      let query;
      if (locale === "es") {
        query = `*[_type == "post"] | order(publishedAt desc)[0..4]{
          "title": spanish.title_es,
          "category": spanish.category_es,
          "description": spanish.excerpt_es,
          "image": coverImage.asset->url,
          "publishDate": publishedAt,
          "readMoreLink": "/blog/" + slug.current
        }`;
      } else if (locale === "ar") {
        query = `*[_type == "post"] | order(publishedAt desc)[0..4]{
          "title": arabic.title_ar,
          "category": arabic.category_ar,
          "description": arabic.excerpt_ar,
          "image": coverImage.asset->url,
          "publishDate": publishedAt,
          "readMoreLink": "/blog/" + slug.current
        }`;
      } else {
        query = `*[_type == "post"] | order(publishedAt desc)[0..4]{
          "title": english.title_en,
          "category": english.category_en,
          "description": english.excerpt_en,
          "image": coverImage.asset->url,
          "publishDate": publishedAt,
          "readMoreLink": "/blog/" + slug.current
        }`;
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

  export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const metadataByLocale: Record<string, { title: string; description: string }> = {
      es: {
        title: "Solicitud de eVisa de Azerbaiyán - Portal Oficial",
        description: "Solicita tu eVisa de Azerbaiyán en línea. Rápido, seguro y 100% oficial. Procesamiento en 3 días hábiles.",
      },
      ar: {
        title: "تأشيرة أذربيجان الإلكترونية - البوابة الرسمية",
        description: "قدم طلبك للحصول على تأشيرة أذربيجان الإلكترونية عبر الإنترنت. سريع وآمن و100٪ رسمي.",
      },
    };

    const meta = metadataByLocale[locale] || {
      title: "Azerbaijan e-Visa – Official Application Portal",
      description: "Apply for your Azerbaijan e-Visa online. Fast, secure, and 100% official. Processing in 3 business days.",
    };

    return {
      title: meta.title,
      description: meta.description,
      alternates: {
        languages: {
          en: "https://evisa-azerbaijan.com/en",
          es: "https://evisa-azerbaijan.com/es",
          ar: "https://evisa-azerbaijan.com/ar",
        },
        canonical: `https://evisa-azerbaijan.com/${locale}`,
      },
    };
  }

  export default async function Home({ params,
  }: {
   params: Promise<{ locale: string }>;
  }) {
  const { locale } = await params;
  const countries = await getCountries(locale);
  const homePage = await getHomePage(locale);
  const blogs = await getBlogs(locale);

    return (
      <>
        <Navbar />
        <main>
        <Hero
       title={homePage?.heroTitle}
       primaryButton={homePage?.heroPrimaryButton}
       secondaryButton={homePage?.heroSecondaryButton}
       processingOptions={homePage?.processingOptions}
       />
        <StepsSection steps={homePage?.steps} />
        <WorldMapSection />
        <NationalitySection countries={countries} />
        <BlogsSection blogs={blogs} />
        <FAQSection faqs={homePage?.faqs || []} />
      </main>
      <Footer7 />
      </>
    );
  }
