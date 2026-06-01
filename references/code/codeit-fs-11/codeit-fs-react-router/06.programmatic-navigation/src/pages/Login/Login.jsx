export function Login() {
  const handleLogin = () => {
    alert('로그인 성공! 대시보드로 이동합니다.');
  };

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
