import styles from "./BlogHero.module.css";

export function BlogHero() {
  return (
    <section className={styles.hero}>
      {/* Optimized background image with picture element */}
      <picture className={styles.backgroundPicture}>
        <source
          srcSet="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
          type="image/webp"
        />
        <img
          src="/baku-country-hero.jpg"
          alt="Blog Hero Background"
          className={styles.backgroundImage}
          loading="lazy"
        />
      </picture>
      <nav className={styles.breadcrumb}>
        <a href="/">Home</a>
        <span className={styles.sep}>/</span>
        <span>Blog</span>
      </nav>
      <h1 className={styles.title}>Our Blog</h1>
    </section>
  );
}
