import Exercise from './Exercise/Exercise';
import Solution from './Solution/Solution';
import styles from './ClsxUsage.module.css';

export default function ClsxUsage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>clsx로 조건부 클래스명 관리</h1>
      </div>

      <div className={styles.goal}>
        <h2 className={styles.goalTitle}>📌 목표</h2>
        <p className={styles.goalText}>
          문자열 템플릿 방식의 조건부 클래스명을 clsx 라이브러리를 사용해서
          깔끔하게 개선해보세요.
        </p>
        <ul className={styles.requirements}>
          <li>clsx 라이브러리를 import 하기</li>
          <li>문자열 템플릿 방식을 clsx 객체 방식으로 변경하기</li>
          <li>조건부 클래스명을 더 읽기 쉽고 유지보수하기 좋게 만들기</li>
        </ul>
      </div>

      <div className={styles.preview}>
        <h2 className={styles.previewTitle}>🔍 현재 모습 (문자열 템플릿)</h2>
        <div className={styles.previewBox}>
          <Exercise />
        </div>
      </div>

      <div className={styles.preview}>
        <h2 className={styles.previewTitle}>✅ 완성 결과 (clsx 사용)</h2>
        <div className={styles.previewBox}>
          <Solution />
        </div>
      </div>

      <div className={styles.fileBox}>
        <div className={styles.fileHeader}>
          <span className={styles.fileIcon}>📁</span>
          <span className={styles.fileName}>작업 파일</span>
        </div>
        <p className={styles.filePath}>
          src/features/ClsxUsage/Exercise/Exercise.jsx
        </p>
      </div>

      <div className={styles.hint}>
        <strong>💡 힌트</strong>
        <br />
        <br />
        <strong>문자열 템플릿의 문제점:</strong>
        <br />
        • 조건이 많아지면 코드가 지저분해짐
        <br />
        • 빈 문자열('') 처리를 일일이 해줘야 함
        <br />
        • 실수하기 쉽고 가독성이 떨어짐
        <br />
        <br />
        <strong>clsx의 장점:</strong>
        <br />
        • 객체 방식: clsx(&#123; [styles.done]: todo.isDone &#125;)
        <br />
        • 논리 AND 방식: clsx(todo.isDone && styles.done)
        <br />
        • 여러 조건을 한 줄로 깔끔하게 관리 가능
        <br />
        • false/null/undefined는 자동으로 무시됨
        <br />
        <br />
        <strong>사용 예시:</strong>
        <br />
        clsx(styles.base, &#123; [styles.active]: isActive, [styles.disabled]:
        isDisabled &#125;)
      </div>
    </div>
  );
}
