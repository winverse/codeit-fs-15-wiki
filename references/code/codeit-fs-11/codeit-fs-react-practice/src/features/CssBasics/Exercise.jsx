// ✋ CSS 스타일을 적용해보세요!
// TODO: CSS 파일을 import하고 className을 적용하세요

// TODO 1: './TodoApp.css' 파일을 import 하세요

function TodoApp() {
  return (
    // TODO 2: className="app-container" 추가
    <div>
      {/* TODO 3: className="title" 추가 */}
      <h1>오늘의 할 일</h1>

      {/* TODO 4: className="input-section" 추가 */}
      <section>
        <input type="text" placeholder="새로운 할 일을 입력하세요" />
        <button>추가</button>
      </section>

      {/* TODO 5: className="list-section" 추가 */}
      <section>
        {/* TODO 6: className="todo-list" 추가 */}
        <ul>
          <li>리액트 기초 배우기</li>
          <li>CSS 스타일 적용하기</li>
        </ul>
      </section>
    </div>
  );
}

export default TodoApp;
