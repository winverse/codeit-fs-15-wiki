# 02-matchers-and-mocks

이 폴더는 2장 실습의 상세 기준입니다. 교재 본문에서는 시작 경로만 안내하고, 실제 과제 내용은 이 README를 기준으로 진행합니다.

## 역할

- 1장에서 맞춘 Jest 실행 환경 위에 matcher와 mock function 테스트를 다시 써 봅니다.

## 현재 상태

- `tsconfig.json`, `jest.config.mjs`, Jest 스크립트는 이미 준비되어 있습니다.
- `src/orders/*`의 런타임 코드는 이미 들어 있습니다.
- `src/add.spec.ts`, `src/orders/audit-logger.spec.ts`처럼 본문 설명에 바로 쓰는 작은 예시는 이미 채워져 있습니다.
- 실습으로 직접 채울 테스트 파일은 `src/orders/create-order-summary.spec.ts`, `src/orders/send-order-mail.spec.ts`입니다.

## 시작 코드

이 폴더에는 런타임 코드와 테스트 스켈레톤이 이미 들어 있습니다. 설정을 다시 만드는 대신, matcher와 mock function 본문을 직접 채우는 데 집중하면 됩니다.

## 해야 할 일

- `src/orders/create-order-summary.spec.ts`에서 값 비교와 구조 비교를 직접 작성합니다.
- `src/orders/send-order-mail.spec.ts`에서 `jest.fn()`, `spyOn()`, `mockImplementationOnce()` 흐름을 직접 작성합니다.
- `pnpm test`를 실행해 테스트가 통과하는지 확인합니다.

## 완료 기준

- matcher 예제가 `pnpm test`에서 통과합니다.
- `jest.fn()`과 `spyOn()`의 선택 기준을 설명할 수 있습니다.
- `mockReturnValue()`와 `mockImplementation()`의 차이를 설명할 수 있습니다.
