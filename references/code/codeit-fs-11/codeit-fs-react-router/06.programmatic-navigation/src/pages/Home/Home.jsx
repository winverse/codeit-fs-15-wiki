import { Link } from 'react-router';

export function Home() {
  return (
    <div className="container">
      <div className="hero-section">
        <h1>Programmatic-navigation</h1>
        <p>
          useNavigate 훅을 사용하여 프로그래밍 방식으로 페이지를 이동하는 방법을
          학습해보세요.
        </p>
      </div>

      <div className="welcome-section">
        <span className="icon">🚀</span>
        <h2>시작하기</h2>
        <p>로그인 페이지에서 useNavigate 훅의 동작을 확인해보세요.</p>
        <Link to="/login" className="primary-button">
          로그인 페이지로 가기
        </Link>
      </div>

      <div className="feature-highlight">
        <h4>🎯 학습 목표</h4>
        <p>
          이 예제에서는 로그인 성공 후 자동으로 대시보드로 이동하고, 로그아웃 시
          홈으로 돌아가는 네비게이션을 구현합니다.
        </p>
      </div>
    </div>
  );
}
