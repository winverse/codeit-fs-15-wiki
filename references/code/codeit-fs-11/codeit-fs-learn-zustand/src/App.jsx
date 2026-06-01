import { useState } from 'react';
import Header from './components/Header.jsx';
import ProductList from './components/ProductList.jsx';
import Cart from './components/Cart.jsx';

export default function App() {
  const [page, setPage] = useState('shop');

  return (
    <div className="container">
      <Header page={page} setPage={setPage} />
      {page === 'shop' ? <ProductList /> : <Cart />}
    </div>
  );
}
