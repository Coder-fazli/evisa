# Detailed Explanation of SEO & Language-Specific Metadata Fixes

## Overview

This document explains all the fixes made to ensure proper server/client component architecture and SEO implementation for multilingual (English/Spanish/Arabic) content delivery.

---

## Problem Summary

The original implementation had critical issues:

1. **Country pages showed only English content** regardless of language
2. **Homepage & blog list had no language-specific metadata** for SEO
3. **Missing hreflang tags** on most pages
4. **Language metadata not locale-aware** in layout files

---

## Detailed Fixes Explained

### Fix 1: Country Page - Language-Specific Data (CRITICAL)

**Location:** `/src/app/[locale]/visa/[country]/page.tsx`

#### The Problem

The country schema in Sanity is structured with nested language objects:

```typescript
// Schema structure
{
  name: "country",
  fields: [
    { name: "slug", type: "slug" },
    { name: "countryCode", type: "string" },
    // Global fields (same for all languages)
    { name: "heroImage", type: "image" },
    { name: "applyLink", type: "url" },
    
    // Language-specific objects
    {
      name: "english",
      fields: [
        { name: "name_en", type: "string" },
        { name: "metaTitle_en", type: "string" },
        { name: "metaDescription_en", type: "text" },
        { name: "description_en", type: "text" },
        { name: "overview_en", type: "text" },
        { name: "body_en", type: "array" },
        { name: "infoCards_en", type: "array" },
        { name: "faqs_en", type: "array" },
        { name: "steps_en", type: "array" },
      ]
    },
    {
      name: "spanish",
      fields: [
        { name: "name_es", type: "string" },
        { name: "metaTitle_es", type: "string" },
        // ... same structure for Spanish
      ]
    },
    {
      name: "arabic",
      fields: [
        { name: "name_ar", type: "string" },
        { name: "metaTitle_ar", type: "string" },
        // ... same structure for Arabic
      ]
    },
  ]
}
```

**Original Code (BROKEN):**
```typescript
async function getCountryData(slug: string) {
  const data = await client.fetch(
    `*[_type == "country" && slug.current == $slug][0]`,
    { slug: slug.toLowerCase() },
    { next: { revalidate: 0 } }
  );
  return data ?? null;
}
```

This fetched the entire document including all nested language objects. Then the component tried to access:
```typescript
const name = sanityData?.name  // ❌ DOESN'T EXIST - it's in english.name_en!
const metaTitle = sanityData?.metaTitle  // ❌ DOESN'T EXIST
```

**Result:** Spanish/Arabic users saw undefined values, fell back to English defaults.

#### The Solution

**Step 1: Create a language field mapper**

```typescript
function getLanguageFields(locale: string) {
  const fieldMap = {
    es: {
      name: "spanish.name_es",
      metaTitle: "spanish.metaTitle_es",
      metaDescription: "spanish.metaDescription_es",
      // ... more fields
    },
    ar: {
      name: "arabic.name_ar",
      metaTitle: "arabic.metaTitle_ar",
      metaDescription: "arabic.metaDescription_ar",
      // ... more fields
    },
  };
  return fieldMap[locale] || fieldMap.en; // Default to English
}
```

**Step 2: Use dynamic GROQ queries**

```typescript
async function getCountryData(slug: string, locale: string) {
  const fields = getLanguageFields(locale);
  
  const data = await client.fetch(
    `*[_type == "country" && slug.current == $slug][0] {
      countryCode,
      heroImage,
      applyLink,
      publishedDate,
      "name": ${fields.name},                    // Dynamically selects correct field
      "metaTitle": ${fields.metaTitle},
      "metaDescription": ${fields.metaDescription},
      "description": ${fields.description},
      "overview": ${fields.overview},
      "body": ${fields.body},
      "infoCards": ${fields.infoCards},
      "faqs": ${fields.faqs},
      "steps": ${fields.steps}
    }`,
    { slug: slug.toLowerCase() },
    { next: { revalidate: 0 } }
  );
  return data ?? null;
}
```

**Why This Works:**
- The GROQ query uses JavaScript template strings: `"name": ${fields.name}`
- When locale="es", this becomes: `"name": spanish.name_es`
- When locale="ar", this becomes: `"name": arabic.name_ar`
- The returned object has a root-level `name` field with the correct language content

**Step 3: Update page component to pass locale**

```typescript
export default async function CountryPage({ 
  params 
}: { 
  params: Promise<{ locale: string; country: string }> 
}) {
  const { country, locale } = await params;  // Extract both locale and country
  const [sanityData, sidebarCountries] = await Promise.all([
    getCountryData(country, locale),  // Pass locale to fetch correct language
    getAllCountries(country, locale),
  ]);
  // Now sanityData has correct language content!
}
```

**Step 4: Add locale to generateMetadata**

```typescript
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; country: string }> 
}) {
  const { country, locale } = await params;  // Get locale for SEO
  const data = await getCountryData(country, locale);  // Fetch language-specific data
  
  return {
    title: data?.metaTitle ?? `${name} Visa for Azerbaijan`,
    description: data?.metaDescription ?? `Apply for Azerbaijan e-Visa for ${name} citizens...`,
  };
}
```

---

### Fix 2: Homepage - Add Language-Specific Metadata

**Location:** `/src/app/[locale]/page.tsx`

#### The Problem

The homepage had no `generateMetadata()` function, so it fell back to the generic root layout metadata which is the same for all languages.

#### The Solution

**Added locale-aware metadata mapping:**

```typescript
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
    description: "Apply for your Azerbaijan e-Visa online. Fast, secure, and 100% official...",
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
```

**How it works:**
1. Locale is extracted from dynamic params
2. Look up metadata in the `metadataByLocale` object
3. Return locale-specific title/description
4. Include `alternates` for hreflang tags (explained below)

---

### Fix 3: Blog List Page - Add Language-Specific Metadata

**Location:** `/src/app/[locale]/blog/page.tsx`

#### The Problem

Used static metadata, not language-aware:

```typescript
// OLD - WRONG
export const metadata = {
  title: "Blog – eVisa Azerbaijan",  // Always English!
  description: "Visa guides, travel tips, and news about Azerbaijan.",
};
```

#### The Solution

Converted to `generateMetadata()`:

```typescript
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const metadataByLocale: Record<string, { title: string; description: string }> = {
    es: {
      title: "Noticias y Guías de Visas - eVisa Azerbaiyán",
      description: "Guías de visas, consejos de viaje y noticias sobre Azerbaiyán...",
    },
    ar: {
      title: "الأخبار والأدلة - تأشيرة أذربيجان الإلكترونية",
      description: "أدلة التأشيرات ونصائح السفر والأخبار عن أذربيجان...",
    },
  };

  const meta = metadataByLocale[locale] || {
    title: "News & Guides – eVisa Azerbaijan",
    description: "Visa guides, travel tips, and news about Azerbaijan...",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      languages: {
        en: "https://evisa-azerbaijan.com/en/blog",
        es: "https://evisa-azerbaijan.com/es/blog",
        ar: "https://evisa-azerbaijan.com/ar/blog",
      },
      canonical: `https://evisa-azerbaijan.com/${locale}/blog`,
    },
  };
}
```

---

### Fix 4: Hreflang Tags on All Pages

**What is hreflang?**

Hreflang tags tell search engines that your page has versions in other languages:

```html
<link rel="alternate" hreflang="en" href="https://site.com/en/page" />
<link rel="alternate" hreflang="es" href="https://site.com/es/page" />
<link rel="alternate" hreflang="ar" href="https://site.com/ar/page" />
```

**Why it matters:**
- Google needs to know which version to show to Spanish/Arabic users
- Without hreflang, Google might show the wrong language version
- Prevents duplicate content penalties

#### Implementation Pattern

Added to all pages' `generateMetadata()`:

```typescript
const baseUrl = "https://evisa-azerbaijan.com";
const currentUrl = `${baseUrl}/${locale}/visa/${country}`;

return {
  title: data?.metaTitle ?? ...,
  description: data?.metaDescription ?? ...,
  alternates: {
    languages: {
      en: `${baseUrl}/en/visa/${country}`,
      es: `${baseUrl}/es/visa/${country}`,
      ar: `${baseUrl}/ar/visa/${country}`,
    },
    canonical: currentUrl,  // Tells Google which version is the main one
  },
};
```

**Applied to:**
- Country pages (`/visa/[country]`)
- Blog list page (`/blog`)
- All blog posts (`/[slug]`)
- All info pages (`/about`, `/requirements`, `/visa-types`, `/visa`)
- Legal pages (`/privacy`, `/terms`)
- Contact page (`/contact`)

**Result:** Every page now has hreflang for all 3 languages.

---

### Fix 5: Locale Layout - Dynamic OpenGraph Metadata

**Location:** `/src/app/[locale]/layout.tsx`

#### The Problem

OpenGraph locale was hardcoded to `en_US`:

```typescript
// OLD - WRONG
openGraph: {
  locale: "en_US",  // Same for all languages!
  url: "https://evisa.az",
  // ...
}
```

This tells Facebook/LinkedIn/other platforms that the page is always English.

#### The Solution

Made metadata locale-aware:

```typescript
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const localeMap = {
    es: {
      locale: "es_ES",  // Correct Spanish locale for social media
      siteName: "eVisa Azerbaiyán",
      template: "%s | eVisa Azerbaiyán",
      description: "Solicita tu eVisa de Azerbaiyán en línea...",
    },
    ar: {
      locale: "ar_SA",  // Correct Arabic locale for social media
      siteName: "تأشيرة أذربيجان الإلكترونية",
      template: "%s | تأشيرة أذربيجان الإلكترونية",
      description: "قدم طلبك للحصول على تأشيرة أذربيجان الإلكترونية...",
    },
  };

  const config = localeMap[locale] || {
    locale: "en_US",
    siteName: "Azerbaijan e-Visa",
    // ... English defaults
  };

  return {
    openGraph: {
      locale: config.locale,  // Now changes per language!
      url: `https://evisa-azerbaijan.com/${locale}`,
      siteName: config.siteName,
      // ...
    },
  };
}
```

**Why this matters:**
- When Spanish users share your page, it shows Spanish metadata on Facebook
- OpenGraph locale helps social media platforms display correct language
- Improves social sharing click-through rates

---

### Fix 6: Locale-Specific Blog Post Metadata

**Location:** `/src/app/[locale]/[slug]/page.tsx`

#### The Change

Added `locale` to generateMetadata params:

```typescript
// OLD - MISSING LOCALE
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

// NEW - INCLUDES LOCALE
export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
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
```

**Also updated the page component:**

```typescript
// OLD
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

// NEW
export default async function PostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
```

---

## Architecture: Server vs Client Components

### Why This Matters

**Client Components** can't:
- Fetch from private APIs
- Access secrets (API keys, env vars)
- Do complex async operations
- Access databases directly

**Server Components** can do all of this, then pass rendered HTML or data to client components.

### Our Implementation

```
NavbarServer (Server Component)
  ↓ fetches settings via getSiteSettings()
  ↓ gets logoUrl from Sanity
  ↓ passes as prop to...
  
Navbar (Client Component)
  ↓ receives logoUrl prop
  ↓ renders <img src={logoUrl} />
```

**Benefits:**
1. **Security:** getSiteSettings() is only called in server component
2. **Performance:** Settings cached in Sanity, revalidate: 0
3. **Correct data flow:** No client-side API calls needed

**Verification:**
- ✅ NavbarServer only called in pages (servers components)
- ✅ Navbar is client component receiving props
- ✅ getSiteSettings() called in: NavbarServer, Footer7Server, root layout only
- ✅ No redundant calls in page components

---

## SEO Checklist - What's Now Fixed

| Item | Before | After |
|------|--------|-------|
| Homepage metadata | Generic (English only) | ✅ Locale-specific |
| Blog page metadata | Static English | ✅ Locale-specific |
| Blog post pages | Missing locale in metadata | ✅ Has locale + hreflang |
| Country pages | Shows English only | ✅ Shows correct language |
| Info pages (about, requirements, etc) | No hreflang | ✅ All have hreflang |
| OpenGraph locale | Always en_US | ✅ Changes per language (es_ES, ar_SA) |
| Hreflang tags | Missing on most pages | ✅ Every page has all 3 language links |
| Canonical URLs | Missing | ✅ Every page has canonical URL |

---

## How Search Engines Use This Information

### 1. Hreflang Tags
```
User searches in Spanish
↓
Google sees Spanish user agent
↓
Google looks for hreflang es link
↓
Google shows Spanish version if available
```

### 2. OpenGraph Metadata
```
Spanish user shares post on Facebook
↓
Facebook reads og:locale="es_ES"
↓
Facebook shows Spanish title/description in preview
↓
More clicks from Spanish speakers
```

### 3. Canonical URLs
```
Duplicate content concerns
↓
Canonical tells Google which version is "main"
↓
Prevents duplicate content penalties
```

### 4. Language-Specific Metadata
```
Spanish user searches "Azerbaijan visa"
↓
Google has Spanish metadata in index
↓
Google shows Spanish snippet with Spanish title/description
↓
Higher click-through rate
```

---

## Testing the Fixes

### For Country Pages

1. Visit `/en/visa/germany` → should show English name/metadata
2. Visit `/es/visa/germany` → should show Spanish name/metadata
3. Visit `/ar/visa/germany` → should show Arabic name/metadata

**Check:**
```html
<!-- Browser DevTools > Head section should show: -->
<title>Germany Visa for Azerbaijan</title>  <!-- or Spanish/Arabic translation -->
<meta name="description" content="...">   <!-- should be in correct language -->
<link rel="alternate" hreflang="es" href="https://evisa-azerbaijan.com/es/visa/germany" />
<link rel="alternate" hreflang="ar" href="https://evisa-azerbaijan.com/ar/visa/germany" />
```

### For Homepage

1. Visit `/en` → English metadata
2. Visit `/es` → Spanish metadata
3. Visit `/ar` → Arabic metadata

### In Google Search Console

1. Submit sitemaps for all locales
2. Check: Coverage > Exclude > see only correct pages excluded
3. Check: International Targeting > Proper language assigned to each URL
4. Check: Enhancements > rich snippets showing in correct language

### In Google Search Results

Search for your site in each language:
- Google.es should show Spanish snippets
- Google.com with Arabic should show Arabic snippets

---

## File Changes Summary

| File | Change | Why |
|------|--------|-----|
| country/page.tsx | Added locale param to getCountryData, getAllCountries, generateMetadata | Fetch language-specific fields |
| page.tsx (home) | Added generateMetadata | Language-specific homepage SEO |
| blog/page.tsx | Converted static metadata to generateMetadata | Language-specific blog SEO |
| [slug]/page.tsx | Added locale to generateMetadata and component | Blog post hreflang + metadata |
| [locale]/layout.tsx | Made metadata locale-aware | Dynamic OpenGraph locale |
| about/page.tsx | Added hreflang to generateMetadata | Language links for search engines |
| requirements/page.tsx | Added hreflang to generateMetadata | Language links for search engines |
| visa-types/page.tsx | Added hreflang to generateMetadata | Language links for search engines |
| visa/page.tsx | Added hreflang to generateMetadata | Language links for search engines |
| contact/page.tsx | Added hreflang to generateMetadata | Language links for search engines |
| privacy/page.tsx | Added hreflang to generateMetadata | Language links for search engines |
| terms/page.tsx | Added hreflang to generateMetadata | Language links for search engines |

---

## Next Steps

1. ✅ Build verification - completed successfully
2. Test country pages in each language (manually or with e2e tests)
3. Test social media sharing (use Facebook Sharing Debugger)
4. Submit updated sitemap to Google Search Console
5. Monitor Google Search Console for crawl errors

---

