import { Routes, Route } from 'react-router';
import { HomePage } from './pages/Home';
import { ContactPage } from './pages/Contact';
import { SuccessPage } from './pages/Success';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}
