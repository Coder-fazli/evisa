"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import styles from "./VisaContent.module.css";

interface VisaContentProps {
  body: any;
  locale: string;
}

export function VisaContent({ body, locale }: VisaContentProps) {
  const [expanded, setExpanded] = useState(false);

  const readMoreLabel = locale === "es" ? "Leer más" : locale === "ar" ? "اقرأ المزيد" : "Read more";
  const showLessLabel = locale === "es" ? "Mostrar menos" : locale === "ar" ? "إظهار أقل" : "Show less";

  return (
    <div>
      <div className={`${styles.body} ${expanded ? styles.expanded : styles.collapsed}`}>
        <PortableText
          value={body}
          components={{
            marks: {
              link: ({ children, value }) => (
                <a
                  href={value?.href}
                  target={value?.blank ? "_blank" : undefined}
                  rel={value?.blank ? "noopener noreferrer" : undefined}
                >
                  {children}
                </a>
              ),
            },
          }}
        />
        {!expanded && <div className={styles.fade} />}
      </div>

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className={styles.readMoreBtn}
      >
        {expanded ? showLessLabel : readMoreLabel}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  );
}
