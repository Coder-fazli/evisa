import { ApplyButton } from "@/components/ui/ApplyButton";
import styles from "./Sidebar.module.css";

interface Country {
  name: string;
  slug: string;
  countryCode: string;
}

export function Sidebar({ applyLink, countries = [] }: { applyLink?: string; countries?: Country[] }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.applyCard}>
        <span className={styles.applyIcon}>📋</span>
        <h3 className={styles.applyTitle}>Ready to Apply?</h3>
        <p className={styles.applyDesc}>
          Start your Azerbaijan eVisa application now and get approved fast.
        </p>
        <ApplyButton variant="orange" href={applyLink} label="Apply Now" />
      </div>

      {countries.length > 0 && (
        <div className={styles.natCard}>
          <div className={styles.natHeader}>
            🌍 Other Countries
          </div>
          <ul className={styles.natList}>
            {countries.map((c) => (
              <li key={c.slug}>
                <a href={`/visa/${c.slug}`} className={styles.natItem}>
                  <img
                    src={`https://flagcdn.com/w40/${c.countryCode.toLowerCase()}.png`}
                    alt={c.name}
                    className={styles.natFlag}
                  />
                  {c.slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
