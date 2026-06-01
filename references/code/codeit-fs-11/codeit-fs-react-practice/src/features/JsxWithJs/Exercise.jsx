// ✋ JSX에서 JavaScript를 사용해보세요!

// TODO 1: title 변수를 JSX에서 출력하세요
// TODO 2: 오늘 날짜를 표시하세요
// TODO 3: 조건부 렌더링을 구현하세요

import './TodoApp.css';

function TodoApp() {
  const title = '오늘의 할 일';
  const todos = ['리액트 기초 배우기', 'JSX와 JavaScript 이해하기'];

  return (
    <div className="app-container">
      <div className="title-container">
        {/* TODO 1: {title} 변수를 사용하여 제목 출력 */}
        <h1 className="title">제목을 여기에 표시하세요</h1>

        {/* TODO 2: new Date().toLocaleDateString()을 사용하여 오늘 날짜 출력 */}
        <p className="today">오늘은 날짜를 여기에 표시하세요 입니다.</p>
      </div>

      <section className="input-section">
        <input type="text" placeholder="새로운 할 일을 입력하세요" />
        <button>추가</button>
      </section>

      <section className="list-section">
        {/* TODO 3: todos.length === 0 조건으로 삼항 연산자 사용
            - 할 일이 없으면: "할 일이 없어요! 새 할 일을 추가해보세요." 메시지
            - 할 일이 있으면: ul 목록 표시
        */}
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {todo}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default TodoApp;
