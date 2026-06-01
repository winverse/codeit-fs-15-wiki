import './TodoApp.css';

// 자식 컴포넌트는 부모가 넘겨준 데이터를 props 객체로 받습니다.
// { text }는 props 객체에서 text 속성만 바로 꺼내 쓰겠다는 의미입니다. (구조 분해 할당)
function TodoItem({ text }) {
  return <li className="todo-item">{text}</li>;
}

function App() {
  const todos = [
    '리액트 기초 배우기',
    'Props 이해하기',
    'To-Do List 만들어보기',
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
        <ul className="todo-list">
          {/* 배열의 map 함수를 이용해 동적으로 TodoItem 컴포넌트 렌더링 */}
          {todos.map((todoText, index) => (
            // 자식에게 "text"라는 이름으로 todoText 변수를 전달합니다.
            // key prop은 React가 목록을 효율적으로 관리하기 위해 필요합니다.
            <TodoItem key={index} text={todoText} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
