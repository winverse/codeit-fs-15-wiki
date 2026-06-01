import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
