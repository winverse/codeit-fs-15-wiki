# 05-express-unit

이 폴더는 5장 실습의 상세 기준입니다. 교재 본문에서는 시작 경로만 안내하고, 실제 과제 내용은 이 README를 기준으로 진행합니다.

## 역할

- 이미 준비된 Express 단위 테스트 안에서, 비어 있는 TODO 테스트 본문을 채워 빠진 분기를 메웁니다.

## 현재 상태

- `src/`, `test/mock`, `test/stub`, `test/unit`, `test/providers` 구조가 이미 준비되어 있습니다.
- 일부 테스트는 이미 작성되어 있고, 몇몇 분기 테스트 본문만 TODO 상태로 비워 둔 상태입니다.
- 런타임 코드를 다시 만드는 대신, 준비된 테스트 파일 안의 TODO 테스트 본문을 완성합니다.

## 실습 목표

5장 실습의 목표는 단위 테스트를 더 많이 쓰는 것이 아니라, 더 정확하게 넓히는 감각을 익히는 것입니다. 따라서 이 실습에서는 어떤 조건이 빠져 있었고, 그 조건을 어떤 `describe(...)`와 `test(...)`로 채웠는지를 더 중요하게 봅니다.

## 시작 코드

여기서 가장 자주 생기는 실수는 가장 쉬운 테스트부터 무작정 채우는 것입니다. 하지만 이 장의 목적은 테스트 수를 늘리는 일이 아니라, 어떤 책임 경계가 아직 검증되지 않았는지 읽는 것입니다. 그래서 이 실습도 파일을 무작정 넓히기보다, 컨트롤러, 미들웨어, 서비스 순서로 어떤 분기가 비어 있는지 먼저 읽고 그 분기를 `describe(...)`와 `test(...)` 제목으로 분명하게 드러내는 방식으로 진행합니다.

이번 실습에서도 테스트 대상 코드와 기존 테스트 파일은 이미 준비되어 있습니다. 학생은 런타임 코드를 다시 만드는 대신, 준비된 테스트 파일 안의 TODO를 채워 비어 있는 분기를 메우는 방식으로 진행합니다.

파일: `test/unit/controllers/auth.controller.spec.ts`

```ts
describe('AuthController', () => {
  test('로그인 성공 시 쿠키를 심고 공개 사용자 정보를 돌려줍니다', async () => {
    // 이미 준비된 테스트입니다.
  });

  test('로그인 실패 시 401을 돌려줍니다', async () => {
    // 이미 준비된 테스트입니다.
  });

  test('email이나 password가 없으면 400을 돌려줍니다', async () => {
    // 여기에 테스트 코드를 작성합니다.
  });
});
```

파일: `test/unit/middlewares/require-auth.middleware.spec.ts`

```ts
describe('RequireAuthMiddleware', () => {
  test('쿠키가 없으면 401을 돌려줍니다', async () => {
    // 이미 준비된 테스트입니다.
  });

  test('uid 쿠키가 숫자가 아니면 401을 돌려줍니다', async () => {
    // 여기에 테스트 코드를 작성합니다.
  });
});
```

파일: `test/unit/services/auth.service.spec.ts`

```ts
describe('AuthService', () => {
  test('email과 password가 모두 맞으면 공개 사용자 정보를 돌려줍니다', async () => {
    // 이미 준비된 테스트입니다.
  });

  test('사용자를 찾지 못하면 password 비교를 건너뜁니다', async () => {
    // 여기에 테스트 코드를 작성합니다.
  });
});
```

## 해야 할 일

- 이미 선언된 TODO 테스트가 어떤 분기를 비워 두고 있는지 먼저 읽습니다.
- `test/unit/controllers/auth.controller.spec.ts`에서 입력 누락 분기 테스트 본문을 채웁니다.
- `test/unit/middlewares/require-auth.middleware.spec.ts`에서 잘못된 `uid` 분기 테스트 본문을 채웁니다.
- `test/unit/services/auth.service.spec.ts`에서 사용자를 찾지 못한 분기 테스트 본문을 채웁니다.

## 완료 기준

- TODO 테스트를 모두 채운 뒤 `pnpm test`가 통과합니다.
- 적어도 한 파일 이상에서 비어 있던 분기가 TODO 테스트 완성으로 채워집니다.
- 채운 테스트 제목만 보고도 어떤 조건을 확인하는지 구분할 수 있습니다.
- 적어도 한 테스트에서는 `not.toHaveBeenCalled()` 같은 검증으로 차단된 호출을 함께 확인합니다.
- 어떤 경로가 비어 있었고 왜 그 테스트가 필요한지 먼저 설명할 수 있습니다.
