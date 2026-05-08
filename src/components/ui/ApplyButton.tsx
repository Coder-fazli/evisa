"use client";

import { ArrowUpRight } from "lucide-react";

interface ApplyButtonProps {
  label?: string;
  variant?: "orange" | "white" | "dark";
  className?: string;
  href?: string;
}

export function ApplyButton({
  label = "Apply Now",
  variant = "orange",
  className = "",
  href,
}: ApplyButtonProps) {
  const styles: Record<string, { btn: string; circle: string }> = {
    orange: {
      btn: "bg-[#E8671A] text-white",
      circle: "bg-white text-[#E8671A]",
    },
    white: {
      btn: "bg-white text-[#E8671A]",
      circle: "bg-[#E8671A] text-white",
    },
    dark: {
      btn: "bg-[#1a1a2e] text-white",
      circle: "bg-white text-[#1a1a2e]",
    },
  };

  const s = styles[variant];

  const inner = (
    <>
      <span className="relative z-10 whitespace-nowrap">{label}</span>
      <div className={`absolute top-1 right-1 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45 ${s.circle}`}>
        <ArrowUpRight size={16} strokeWidth={2.5} />
      </div>
    </>
  );

  const base = `relative h-12 rounded-full overflow-hidden cursor-pointer text-[15px] font-semibold pl-6 pr-14 hover:pl-14 hover:pr-6 transition-all duration-500 group w-fit inline-flex items-center ${s.btn} ${className}`;

  if (href) {
    return <a href={href} className={base}>{inner}</a>;
  }

  return <button className={base}>{inner}</button>;
}
