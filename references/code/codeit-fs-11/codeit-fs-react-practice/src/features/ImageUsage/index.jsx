import Exercise from './Exercise';
import Solution from './Solution';
import styles from './ImageUsage.module.css';

export default function ImageUsage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🖼️ 이미지 사용하기</h1>
      </div>

      <div className={styles.goal}>
        <h2 className={styles.goalTitle}>📌 목표</h2>
        <p className={styles.goalText}>
          React에서 이미지 파일을 import해서 사용하는 방법을 배워보세요.
        </p>
        <ul className={styles.requirements}>
          <li>SVG 파일을 import 하기</li>
          <li>img 태그에 import한 이미지 사용하기</li>
          <li>삭제 버튼에 trash 아이콘 적용하기</li>
        </ul>
      </div>

      <div className={styles.preview}>
        <h2 className={styles.previewTitle}>🔍 현재 모습</h2>
        <div className={styles.previewBox}>
          <Exercise />
        </div>
      </div>

      <div className={styles.preview}>
        <h2 className={styles.previewTitle}>✅ 완성 결과</h2>
        <div className={styles.previewBox}>
          <Solution />
        </div>
      </div>

      <div className={styles.fileBox}>
        <div className={styles.fileHeader}>
          <span className={styles.fileIcon}>📁</span>
          <span className={styles.fileName}>작업 파일</span>
        </div>
        <p className={styles.filePath}>src/features/ImageUsage/Exercise.jsx</p>
      </div>

      <div className={styles.hint}>
        <strong>💡 힌트</strong>
        <br />
        <br />
        이미지 파일도 JS 모듈처럼 import할 수 있습니다.
        <br />
        import한 변수를 img 태그의 src 속성에 넣으면 됩니다.
        <br />
        <br />
        <strong>참고:</strong> react-icons 라이브러리를 사용하면 더 다양한
        아이콘을 쉽게 사용할 수 있습니다!
        <br />
        설치: npm install react-icons
        <br />
        사용: import &#123; FaTrash &#125; from 'react-icons/fa'; → &lt;FaTrash
        /&gt;
      </div>
    </div>
  );
}
