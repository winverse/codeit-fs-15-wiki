import { Routes, Route, Navigate } from 'react-router';
import { ProductListPage } from './pages/ProductListPage';
// TODO: ProductDetailPage를 import 하세요

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductListPage />} />
      {/* TODO: /products/:productId 동적 경로를 설정하세요 */}
    </Routes>
  );
}
