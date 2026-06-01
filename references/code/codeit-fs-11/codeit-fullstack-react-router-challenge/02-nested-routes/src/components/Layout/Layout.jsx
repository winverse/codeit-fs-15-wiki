import { NavLink, Outlet } from 'react-router';
import styles from './Layout.module.css';

export function Layout() {
  return (
    <div className={styles.app}>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Products
        </NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
