# Day 22. Promise

### 오늘의 목표

Promise는 비동기 작업의 성공과 실패를 값처럼 연결할 수 있게 해 줍니다. 오늘은 Promise
콜백이 microtask로 실행되는 점, `then` 체인의 반환값 전달, `catch`를 통한 에러 복구,
`finally`의 실행 시점을 복습하고, TypeScript에서 `Promise<T>`, `Awaited<T>`, `unknown`
에러 처리를 어떻게 연결할지 확인합니다.

### 레퍼런스 연결

- 비동기 챕터 복습
- 핵심 복습 포인트: Promise 상태, `then`, `catch`, `finally`, 체이닝
- 다시 볼 질문: Promise 체인이 길어질 때 어떤 문제가 생기고 어떻게 끊어야 할까?

### 문제 1. 기본

다음 코드의 실행 결과를 순서대로 작성하세요.

```jsx
const promise = Promise.resolve(1);

promise.then((value) => console.log(value));

console.log("sync");
```

- 정답과 해설
    
    ### 정답
    
    ```
    sync
    1
    ```
    
    ### 해설
    
    `Promise.resolve(1)`은 이미 fulfilled 상태인 Promise를 만듭니다. 하지만 `then` 콜백이 즉시
    동기적으로 실행되는 것은 아닙니다.
    
    `promise.then((value) => console.log(value))`는 콜백을 microtask로 등록합니다.
    
    그 다음 동기 코드인 `console.log("sync")`가 먼저 실행됩니다.
    
    현재 콜 스택이 비고 나면 microtask queue가 처리되고, `then` 콜백이 실행되어 `1`이
    출력됩니다.
    
    이미 완료된 Promise라도 `then` 콜백은 현재 동기 코드가 끝난 뒤 실행된다는 점이 핵심입니다.
    

### 문제 2. 중급

다음 코드의 실행 결과를 순서대로 작성하고, `then`의 반환값이 다음 `then`으로 어떻게
전달되는지 설명하세요.

```jsx
Promise.resolve(1)
  .then((value) => value + 1)
  .then((value) => {
    console.log(value);
    return value * 2;
  })
  .then(console.log);
```

- 정답과 해설
    
    ### 정답
    
    ```
    2
    4
    ```
    
    ### 해설
    
    첫 번째 `then`은 `1`을 받아 `value + 1`, 즉 `2`를 반환합니다. `then` 콜백이 일반 값을
    반환하면 그 값은 다음 Promise의 fulfilled 값이 됩니다.
    
    두 번째 `then`은 `2`를 받습니다. 먼저 `console.log(value)`로 `2`를 출력하고, `value * 2`인
    `4`를 반환합니다.
    
    세 번째 `then(console.log)`는 앞 단계에서 반환된 `4`를 받아 출력합니다.
    
    Promise 체인은 “콜백 반환값을 다음 단계의 입력으로 넘긴다”는 규칙으로 읽을 수 있습니다.
    콜백이 Promise를 반환하면 그 Promise가 해결될 때까지 다음 단계가 기다리고, 일반 값을 반환하면
    그 값이 바로 다음 단계로 전달됩니다.
    

### 문제 3. 중급

다음 코드의 실행 결과를 순서대로 작성하고, `catch` 이후 체인이 어떻게 이어지는지 설명하세요.

```jsx
Promise.resolve("start")
  .then((value) => {
    console.log(value);
    throw new Error("fail");
  })
  .then(() => console.log("skip"))
  .catch((error) => {
    console.log(error.message);
    return "recovered";
  })
  .then((value) => console.log(value));
```

- 정답과 해설
    
    ### 정답
    
    ```
    start
    fail
    recovered
    ```
    
    ### 해설
    
    첫 번째 `then`은 `"start"`를 받아 출력합니다. 그 다음 `throw new Error("fail")`을 실행합니다.
    
    `then` 콜백 안에서 에러를 던지면 반환되는 Promise는 rejected 상태가 됩니다. 따라서 바로
    다음의 fulfilled 콜백인 `.then(() => console.log("skip"))`은 실행되지 않습니다.
    
    에러는 가장 가까운 `catch`로 전달됩니다. `catch` 콜백은 `error.message`를 출력하므로
    `"fail"`이 출력됩니다.
    
    중요한 점은 `catch`가 값을 반환하면 체인이 다시 fulfilled 상태로 복구될 수 있다는 것입니다.
    이 예제에서 `catch`는 `"recovered"`를 반환합니다.
    
    마지막 `then`은 그 값을 받아 `"recovered"`를 출력합니다.
    
    `catch`는 단순히 에러를 기록하고 끝나는 곳이 아니라, 실패를 복구해 다음 단계로 정상 값을
    넘길 수도 있는 지점입니다.
    

### 문제 4. 심화

다음 코드는 사용자 이름을 Promise 체인으로 가져옵니다. 실행 결과를 예측하고, 이 코드의
의미를 JS 관점과 TS 관점에서 설명한 뒤 더 안전한 TypeScript 코드로 개선하세요.

```jsx
function fetchUserName(id) {
  return Promise.resolve(id)
    .then((value) => {
      if (value <= 0) {
        throw new Error("invalid id");
      }

      return { id: value, name: "Ada" };
    })
    .then((user) => user.name)
    .finally(() => console.log("done"));
}

fetchUserName(1).then((name) => console.log(name));
fetchUserName(0).catch((error) => console.log(error.message));
```

- 정답과 해설
    
    ### 정답
    
    ```
    done
    done
    Ada
    invalid id
    ```
    
    안전하게 개선한 TypeScript 예시는 다음과 같습니다.
    
    ```tsx
    type User = {
      id: number;
      name: string;
    };
    
    function loadUser(id: number): Promise<User> {
      if (!Number.isInteger(id) || id <= 0) {
        return Promise.reject(new Error("invalid id"));
      }
    
      return Promise.resolve({ id, name: "Ada" });
    }
    
    type LoadedUser = Awaited<ReturnType<typeof loadUser>>;
    
    function getUserName(id: number): Promise<string> {
      return loadUser(id)
        .then((user: LoadedUser) => user.name)
        .finally(() => console.log("done"));
    }
    
    getUserName(1)
      .then((name) => console.log(name))
      .catch((error: unknown) => {
        console.log(error instanceof Error ? error.message : "unknown error");
      });
    
    getUserName(0)
      .then((name) => console.log(name))
      .catch((error: unknown) => {
        console.log(error instanceof Error ? error.message : "unknown error");
      });
    ```
    
    ### 해설
    
    ### JS 관점
    
    `fetchUserName(1)`은 `Promise.resolve(1)`에서 시작합니다. 첫 번째 `then`에서 `value`가
    `1`이므로 에러를 던지지 않고 `{ id: 1, name: "Ada" }`를 반환합니다. 다음 `then`은 사용자
    객체에서 `name`만 꺼내 `"Ada"`를 반환합니다.
    
    `finally(() => console.log("done"))`은 성공과 실패 여부와 관계없이 실행됩니다. 단,
    `finally`가 원래 값을 바꾸지 않으면 체인의 결과값은 그대로 유지됩니다.
    
    `fetchUserName(0)`은 첫 번째 `then`에서 `value <= 0` 조건을 만족하므로 `Error("invalid id")`를
    던집니다. 이후 `user.name`을 꺼내는 `then`은 건너뛰고, `finally`가 실행된 뒤 바깥의
    `catch`로 에러가 전달됩니다.
    
    두 함수 호출은 같은 동기 구간에서 시작됩니다. 각 체인의 `finally`가 먼저 실행되어 `"done"`이
    두 번 출력되고, 그 다음 성공 체인의 `then`에서 `"Ada"`, 실패 체인의 `catch`에서
    `"invalid id"`가 출력됩니다.
    
    ### TS 관점
    
    개선 예시에서 `loadUser(id: number): Promise<User>`는 성공 시 `User`를 제공하는 Promise를
    반환한다는 계약을 표현합니다.
    
    `Awaited<ReturnType<typeof loadUser>>`는 `loadUser`가 반환하는 Promise가 최종적으로 어떤 값을
    해결하는지 꺼냅니다. 여기서는 `User`입니다. Promise를 반환하는 함수의 결과 타입을 재사용할 때
    유용합니다.
    
    `getUserName(id: number): Promise<string>`은 사용자 로딩 이후 이름만 반환하는 체인을
    타입으로 명확히 표현합니다. 또한 `finally`를 함수 내부 체인에 포함해 원본 코드와 같은
    순서로 정리 작업이 먼저 실행되도록 유지했습니다.
    
    `catch`의 `error`는 `unknown`으로 다루는 편이 안전합니다. JavaScript에서는 Promise가 꼭
    `Error` 객체로만 reject되는 것이 아니기 때문입니다. 그래서 `error instanceof Error`로 좁힌 뒤
    `message`를 읽습니다.
    
    ### 실무 관점
    
    Promise 체인이 길어질수록 어느 단계에서 값이 바뀌고, 어느 단계에서 에러가 복구되는지 추적하기
    어려워집니다.
    
    좋은 흐름은 다음과 같습니다.
    
    1. 각 `then`이 어떤 타입의 값을 받아 어떤 타입으로 바꾸는지 확인한다.
    2. `catch`가 에러를 복구하는지, 다시 던지는지 명확히 한다.
    3. `finally`는 정리 작업에 사용하고, 값 변환 로직을 넣지 않는다.
    4. TypeScript에서는 `Promise<T>`, `Awaited<T>`, `unknown` 에러 처리를 함께 사용한다.
    
    Promise는 콜백 지옥을 줄여 주지만, 체인 흐름을 무심코 길게 만들면 여전히 읽기 어려운 코드가
    됩니다.
    

### 오늘의 생각 질문

Promise 체인에서 `catch`는 어디에 두는 것이 좋을까요? 모든 단계 끝에 하나만 둘지, 일부
단계마다 복구 지점을 둘지, 실무 코드에서는 어떤 기준으로 결정해야 할까요?