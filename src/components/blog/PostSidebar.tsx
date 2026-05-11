import Image from "next/image";
import styles from "./PostSidebar.module.css";

interface RelatedPost {
  title: string;
  slug: string;
  publishedAt: string;
  category?: string;
  coverImage?: string;
}

interface Country {
  name: string;
  slug: string;
  countryCode: string;
}

interface PostSidebarProps {
  relatedPosts?: RelatedPost[];
  countries?: Country[];
}

export function PostSidebar({ relatedPosts = [], countries = [] }: PostSidebarProps) {
  return (
    <aside className={styles.sidebar}>

      {relatedPosts.length > 0 && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>Recent Articles</div>
          <ul className={styles.postList}>
            {relatedPosts.map((post, idx) => {
              const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              });
              return (
                <li key={`${post.slug}-${idx}`}>
                  <a href={`/${post.slug}`} className={styles.postItem}>
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        className={styles.postThumb}
                        width={80}
                        height={80}
                        quality={70}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.postThumbPlaceholder} />
                    )}
                    <div className={styles.postInfo}>
                      <p className={styles.postTitle}>{post.title}</p>
                      <div className={styles.postMeta}>
                        {post.category && (
                          <span className={styles.postCategory}>{post.category}</span>
                        )}
                        <span>{date}</span>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {countries.length > 0 && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>Visa by Country</div>
          <ul className={styles.natList}>
            {countries.slice(0, 12).map((c, idx) => (
              <li key={`${c.slug}-${idx}`}>
                <a href={`/visa/${c.slug}`} className={styles.natItem}>
                  <Image
                    src={`https://flagcdn.com/w40/${c.countryCode.toLowerCase()}.png`}
                    alt={c.name}
                    className={styles.natFlag}
                    width={40}
                    height={30}
                    quality={80}
                    loading="lazy"
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
