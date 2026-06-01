import './TodoApp.css';

// TodoItems 컴포넌트: 여러 개의 li를 반환
function TodoItems({ todos }) {
  return (
    // ✅ Fragment를 사용하면 li만 그룹화되어 반환됩니다.
    // DOM에 아무 흔적도 남기지 않고, ul > li 구조를 유지합니다.
    <>
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          {todo.text}
        </li>
      ))}
    </>
  );
}

function App() {
  const todos = [
    { id: 1, text: '리액트 기초 배우기' },
    { id: 2, text: 'Fragment 이해하기' },
    { id: 3, text: 'To-Do List 만들어보기' },
  ];

  return (
    <div className="app-container">
      <div className="title-container">
        <h1 className="title">오늘의 할 일</h1>
        <p className="today">{new Date().toLocaleDateString()}</p>
      </div>

      <section className="input-section">
        <input type="text" placeholder="새로운 할 일을 입력하세요" />
        <button>추가</button>
      </section>

      <section className="list-section">
        {/* ul 태그는 직계 자식으로 li만 가져야 합니다 */}
        <ul className="todo-list">
          <TodoItems todos={todos} />
        </ul>
      </section>

      <div className="hint-box">
        <p>✅ 개발자 도구(F12)로 HTML 구조를 확인해보세요!</p>
        <p>
          Fragment 덕분에: <code>&lt;ul&gt; → &lt;li&gt;</code> 구조가 올바르게
          유지됩니다.
        </p>
      </div>
    </div>
  );
}

export default App;
