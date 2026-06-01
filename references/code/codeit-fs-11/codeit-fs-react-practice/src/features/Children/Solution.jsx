import './App.css';

// Panel 컴포넌트: children을 받아서 감싸는 레이아웃 역할
function Panel({ children }) {
  return <section className="panel">{children}</section>;
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

      {/* Panel로 입력 구역을 감싸기 */}
      <Panel>
        <section className="input-section">
          <input type="text" placeholder="새로운 할 일을 입력하세요" />
          <button>추가</button>
        </section>
      </Panel>

      {/* Panel로 목록 구역을 감싸기 */}
      <Panel>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              {todo.text}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

export default App;
