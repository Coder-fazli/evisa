import styles from "./CountryHero.module.css";

interface CountryHeroProps {
  country: string;
  countryCode: string;
  description: string;
  heroImage?: string;
}

export function CountryHero({ country, countryCode, description, heroImage }: CountryHeroProps) {
  const imageUrl = heroImage ?? "/baku-country-hero.jpg";

  return (
    <section className={styles.hero}>
      {/* Optimized background image with picture element */}
      <picture className={styles.backgroundPicture}>
        <source
          srcSet="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
          type="image/webp"
        />
        <img
          src={imageUrl}
          alt={`${country} Hero Background`}
          className={styles.backgroundImage}
          loading="lazy"
        />
      </picture> 
      <nav className={styles.breadcrumb}>
        <a href="/">Home</a>
        <span className={styles.sep}>/</span>
        <a href="/visa">Visa by Nationality</a>
        <span className={styles.sep}>/</span>
        <span>{country}</span>
      </nav>

      <h1 className={styles.title}>
        {country}
      </h1>
      <p className={styles.subtitle}>{description}</p>
    </section>
  );
}
