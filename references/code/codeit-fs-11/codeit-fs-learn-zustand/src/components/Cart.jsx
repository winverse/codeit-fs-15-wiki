export default function Cart() {
  const items = []; // ✅ 아직 store 연결 안 됨

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>장바구니</h2>
      {items.length === 0 ? (
        <p className="muted">아직 담긴 상품이 없습니다.</p>
      ) : (
        <p>여기에 장바구니 UI가 렌더됩니다.</p>
      )}
    </div>
  );
}
