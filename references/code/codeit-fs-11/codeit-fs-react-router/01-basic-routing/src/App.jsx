import { Routes, Route, Link } from 'react-router';
import styles from './App.module.css';
import { HomePage } from './features/home/HomePage';
import { AboutPage } from './features/about/AboutPage';

export function App() {
  return (
    <div className={styles.app}>
      <header>
        <nav>
          <Link to="/">홈</Link>
          <Link to="/about">소개</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
}
