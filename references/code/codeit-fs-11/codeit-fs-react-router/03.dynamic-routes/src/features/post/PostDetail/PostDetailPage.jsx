import { Link } from 'react-router';
import styles from './PostDetail.module.css';
import { posts } from '@/data/posts';

export function PostDetailPage() {
  const postId = '1'; // 임시 값
  const post = posts.find((p) => p.id === postId);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {post ? (
          <article className={styles.article}>
            <header className={styles.postHeader}>
              <h2 className={styles.title}>{post.title}</h2>
              <div className={styles.meta}>
                <span>{post.author}</span> ·{' '}
                <time dateTime={post.date}>{post.date}</time>
              </div>
            </header>
            <div className={styles.content}>{post.content}</div>
            {post.tags?.length ? (
              <ul className={styles.tags} aria-label="태그">
                {post.tags.map((t) => (
                  <li key={t} className={styles.tag}>
                    #{t}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ) : (
          <h2>존재하지 않는 게시글입니다.</h2>
        )}

        <Link className={styles.backLink} to="/posts">
          ← 목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
