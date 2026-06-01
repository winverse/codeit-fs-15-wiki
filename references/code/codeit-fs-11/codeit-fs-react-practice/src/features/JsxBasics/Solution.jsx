// ✅ 정답 코드입니다
// 막히면 참고하세요!

function TodoApp() {
  return (
    // JSX 규칙 1: 모든 요소는 하나의 부모 요소로 감싸져야 합니다
    <div>
      <h1>오늘의 할 일</h1>

      {/* 할 일 입력 섹션 */}
      <section>
        {/* JSX 규칙 2: 태그는 항상 닫아주어야 합니다 (셀프 클로징) */}
        <input type="text" placeholder="새로운 할 일을 입력하세요" />
        <button>추가</button>
      </section>

      {/* 할 일 목록 섹션 */}
      <section>
        {/* JSX 규칙 3: class가 아닌 className을 사용합니다 */}
        <ul className="todo-list">
          <li>리액트 기초 배우기</li>
          <li>JSX 규칙 이해하기</li>
        </ul>
      </section>
    </div>
  );
}

export default TodoApp;
