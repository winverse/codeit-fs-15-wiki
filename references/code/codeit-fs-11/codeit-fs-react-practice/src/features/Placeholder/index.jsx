import styles from './Placeholder.module.css';

export default function Placeholder({ title }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>이 섹션은 아직 준비 중입니다. 🚧</p>
      <p className={styles.subMessage}>
        강의 내용을 전달하시면 해당 주제에 맞는 실습 예제를 만들어드립니다!
      </p>
    </div>
  );
}
