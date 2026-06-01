import Exercise from './Exercise/Exercise';
import Solution from './Solution/Solution';
import styles from './CssModule.module.css';

export default function CssModule() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🎨 CSS Module</h1>
      </div>

      <div className={styles.goal}>
        <h2 className={styles.goalTitle}>📌 목표</h2>
        <p className={styles.goalText}>
          일반 CSS의 전역 스타일 오염 문제를 CSS Module로 해결해보세요.
        </p>
        <ul className={styles.requirements}>
          <li>일반 CSS 파일(.css)을 CSS Module 파일(.module.css)로 변경하기</li>
          <li>
            CSS Module을 import 하기 (import styles from './파일.module.css')
          </li>
          <li>
            className을 CSS Module 방식으로 변경하기
            (className=&#123;styles.클래스명&#125;)
          </li>
          <li>
            조건부 클래스명 적용하기 (className=&#123;`$&#123;styles.base&#125;
            $&#123;condition ? styles.active : ''&#125;`&#125;)
          </li>
        </ul>
      </div>

      <div className={styles.preview}>
        <h2 className={styles.previewTitle}>🔍 현재 모습 (일반 CSS)</h2>
        <div className={styles.previewBox}>
          <Exercise />
        </div>
      </div>

      <div className={styles.preview}>
        <h2 className={styles.previewTitle}>✅ 완성 결과 (CSS Module)</h2>
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
          src/features/CssModule/Exercise/Exercise.jsx
        </p>
      </div>

      <div className={styles.hint}>
        <strong>💡 힌트</strong>
        <br />
        <br />
        <strong>일반 CSS의 문제점:</strong>
        <br />
        • 모든 클래스명이 전역으로 등록되어 다른 파일에서도 사용 가능
        <br />
        • Panel.css에서 정의한 .red 클래스가 TodoItem.jsx에서도 적용됨
        <br />
        • 클래스명 충돌로 인한 버그 발생 가능
        <br />
        <br />
        <strong>CSS Module의 해결책:</strong>
        <br />
        • 파일명을 *.module.css로 변경
        <br />
        • import styles from './파일.module.css'로 import
        <br />
        • className=&#123;styles.클래스명&#125; 형태로 사용
        <br />
        • 빌드 시 클래스명이 고유한 이름으로 자동 변환됨 (예: todoText →
        TodoItem_todoText__a1b2c)
        <br />• 컴포넌트별로 스타일이 격리되어 충돌 방지!
      </div>
    </div>
  );
}
