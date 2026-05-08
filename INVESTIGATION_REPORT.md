# Server/Client Components & SEO Investigation Report

## Summary
Found **critical SEO issues** and **architectural mismatches** between schema structure and page implementations. The project has proper server/client component separation in most areas, but language-specific metadata is missing or broken on multiple pages.

---

## Issues Found

### 🔴 CRITICAL: Country Page - Language-Specific Data Not Implemented

**Location:** `/src/app/[locale]/visa/[country]/page.tsx`

**Problem:**
- The country schema has nested structure: `english.name_en`, `spanish.name_es`, `arabic.name_ar`
- But the page fetches the entire document without selecting language-specific fields
- The component tries to access `sanityData?.name` (doesn't exist at root level)
- `generateMetadata()` does NOT have `locale` parameter, so it can't fetch language-specific meta data
- The page is rendering English content regardless of the active language

**Impact:** Spanish and Arabic users see English content for country pages

**Code Issue:**
```typescript
// WRONG - fetches raw document, doesn't select language fields
async function getCountryData(slug: string) {
  const data = await client.fetch(
    `*[_type == "country" && slug.current == $slug][0]`,
    { slug: slug.toLowerCase() },
    { next: { revalidate: 0 } }
  );
  return data ?? null;
}

// WRONG - generateMetadata doesn't have locale, can't fetch language-specific meta
export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const data = await getCountryData(country);
  return {
    title: data?.metaTitle ?? "", // This field doesn't exist!
    description: data?.metaDescription ?? "", // This field doesn't exist!
  };
}
```

---

### 🔴 CRITICAL: Missing generateMetadata on Homepage

**Location:** `/src/app/[locale]/page.tsx`

**Problem:**
- Homepage doesn't have `generateMetadata()` function
- Falls back to root layout metadata (which is generic/global)
- Homepage should have locale-specific metadata for SEO
- Each language version should have different title/description

**Impact:** Homepage doesn't have proper SEO metadata per language

---

### 🔴 CRITICAL: Missing generateMetadata on Blog List Page

**Location:** `/src/app/[locale]/blog/page.tsx`

**Problem:**
- Blog list page doesn't have `generateMetadata()` function
- Falls back to static metadata (title: "Blog – eVisa Azerbaijan")
- Should have language-specific metadata

**Current (static):**
```typescript
export const metadata = {
  title: "Blog – eVisa Azerbaijan",
  description: "Visa guides, travel tips, and news about Azerbaijan.",
};
```

**Impact:** Blog page metadata is not translated or locale-aware

---

### ⚠️ Root Layout - Hardcoded Language and Locale-Unaware Metadata

**Location:** `/src/app/layout.tsx`

**Problems:**
1. The root layout calls `getSiteSettings()` which is correct (global favicon, siteName)
2. BUT it generates metadata that applies globally to ALL locales
3. The `lang="en"` is hardcoded in the HTML tag

**Code Issue:**
```typescript
export async function generateMetadata() {
  const settings = await getSiteSettings();
  return {
    icons: settings.faviconUrl ? { icon: settings.faviconUrl } : { icon: "/favicon.ico" },
    title: { default: settings.metaTitle, template: `%s | ${settings.siteName}` },
    description: settings.metaDescription,
    // ... this applies to ALL locales, not locale-specific
  };
}
```

**The HTML lang attribute:**
```html
<html lang="en" ...> <!-- HARDCODED! Should be dynamic per locale -->
```

**Impact:** 
- All pages show `lang="en"` in HTML even on Spanish/Arabic versions
- This confuses search engines about language targeting
- Hreflang tags in locale layout won't fully compensate

---

### ⚠️ [locale] Layout - Generic Metadata with Limited Hreflang

**Location:** `/src/app/[locale]/layout.tsx`

**Current Implementation:**
```typescript
const metadata: Metadata = {
  metadataBase: new URL("https://evisa.az"),
  title: { template: "%s | Azerbaijan e-Visa", default: "Azerbaijan e-Visa – Official Application Portal" },
  description: "Apply for your Azerbaijan e-Visa online. Fast, secure, and 100% official.",
  openGraph: {
    locale: "en_US", // HARDCODED! Should change per locale
    url: "https://evisa.az",
    siteName: "Azerbaijan e-Visa",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: {
    languages: {
      en: "https://evisa.az/en",
      es: "https://evisa.az/es",
      ar: "https://evisa.az/ar",
    },
  },
};
```

**Problems:**
1. `openGraph.locale` is hardcoded to "en_US" - should be "es_ES" for Spanish, "ar_SA" for Arabic
2. The generic hreflang alternates don't track the current page path - they only point to homepage
3. Individual pages should have page-specific hreflang tags
4. Example: `/en/visa/germany` should have alternates for `/es/visa/germany` and `/ar/visa/germany`

---

### ⚠️ Static vs Dynamic Metadata

**Current Pattern Issues:**

**Correctly Implemented (Dynamic per locale):**
- `/[locale]/about/page.tsx` ✅
- `/[locale]/requirements/page.tsx` ✅  
- `/[locale]/visa-types/page.tsx` ✅
- `/[locale]/visa/page.tsx` ✅
- `/[locale]/contact/page.tsx` ✅
- `/[locale]/privacy/page.tsx` ✅
- `/[locale]/[slug]/page.tsx` (blog post) ✅

**Missing Dynamic Metadata:**
- `/[locale]/page.tsx` (homepage) ❌
- `/[locale]/blog/page.tsx` ❌

**Broken Implementation:**
- `/[locale]/visa/[country]/page.tsx` ❌ (generateMetadata missing locale param, fetching wrong fields)

---

## Server/Client Components - CORRECT ✅

The server/client component separation is properly implemented:

**Server Components (Correct):**
- `NavbarServer.tsx` - Fetches settings, passes props to client Navbar ✅
- `Footer7Server.tsx` - Fetches settings, passes props to client Footer7 ✅
- Individual page components - All properly use server wrappers ✅

**Client Components (Correct):**
- `Navbar.tsx` - Receives logoUrl prop, accepts fallback ✅
- `Footer7.tsx` - Receives logoUrl prop, accepts fallback ✅

**getSiteSettings() Usage (Correct):**
- Called ONLY in: NavbarServer, Footer7Server, root layout ✅
- NOT called redundantly in individual page components ✅

---

## Required Fixes

### Fix 1: Update Country Page for Language-Specific Data
- Add `locale` parameter to `generateMetadata()`
- Update `getCountryData()` to accept locale and select language-specific fields
- Update country page component to extract language-specific data
- Properly access `data.english.name_en` / `data.spanish.name_es` / `data.arabic.name_ar`

### Fix 2: Add generateMetadata to Homepage
- Create locale-aware homepage metadata
- Consider fetching homepage content from Sanity with language-specific SEO fields
- Or add metaTitle/metaDescription to homePage documents

### Fix 3: Add generateMetadata to Blog List Page
- Create locale-aware blog page metadata
- Different title/description per language

### Fix 4: Fix Root Layout HTML Language Tag
- Make the `lang` attribute dynamic based on locale
- Requires HTML tag to be in a client component wrapper OR
- Use a different approach (locale layout should handle this)

### Fix 5: Update [locale] Layout Metadata
- Make `openGraph.locale` dynamic (en_US, es_ES, ar_SA)
- This layout generates static metadata but it should be locale-aware

### Fix 6: Add Page-Level Hreflang
- Individual pages should include alternates for their own URLs
- Blog post page should have hreflang for other language versions
- Country page should have hreflang for other language versions

---

## Priority Order

**High Priority (Breaks Functionality):**
1. Fix country page language-specific data
2. Add homepage metadata
3. Add blog page metadata

**Medium Priority (SEO Issues):**
4. Fix [locale] layout locale-aware metadata
5. Add page-level hreflang tags
6. Fix HTML lang attribute

---

## Testing Checklist

- [ ] Homepage in /en, /es, /ar has different metadata
- [ ] Blog page in /en, /es, /ar has different metadata  
- [ ] Country page in /es/visa/germany shows Spanish content
- [ ] Country page in /ar/visa/germany shows Arabic content
- [ ] Blog post page hreflang points to correct language versions
- [ ] HTML `lang` attribute matches locale (lang="en" for /en, lang="es" for /es, etc)
- [ ] Search console shows correct language targeting
- [ ] Open Graph locale changes per language

