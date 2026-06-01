# 04-express-foundation

## 목표

- Express 런타임 구조를 class 기반으로 정리합니다.
- 첫 핸들러와 미들웨어 단위 테스트에 필요한 `test/mock`, `test/stub`, `test/unit` 레이어를 붙입니다.
- `node-mocks-http`를 사용해 컨트롤러와 미들웨어 테스트를 직접 검증할 수 있게 만듭니다.

## 교재 대응

- 4장 `Express 핸들러와 미들웨어 단위 테스트`

## 도달 상태

- `App`, `Controller`, `Service`, `Repository`, `Provider`, `Middleware`가 구분된 상태입니다.
- `AuthController`와 `RequireAuthMiddleware`를 대상으로 첫 단위 테스트가 들어 있습니다.
- `test/mock/users.ts`, `test/stub/*`, `test/unit/*` 구조가 보입니다.
- 6장에서 서비스 테스트, false 분기, coverage 확장으로 넓혀 갈 수 있는 출발선이 준비된 상태입니다.
