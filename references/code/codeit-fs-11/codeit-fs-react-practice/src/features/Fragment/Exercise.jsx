// ✋ Fragment를 사용해보세요!

// TODO: div를 Fragment로 바꾸세요!
// Fragment는 <> ... </> 또는 <Fragment> ... </Fragment>로 사용할 수 있습니다.

import './TodoApp.css';

// TodoItems 컴포넌트: 여러 개의 li를 반환
function TodoItems({ todos }) {
  return (
    // ❌ 문제: div로 감싸면 ul > div > li 구조가 되어 HTML 규칙 위반!
    // TODO: 이 div를 Fragment(<>...</>)로 바꾸세요
    <div>
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          {todo.text}
        </li>
      ))}
    </div>
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
        <p>💡 개발자 도구(F12)로 HTML 구조를 확인해보세요!</p>
        <p>
          div로 감싸면: <code>&lt;ul&gt; → &lt;div&gt; → &lt;li&gt;</code>
        </p>
        <p>
          Fragment로 감싸면: <code>&lt;ul&gt; → &lt;li&gt;</code>
        </p>
      </div>
    </div>
  );
}

export default App;
