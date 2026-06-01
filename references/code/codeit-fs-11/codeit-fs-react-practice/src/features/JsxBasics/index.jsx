import styles from './JsxBasics.module.css';
import Solution from './Solution';
// import Exercise from './Exercise'; // 코드 수정후에 주석을 해제해주세요! */}

export default function JsxBasics() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>📝 JSX 기초 실습</h2>
      </div>

      <div className={styles.goal}>
        <h3 className={styles.goalTitle}>🎯 목표</h3>
        <p className={styles.goalText}>
          To-Do List 컴포넌트를 만드세요. 아래 요구사항을 모두 충족해야 합니다:
        </p>
        <ul className={styles.requirements}>
          <li>제목: "오늘의 할 일"</li>
          <li>할 일 입력란 (input)과 추가 버튼</li>
          <li>할 일 목록 (ul/li): "리액트 기초 배우기", "JSX 규칙 이해하기"</li>
          <li>JSX 문법 에러가 없어야 함</li>
        </ul>
      </div>

      <div className={styles.preview}>
        <h3 className={styles.previewTitle}>👀 현재 모습</h3>
        <div className={styles.previewBox}>
          {/* <Exercise /> // 코드 수정후에 주석을 해제해주세요! */}
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
        <code className={styles.filePath}>
          src/features/JsxBasics/Exercise.jsx
        </code>
      </div>

      <div className={styles.hint}>
        <p>
          💡 JSX 규칙: 최상위 요소는 하나로 감싸기, 모든 태그는 닫기 (
          <code>&lt;input /&gt;</code>), HTML class 대신 <code>className</code>{' '}
          사용하세요!
        </p>
      </div>
    </div>
  );
}
