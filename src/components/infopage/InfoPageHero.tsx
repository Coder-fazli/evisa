import styles from "./InfoPageHero.module.css";

interface InfoPageHeroProps {
  title: string;
  subtitle?: string;
  heroImage?: string;
  breadcrumbLabel?: string;
}

export function InfoPageHero({
  title,
  subtitle,
  heroImage = "/baku-country-hero.jpg",
  breadcrumbLabel = "Home"
}: InfoPageHeroProps) {
  return (
    <section className={styles.hero}>
      <picture className={styles.backgroundPicture}>
        <source
          srcSet="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
          type="image/webp"
        />
        <img
          src={heroImage}
          alt={`${title} Hero Background`}
          className={styles.backgroundImage}
          loading="eager"
        />
      </picture>

      <nav className={styles.breadcrumb}>
        <a href="/">Home</a>
        <span className={styles.sep}>/</span>
        <span>{title}</span>
      </nav>

      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </section>
  );
}
