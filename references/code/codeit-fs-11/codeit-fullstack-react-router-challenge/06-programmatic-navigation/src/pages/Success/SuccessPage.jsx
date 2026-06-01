import { Link } from 'react-router';

export function SuccessPage() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>✅ 제출 성공!</h2>
        <p>문의해주셔서 감사합니다. 빠른 시일 내에 답변드리겠습니다.</p>
        <Link
          to="/"
          className="submit-button"
          style={{ textDecoration: 'none' }}
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
