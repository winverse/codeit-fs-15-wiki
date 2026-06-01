import { Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/Home';
// TODO: ProductsPage import 하세요
// TODO: ProductsHomePage를 import 하세요
// TODO: CategoryPage를 import 하세요

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<HomePage />} />
        {/* TODO: 1. /products 경로에 중첩 라우팅을 설정하세요 element={<ProductsPage />}*/}
        {/* TODO: 2. /productis 내부에 index route를 추가하세요 (ProductsHomePage) */}
        {/* TODO: 3. /productis 내부에 category 경로를 추가하세요 (CategoryPage) */}
      </Route>
    </Routes>
  );
}
