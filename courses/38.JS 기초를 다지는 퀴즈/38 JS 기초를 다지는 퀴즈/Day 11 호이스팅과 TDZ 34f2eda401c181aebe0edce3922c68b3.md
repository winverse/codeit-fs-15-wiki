# Day 11. 호이스팅과 TDZ

### 오늘의 목표

JavaScript 선언은 코드에 적힌 위치 그대로만 동작하지 않습니다. 오늘은 `var` 선언의
호이스팅, `let`과 `const`의 TDZ, 함수 선언문과 함수 표현식의 차이를 복습하고, 의도하지
않은 전역 변수 생성이 실무 코드에서 어떤 문제를 만드는지 TypeScript와 함께 점검합니다.

### 레퍼런스 연결

- 스코프와 클로저 챕터 복습
- 핵심 복습 포인트: 호이스팅, 함수 선언문, TDZ, 초기화 전 접근
- 다시 볼 질문: 선언 순서 문제를 TypeScript가 모두 막아줄 수 있을까?

### 문제 1. 기본

다음 코드의 실행 결과를 순서대로 작성하세요.

```jsx
console.log(a);
var a = 10;
console.log(a);

try {
  console.log(b);
} catch (error) {
  console.log(error.constructor.name);
}

let b = 20;
console.log(b);
```

- 정답과 해설
    
    ### 정답
    
    ```
    undefined
    10
    ReferenceError
    20
    ```
    
    ### 해설
    
    `var a = 10`은 선언이 현재 스코프의 맨 위로 끌어올려진 것처럼 동작합니다. 이를
    호이스팅이라고 부릅니다. 단, 값 할당까지 위로 올라가는 것은 아닙니다.
    
    첫 번째 `console.log(a)` 시점에는 `a`라는 변수는 존재하지만 아직 `10`이 할당되지
    않았습니다. 그래서 `undefined`가 출력됩니다.
    
    그 다음 `var a = 10`의 할당이 실행되고, 두 번째 `console.log(a)`는 `10`을 출력합니다.
    
    `let b = 20`도 선언 자체는 스코프에 등록되지만, 선언문이 실행되기 전까지 접근할 수
    없습니다. 이 구간을 TDZ, 즉 temporal dead zone이라고 부릅니다.
    
    `console.log(b)`는 `let b = 20`보다 앞에서 실행되므로 `ReferenceError`가 발생합니다.
    `catch` 블록에서 에러 생성자 이름을 출력하므로 `"ReferenceError"`가 나옵니다.
    
    `let b = 20`이 실행된 뒤에는 정상적으로 접근할 수 있으므로 마지막 출력은 `20`입니다.
    
    핵심은 `var`는 선언 전 접근이 `undefined`로 보일 수 있고, `let`과 `const`는 선언 전
    접근이 `ReferenceError`라는 점입니다.
    

### 문제 2. 중급

다음 코드의 실행 결과를 순서대로 작성하고, 함수 선언문과 함수 표현식의 차이를
설명하세요.

```jsx
console.log(add(2, 3));

try {
  console.log(multiply(2, 3));
} catch (error) {
  console.log(error.constructor.name);
}

function add(a, b) {
  return a + b;
}

const multiply = function (a, b) {
  return a * b;
};

console.log(multiply(2, 3));
```

- 정답과 해설
    
    ### 정답
    
    ```
    5
    ReferenceError
    6
    ```
    
    ### 해설
    
    `function add(a, b) { ... }`는 함수 선언문입니다. 함수 선언문은 함수 본문까지 함께
    호이스팅됩니다. 그래서 코드상으로 선언보다 앞에서 `add(2, 3)`을 호출해도 정상적으로
    실행되고 `5`가 출력됩니다.
    
    `const multiply = function (a, b) { ... }`는 함수 표현식을 `const` 변수에 할당한 형태입니다.
    여기서 중요한 것은 `multiply`가 `const`로 선언된 변수라는 점입니다.
    
    `const` 변수는 선언문이 실행되기 전까지 TDZ에 있습니다. 따라서 `multiply` 선언문보다
    앞에서 `multiply(2, 3)`을 호출하려고 하면 `ReferenceError`가 발생합니다.
    
    함수 표현식이 할당된 뒤에는 정상적으로 사용할 수 있습니다. 마지막
    `console.log(multiply(2, 3))`은 `6`을 출력합니다.
    
    함수 선언문과 함수 표현식의 차이는 단순 스타일 차이가 아닙니다. 선언 전 호출이 가능한지,
    코드 읽는 순서가 어떻게 되는지에 영향을 줍니다. 팀에서는 함수 선언 위치와 호출 위치에
    대한 규칙을 정해 두면 코드 이해 비용을 줄일 수 있습니다.
    

### 문제 3. 중급

다음 코드의 실행 결과를 순서대로 작성하고, 함수 안의 `var value`가 바깥 `value`에 어떤
영향을 주는지 설명하세요.

```jsx
var value = "outer";

function test() {
  console.log(value);
  var value = "inner";
  console.log(value);
}

test();
console.log(value);
```

- 정답과 해설
    
    ### 정답
    
    ```
    undefined
    inner
    outer
    ```
    
    ### 해설
    
    전역에는 `var value = "outer"`가 있습니다.
    
    하지만 `test` 함수 안에도 `var value = "inner"`가 있습니다. 이 선언은 함수 스코프의 맨
    위로 호이스팅됩니다. 따라서 `test` 함수 내부는 실제로 바깥의 `value`를 읽는 것이 아니라,
    함수 내부의 지역 변수 `value`를 읽습니다.
    
    첫 번째 `console.log(value)` 시점에는 함수 내부의 `value`가 존재하지만 아직 `"inner"`가
    할당되지 않았습니다. 그래서 `undefined`가 출력됩니다.
    
    그 다음 `var value = "inner"`의 할당이 실행되고, 두 번째 `console.log(value)`는
    `"inner"`를 출력합니다.
    
    함수 내부의 `var value`는 전역 `value`를 덮어쓰지 않습니다. 함수 스코프 안에서 바깥
    변수를 가릴 뿐입니다. 그래서 `test()` 호출이 끝난 뒤 전역의 `console.log(value)`는
    `"outer"`를 출력합니다.
    
    이 문제는 `var` 호이스팅과 shadowing이 함께 나타나는 예입니다. 선언 위치만 보고 바깥
    변수를 읽는다고 생각하면 첫 번째 출력에서 틀리기 쉽습니다.
    

### 문제 4. 심화

다음 코드는 카운터를 만들려고 작성되었습니다. Node.js CommonJS 스니펫을 비엄격 모드로
실행한다고 가정하고 실행 결과를 예측하세요. 그리고 이 코드의 문제점을 JS 관점과 TS
관점에서 설명한 뒤 더 안전한 TypeScript 코드로 개선하세요.

```jsx
function createCounterBad() {
  count = 0;

  return function increase() {
    count += 1;
    return count;
  };
}

const counter = createCounterBad();

console.log(counter());
console.log(counter());
console.log(globalThis.count);

delete globalThis.count;
```

- 정답과 해설
    
    ### 정답
    
    Node.js CommonJS 스니펫을 비엄격 모드로 실행한다고 가정하면 결과는 다음과 같습니다.
    
    ```
    1
    2
    2
    ```
    
    안전하게 개선한 TypeScript 예시는 다음과 같습니다.
    
    ```tsx
    function createCounter(initial = 0): () => number {
      let count = initial;
    
      return function increase(): number {
        count += 1;
        return count;
      };
    }
    
    const counter = createCounter();
    
    console.log(counter());
    console.log(counter());
    console.log(typeof (globalThis as typeof globalThis & { count?: unknown }).count);
    ```
    
    ### 해설
    
    ### JS 관점
    
    `createCounterBad` 안에는 `count = 0`이 있습니다. 문제는 `let`, `const`, `var` 중 어떤
    선언도 없다는 점입니다.
    
    비엄격 모드에서 선언되지 않은 식별자에 값을 대입하면 전역 객체에 속성이 만들어질 수
    있습니다. 그래서 `count = 0`은 지역 변수를 만드는 것이 아니라 `globalThis.count`를
    만드는 코드처럼 동작합니다.
    
    반환된 `increase` 함수도 지역 변수가 아니라 같은 전역 `count`를 읽고 씁니다. 첫 번째
    호출은 `count`를 `1`로 만들고 `1`을 반환합니다. 두 번째 호출은 `2`를 반환합니다.
    `globalThis.count`도 같은 값이므로 `2`가 출력됩니다.
    
    마지막 `delete globalThis.count`는 예제 실행 뒤 전역 오염을 정리하기 위한 코드입니다.
    
    이 코드는 실행 환경과 strict mode 여부에 영향을 받습니다. strict mode에서는 선언되지
    않은 변수 대입이 `ReferenceError`입니다. 그래서 이런 코드를 문제로 다룰 때는 실행 조건을
    명확히 해야 합니다.
    
    ### TS 관점
    
    TypeScript는 선언되지 않은 `count` 식별자를 오류로 보고합니다. 이 오류 자체는
    `strict` 옵션을 켜야만 발생하는 것이 아니라, TypeScript가 식별자를 해석할 수 없기 때문에
    발생합니다. 여기에 `strict`와 `noImplicitAny` 같은 설정을 함께 사용하면 암시적 `any`와
    불명확한 타입 흐름까지 더 적극적으로 줄일 수 있습니다.
    
    하지만 더 중요한 것은 변수의 스코프를 의도대로 설계하는 것입니다. 개선 예시에서는
    `let count = initial`을 함수 내부에 명시적으로 선언합니다. 그러면 `count`는
    `createCounter` 호출로 만들어진 클로저 안에만 존재합니다.
    
    반환 타입 `(): number`는 `createCounter`가 숫자를 반환하는 함수를 만든다는 의도를
    보여줍니다. `increase(): number`도 반환값이 숫자임을 명확히 합니다.
    
    예시의 마지막 출력은 `globalThis.count`가 만들어지지 않았음을 확인하기 위해
    `typeof ...count`를 출력합니다. 결과는 `"undefined"`입니다.
    
    ### 실무 관점
    
    호이스팅과 선언 규칙을 모르면 “어디에 있는 값을 바꾸는지”를 놓치기 쉽습니다. 선언 없는
    대입은 전역 오염, 테스트 간 상태 공유, 예측하기 어려운 버그로 이어질 수 있습니다.
    
    좋은 흐름은 다음과 같습니다.
    
    1. `strict` 모드와 TypeScript `strict` 옵션을 사용한다.
    2. 모든 변수는 `let` 또는 `const`로 명시적으로 선언한다.
    3. 상태가 필요한 함수는 상태를 클로저 내부에 가두거나 인자로 받는다.
    4. 전역 객체를 직접 읽고 쓰는 코드는 특별한 이유가 있을 때만 사용한다.
    
    TypeScript는 선언 누락 같은 실수를 줄여 주지만, 어떤 스코프에 상태를 둘지는 개발자가
    JavaScript 실행 규칙을 이해하고 결정해야 합니다.
    

### 오늘의 생각 질문

`var`, 함수 선언문, 선언 없는 대입처럼 예전 JavaScript에서 허용되던 패턴을 현대 코드에서
어디까지 받아들여야 할까요? 팀 코드에서 선언 위치와 스코프 규칙을 어떻게 정하면 좋을까요?