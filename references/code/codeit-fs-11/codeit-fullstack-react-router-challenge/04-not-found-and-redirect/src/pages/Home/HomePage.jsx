import { Link } from 'react-router';
import styles from './Home.module.css';

export function HomePage() {
  return (
    <div className={styles.page}>
      <h1>홈 페이지</h1>
      <nav>
        <ul>
          <li>
            <Link to="/profile">프로필 페이지</Link>
          </li>
          <li>
            <Link to="/old-home">옛날 홈 페이지 (리다이렉트 테스트)</Link>
          </li>
          <li>
            <Link to="/this-page-does-not-exist">없는 페이지 (404 테스트)</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
