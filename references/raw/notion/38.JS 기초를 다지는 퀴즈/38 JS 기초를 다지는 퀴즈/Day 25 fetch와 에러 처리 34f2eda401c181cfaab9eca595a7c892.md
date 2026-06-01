# Day 25. fetch와 에러 처리

### 오늘의 목표

`fetch`는 네트워크 요청이 성공적으로 도착하면 HTTP 상태 코드가 404나 500이어도 Promise를
reject하지 않습니다. 오늘은 `response.ok`, HTTP 에러 처리, JSON 파싱 실패, API 응답의
런타임 검증을 복습하고, TypeScript 타입 선언만으로 외부 응답을 믿으면 안 되는 이유를
정리합니다.

### 레퍼런스 연결

- 비동기와 실전 에러 처리 관련 내용 복습
- 핵심 복습 포인트: `fetch`, HTTP 에러, JSON 파싱, 런타임 응답 검증
- 다시 볼 질문: API 응답 타입을 언제 믿을 수 있고 언제 검증해야 할까?

### 문제 1. 기본

다음 코드의 실행 결과를 순서대로 작성하세요.

```jsx
const response = { ok: false, status: 404 };

console.log(response.ok);
console.log(response.status >= 400);
```

- 정답과 해설
    
    ### 정답
    
    ```
    false
    true
    ```
    
    ### 해설
    
    `response.ok`는 HTTP 상태 코드가 200-299 범위인지 나타내는 값입니다. 예제의 `ok`는
    `false`이므로 첫 번째 출력은 `false`입니다.
    
    `status`는 HTTP 상태 코드입니다. `404 >= 400`은 `true`이므로 두 번째 출력은 `true`입니다.
    
    실제 `fetch`에서도 404 응답은 네트워크 실패가 아닙니다. 서버가 응답을 보냈기 때문에
    Promise 자체는 fulfilled될 수 있고, 개발자가 `response.ok`나 `response.status`를 확인해
    HTTP 에러를 처리해야 합니다.
    

### 문제 2. 중급

다음 코드는 실제 네트워크 대신 `fetch` 응답과 비슷한 객체를 반환합니다. 실행 결과를
작성하고, 이 코드의 문제점을 설명하세요.

```jsx
async function fakeFetch() {
  return {
    ok: false,
    status: 500,
    async json() {
      return { message: "server error" };
    },
  };
}

async function load() {
  const response = await fakeFetch();
  const body = await response.json();
  return body.message;
}

load()
  .then(console.log)
  .catch((error) => console.log(error.message));
```

- 정답과 해설
    
    ### 정답
    
    ```
    server error
    ```
    
    ### 해설
    
    `fakeFetch`는 `ok: false`, `status: 500`인 응답 객체를 반환합니다. 실제 HTTP 기준으로는 서버
    에러에 해당합니다.
    
    하지만 `load` 함수는 `response.ok`를 확인하지 않습니다. 곧바로 `response.json()`을 호출하고,
    응답 body의 `message`를 반환합니다.
    
    그래서 Promise는 reject되지 않고 fulfilled되며, `.then(console.log)`가 실행되어
    `"server error"`가 출력됩니다.
    
    이 코드의 문제는 HTTP 실패를 성공 흐름처럼 처리한다는 점입니다. API 호출 함수는 보통
    `response.ok`를 확인하고, 실패 상태라면 에러를 던지거나 실패 결과 타입으로 반환해야 합니다.
    

### 문제 3. 중급

다음 코드의 실행 결과를 작성하고, JSON 파싱 실패가 어떻게 전달되는지 설명하세요.

```jsx
const response = {
  ok: true,
  async json() {
    return JSON.parse("{ invalid json");
  },
};

response.json()
  .then(() => console.log("parsed"))
  .catch((error) => console.log(error.constructor.name));
```

- 정답과 해설
    
    ### 정답
    
    ```
    SyntaxError
    ```
    
    ### 해설
    
    `response.ok`가 `true`라고 해서 JSON 파싱이 반드시 성공하는 것은 아닙니다.
    
    `response.json()` 내부에서 `JSON.parse("{ invalid json")`가 실행됩니다. 이 문자열은 올바른
    JSON 형식이 아니므로 `SyntaxError`가 발생합니다.
    
    `json` 메서드는 async 함수이므로 내부에서 발생한 예외는 rejected Promise로 바뀝니다.
    따라서 `.then(() => console.log("parsed"))`는 실행되지 않고, `catch`가 실행됩니다.
    
    `error.constructor.name`은 `"SyntaxError"`입니다.
    
    실무에서는 HTTP 성공, JSON 파싱 성공, 응답 데이터 모양 검증 성공을 서로 다른 단계로 봐야
    합니다. `ok`가 true인 것과 안전한 데이터가 도착한 것은 같은 뜻이 아닙니다.
    

### 문제 4. 심화

다음 코드는 사용자 API 응답을 처리합니다. 실행 결과를 예측하고, 이 코드의 의미를 JS 관점과
TS 관점에서 설명한 뒤 더 안전한 TypeScript 코드로 개선하세요.

```jsx
async function fakeFetchUser(kind) {
  if (kind === "http-error") {
    return {
      ok: false,
      status: 404,
      async json() {
        return { message: "not found" };
      },
    };
  }

  if (kind === "bad-body") {
    return {
      ok: true,
      status: 200,
      async json() {
        return { id: "1", name: null };
      },
    };
  }

  return {
    ok: true,
    status: 200,
    async json() {
      return { id: 1, name: "Ada" };
    },
  };
}

function isUser(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.id === "number" &&
    typeof value.name === "string"
  );
}

async function loadUser(kind) {
  const response = await fakeFetchUser(kind);

  if (!response.ok) {
    throw new Error(`HTTP${response.status}`);
  }

  const data = await response.json();

  if (!isUser(data)) {
    throw new Error("Invalid user payload");
  }

  return data.name;
}

async function run() {
  console.log(await loadUser("ok"));

  try {
    console.log(await loadUser("http-error"));
  } catch (error) {
    console.log(error.message);
  }

  try {
    console.log(await loadUser("bad-body"));
  } catch (error) {
    console.log(error.message);
  }
}

run();
```

- 정답과 해설
    
    ### 정답
    
    ```
    Ada
    HTTP 404
    Invalid user payload
    ```
    
    안전하게 개선한 TypeScript 예시는 다음과 같습니다.
    
    ```tsx
    type User = {
      id: number;
      name: string;
    };
    
    type ApiResponse = {
      ok: boolean;
      status: number;
      json(): Promise<unknown>;
    };
    
    async function fakeFetchUser(
      kind: "ok" | "http-error" | "bad-body",
    ): Promise<ApiResponse> {
      if (kind === "http-error") {
        return {
          ok: false,
          status: 404,
          async json() {
            return { message: "not found" };
          },
        };
      }
    
      if (kind === "bad-body") {
        return {
          ok: true,
          status: 200,
          async json() {
            return { id: "1", name: null };
          },
        };
      }
    
      return {
        ok: true,
        status: 200,
        async json() {
          return { id: 1, name: "Ada" };
        },
      };
    }
    
    function isUser(value: unknown): value is User {
      return (
        typeof value === "object" &&
        value !== null &&
        typeof (value as { id?: unknown }).id === "number" &&
        typeof (value as { name?: unknown }).name === "string"
      );
    }
    
    async function loadUser(kind: "ok" | "http-error" | "bad-body"): Promise<User> {
      const response = await fakeFetchUser(kind);
    
      if (!response.ok) {
        throw new Error(`HTTP${response.status}`);
      }
    
      const data = await response.json();
    
      if (!isUser(data)) {
        throw new Error("Invalid user payload");
      }
    
      return data;
    }
    
    async function printUser(kind: "ok" | "http-error" | "bad-body"): Promise<void> {
      try {
        const user = await loadUser(kind);
        console.log(user.name);
      } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : "unknown error");
      }
    }
    
    async function main(): Promise<void> {
      await printUser("ok");
      await printUser("http-error");
      await printUser("bad-body");
    }
    
    main();
    ```
    
    ### 해설
    
    ### JS 관점
    
    첫 번째 `loadUser("ok")`는 `ok: true`인 응답을 받고, JSON body도 `{ id: 1, name: "Ada" }`로
    올바른 사용자 모양입니다. `isUser(data)`가 `true`이므로 `"Ada"`가 출력됩니다.
    
    두 번째 `loadUser("http-error")`는 `ok: false`, `status: 404`인 응답을 받습니다. 이 경우
    body를 신뢰하기 전에 `throw new Error("HTTP 404")`가 실행됩니다. `run`의 `catch`가 이 에러를
    잡아 `"HTTP 404"`를 출력합니다.
    
    세 번째 `loadUser("bad-body")`는 HTTP 상태만 보면 성공입니다. 하지만 JSON body는
    `{ id: "1", name: null }`입니다. `id`는 숫자가 아니고 `name`은 문자열이 아니므로
    `isUser(data)`가 `false`입니다. 그래서 `"Invalid user payload"` 에러가 출력됩니다.
    
    이 문제의 핵심은 API 호출 성공을 세 단계로 나누어 봐야 한다는 점입니다.
    
    1. 네트워크 요청이 완료되었는가
    2. HTTP 상태가 성공인가
    3. JSON body가 기대한 모양인가
    
    ### TS 관점
    
    `json(): Promise<unknown>`으로 둔 점이 중요합니다. 외부 API 응답은 아직 검증되지 않았으므로
    처음부터 `Promise<User>`라고 믿으면 안 됩니다.
    
    `isUser(value: unknown): value is User`는 런타임 검증 함수이면서 TypeScript 타입 가드입니다.
    이 검사를 통과한 뒤에야 `data`를 `User`로 다룰 수 있습니다.
    
    `loadUser(...): Promise<User>`는 검증이 끝난 사용자만 반환한다는 계약입니다. HTTP 에러나
    payload 에러는 `throw`로 실패 처리합니다.
    
    `catch (error: unknown)`은 Promise rejection reason이 항상 `Error`라고 보장되지 않는다는
    점을 반영합니다. `instanceof Error`로 좁힌 뒤 `message`를 읽습니다.
    
    ### 실무 관점
    
    API 응답 타입을 TypeScript interface로 선언하는 것만으로 런타임 안전성이 생기지는 않습니다.
    서버 버그, 버전 차이, 프록시 응답, 로그인 만료 HTML 응답, 잘못된 mock 데이터 등으로 예상과
    다른 body가 올 수 있습니다.
    
    좋은 흐름은 다음과 같습니다.
    
    1. `fetch` 호출 자체의 실패와 HTTP 실패를 구분한다.
    2. `response.ok`를 확인한다.
    3. JSON 파싱 실패를 처리한다.
    4. 파싱된 body를 `unknown`으로 보고 런타임 검증한다.
    5. 검증된 값만 도메인 타입으로 반환한다.
    
    실무에서는 직접 타입 가드를 만들 수도 있고, Zod 같은 런타임 스키마 검증 도구를 사용할 수도
    있습니다. 중요한 것은 외부 데이터를 타입 선언만으로 신뢰하지 않는 것입니다.
    

### 오늘의 생각 질문

API 응답 타입을 프론트엔드에서 이미 알고 있다고 느낄 때도 런타임 검증이 필요할까요?
어떤 API는 타입 선언만으로 충분하고, 어떤 API는 스키마 검증까지 해야 한다고 판단할 수 있을까요?