# 04-express-foundation

이 폴더는 4장 실습의 상세 기준입니다. 교재 본문에서는 시작 경로만 안내하고, 실제 과제 내용은 이 README를 기준으로 진행합니다.

## 역할

- 첫 Express 핸들러와 미들웨어 단위 테스트를 직접 다시 써 봅니다.

## 현재 상태

- `src/`, `test/mock`, `test/stub`, `test/unit` 구조가 이미 준비되어 있습니다.
- 이번 장에서는 `test/unit/controllers/auth.controller.spec.ts`, `test/unit/middlewares/require-auth.middleware.spec.ts`를 중심으로 첫 Express 단위 테스트를 다시 작성합니다.
- 런타임 코드를 다시 만드는 대신, 준비된 테스트 파일 본문을 채우는 방식으로 진행합니다.

## 시작 코드

이 폴더에는 Express 런타임 구조와 첫 단위 테스트 파일이 이미 준비되어 있습니다. `node-mocks-http`, `res._getJSONData()`, `next()` 호출 여부를 직접 검증하는 본문을 채우면 됩니다.

## 해야 할 일

- `test/unit/controllers/auth.controller.spec.ts`에서 상태 코드, JSON 응답, 쿠키 검증을 직접 작성합니다.
- `test/unit/middlewares/require-auth.middleware.spec.ts`에서 통과 흐름과 차단 흐름의 `next()` 호출 여부를 직접 작성합니다.
- `pnpm test`를 실행해 첫 Express 단위 테스트가 통과하는지 확인합니다.

## 완료 기준

- 핸들러와 미들웨어 테스트가 모두 `pnpm test`에서 통과합니다.
- `res._getJSONData()`와 `jest.spyOn(res, 'cookie')`를 일관되게 사용할 수 있습니다.
- 컨트롤러 테스트와 미들웨어 테스트의 초점 차이를 설명할 수 있습니다.
