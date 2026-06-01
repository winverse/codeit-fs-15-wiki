// ✋ 여기서 JSX 실습을 진행하세요!
// 아래 주석을 보고 코드를 작성해보세요.

function Exercise() {
  return (
    // TODO 1: 모든 요소를 하나의 <div>로 감싸주세요
    // TODO 2: <input /> 태그를 셀프 클로징 형태로 작성하세요
    // TODO 3: class 속성을 className으로 변경하세요

    // 👇 여기부터 코드를 작성하세요
    <div>
      <h1>오늘의 할 일</h1>
      // 할 일 입력 섹션
      <section>
        <input type="text" placeholder="새로운 할 일을 입력하세요" />
        <button>추가</button>
      </section>
      // 할 일 목록 섹션
      <section>
        <ul class="todo-list">
          <li>리액트 기초 배우기</li>
          <li>JSX 규칙 이해하기</li>
        </ul>
      </section>
    </div>
    // 👆 여기까지
  );
}

export default Exercise;
