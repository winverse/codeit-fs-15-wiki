// ✅ 정답 코드입니다

import './TodoApp.css'; // CSS 파일 불러오기

function TodoApp() {
  return (
    <div className="app-container">
      <h1 className="title">오늘의 할 일</h1>

      <section className="input-section">
        <input type="text" placeholder="새로운 할 일을 입력하세요" />
        <button>추가</button>
      </section>

      <section className="list-section">
        <ul className="todo-list">
          <li>리액트 기초 배우기</li>
          <li>CSS 스타일 적용하기</li>
        </ul>
      </section>
    </div>
  );
}

export default TodoApp;
