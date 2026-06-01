import { Routes, Route } from 'react-router';
import { HomePage } from './features/home/HomePage';
import { HomeLayout } from './layouts/HomeLayout/HomeLayout';
import { CommunityNavbar } from './features/community/CommunityNavbar';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index={true} element={<HomePage />} />
        <Route path="community" element={<CommunityNavbar />} />
      </Route>
    </Routes>
  );
}
