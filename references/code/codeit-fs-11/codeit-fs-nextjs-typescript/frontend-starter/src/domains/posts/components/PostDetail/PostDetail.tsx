import { getAuthorLabel } from '@/domains/posts/utils/constants';
import * as styles from './PostDetail.css';

interface PostDetailProps {
  post: any;
}

export default function PostDetail({ post }: PostDetailProps) {
  if (!post) {
    return (
      <p className={styles.empty}>
        포스트를 선택하면 상세 내용이 이 영역에 표시됩니다.
      </p>
    );
  }

  return (
    <article className={styles.wrapper}>
      <span className={styles.meta}>{getAuthorLabel(post.authorId)}</span>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.body}>{post.content}</p>
    </article>
  );
}
