import { Link } from 'react-router';

export function Home() {
  return (
    <div className="page-content">
      <div className="hero-section">
        <h1>React Router 학습</h1>
        <p>동적 헤드 관리와 SEO 최적화를 배워보세요</p>
        <p className="hero-description">
          현재 페이지의 제목은 "홈 - React Router 학습"입니다. 브라우저 탭을
          확인해보세요.
        </p>
      </div>

      <div className="navigation-cards">
        <Link to="/about" className="nav-card">
          <span className="nav-card-icon">ℹ️</span>
          <h3>소개 페이지</h3>
          <p>
            React Router 학습 사이트 소개와 동적 헤드 관리에 대해 알아보세요.
          </p>
        </Link>
      </div>

      <div className="features-section">
        <h2>학습할 내용</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h4>🎯 동적 헤드 관리</h4>
            <p>react-helmet-async를 사용한 페이지별 헤드 정보 설정</p>
          </div>
          <div className="feature-item">
            <h4>🔍 SEO 최적화</h4>
            <p>메타 태그와 오픈그래프를 통한 검색 엔진 최적화</p>
          </div>
          <div className="feature-item">
            <h4>📱 반응형 디자인</h4>
            <p>모든 디바이스에서 최적화된 사용자 경험</p>
          </div>
        </div>
      </div>
    </div>
  );
}
