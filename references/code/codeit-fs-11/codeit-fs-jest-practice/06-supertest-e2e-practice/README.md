# 06-supertest-e2e

이 폴더는 6장 실습의 상세 기준입니다. 교재 본문에서는 시작 경로만 안내하고, 실제 과제 내용은 이 README를 기준으로 진행합니다.

## 역할

- `supertest`와 `agent`를 이용해 HTTP 통합 테스트를 직접 다시 써 봅니다.

## 현재 상태

- `src/app.ts`, `src/main.ts`, `test/integration/app.spec.ts`가 이미 준비되어 있습니다.
- 런타임 코드는 `Controller -> App -> errorHandler` 흐름으로 이미 조립되어 있습니다.
- 요청, 헤더, 쿠키, 응답 본문을 검증하는 테스트를 직접 보강합니다.

## 시작 코드

이 폴더에는 `app.ts`, `main.ts`, `test/integration/app.spec.ts`가 이미 준비되어 있습니다. 상태 코드만이 아니라 헤더, 쿠키, 응답 본문까지 HTTP 계약을 직접 검증하는 테스트를 보강하면 됩니다.

## 해야 할 일

- `test/integration/app.spec.ts`에서 `request(...)` 기반 단일 요청 검증을 직접 작성합니다.
- 로그인처럼 상태가 이어지는 흐름은 `agent(...)`로 다시 작성합니다.
- `set-cookie` 헤더는 첫 번째 쿠키 문자열을 꺼내 `toContain("uid=1")`처럼 핵심 조각이 들어 있는지 검증합니다.
- `pnpm test`를 실행해 통합 테스트가 통과하는지 확인합니다.

## 완료 기준

- `request(...)`와 `agent(...)`의 선택 기준을 설명할 수 있습니다.
- 상태 코드, 헤더, 쿠키, 응답 본문을 함께 검증할 수 있습니다.
- `async/await`, `return`, `done`을 한 테스트 안에서 섞지 않고 사용할 수 있습니다.
