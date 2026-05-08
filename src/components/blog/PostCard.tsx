import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./PostCard.module.css";

interface PostCardProps {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  category?: string;
  coverImage?: string;
}

export function PostCard({ title, slug, publishedAt, excerpt, category, coverImage }: PostCardProps) {
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={coverImage ?? "/baku-country-hero.jpg"}
          alt={title}
          className={styles.image}
          width={400}
          height={300}
          quality={75}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          {category && (
            <span className={styles.category}>
              <span className={styles.dot} />
              {category.toUpperCase()}
            </span>
          )}
          <span className={styles.date}>{date}</span>
          <span className={styles.author}>By admin</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
        <Link href={`/${slug}`} className={styles.readMore}>
          <ArrowRight size={16} />
          Read More
        </Link>
      </div>
    </div>
  );
}
