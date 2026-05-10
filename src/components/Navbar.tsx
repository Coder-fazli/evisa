"use client";

import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { ApplyButton } from "@/components/ui/ApplyButton";

interface NavbarProps {
  logoUrl?: string | null;
}

export function Navbar({ logoUrl }: NavbarProps = {}) {
  const logo = logoUrl || "/evisa-logo.png";
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "ar", name: "العربية" },
  ];

  const handleLanguageChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  const links = [
    { label: t("nav.visa"), href: "/visa", active: pathname === "/visa" },
    { label: t("nav.blog"), href: "/blog", active: pathname === "/blog" },
    { label: t("nav.about"), href: "/about", active: pathname === "/about" },
    { label: t("nav.contact"), href: "/contact", active: pathname === "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_1px_6px_rgba(0,0,0,0.08)]">
        {/* Desktop */}
        <div className="hidden md:flex items-center h-24 max-w-[1200px] mx-auto px-6">
          {/* Logo — left */}
          <a href={locale === "en" ? "/" : `/${locale}`} className="flex items-center cursor-pointer select-none">
            <img src={logo} alt="eVisa Azerbaijan" className="h-10 w-auto" />
          </a>

          {/* Nav links — centered */}
          <div className="flex items-center flex-1 justify-center">
            {links.map((l) => (
              <a key={l.label} href={l.href}
                className={`flex items-center gap-1 text-[17px] font-semibold leading-[1.625] px-[1.375em] py-[2.5em] transition-colors ${
                  l.active ? "text-[#E8671A]" : "text-gray-700 hover:text-[#E8671A]"
                }`}>
                {l.label}
                {l.active && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                )}
              </a>
            ))}
          </div>

          {/* Language + Apply Now — right */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-[13px] text-gray-500 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md transition-colors">
                <Globe size={14} />
                {languages.find(l => l.code === locale)?.name}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>

              {langOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[120px] z-50">
                  {languages.filter(lang => lang.code !== locale).map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <ApplyButton variant="orange" href="https://apply.azerbaijan-evisa.com/" />
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center justify-between h-24 px-5">
          <a href={locale === "en" ? "/" : `/${locale}`} className="flex items-center cursor-pointer select-none">
            <img src={logo} alt="eVisa Azerbaijan" className="h-9 w-auto" />
          </a>
          <button onClick={() => setOpen(!open)}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#1a1a2e] hover:bg-gray-100 transition-colors">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed top-24 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-lg md:hidden flex flex-col pb-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              className={`px-6 py-3.5 text-[15px] font-medium transition-colors ${
                l.active ? "text-[#E8671A] bg-orange-50" : "text-gray-700 hover:text-[#E8671A] hover:bg-orange-50"
              }`}>
              {l.label}
            </a>
          ))}
          <div className="h-px bg-gray-100 mx-6 my-2" />

          {/* Language selector mobile */}
          <div className="px-6 py-3">
            <p className="text-xs text-gray-500 mb-2 uppercase font-semibold">{t("nav.home")}</p>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${
                    locale === lang.code
                      ? "bg-[#E8671A] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-100 mx-6 my-2" />
          <a href="https://apply.azerbaijan-evisa.com/" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
            className="mx-6 mt-1 bg-[#E8671A] text-white text-center py-3 rounded-full font-bold text-[15px] hover:bg-[#C9540D] transition-colors">
            {t("common.applyNow")}
          </a>
        </div>
      )}
    </>
  );
}
