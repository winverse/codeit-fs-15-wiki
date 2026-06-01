export default function Header({ page, setPage }) {
  const isLoggedIn = true;
  const user = { name: '상현' };

  const totalCount = 0; // ✅ 아직 store 연결 안 됨

  return (
    <div className="header">
      <div className="row" style={{ alignItems: 'center' }}>
        <strong style={{ fontSize: 18 }}>Zustand Mini Shop</strong>
        <span className="badge small">🛒 {totalCount}개</span>
      </div>

      <div className="row" style={{ alignItems: 'center' }}>
        <button
          className={'btn ' + (page === 'shop' ? 'btnPrimary' : '')}
          onClick={() => setPage('shop')}
        >
          상품
        </button>
        <button
          className={'btn ' + (page === 'cart' ? 'btnPrimary' : '')}
          onClick={() => setPage('cart')}
        >
          장바구니
        </button>

        <span className="badge small">
          {isLoggedIn ? `👤 ${user.name}` : '🔒 로그아웃 상태'}
        </span>
      </div>
    </div>
  );
}
