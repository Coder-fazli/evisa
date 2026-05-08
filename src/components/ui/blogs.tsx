'use client'

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

interface BlogArticle {
  title: string;
  category: string;
  description: string;
  image: string;
  publishDate: string;
  readMoreLink: string;
}

const DEFAULT_ARTICLES: BlogArticle[] = [
  {
    category: "VISA GUIDE",
    description: "Everything you need to know about applying for an Azerbaijan e-Visa online — documents, fees, and processing times.",
    image: "https://images.unsplash.com/photo-1558174685-430919a96c8d",
    publishDate: "Jan 20, 2026",
    readMoreLink: "#",
    title: "Complete Guide to Azerbaijan e-Visa for 2026",
  },
  {
    category: "TRAVEL TIPS",
    description: "Discover the top attractions, best time to visit, and insider tips for planning your trip to Baku, Azerbaijan.",
    image: "https://images.unsplash.com/photo-1466228432269-af42b400b934",
    publishDate: "Jan 10, 2026",
    readMoreLink: "#",
    title: "Top 10 Things to Do in Baku, Azerbaijan",
  },
  {
    category: "FAQ",
    description: "Answers to the most common questions travelers have about Azerbaijan visa requirements, validity, and entry rules.",
    image: "https://images.unsplash.com/photo-1605907126120-f68611516ecc",
    publishDate: "Dec 28, 2025",
    readMoreLink: "#",
    title: "Azerbaijan Visa FAQ: Everything You Need to Know",
  },
  {
    category: "VISA TIPS",
    description: "Common mistakes applicants make when filling out the Azerbaijan e-Visa form and how to avoid them for a smooth approval.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    publishDate: "Dec 15, 2025",
    readMoreLink: "#",
    title: "Top Mistakes to Avoid on Your Azerbaijan Visa Application",
  },
  {
    category: "TRAVEL",
    description: "A complete travel guide to Baku's Old City, the Flame Towers, and the best local experiences for first-time visitors.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
    publishDate: "Dec 1, 2025",
    readMoreLink: "#",
    title: "First-Timer's Guide to Visiting Baku, Azerbaijan",
  },
];

export function BlogsSection({ blogs }: { blogs?: BlogArticle[] } = {}) {
  const articlesData = blogs || DEFAULT_ARTICLES;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 1 },
    },
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 font-semibold text-xs uppercase tracking-widest" style={{ color: "#E8671A" }}>
              Latest Articles
            </p>
            <h2 className="font-extrabold text-3xl sm:text-4xl" style={{ color: "#1a1a2e" }}>
              Visa News &amp; Travel Guides
            </h2>
          </div>
          {/* Nav arrows */}
          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors hover:bg-[#E8671A] hover:border-[#E8671A] hover:text-white"
              style={{ borderColor: "#E8671A", color: "#E8671A" }}
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors hover:bg-[#E8671A] hover:border-[#E8671A] hover:text-white"
              style={{ borderColor: "#E8671A", color: "#E8671A" }}
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {articlesData.map((article, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85%] sm:w-[47%] lg:w-[31%]"
              >
                <div className="flex flex-col h-full border border-gray-200 bg-white transition-shadow hover:shadow-lg overflow-hidden rounded-xl">
                  <div className="relative flex-shrink-0">
                    {article.image && (
                      <Image
                        alt={article.title}
                        className="h-56 w-full object-cover"
                        height={400}
                        src={article.image}
                        width={600}
                        quality={75}
                        loading="lazy"
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 47vw, 31vw"
                      />
                    )}
                    <span
                      className="absolute top-3 left-3 rounded-full px-3 py-1 font-semibold text-[10px] uppercase tracking-wider text-white"
                      style={{ background: "#E8671A" }}
                    >
                      #{article.category}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 px-5 py-5">
                    <h3 className="mb-2 font-bold text-lg leading-snug" style={{ color: "#1a1a2e" }}>
                      {article.title}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-gray-500 flex-1">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <Link
                        className="group inline-flex items-center gap-2 font-semibold text-sm whitespace-nowrap text-[#E8671A]"
                        href={article.readMoreLink}
                      >
                        <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#E8671A] transition-colors group-hover:bg-[#E8671A]">
                          <ArrowRight className="h-4 w-4 text-[#E8671A] transition-colors group-hover:text-white" />
                        </span>
                        Read more
                      </Link>
                      <span className="text-xs text-gray-400">{article.publishDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
