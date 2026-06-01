# Day 28. CustomEvent와 이벤트 테스트

### 오늘의 목표

DOM 이벤트를 직접 발생시키는 방식은 UI 컴포넌트, 작은 이벤트 버스, 테스트 코드에서 자주
등장합니다. 오늘은 `EventTarget`, `Event`, `CustomEvent`, `detail`, `dispatchEvent`,
`removeEventListener`를 복습하고, TypeScript에서 커스텀 이벤트 payload를 어떻게 안전하게
표현할지 정리합니다.

### 레퍼런스 연결

- 이벤트 챕터 복습
- 핵심 복습 포인트: synthetic event, `CustomEvent`, `detail`, `dispatchEvent`, 리스너 해제
- 다시 볼 질문: 커스텀 이벤트로 모듈 간 결합을 줄일 때 어떤 규칙이 필요할까?

### 문제 1. 기본

다음 코드의 실행 결과를 작성하고, `dispatchEvent`의 반환값이 무엇을 의미하는지 설명하세요.

```jsx
const target = new EventTarget();

target.addEventListener("user:created", (event) => {
  console.log(event.type);
});

console.log(target.dispatchEvent(new Event("user:created")));
```

- 정답과 해설
    
    ### 정답
    
    ```
    user:created
    true
    ```
    
    ### 해설
    
    `EventTarget`은 이벤트 리스너를 등록하고 이벤트를 전달할 수 있는 객체입니다. 브라우저에서는
    `window`, `document`, DOM 요소들이 대표적인 `EventTarget`입니다.
    
    먼저 `"user:created"` 타입의 이벤트 리스너가 등록됩니다. 이후 `dispatchEvent(new Event("user:created"))`가 실행되면 등록된 리스너가 동기적으로 호출되고, 리스너 안의
    `console.log(event.type)`이 실행됩니다.
    
    따라서 첫 번째 출력은 이벤트 타입인 `"user:created"`입니다.
    
    `dispatchEvent`는 이벤트가 취소되지 않았으면 `true`를 반환합니다. 여기서는 `preventDefault`로
    취소 가능한 이벤트를 취소한 코드가 없으므로 `true`가 출력됩니다.
    
    중요한 점은 `dispatchEvent`가 비동기 큐에 넣는 함수가 아니라는 것입니다. 이벤트 리스너는
    `dispatchEvent` 호출 중에 바로 실행됩니다.
    

### 문제 2. 중급

다음 코드의 실행 결과를 작성하고, `CustomEvent`의 `detail`이 어떤 역할을 하는지 설명하세요.

```jsx
const target = new EventTarget();

target.addEventListener("message", (event) => {
  console.log(event.detail.text);
});

target.dispatchEvent(
  new CustomEvent("message", {
    detail: { text: "hello" },
  }),
);
```

- 정답과 해설
    
    ### 정답
    
    ```
    hello
    ```
    
    ### 해설
    
    일반 `Event`는 이벤트 타입, 버블링 여부, 취소 가능 여부 같은 이벤트 자체의 정보에 초점이
    있습니다. 반면 `CustomEvent`는 `detail`을 통해 이벤트와 함께 전달할 데이터를 넣을 수 있습니다.
    
    이 코드에서는 `"message"` 이벤트를 만들면서 `detail`에 `{ text: "hello" }`를 넣었습니다.
    
    리스너는 전달받은 `event.detail.text`를 출력합니다. 따라서 결과는 `"hello"`입니다.
    
    `detail`은 편리하지만, 아무 값이나 들어갈 수 있다는 점을 조심해야 합니다. JS에서는 런타임에
    `detail.text`가 실제로 있는지 보장되지 않습니다. TypeScript에서는 커스텀 이벤트별 payload
    타입을 따로 정의하거나, 이벤트 버스를 감싸는 래퍼를 만들어 타입을 좁히는 방식이 자주 쓰입니다.
    

### 문제 3. 중급

다음 코드의 실행 결과를 작성하고, `removeEventListener`가 동작하려면 무엇이 같아야 하는지
설명하세요.

```jsx
const target = new EventTarget();
let count = 0;

function handler() {
  count += 1;
}

target.addEventListener("ping", handler);
target.dispatchEvent(new Event("ping"));

target.removeEventListener("ping", handler);
target.dispatchEvent(new Event("ping"));

console.log(count);
```

- 정답과 해설
    
    ### 정답
    
    ```
    1
    ```
    
    ### 해설
    
    처음 `"ping"` 리스너로 `handler` 함수가 등록됩니다.
    
    첫 번째 `dispatchEvent(new Event("ping"))`가 실행되면 `handler`가 호출되고 `count`는 `1`이
    됩니다.
    
    그 다음 `removeEventListener("ping", handler)`가 실행됩니다. 이벤트 타입과 제거하려는 함수
    참조가 등록할 때와 같으므로 리스너가 제거됩니다.
    
    두 번째 `"ping"` 이벤트는 더 이상 실행할 리스너가 없으므로 `count`가 증가하지 않습니다. 마지막
    출력은 `1`입니다.
    
    실무에서 흔한 실수는 다음처럼 등록과 제거에 서로 다른 함수 객체를 넘기는 것입니다.
    
    ```jsx
    target.addEventListener("ping", () => count += 1);
    target.removeEventListener("ping", () => count += 1);
    ```
    
    두 화살표 함수는 코드가 같아 보여도 서로 다른 함수 객체입니다. 제거하려면 등록했던 함수 참조를
    보관해야 합니다.
    

### 문제 4. 심화

다음 코드는 `CustomEvent`를 이용해 작은 이벤트 버스처럼 동작합니다. 실행 결과를 예측하고, 이
구조를 JS 관점과 TS 관점에서 설명한 뒤 타입이 있는 이벤트 버스로 개선하세요.

```jsx
const bus = new EventTarget();

function emit(type, detail) {
  bus.dispatchEvent(new CustomEvent(type, { detail }));
}

bus.addEventListener("cart:add", (event) => {
  const { id, quantity } = event.detail;
  console.log(`${id}:${quantity}`);
});

emit("cart:add", { id: "book", quantity: 2 });
```

- 정답과 해설
    
    ### 정답
    
    ```
    book:2
    ```
    
    TypeScript에서 이벤트 이름과 payload를 연결한 예시는 다음과 같습니다.
    
    ```tsx
    type AppEvents = {
      "cart:add": { id: string; quantity: number };
      "cart:clear": undefined;
    };
    
    class TypedEventBus<Events extends Record<string, unknown>> {
      private readonly target = new EventTarget();
    
      on<K extends keyof Events & string>(
        type: K,
        handler: (detail: Events[K]) => void,
      ): void {
        this.target.addEventListener(type, (event) => {
          handler((event as CustomEvent<Events[K]>).detail);
        });
      }
    
      emit<K extends keyof Events & string>(type: K, detail: Events[K]): void {
        this.target.dispatchEvent(new CustomEvent<Events[K]>(type, { detail }));
      }
    }
    
    const bus = new TypedEventBus<AppEvents>();
    
    bus.on("cart:add", (detail) => {
      console.log(`${detail.id}:${detail.quantity}`);
    });
    
    bus.emit("cart:add", { id: "book", quantity: 2 });
    ```
    
    ### 해설
    
    ### JS 관점
    
    `emit("cart:add", { id: "book", quantity: 2 })`가 호출되면 `"cart:add"` 타입의
    `CustomEvent`가 생성됩니다. 이 이벤트의 `detail`은 `{ id: "book", quantity: 2 }`입니다.
    
    `bus`에는 `"cart:add"` 리스너가 등록되어 있으므로 `dispatchEvent` 호출 중에 해당 리스너가
    실행됩니다.
    
    리스너는 `event.detail`에서 `id`와 `quantity`를 꺼내고 템플릿 문자열로 출력합니다. 따라서
    출력은 `"book:2"`입니다.
    
    이 구조는 작고 단순한 이벤트 흐름에는 편리합니다. 하지만 이벤트 이름을 문자열로 직접 쓰고,
    `detail`의 구조도 런타임에만 확인되기 때문에 오타나 payload 불일치를 놓치기 쉽습니다.
    
    ### TS 관점
    
    `CustomEvent` 자체는 제네릭을 지원하지만, `addEventListener`가 이벤트 이름과 payload 타입을
    자동으로 연결해 주지는 않습니다. 그래서 예시처럼 `TypedEventBus` 클래스를 만들어 `type`과
    `detail`의 관계를 제네릭으로 묶었습니다.
    
    `AppEvents`는 이벤트 이름을 key로, payload 구조를 value로 둔 맵입니다. `"cart:add"` 이벤트는
    `{ id: string; quantity: number }` payload를 요구하고, `"cart:clear"`는 `undefined`를
    payload로 사용합니다.
    
    `emit<K extends keyof Events & string>` 덕분에 이벤트 이름을 잘못 쓰거나 payload 구조를 틀리게
    넘기면 컴파일 단계에서 잡을 수 있습니다.
    
    다만 내부 구현에서는 DOM의 `Event`를 `CustomEvent<Events[K]>`로 단언합니다. 이 단언을 한 곳에
    모아두면 애플리케이션 코드 전체에서 반복적인 타입 단언을 줄일 수 있습니다.
    
    ### 실무 관점
    
    커스텀 이벤트는 컴포넌트 사이의 느슨한 연결을 만들 때 유용합니다. 예를 들어 모달이 닫혔다는
    사실, 장바구니에 상품이 추가됐다는 사실, 특정 위젯이 준비됐다는 사실을 이벤트로 알릴 수
    있습니다.
    
    하지만 모든 상태 변경을 이벤트로만 처리하면 흐름을 추적하기 어려워집니다. 다음 기준을 세우면
    좋습니다.
    
    1. 이벤트 이름을 상수나 타입 맵으로 관리한다.
    2. payload 구조를 문서와 타입으로 동시에 관리한다.
    3. 리스너 해제가 필요한 수명 주기를 명확히 정한다.
    4. 핵심 비즈니스 상태는 이벤트만으로 숨기지 말고 명시적인 상태 저장소나 함수 호출과 함께
    설계한다.

### 오늘의 생각 질문

커스텀 이벤트는 함수 호출보다 느슨한 연결을 만들 수 있지만, 흐름이 보이지 않게 만들 수도
있습니다. 팀 프로젝트에서 이벤트 기반 설계를 허용한다면 어떤 이벤트 이름 규칙, payload 규칙,
리스너 해제 규칙을 정해야 할까요?