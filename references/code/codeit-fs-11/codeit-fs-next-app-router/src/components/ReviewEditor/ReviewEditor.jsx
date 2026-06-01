import * as styles from './ReviewEditor.css.js';
import { createReviewAction } from '@/actions/create-review.action';

export default function ReviewEditor({ movieId }) {
  return (
    <section>
      <h3>리뷰 작성하기</h3>
      <form className={styles.form} action={createReviewAction}>
        <input name="movieId" value={movieId} hidden={true} readOnly={true} />
        <input
          name="author"
          placeholder="작성자"
          className={styles.input}
          required={true}
        />
        <textarea
          name="content"
          placeholder="리뷰 내용"
          className={styles.textarea}
          required={true}
        />
        <button type="submit" className={styles.submitBtn}>
          작성하기
        </button>
      </form>
    </section>
  );
}
