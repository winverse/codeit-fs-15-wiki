import { Routes, Route, Navigate } from 'react-router';
import { PostPage } from './features/post/PostPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />} />
      <Route path="/posts" element={<PostPage />} />
    </Routes>
  );
}
