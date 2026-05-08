import { notFound } from "next/navigation";
import { NavbarServer as Navbar } from "@/components/NavbarServer";
import { Footer7Server as Footer7 } from "@/components/ui/footer-7-server";
import { PostSidebar } from "@/components/blog/PostSidebar";
import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import styles from "./PostPage.module.css";

async function getPost(slug: string) {
  try {
    const data = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        title, publishedAt, excerpt, category,
        "coverImage": coverImage.asset->url,
        body, metaTitle, metaDescription
      }`,
      { slug },
      { next: { revalidate: 0 } }
    );
    return data ?? null;
  } catch {
    return null;
  }
}

async function getRelatedPosts(excludeSlug: string) {
  try {
    return await client.fetch(
      `*[_type == "post" && slug.current != $slug] | order(publishedAt desc) [0...5] {
        title, "slug": slug.current, publishedAt, category,
        "coverImage": coverImage.asset->url
      }`,
      { slug: excludeSlug },
      { next: { revalidate: 0 } }
    );
  } catch {
    return [];
  }
}

async function getCountries() {
  try {
    return await client.fetch(
      `*[_type == "country"] | order(name asc) [0...12] { name, "slug": slug.current, countryCode }`,
      {},
      { next: { revalidate: 0 } }
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const post = await getPost(slug);
  const baseUrl = "https://evisa-azerbaijan.com";
  const currentUrl = `${baseUrl}/${locale}/${slug}`;

  return {
    title: post?.metaTitle ?? post?.title ?? "",
    description: post?.metaDescription ?? post?.excerpt ?? "",
    alternates: {
      languages: {
        en: `${baseUrl}/en/${slug}`,
        es: `${baseUrl}/es/${slug}`,
        ar: `${baseUrl}/ar/${slug}`,
      },
      canonical: currentUrl,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const [post, relatedPosts, countries] = await Promise.all([
    getPost(slug),
    getRelatedPosts(slug),
    getCountries(),
  ]);
  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  const siteUrl = "https://evisa-azerbaijan.com";
  const postUrl = `${siteUrl}/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription ?? post.excerpt ?? "",
    "image": post.coverImage ?? `${siteUrl}/baku-country-hero.jpg`,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "eVisa Azerbaijan",
      "url": siteUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": "eVisa Azerbaijan",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/evisa-logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",  "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Blog",  "item": `${siteUrl}/blog` },
      ...(post.category ? [{ "@type": "ListItem", "position": 3, "name": post.category, "item": `${siteUrl}/blog` }] : []),
      { "@type": "ListItem", "position": post.category ? 4 : 3, "name": post.title, "item": postUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />

      <section className={styles.hero}>
        <picture className={styles.heroBgPicture}>
          <img
            src={post.coverImage ?? "/baku-country-hero.jpg"}
            alt={post.title}
            className={styles.heroBgImage}
            loading="eager"
          />
        </picture>
        <nav className={styles.heroBreadcrumb}>
          <a href="/">Home</a>
          <span className={styles.sep}>/</span>
          <a href="/blog">News</a>
          {post.category && (
            <>
              <span className={styles.sep}>/</span>
              <span>{post.category}</span>
            </>
          )}
          <span className={styles.sep}>/</span>
          <span>{post.title}</span>
        </nav>
        <h1 className={styles.heroTitle}>{post.title}</h1>
      </section>

      <div className={styles.page}>

        <div className={styles.inner}>

          {/* Main article */}
          <main>
            <div className={styles.meta}>
              {post.category && (
                <span className={styles.category}>
                  <span className={styles.dot} />
                  {post.category.toUpperCase()}
                </span>
              )}
              <span className={styles.metaDate}>{date}</span>
              <span className={styles.metaAuthor}>By admin</span>
            </div>

            {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}

            {post.body && (
              <article className={styles.body}>
                <PortableText
                  value={post.body}
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

          <PostSidebar relatedPosts={relatedPosts} countries={countries} />
        </div>
      </div>

      <Footer7 />
    </>
  );
}
