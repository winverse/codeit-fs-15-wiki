import { useNavigate } from 'react-router';

export function DashboardPage() {
  const navigate = useNavigate();

  function handleLogout() {
    // useNavigate에 -1을 전달하면 "뒤로 가기"와 동일하게 동작합니다.
    // 여기서는 로그아웃 후 홈으로 가는 것이 더 적절하므로, 홈 경로를 직접 지정합니다.
    navigate('/');
  }

  return (
    <div className="container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2>📊 대시보드</h2>
          <button onClick={handleLogout} className="secondary-button">
            로그아웃
          </button>
        </div>

        <div className="welcome-section">
          <span className="icon">👋</span>
          <h3>환영합니다!</h3>
          <p>로그인한 사용자만 볼 수 있는 페이지입니다.</p>
        </div>

        <div className="feature-highlight">
          <h4>✅ 구현 완료</h4>
          <p>
            navigate('/')를 사용하여 로그아웃 후 홈으로 이동하는 기능이 구현되어
            있습니다.
          </p>
        </div>

        <div className="feature-highlight">
          <h4>💡 replace 옵션 활용</h4>
          <p>
            navigate('/', {'{ replace: true }'})를 사용하면 뒤로가기를 눌렀을 때
            다시 대시보드로 돌아오는 것을 막을 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
