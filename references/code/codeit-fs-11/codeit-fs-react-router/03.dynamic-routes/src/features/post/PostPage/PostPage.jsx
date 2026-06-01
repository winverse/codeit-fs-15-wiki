import styles from './PostPage.module.css';
import { PostList } from '../PostList';

export function PostPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2>게시글 목록</h2>
        <div className={styles.postList}>
          <PostList />
        </div>
      </div>
    </div>
  );
}
