export function ContactPage() {
  // TODO 1: useNavigate 훅을 호출하여 navigate 함수를 가져오세요.

  const handleSubmit = (event) => {
    event.preventDefault();
    // 이 예제에서는 폼 데이터 처리 로직은 생략하고, 제출 즉시 성공했다고 가정합니다.
    alert('문의가 성공적으로 제출되었습니다!');

    // TODO 2: "/success" 경로로 페이지를 이동시키세요.
    // HINT: replace: true 옵션을 사용하여, 뒤로가기 시 이 페이지로 돌아오지 않도록 합니다.
  };

  return (
    <div className="container">
      <div className="card">
        <h2>문의하기</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input type="text" id="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">문의 내용</label>
            <textarea id="message" rows="4"></textarea>
          </div>
          <button type="submit" className="submit-button">
            제출
          </button>
        </form>
      </div>
    </div>
  );
}
