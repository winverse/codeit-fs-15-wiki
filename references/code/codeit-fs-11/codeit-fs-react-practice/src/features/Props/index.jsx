import styles from './Props.module.css';
import Solution from './Solution';
import Exercise from './Exercise';

export default function Props() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>🎁 Props</h2>
      </div>

      <div className={styles.goal}>
        <h3 className={styles.goalTitle}>🎯 목표</h3>
        <p className={styles.goalText}>
          Props를 사용하여 부모 컴포넌트에서 자식 컴포넌트로 데이터를
          전달하세요:
        </p>
        <ul className={styles.requirements}>
          <li>
            TodoItem 컴포넌트에서 props를 받아 구조 분해 할당으로{' '}
            <code>text</code> 꺼내기
          </li>
          <li>
            <code>map</code> 함수로 todos 배열 순회하며 TodoItem 렌더링
          </li>
          <li>
            각 TodoItem에 <code>key</code>와 <code>text</code> prop 전달하기
          </li>
        </ul>
      </div>

      <div className={styles.preview}>
        <h3 className={styles.previewTitle}>👀 현재 모습</h3>
        <div className={styles.previewBox}>
          <Exercise />
        </div>
      </div>

      <div className={styles.preview}>
        <h3 className={styles.previewTitle}>✨ 완성 결과</h3>
        <div className={styles.previewBox}>
          <Solution />
        </div>
      </div>

      <div className={styles.fileBox}>
        <div className={styles.fileHeader}>
          <span className={styles.fileIcon}>📁</span>
          <span className={styles.fileName}>작업 파일</span>
        </div>
        <code className={styles.filePath}>src/features/Props/Exercise.jsx</code>
      </div>

      <div className={styles.hint}>
        <p>
          💡 Props는 읽기 전용이에요! 구조 분해 할당 <code>{'{ text }'}</code>와{' '}
          <code>map</code> 함수를 활용해보세요.
        </p>
      </div>
    </div>
  );
}
