import * as styles from './MovieItemSkeleton.css.js';

export default function MovieItemSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.coverImg}></div>
      <div className={styles.info}>
        <div className={styles.title}></div>
        <div className={styles.subtitle}></div>
        <br />
        <div className={styles.author}></div>
      </div>
    </div>
  );
}
