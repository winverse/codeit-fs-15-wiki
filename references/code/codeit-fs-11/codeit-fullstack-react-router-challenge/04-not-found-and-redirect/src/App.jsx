import { Routes, Route, Link } from 'react-router';
import { HomePage } from './pages/Home';
import { ProfilePage } from './pages/Profile';
// TODO: NotFoundPage를 import 해주세요.

export function App() {
  return (
    <div className="app">
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* TODO: /old-home 경로로 접속하면 / 로 리다이렉트 시키세요. */}
          {/* HINT: Navigate 컴포넌트를 사용하고, replace prop을 true로 설정하세요. */}

          {/* TODO: 위의 어떤 경로와도 일치하지 않으면 NotFoundPage를 보여주세요. */}
          {/* HINT: path="*" 를 사용하면 모든 경로와 일치시킬 수 있습니다. */}
        </Routes>
      </main>
    </div>
  );
}
