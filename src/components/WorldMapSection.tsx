"use client";

import { useTranslations } from "next-intl";
import { WorldMap } from "@/components/ui/map";

const BAKU = { lat: 40.4093, lng: 49.8671, label: "Baku" };

// Spread across all continents — no two cities close enough to overlap
const dots = [
  { start: { lat: 40.7128,  lng: -74.006,  label: "New York"   }, end: BAKU },
  { start: { lat: -23.5505, lng: -46.6333, label: "São Paulo"  }, end: BAKU },
  { start: { lat: 51.5074,  lng: -0.1278,  label: "London"     }, end: BAKU },
  { start: { lat: 55.7558,  lng: 37.6173,  label: "Moscow"     }, end: BAKU },
  { start: { lat: 25.2048,  lng: 55.2708,  label: "Dubai"      }, end: BAKU },
  { start: { lat: 28.6139,  lng: 77.209,   label: "New Delhi"  }, end: BAKU },
  { start: { lat: 35.6762,  lng: 139.6503, label: "Tokyo"      }, end: BAKU },
  { start: { lat: -33.8688, lng: 151.2093, label: "Sydney"     }, end: BAKU },
];

export function WorldMapSection() {
  const t = useTranslations();

  return (
    <section className="bg-white pt-6 pb-12">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center px-5 mb-2">
        <p className="text-[10px] font-medium tracking-[2.5px] text-[#E8671A] uppercase mb-2">
          {t("worldMap.label")}
        </p>
        <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#1a1a2e] leading-snug mb-2">
          {t("worldMap.title")}
        </h2>
        <p className="text-gray-400 text-[13px] leading-relaxed font-normal">
          {t("worldMap.description")}
        </p>
      </div>

      {/* Map – constrained width */}
      <div className="max-w-6xl mx-auto px-5">
        <WorldMap
          dots={dots}
          lineColor="#E8671A"
          showLabels={true}
          animationDuration={2}
          loop={true}
        />
      </div>
    </section>
  );
}
