# Day 26. DOM 이벤트 기본

### 오늘의 목표

DOM 이벤트는 브라우저 UI 코드의 핵심입니다. 오늘은 `EventTarget`, `addEventListener`,
`dispatchEvent`, `target`, `currentTarget`, `preventDefault`를 복습하고, TypeScript에서
`EventTarget | null`을 구체 DOM 요소 타입으로 안전하게 좁히는 방법을 정리합니다.

### 레퍼런스 연결

- 이벤트 챕터 복습
- 핵심 복습 포인트: event listener, event object, `target`, `currentTarget`, `preventDefault`
- 다시 볼 질문: 이벤트 객체 타입을 안전하게 좁히려면 어떤 런타임 검사가 필요할까?

### 문제 1. 기본

다음 코드의 실행 결과를 순서대로 작성하세요.

```jsx
const target = new EventTarget();

target.addEventListener("ready", () => console.log("ready"));

console.log(target.dispatchEvent(new Event("ready")));
```

- 정답과 해설
    
    ### 정답
    
    ```
    ready
    true
    ```
    
    ### 해설
    
    `addEventListener("ready", ...)`는 `ready` 타입의 이벤트가 발생했을 때 실행할 리스너를
    등록합니다.
    
    `target.dispatchEvent(new Event("ready"))`를 호출하면 등록된 리스너가 동기적으로 실행됩니다.
    그래서 먼저 `"ready"`가 출력됩니다.
    
    `dispatchEvent`는 이벤트가 취소되지 않았으면 `true`를 반환합니다. 이 이벤트는 취소 가능한
    이벤트도 아니고, 리스너에서 `preventDefault`를 호출하지도 않았으므로 `true`가 출력됩니다.
    
    실제 브라우저 DOM에서도 이벤트 리스너는 비동기 Promise 콜백처럼 나중에 실행되는 것이 아니라,
    `dispatchEvent`로 직접 발생시킨 경우 현재 호출 흐름 안에서 동기적으로 실행됩니다.
    

### 문제 2. 중급

다음 코드의 실행 결과를 순서대로 작성하고, `target`과 `currentTarget`의 차이를 설명하세요.

```jsx
const target = new EventTarget();

target.addEventListener("save", (event) => {
  console.log(event.type);
  console.log(event.target === target);
  console.log(event.currentTarget === target);
});

target.dispatchEvent(new Event("save"));
```

- 정답과 해설
    
    ### 정답
    
    ```
    save
    true
    true
    ```
    
    ### 해설
    
    `event.type`은 이벤트 타입 문자열입니다. 여기서는 `"save"` 이벤트를 발생시켰으므로
    `"save"`가 출력됩니다.
    
    `event.target`은 이벤트가 원래 발생한 대상입니다. 이 예제에서는 `target.dispatchEvent(...)`로
    직접 이벤트를 발생시켰으므로 `event.target === target`은 `true`입니다.
    
    `event.currentTarget`은 현재 리스너가 등록되어 실행 중인 대상입니다. 리스너가 `target`에
    등록되어 있으므로 `event.currentTarget === target`도 `true`입니다.
    
    이 단순 예제에서는 둘이 같지만, 브라우저 DOM에서 이벤트 버블링이 일어나면 달라질 수 있습니다.
    예를 들어 버튼에서 이벤트가 시작되어 부모 요소의 리스너에서 처리될 때, `target`은 버튼이고
    `currentTarget`은 부모 요소일 수 있습니다.
    

### 문제 3. 중급

다음 코드의 실행 결과를 순서대로 작성하고, `preventDefault`와 `dispatchEvent` 반환값의 관계를
설명하세요.

```jsx
const target = new EventTarget();

target.addEventListener("check", (event) => {
  event.preventDefault();
  console.log(event.defaultPrevented);
});

const result = target.dispatchEvent(new Event("check", { cancelable: true }));

console.log(result);

const result2 = target.dispatchEvent(new Event("check", { cancelable: false }));

console.log(result2);
```

- 정답과 해설
    
    ### 정답
    
    ```
    true
    false
    false
    true
    ```
    
    ### 해설
    
    첫 번째 이벤트는 `{ cancelable: true }`로 만들어졌습니다. 리스너 안에서
    `event.preventDefault()`를 호출하면 기본 동작 취소 상태가 됩니다.
    
    그래서 첫 번째 리스너 실행 중 `event.defaultPrevented`는 `true`입니다.
    
    취소 가능한 이벤트가 `preventDefault`로 취소되면 `dispatchEvent`는 `false`를 반환합니다.
    따라서 `result`는 `false`입니다.
    
    두 번째 이벤트는 `{ cancelable: false }`입니다. 같은 리스너가 실행되어 `preventDefault()`를
    호출하지만, 취소 불가능한 이벤트이므로 `defaultPrevented`는 `false`입니다.
    
    취소되지 않았으므로 두 번째 `dispatchEvent` 반환값은 `true`입니다.
    
    `preventDefault`는 모든 이벤트에 항상 같은 효과를 내지 않습니다. 이벤트가 cancelable인지
    확인해야 합니다.
    

### 문제 4. 심화

다음 코드는 이벤트 대상에서 입력값을 읽으려고 합니다. 실행 결과를 예측하고, 이 코드의
문제점을 JS 관점과 TS 관점에서 설명한 뒤 브라우저 DOM에서 사용할 수 있는 TypeScript 코드로
개선하세요.

```jsx
function readInputValue(event) {
  const target = event.target;

  if (target && typeof target.value === "string") {
    return target.value.trim();
  }

  return null;
}

console.log(readInputValue({ target: { value: " Ada " } }));
console.log(readInputValue({ target: { textContent: "Ada" } }));
console.log(readInputValue({ target: null }));
```

- 정답과 해설
    
    ### 정답
    
    ```
    Ada
    null
    null
    ```
    
    브라우저 DOM에서 사용할 수 있는 TypeScript 예시는 다음과 같습니다.
    
    ```tsx
    function isValueTarget(target: EventTarget | null): target is HTMLInputElement {
      return target instanceof HTMLInputElement;
    }
    
    function readInputValue(inputEvent: Event): string | null {
      if (!isValueTarget(inputEvent.target)) {
        return null;
      }
    
      return inputEvent.target.value.trim();
    }
    
    // Browser usage example:
    // inputElement.addEventListener("input", (inputEvent) => {
    //   const value = readInputValue(inputEvent);
    //   console.log(value);
    // });
    ```
    
    ### 해설
    
    ### JS 관점
    
    첫 번째 호출의 `event.target`은 `{ value: " Ada " }`입니다. `target`이 존재하고
    `target.value`가 문자열이므로 `" Ada ".trim()`의 결과인 `"Ada"`가 반환됩니다.
    
    두 번째 호출의 `target`에는 `value`가 없고 `textContent`만 있습니다. `typeof target.value`는
    `"undefined"`이므로 조건을 통과하지 못하고 `null`이 반환됩니다.
    
    세 번째 호출의 `target`은 `null`입니다. 조건의 첫 부분 `target && ...`에서 실패하므로
    `null`이 반환됩니다.
    
    이 JavaScript 코드는 방어적으로 작성되어 있지만, 어떤 DOM 요소를 허용하는지 정책이 흐릿합니다.
    `value` 속성이 있는 모든 객체를 허용할 것인지, 실제 `HTMLInputElement`만 허용할 것인지
    명확히 해야 합니다.
    
    ### TS 관점
    
    브라우저 DOM 타입에서 `event.target`은 보통 `EventTarget | null`입니다. `EventTarget`은 매우
    넓은 타입이므로 `.value` 속성이 있다고 가정할 수 없습니다.
    
    개선 예시에서는 `isValueTarget` 타입 가드를 사용합니다. `target instanceof HTMLInputElement`를
    통과한 뒤에만 TypeScript가 `target`을 `HTMLInputElement`로 좁힙니다.
    
    그 이후에는 `inputEvent.target.value`를 안전하게 읽을 수 있습니다.
    
    검증은 TypeScript `--strict --noEmit --lib es2020,dom` 기준으로 수행합니다. 이 코드는 DOM
    타입을 사용하는 예시이므로 실제 실행은 브라우저 환경을 전제로 합니다.
    
    ### 실무 관점
    
    DOM 이벤트에서 자주 나오는 실수는 다음과 같습니다.
    
    1. `event.target`이 항상 원하는 요소라고 가정하는 것
    2. `target`이 `null`일 수 있음을 무시하는 것
    3. `EventTarget`에 DOM 요소 전용 속성이 있다고 가정하는 것
    4. 이벤트 위임 상황에서 `target`과 `currentTarget`을 혼동하는 것
    
    이벤트 핸들러에서는 먼저 어떤 요소에서 값을 읽을지 정책을 정하고, 런타임 검사와 타입 가드를
    함께 사용해야 합니다.
    

### 오늘의 생각 질문

이벤트 핸들러에서 `event.target as HTMLInputElement`처럼 단언으로 처리한 경험이 있나요?
언제 타입 단언이 괜찮고, 언제 `instanceof` 같은 런타임 좁히기가 꼭 필요할까요?