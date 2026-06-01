import * as styles from './Footer.css.js';

export default async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/movies`,
    {
      cache: 'force-cache',
    },
  );

  if (!response.ok) {
    return <footer className={styles.container}>제작 @winverse</footer>;
  }

  const { movies } = await response.json();
  const movieCount = movies.length;

  return (
    <footer className={styles.container}>
      <div>제작11 @winverse</div>
      <div className={styles.count}>
        {movieCount}개의 영화가 등록되어 있습니다.
      </div>
    </footer>
  );
}
