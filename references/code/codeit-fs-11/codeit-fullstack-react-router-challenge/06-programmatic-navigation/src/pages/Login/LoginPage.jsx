import { useNavigate } from 'react-router';

export function LoginPage() {
  // TODO: useNavigate 훅을 호출하여 navigate 함수를 가져오세요.

  function handleLogin() {
    // 실제로는 아이디/비밀번호 확인 및 서버와의 통신이 필요하겠지만,
    // 이 예제에서는 버튼 클릭 시 무조건 로그인이 성공했다고 가정합니다.
    alert('로그인 성공! 대시보드로 이동합니다.');

    // TODO: 로그인 성공 후 /dashboard 경로로 페이지를 이동시키세요.
  }

  return (
    <div className="container">
      <div className="auth-card">
        <h2>🔐 로그인</h2>
        <p>
          아래 버튼을 누르면 로그인이 성공하면서 대시보드 페이지로 자동
          이동합니다.
        </p>
        <button onClick={handleLogin} className="primary-button">
          로그인하기
        </button>
      </div>

      <div className="feature-highlight">
        <h4>💡 TODO: useNavigate 구현</h4>
        <p>
          navigate('/dashboard')를 사용하여 로그인 성공 후 대시보드로 이동하는
          기능을 구현해보세요.
        </p>
      </div>
    </div>
  );
}
