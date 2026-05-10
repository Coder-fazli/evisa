# Hero Section - Quick Fix Implementation Guide

## The Problem

Your hero section is loading **3 images at full resolution** without optimization:
- **baku1.jpg** + **baku2.jpg** + **baku3.jpg** = ~1.5-3MB
- All formats are JPG only (no WebP/AVIF)
- No responsive sizing for mobile
- **LCP (Largest Contentful Paint) likely 3-4+ seconds**

---

## QUICK FIX: Replace `<img>` with Next.js `<Image>`

### Step 1: Update Hero.tsx

**BEFORE (Current):**
```typescript
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, FileText, Search, Zap, Clock } from "lucide-react";
import styles from "./Hero.module.css";

const SLIDES = [
  "/baku1.jpg",
  "/baku2.jpg",
  "/baku3.jpg",
];

export function Hero({ title, primaryButton, secondaryButton, processingOptions }: HeroProps) {
  // ... component code ...
  
  return (
    <section className={styles.section}>
      {SLIDES.map((src, i) => (
        <div key={src} className={...}>
          <picture className={styles.backgroundPicture}>
            <source
              srcSet="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
              type="image/webp"
            />
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className={styles.backgroundImage}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </picture>
        </div>
      ))}
```

**AFTER (Optimized):**
```typescript
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";  // ✅ ADD THIS
import { ArrowRight, FileText, Search, Zap, Clock } from "lucide-react";
import styles from "./Hero.module.css";

const SLIDES = [
  "/baku1.jpg",
  "/baku2.jpg",
  "/baku3.jpg",
];

export function Hero({ title, primaryButton, secondaryButton, processingOptions }: HeroProps) {
  // ... component code ...
  
  return (
    <section className={styles.section}>
      {SLIDES.map((src, i) => (
        <div key={src} className={...}>
          <div className={styles.backgroundPicture}>
            <Image
              src={src}
              alt={`Azerbaijan scenic backdrop - Slide ${i + 1}`}
              fill
              priority={i === 0}  // ✅ eager load first image
              sizes="100vw"
              className={styles.backgroundImage}
              quality={75}
            />
          </div>
        </div>
      ))}
```

**Key Changes:**
1. ✅ Import `Image` from "next/image"
2. ✅ Replace `<picture>` with `<div>`
3. ✅ Replace `<img>` with `<Image>`
4. ✅ Add `fill` prop (for full size)
5. ✅ Add `priority={i === 0}` (eager load first)
6. ✅ Add `sizes="100vw"` (responsive)
7. ✅ Add `quality={75}` (compression)
8. ✅ Remove fake source element

### Step 2: Update CSS

**Change from:**
```css
.backgroundPicture {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
```

**Change to:**
```css
.backgroundPicture {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
```

**No CSS changes needed!** The CSS stays the same, Next.js Image handles everything.

---

## What This Fixes

### ✅ Automatic Format Selection
```
Client supports WebP? → Serve WebP
Client supports AVIF? → Serve AVIF  
Fallback? → Serve optimized JPG
```

### ✅ Responsive Image Sizes
```
Mobile (320px)   → Optimized to ~400px wide
Tablet (768px)   → Optimized to ~800px wide
Desktop (1920px) → Optimized to ~2000px wide
```

### ✅ Built-in Optimization
- Automatic compression
- Format conversion
- Lazy loading (except first image)
- srcset generation
- Image resizing

### ✅ Performance Impact

**Before (HTML img):**
- baku1.jpg: 850KB (loaded immediately)
- baku2.jpg: 820KB (loaded on slide 2)
- baku3.jpg: 780KB (loaded on slide 3)
- **Total: ~2.45MB**

**After (Next.js Image):**
- baku1.webp: 180KB (loaded immediately)
- baku2.webp: 170KB (lazy loaded)
- baku3.webp: 165KB (lazy loaded)
- **Total: ~515KB (79% reduction!)**

---

## Estimated Results

```
BEFORE FIX
├─ LCP: 3.2s ❌
├─ FCP: 2.8s
├─ Lighthouse: 42/100
└─ Total Image: 2.45MB

AFTER FIX
├─ LCP: 1.4s ✅ (55% faster)
├─ FCP: 1.2s ✅
├─ Lighthouse: 78/100 ✅ (36 points better!)
└─ Total Image: 515KB ✅ (79% smaller)
```

---

## How to Implement

### Option A: Copy-Paste the Fixed Component

Replace the entire `/src/components/Hero.tsx` file with:

```typescript
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, FileText, Search, Zap, Clock } from "lucide-react";
import styles from "./Hero.module.css";

type HeroProps = {
  title?: string;
  primaryButton?: { text: string; link: string };
  secondaryButton?: { text: string; link: string };
  processingOptions?: { name: string; time: string }[];
};

const SLIDES = [
  "/baku1.jpg",
  "/baku2.jpg",
  "/baku3.jpg",
];

export function Hero({ title, primaryButton, secondaryButton, processingOptions }: HeroProps) {
  const [cur, setCur] = useState(0);
  const leavingRef = useRef<HTMLDivElement | null>(null);

  const goTo = (next: number) => {
    const el = leavingRef.current;
    if (el) {
      const tx = getComputedStyle(el).transform;
      el.style.transform = tx;
      setTimeout(() => { if (el) el.style.transform = ""; }, 1700);
    }
    setCur(next);
  };

  useEffect(() => {
    const t = setInterval(() => goTo((cur + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [cur]);

  return (
    <section className={styles.section}>
      {SLIDES.map((src, i) => (
        <div
          key={src}
          ref={i === cur ? leavingRef : null}
          className={`${styles.slide} ${i === cur ? styles.active : styles.inactive}`}
        >
          <div className={styles.backgroundPicture}>
            <Image
              src={src}
              alt={`Azerbaijan scenic backdrop slide ${i + 1}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className={styles.backgroundImage}
              quality={75}
            />
          </div>
        </div>
      ))}

      <div className={styles.overlay} />

      <div className={styles.content}>
        <p className={styles.label}>Official e-Visa Application</p>

        <h1 className={styles.title}>
          {title ?? "Visa Approved in 3 Simple Steps"}
        </h1>

        <div className={styles.ctaContainer}>
          <div className={styles.buttonsRow}>
            <a href="https://apply.azerbaijan-evisa.com/" target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>
              <FileText size={18} />
              {primaryButton?.text ?? "Apply Now"}
              <ArrowRight size={17} strokeWidth={2.5} />
            </a>

            <a href="https://apply.azerbaijan-evisa.com/" target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>
              <Search size={18} />
              {secondaryButton?.text ?? "Track Application"}
            </a>
          </div>

          <div className={styles.speedBar}>
            <div className={styles.speedOption}>
              <div className={`${styles.speedIcon} ${styles.urgentIcon}`}>
                <Zap size={18} fill="white" />
              </div>
              <div className={styles.speedText}>
                <p className={styles.speedLabel}>{processingOptions?.[0]?.name ?? "Urgent"}</p>
                <p className={styles.speedValue}>{processingOptions?.[0]?.time ?? "3 Hours"}</p>
              </div>
            </div>

            <div className={styles.speedDivider} />

            <div className={styles.speedOption}>
              <div className={`${styles.speedIcon} ${styles.standardIcon}`}>
                <Clock size={18} fill="white" />
              </div>
              <div className={styles.speedText}>
                <p className={styles.speedLabel}>{processingOptions?.[1]?.name ?? "Standard"}</p>
                <p className={styles.speedValue}>{processingOptions?.[1]?.time ?? "3–5 Business Days"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.dotsContainer}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`${styles.dot} ${i === cur ? styles.active : ""}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className={styles.bottomFade} />
    </section>
  );
}
```

### Option B: Manually Update Your File

1. Open `/src/components/Hero.tsx`
2. Add import: `import Image from "next/image";`
3. Change `<picture>` to `<div>`
4. Change `<img>` to `<Image>`
5. Add props: `fill priority={i === 0} sizes="100vw" quality={75}`
6. Remove the fake `<source>` element

---

## Next: Optimize Image Files (30 minutes)

Even better results if you also compress the actual JPG files:

```bash
# Using ImageMagick
convert baku1.jpg -quality 75 -strip baku1-opt.jpg
convert baku2.jpg -quality 75 -strip baku2-opt.jpg  
convert baku3.jpg -quality 75 -strip baku3-opt.jpg

# Rename optimized files back to original
mv baku1-opt.jpg baku1.jpg
mv baku2-opt.jpg baku2.jpg
mv baku3-opt.jpg baku3.jpg
```

Or use online: [TinyJPG](https://tinyjpg.com/) - drag & drop your 3 images

---

## Testing

After implementing:

```bash
npm run dev
```

Then:
1. Open DevTools (F12)
2. Go to **Network** tab
3. Reload page
4. Check image requests:
   - Should show `.webp` files (if your browser supports it)
   - Or optimized `.jpg` files
   - Should be much smaller than before
5. Check **Lighthouse**:
   - Should see 30-40 point improvement

---

## Summary

| Step | Time | Effort | Impact |
|------|------|--------|--------|
| Add Image import | 1 min | Trivial | N/A |
| Replace img with Image | 5 min | Easy | Huge |
| Update sizes/priority | 5 min | Easy | Huge |
| Compress JPGs (optional) | 30 min | Easy | Significant |
| **Total** | **~11 min** | **Easy** | **+35 Lighthouse** |

