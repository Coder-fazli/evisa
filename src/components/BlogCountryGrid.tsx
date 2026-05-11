import { ArrowRight } from "lucide-react";

interface Country {
  name?: string;
  slug: string;
  countryCode: string;
}

function toLabel(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

interface BlogCountryGridProps {
  countries: Country[];
  locale: string;
  limit?: number;
}

export function BlogCountryGrid({ countries, locale, limit = 12 }: BlogCountryGridProps) {
  const visible = countries.slice(0, limit);
  const hasMore = countries.length > limit;

  const heading =
    locale === "es"
      ? "Verifica los Requisitos por Nacionalidad"
      : locale === "ar"
      ? "تحقق من المتطلبات حسب الجنسية"
      : "Check Requirements by Your Nationality";

  const viewAllLabel =
    locale === "es"
      ? "Ver todos los países elegibles →"
      : locale === "ar"
      ? "عرض جميع الدول المؤهلة ←"
      : "View all eligible countries →";

  return (
    <section className="bg-[#f4f6fa] rounded-3xl py-10 px-5 md:px-8 my-10">
      <div className="text-center mb-7">
        <h3 className="text-xl md:text-2xl font-extrabold text-[#1a1a2e] leading-tight">
          {heading}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {visible.map((c) => (
          <a
            key={c.slug}
            href={`/${locale}/visa/${c.slug}`}
            className="group flex items-center gap-3 bg-white rounded-xl px-4 py-3
              border border-gray-100
              shadow-[0_2px_8px_rgba(0,0,0,0.04)]
              hover:border-[#E8671A]/40 hover:shadow-[0_6px_18px_rgba(232,103,26,0.13)]
              hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-10 h-7 rounded overflow-hidden flex-shrink-0 shadow-sm">
              <img
                src={
                  c.countryCode
                    ? `https://flagcdn.com/w80/${c.countryCode.toLowerCase()}.png`
                    : `https://flagcdn.com/w80/az.png`
                }
                alt={c.name || toLabel(c.slug)}
                className="w-full h-full object-cover"
              />
            </div>

            <span className="flex-1 min-w-0 text-sm font-semibold text-[#1a1a2e] group-hover:text-[#E8671A] transition-colors truncate">
              {c.name || toLabel(c.slug)}
            </span>

            <ArrowRight
              size={14}
              className="text-gray-300 group-hover:text-[#E8671A] group-hover:translate-x-0.5 transition-all flex-shrink-0"
            />
          </a>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-7">
          <a
            href={`/${locale}/visa`}
            className="inline-block text-sm font-bold text-[#E8671A] hover:underline"
          >
            {viewAllLabel}
          </a>
        </div>
      )}
    </section>
  );
}
