import styles from './NewPost.module.css';

export function NewPostPage() {
  return (
    <div className={styles.page}>
      <h3>새 글 작성</h3>
      <p>여기에서 새 글을 작성할 수 있습니다.</p>
    </div>
  );
}
