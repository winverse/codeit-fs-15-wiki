import { Link } from 'react-router';
import styles from './Profile.module.css';

export function ProfilePage() {
  return (
    <div className={styles.page}>
      <h2>프로필 페이지</h2>
      <p>여기는 현재 사용자의 프로필 페이지입니다.</p>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
}
