import styles from './Welcome.module.css';

export default function Welcome() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        👋 React 학습 플레이그라운드에 오신 것을 환영합니다!
      </h2>
      <p className={styles.description}>
        위의 버튼을 클릭하여 각 주제별 실습을 시작하세요.
      </p>
      <div className={styles.info}>
        <h3>📚 학습 방법</h3>
        <ol>
          <li>원하는 주제의 버튼을 클릭하세요</li>
          <li>각 실습 예제를 직접 실행해보세요</li>
          <li>코드를 수정하며 React의 동작 방식을 이해하세요</li>
        </ol>
      </div>
    </div>
  );
}
