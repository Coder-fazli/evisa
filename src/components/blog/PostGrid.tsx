import { PostCard } from "./PostCard";
import styles from "./PostGrid.module.css";

interface Post {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  category?: string;
  coverImage?: string;
}

export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {posts.length === 0 ? (
          <p className={styles.empty}>No posts published yet.</p>
        ) : (
          posts.map((post, idx) => (
            <PostCard key={`${post.slug}-${idx}`} {...post} />
          ))
        )}
      </div>
    </div>
  );
}
