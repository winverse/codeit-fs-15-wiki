import { products } from '@/data/products';

export default function ProductList() {
  const isLoggedIn = true;
  const addItem = () => {}; // ✅ 아직 store 연결 안 됨

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>상품 목록</h2>
      <p className="muted">지금은 “담기”가 동작하지 않는 시작 상태입니다.</p>

      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card" style={{ borderRadius: 10 }}>
            <p className="itemTitle">{product.name}</p>
            <p className="muted">{product.price.toLocaleString()}원</p>
            <button
              className="btn btnPrimary"
              disabled={!isLoggedIn}
              onClick={() => addItem(product)}
            >
              장바구니 담기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
