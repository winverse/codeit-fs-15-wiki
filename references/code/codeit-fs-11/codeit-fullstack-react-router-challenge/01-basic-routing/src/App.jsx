import { Routes, Route, Link } from 'react-router';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
// TODO: ServicesPage를 import 하세요
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.app}>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {/* TODO: Services 페이지로의 링크를 추가하세요 */}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* TODO: /services 경로에 대한 Route를 추가하세요 */}
        </Routes>
      </main>
    </div>
  );
}
