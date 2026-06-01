import { Link } from 'react-router';

export function HomePage() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Dynamic Head 챌린지</h1>
        <p>
          각 페이지에 방문하여 브라우저 탭의 제목과 개발자 도구의 `head` 태그
          변화를 확인해보세요.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/portfolio" className="back-link">
          포트폴리오 페이지로
        </Link>
        <Link to="/contact" className="back-link">
          문의하기 페이지로
        </Link>
      </div>
    </div>
  );
}
