import { Link } from 'react-router';

export function ContactPage() {
  return (
    <div className="page-content">
      <title>문의하기 - React Router 학습</title>
      {/* TODO: 여기에 노션을 보고, 헤드 정보를 추가하세요 */}

      <div className="page-header">
        <h1>문의하기</h1>
        <p>
          이 페이지의 헤드 정보를 확인하여, title과 description이 잘
          적용되었는지 확인해보세요.
        </p>
      </div>

      <Link to="/" className="back-link">
        홈 페이지로 이동
      </Link>
    </div>
  );
}
