# Day 5. null, undefined, Truthy/Falsy

### 오늘의 목표

JavaScript에서 조건문은 Boolean 값만 받는 것이 아니라 값을 Boolean 문맥으로
평가합니다. 오늘은 Truthy/Falsy, `null`, `undefined`, `||`, `??`, optional chaining을
복습하고, “값이 없다”와 “값은 있지만 거짓처럼 평가된다”를 구분하는 습관을 실무 코드와
TypeScript 관점으로 연결합니다.

### 레퍼런스 연결

- 타입 챕터 복습
- 핵심 복습 포인트: `null`, `undefined`, Truthy/Falsy, 기본값 처리
- 다시 볼 질문: 값이 없다는 상태를 `null`과 `undefined` 중 무엇으로 표현할까?

### 문제 1. 기본

다음 코드의 실행 결과를 순서대로 작성하세요.

```jsx
console.log(Boolean(""));
console.log(Boolean("0"));
console.log(Boolean(0));
console.log(Boolean([]));
console.log(Boolean({}));
console.log(Boolean(null));
console.log(Boolean(undefined));
```

- 정답과 해설
    
    ### 정답
    
    ```
    false
    true
    false
    true
    true
    false
    false
    ```
    
    ### 해설
    
    JavaScript에서 `Boolean(value)`는 값을 Boolean 문맥에서 평가했을 때의 결과를
    보여줍니다. 조건문 `if (value)`도 같은 기준으로 동작합니다.
    
    빈 문자열 `""`은 Falsy 값입니다. 문자열 안에 아무 문자도 없기 때문에 조건문에서는
    `false`처럼 평가됩니다.
    
    문자열 `"0"`은 Truthy 값입니다. 내용이 숫자 0처럼 보이더라도, 비어 있지 않은 문자열은
    조건문에서 `true`처럼 평가됩니다.
    
    숫자 `0`은 Falsy 값입니다. 숫자에서는 `0`, `-0`, `NaN`이 Falsy에 속합니다.
    
    빈 배열 `[]`과 빈 객체 `{}`는 Truthy 값입니다. 내용이 비어 있어도 객체 자체는 존재하는
    값이므로 조건문에서 `true`처럼 평가됩니다.
    
    `null`과 `undefined`는 둘 다 Falsy 값입니다. 둘은 모두 “값이 없음”을 표현할 때
    사용되지만 의미와 사용 맥락은 다릅니다. 일반적으로 `undefined`는 값이 아직 할당되지
    않았거나 속성이 없을 때 자주 나타나고, `null`은 개발자가 의도적으로 “없음”을 넣는
    값으로 쓰는 경우가 많습니다.
    
    헷갈리기 쉬운 지점은 “비어 있다”와 “Falsy다”가 같지 않다는 점입니다. `[]`와 `{}`는
    비어 있어 보이지만 Falsy가 아닙니다.
    

### 문제 2. 중급

다음 코드의 실행 결과를 순서대로 작성하고, `||`와 `??`의 차이를 설명하세요.

```jsx
function pick(value) {
  return [value || "fallback", value ?? "fallback"];
}

console.log(JSON.stringify(pick(0)));
console.log(JSON.stringify(pick("")));
console.log(JSON.stringify(pick(false)));
console.log(JSON.stringify(pick(null)));
console.log(JSON.stringify(pick(undefined)));
```

- 정답과 해설
    
    ### 정답
    
    ```
    ["fallback",0]
    ["fallback",""]
    ["fallback",false]
    ["fallback","fallback"]
    ["fallback","fallback"]
    ```
    
    ### 해설
    
    `||`는 왼쪽 값이 Falsy이면 오른쪽 값을 반환합니다. 따라서 `0`, `""`, `false`,
    `null`, `undefined`는 모두 `"fallback"`으로 대체됩니다.
    
    반면 `??`는 nullish coalescing 연산자입니다. 왼쪽 값이 `null` 또는 `undefined`일
    때만 오른쪽 값을 반환합니다. 그래서 `0`, `""`, `false`는 그대로 유지됩니다.
    
    `pick(0)`에서 `value || "fallback"`은 `"fallback"`을 반환하지만, `value ?? "fallback"`은 `0`을 반환합니다. 숫자 0은 Falsy이지만 값이 없는 것은 아니기 때문입니다.
    
    `pick("")`도 마찬가지입니다. 빈 문자열은 Falsy이므로 `||`에서는 대체되지만, `??`에서는
    유효한 문자열 값으로 유지됩니다.
    
    `pick(false)`에서 Boolean `false` 역시 실제 값입니다. 사용자가 체크박스를 끈 상태,
    알림을 받지 않겠다는 설정, 품절 상품을 포함하지 않겠다는 옵션처럼 `false` 자체가
    중요한 의미를 가질 수 있습니다.
    
    `null`과 `undefined`는 `??`에서도 fallback으로 대체됩니다. 이 둘은 nullish 값이기
    때문입니다.
    
    정리하면 `||`는 “Falsy이면 대체”이고, `??`는 “값이 없으면 대체”입니다. 기본값 처리에서
    `0`, `""`, `false`가 의미 있는 값이라면 `??`를 우선 고려해야 합니다.
    

### 문제 3. 중급

다음 코드의 실행 결과를 순서대로 작성하고, optional chaining과 `??`를 함께 사용할 때의
장점을 설명하세요.

```jsx
const users = [
  { name: "Ada", profile: { nickname: "" } },
  { name: "Lin", profile: null },
  { name: "Ken" },
];

function looseNickname(user) {
  return user.profile?.nickname || "(none)";
}

function strictNickname(user) {
  return user.profile?.nickname ?? "(none)";
}

console.log(JSON.stringify(looseNickname(users[0])));
console.log(JSON.stringify(strictNickname(users[0])));
console.log(JSON.stringify(strictNickname(users[1])));
console.log(JSON.stringify(strictNickname(users[2])));
```

- 정답과 해설
    
    ### 정답
    
    ```
    "(none)"
    ""
    "(none)"
    "(none)"
    ```
    
    ### 해설
    
    `users[0]`의 `profile.nickname`은 빈 문자열 `""`입니다. 이 값은 Falsy이지만 실제로
    존재하는 값입니다.
    
    `looseNickname(users[0])`은 `user.profile?.nickname || "(none)"`을 실행합니다.
    optional chaining인 `?.`는 `profile`이 `null` 또는 `undefined`이면 접근을 멈추고
    `undefined`를 반환합니다. 하지만 여기서는 `profile`이 존재하므로 `nickname` 값인
    `""`을 얻습니다. 그 다음 `||`가 빈 문자열을 Falsy로 판단해 `"(none)"`을 반환합니다.
    
    `strictNickname(users[0])`은 `user.profile?.nickname ?? "(none)"`을 사용합니다. 왼쪽
    값이 빈 문자열 `""`이므로 `null`도 아니고 `undefined`도 아닙니다. 따라서 빈 문자열이
    그대로 반환됩니다.
    
    `users[1]`의 `profile`은 `null`입니다. `user.profile?.nickname`은 에러를 던지지 않고
    `undefined`를 반환합니다. `undefined ?? "(none)"`은 `"(none)"`입니다.
    
    `users[2]`에는 `profile` 속성이 없습니다. 속성이 없으면 `user.profile`은
    `undefined`이고, optional chaining 덕분에 역시 안전하게 `undefined`가 됩니다. 결과는
    `"(none)"`입니다.
    
    실무에서 서버 응답의 일부 객체가 없을 수 있거나, 사용자가 프로필을 아직 만들지 않은
    상태를 다룰 때 optional chaining은 런타임 에러를 줄여 줍니다. 다만 기본값 처리까지
    같이 할 때는 `||`와 `??` 중 어느 쪽이 도메인 의미에 맞는지 선택해야 합니다.
    

### 문제 4. 심화

다음 코드는 상품 필터 입력값을 정규화하려고 작성되었습니다. 실행 결과를 예측하고, 이
코드의 문제점을 JS 관점과 TS 관점에서 설명한 뒤 더 안전한 TypeScript 코드로 개선하세요.

```jsx
function normalizeFilter(input) {
  return {
    minPrice: input.minPrice || 1000,
    keyword: input.keyword || "all",
    includeSoldOut: input.includeSoldOut || true,
  };
}

console.log(JSON.stringify(normalizeFilter({
  minPrice: 0,
  keyword: "",
  includeSoldOut: false,
})));

console.log(JSON.stringify(normalizeFilter({
  minPrice: null,
  keyword: undefined,
  includeSoldOut: null,
})));
```

- 정답과 해설
    
    ### 정답
    
    ```
    {"minPrice":1000,"keyword":"all","includeSoldOut":true}
    {"minPrice":1000,"keyword":"all","includeSoldOut":true}
    ```
    
    안전하게 개선한 TypeScript 예시는 다음과 같습니다.
    
    ```tsx
    type FilterInput = {
      minPrice?: number | null;
      keyword?: string | null;
      includeSoldOut?: boolean | null;
    };
    
    type ProductFilter = {
      minPrice: number;
      keyword: string;
      includeSoldOut: boolean;
    };
    
    function normalizeFilter(input: FilterInput): ProductFilter {
      const minPrice = input.minPrice ?? 1000;
    
      if (!Number.isFinite(minPrice) || minPrice < 0) {
        throw new Error("minPrice must be a non-negative finite number.");
      }
    
      return {
        minPrice,
        keyword: input.keyword ?? "all",
        includeSoldOut: input.includeSoldOut ?? true,
      };
    }
    
    console.log(JSON.stringify(normalizeFilter({
      minPrice: 0,
      keyword: "",
      includeSoldOut: false,
    })));
    
    console.log(JSON.stringify(normalizeFilter({
      minPrice: null,
      keyword: undefined,
      includeSoldOut: null,
    })));
    ```
    
    ### 해설
    
    ### JS 관점
    
    원래 코드에서 `input.minPrice || 1000`은 `minPrice`가 Falsy이면 `1000`을 사용합니다.
    그런데 `0`은 Falsy입니다. 무료 상품까지 포함하려고 `minPrice: 0`을 전달했는데,
    기본값 `1000`으로 바뀌어 버립니다.
    
    `input.keyword || "all"`도 같은 문제가 있습니다. 빈 문자열 `""`을 “검색어 없음”이라는
    명시적인 값으로 사용하고 싶어도, `||`는 이를 Falsy로 보고 `"all"`로 대체합니다.
    
    `input.includeSoldOut || true`는 더 위험합니다. 사용자가 `false`를 전달해 품절 상품을
    제외하려고 해도, `false || true`는 `true`입니다. 결국 사용자의 명시적인 선택이
    사라집니다.
    
    두 번째 호출은 `null`, `undefined`, `null`을 전달하므로 기본값으로 바뀌는 것이 자연스러울
    수 있습니다. 문제는 첫 번째 호출처럼 실제 값이 존재하는데도 Falsy라는 이유만으로
    기본값이 적용된다는 점입니다.
    
    ### TS 관점
    
    TypeScript에서 `FilterInput` 타입을 정의하면 각 필드가 `number`, `string`, `boolean`,
    `null`, `undefined` 중 어떤 값을 가질 수 있는지 명확히 표현할 수 있습니다. 하지만
    `input.minPrice || 1000` 같은 로직이 도메인 의미에 맞는지는 타입만으로 자동 판단되지
    않습니다.
    
    개선 코드에서는 `??`를 사용합니다. `input.minPrice ?? 1000`은 `minPrice`가 `null` 또는
    `undefined`일 때만 기본값을 사용합니다. 따라서 `0`은 그대로 유지됩니다.
    
    `keyword`의 빈 문자열과 `includeSoldOut`의 `false`도 같은 이유로 유지됩니다. 이 값들은
    Falsy이지만, 사용자가 명시적으로 선택한 유효한 값일 수 있기 때문입니다.
    
    다만 `??`만으로 모든 검증이 끝나는 것은 아닙니다. 예를 들어 `minPrice`가 `-1`이거나
    `Infinity`라면 타입은 `number`이지만 필터 값으로는 부적절할 수 있습니다. 그래서 개선
    코드에서는 `Number.isFinite(minPrice)`와 `minPrice < 0` 검사를 추가했습니다.
    
    ### 실무 관점
    
    기본값 처리에서 가장 먼저 정해야 할 것은 “없는 값”의 기준입니다. 단순히 Falsy인지가
    아니라, 도메인에서 `0`, `""`, `false`가 의미 있는 값인지 판단해야 합니다.
    
    설정, 필터, 권한, 가격, 수량 같은 코드에서는 `false`와 `0`이 매우 중요한 의미를 가질 수
    있습니다. 이 값을 기본값으로 덮어쓰면 사용자가 의도한 설정과 실제 동작이 달라집니다.
    
    좋은 흐름은 다음과 같습니다.
    
    1. 입력 타입에서 `null`과 `undefined` 가능성을 명확히 표현한다.
    2. 기본값 적용 기준을 `??`로 드러낸다.
    3. 숫자 범위나 문자열 형식 같은 도메인 규칙은 별도 런타임 검증으로 확인한다.
    4. Falsy 값이 유효한 값인지 아닌지 요구사항에 따라 문서화한다.
    
    TypeScript는 “이 필드가 없을 수 있다”는 사실을 표현하는 데 도움을 주지만, 어떤 값을
    기본값으로 대체해야 하는지는 JavaScript 실행 규칙과 도메인 정책을 함께 이해해야
    안전하게 결정할 수 있습니다.
    

### 오늘의 생각 질문

프로젝트에서 기본값을 넣을 때 `||`를 습관적으로 사용한 경험이 있나요? `0`, 빈 문자열,
`false`가 실제 의미를 갖는 입력이라면 어떤 기준으로 `||`, `??`, 명시적 조건문 중 하나를
선택해야 할까요?