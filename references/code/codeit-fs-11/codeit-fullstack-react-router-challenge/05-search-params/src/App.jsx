import { Routes, Route } from 'react-router';
import { SearchPage } from './pages/Search';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
    </Routes>
  );
}
