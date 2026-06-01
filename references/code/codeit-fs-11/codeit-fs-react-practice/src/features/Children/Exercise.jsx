// ✋ props.children을 사용해보세요!

// TODO 1: Panel 컴포넌트에서 children을 받아 렌더링하기
// TODO 2: App 컴포넌트에서 Panel로 섹션들을 감싸기

import './App.css';

// TODO 1: children을 매개변수로 받고, section 안에 {children} 렌더링하세요
function Panel(/* 여기에 children을 받으세요 */) {
  return (
    <section className="panel">
      {/* TODO: 여기에 children을 렌더링하세요 */}
    </section>
  );
}

function App() {
  const todos = [
    { id: 1, text: '리액트 기초 배우기' },
    { id: 2, text: 'Children 이해하기' },
    { id: 3, text: 'To-Do List 만들어보기' },
  ];

  return (
    <div className="app-container">
      <h1 className="title">오늘의 할 일</h1>

      {/* TODO 2: Panel 컴포넌트로 입력 구역을 감싸세요
          힌트: <Panel> ... </Panel>
      */}
      <section className="input-section">
        <input type="text" placeholder="새로운 할 일을 입력하세요" />
        <button>추가</button>
      </section>

      {/* TODO 2: Panel 컴포넌트로 목록 구역을 감싸세요 */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
