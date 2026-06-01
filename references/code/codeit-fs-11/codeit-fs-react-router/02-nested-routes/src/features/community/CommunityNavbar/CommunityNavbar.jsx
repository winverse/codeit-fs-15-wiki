import { NavLink, Outlet } from 'react-router';
import styles from './CommunityNavbar.module.css';

export function CommunityNavbar() {
  return (
    <div className={styles.page}>
      <h2>커뮤니티</h2>
      <nav>
        <NavLink to="/community" end>
          글 목록
        </NavLink>
        <NavLink to="/community/new-post">글쓰기</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
