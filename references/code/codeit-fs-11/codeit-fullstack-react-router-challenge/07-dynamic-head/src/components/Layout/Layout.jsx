import { NavLink, Outlet } from 'react-router';

export function Layout() {
  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
