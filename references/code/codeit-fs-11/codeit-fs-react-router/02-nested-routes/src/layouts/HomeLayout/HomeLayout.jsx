import { NavLink, Outlet } from 'react-router';
import styles from './HomeLayout.module.css';

export function HomeLayout() {
  return (
    <div className={styles.app}>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          홈
        </NavLink>
        <NavLink
          to="/community"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          커뮤니티
        </NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
