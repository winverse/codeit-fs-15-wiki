import { Link } from 'react-router';
import styles from './PostList.module.css';
import { posts } from '@/data/posts';

export function PostList() {
  return (
    <>
      {posts.map((post) => (
        <article key={post.id} className={styles.postCard}>
          <h3 className={styles.title}>{post.title}</h3>
          <div className={styles.meta}>
            <span>{post.author}</span> ·
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <Link className={styles.more} to={`/posts/${post.id}`}>
            자세히 보기 →
          </Link>
        </article>
      ))}
    </>
  );
}
