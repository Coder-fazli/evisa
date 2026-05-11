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
      ? "Verifica los requisitos de tu nacionalidad"
      : locale === "ar"
      ? "تحقق من متطلبات تأشيرة جنسيتك"
      : "Check Visa Requirements by Your Nationality";

  const viewAllLabel =
    locale === "es"
      ? "Ver todos los países elegibles →"
      : locale === "ar"
      ? "عرض جميع الدول المؤهلة ←"
      : "View all eligible countries →";

  return (
    <div style={{ margin: "36px 0", padding: "28px 24px", background: "#fafafa", borderRadius: "16px", border: "1px solid #f0f0f0" }}>
      <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a2e", marginBottom: "18px", lineHeight: 1.3 }}>
        {heading}
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "10px" }}>
        {visible.map((c) => (
          <a
            key={c.slug}
            href={`/${locale}/visa/${c.slug}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "white",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid #eaeaea",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            className="hover:!border-[#E8671A] hover:!shadow-md"
          >
            <img
              src={c.countryCode
                ? `https://flagcdn.com/w40/${c.countryCode.toLowerCase()}.png`
                : `https://flagcdn.com/w40/az.png`}
              alt={c.name || toLabel(c.slug)}
              width={28}
              height={20}
              style={{ borderRadius: "3px", objectFit: "cover", flexShrink: 0 }}
            />
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a2e", flex: 1, lineHeight: 1.3 }}>
              {c.name || toLabel(c.slug)}
            </span>
            <ArrowRight size={13} style={{ color: "#9ca3af", flexShrink: 0 }} />
          </a>
        ))}
      </div>

      {hasMore && (
        <div style={{ marginTop: "18px", textAlign: "center" }}>
          <a
            href={`/${locale}/visa`}
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#E8671A",
              textDecoration: "none",
            }}
            className="hover:!underline"
          >
            {viewAllLabel}
          </a>
        </div>
      )}
    </div>
  );
}
