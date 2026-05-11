"use client";

import { ReactNode, useState } from "react";
import { PortableText } from "@portabletext/react";
import styles from "./VisaContent.module.css";

interface VisaContentProps {
  body?: any;
  locale: string;
  fallback?: ReactNode;
}

export function VisaContent({ body, locale, fallback }: VisaContentProps) {
  const [expanded, setExpanded] = useState(false);

  const readMoreLabel = locale === "es" ? "Leer más" : locale === "ar" ? "اقرأ المزيد" : "Read more";
  const showLessLabel = locale === "es" ? "Mostrar menos" : locale === "ar" ? "إظهار أقل" : "Show less";

  const hasBody =
    body && JSON.stringify(body).toLowerCase().indexOf("add your content") === -1;

  return (
    <div>
      <div className={`${styles.body} ${expanded ? styles.expanded : styles.collapsed}`}>
        {hasBody ? (
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
        ) : (
          fallback
        )}
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
