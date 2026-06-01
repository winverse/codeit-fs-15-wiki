// ✅ 정답 코드입니다

import './TodoApp.css';

function TodoApp() {
  const title = '오늘의 할 일';
  const todos = ['리액트 기초 배우기', 'JSX와 JavaScript 이해하기'];

  return (
    <div className="app-container">
      <div className="title-container">
        {/* 변수 값 출력 */}
        <h1 className="title">{title}</h1>

        {/* 함수 실행 결과 출력 */}
        <p className="today">
          오늘은 {new Date().toLocaleDateString()} 입니다.
        </p>
      </div>

      <section className="input-section">
        <input type="text" placeholder="새로운 할 일을 입력하세요" />
        <button>추가</button>
      </section>

      <section className="list-section">
        {/* 조건부 렌더링: 삼항 연산자 사용 */}
        {todos.length === 0 ? (
          <p className="no-todos">할 일이 없어요! 새 할 일을 추가해보세요.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <li key={index} className="todo-item">
                {todo}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default TodoApp;
