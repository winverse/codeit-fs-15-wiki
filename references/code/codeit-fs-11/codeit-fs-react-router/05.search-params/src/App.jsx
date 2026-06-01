import { Routes, Route } from 'react-router';
import { Search } from './pages/Search';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
    </Routes>
  );
}
