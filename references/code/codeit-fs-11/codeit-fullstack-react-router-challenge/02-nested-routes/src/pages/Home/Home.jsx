import styles from './Home.module.css';

export function HomePage() {
  return (
    <div className={styles.page}>
      <h2>홈 페이지</h2>
      <p>이곳은 중첩 라우팅 예제의 홈 페이지입니다.</p>
    </div>
  );
}
