# 03-jest-basic

이 폴더는 3장 실습의 상세 기준입니다. 교재 본문에서는 시작 경로만 안내하고, 실제 과제 내용은 이 README를 기준으로 진행합니다.

## 역할

- 1장에서 맞춘 Jest 실행 환경 위에, 준비된 런타임 코드를 읽고 테스트 본문을 직접 채웁니다.

## 현재 상태

- `tsconfig.json`, `jest.config.mjs`, Jest 스크립트는 이미 준비되어 있습니다.
- `src/orders/*`, `src/users/*`, `src/session/*`, `src/shared/*`의 런타임 코드는 이미 들어 있습니다.
- 2장에서 다룬 `add`, `createOrderSummary`, `sendOrderMail`, `auditLogger` 테스트는 이미 완료된 상태로 포함되어 있습니다.
- 이번 장에서 직접 채울 테스트 파일은 `src/users/*`, `src/session/*`, `src/shared/*` 쪽 스켈레톤입니다.

## 실습 목표

3장 실습의 목표는 matcher, 테스트 더블, 비동기 검증, 공통 정리 흐름을 직접 손으로 다시 써 보는 것입니다. 1장에서 한 번 맞춘 Jest 환경 위에 테스트 파일을 더 붙이면서, 같은 문법을 여러 대상에 적용해 보는 단계입니다.

## 시작 코드

이번 실습에서 검증할 런타임 코드는 이미 준비되어 있습니다. 아래 파일들을 새로 다시 만들기보다, 준비된 코드를 읽고 어떤 동작을 테스트해야 하는지 먼저 정리한 뒤 테스트 파일을 채우는 방식으로 진행합니다.

파일: `src/orders/create-order-summary.ts`

```ts
export function createOrderSummary(items: OrderItem[]): OrderSummary {
  // 수량이 0인 항목은 주문 요약에서 제외합니다.
  const visibleItems = items
    .filter((item) => item.quantity > 0)
    .map((item) => ({
      name: item.name,
      subtotal: item.price * item.quantity,
      quantity: item.quantity,
    }));

  // itemCount는 남은 항목의 총 수량입니다.
  const itemCount = visibleItems.reduce((sum, item) => sum + item.quantity, 0);
  // subtotal은 남은 항목 가격의 합계입니다.
  const subtotal = visibleItems.reduce((sum, item) => sum + item.subtotal, 0);
  // shippingFee는 무료 배송 기준을 적용한 배송비입니다.
  const shippingFee = subtotal >= 50_000 ? 0 : 3_000;

  return {
    itemCount,
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
    items: visibleItems.map(({ name, subtotal: itemSubtotal }) => ({
      name,
      subtotal: itemSubtotal,
    })),
  };
}
```

2장에서 이미 만든 테스트도 그대로 남아 있습니다. 이번 장에서는 그 위에 비동기와 생명주기 흐름을 덧붙입니다.

파일: `src/add.spec.ts`

```ts
import { add } from '#src/add.js';

describe('add', () => {
  test('두 수의 합을 반환한다', () => {
    expect(add(1, 2)).toBe(3);
  });
});
```

파일: `src/orders/audit-logger.spec.ts`

```ts
import { jest } from '@jest/globals';
import { auditLogger } from '#src/orders/audit-logger.js';

describe('auditLogger', () => {
  test('기존 메서드에 spy를 걸어 호출을 감시한다', () => {
    const loggerSpy = jest
      .spyOn(auditLogger, 'info')
      .mockImplementation(() => {});

    auditLogger.info('주문 로그');

    expect(loggerSpy).toHaveBeenCalledWith('주문 로그');
  });
});
```

이번 장에서 학생이 직접 채울 테스트 파일은 완전히 비워 두지 않습니다. `describe(...)`와 `test(...)` 제목까지는 먼저 잡아 두고, 학생은 각 테스트 본문만 직접 채우는 방식으로 진행합니다.

파일: `src/users/user-lookup.service.spec.ts`

```ts
import { jest } from '@jest/globals';
import { userGateway } from '#src/users/user-gateway.js';
import { UserLookupService } from '#src/users/user-lookup.service.js';

describe('UserLookupService', () => {
  test('Promise를 resolve해서 결과를 검증합니다', async () => {
    expect.hasAssertions();
    // 여기에 테스트 코드를 작성합니다.
  });

  test('Promise를 reject하는 에러 흐름을 검증합니다', async () => {
    expect.hasAssertions();
    // 여기에 테스트 코드를 작성합니다.
  });
});
```

파일: `src/session/session.service.spec.ts`

```ts
import { SessionService } from '#src/session/session.service.js';

void SessionService;

describe('SessionService', () => {
  test('timeout이 1000보다 작으면 에러를 던집니다', () => {
    expect.hasAssertions();
    // 여기에 테스트 코드를 작성합니다.
  });

  test.each([
    {
      currentDeadline: 1_000,
      extraMs: 10_000,
      expected: 11_000,
    },
    {
      currentDeadline: 2_500,
      extraMs: 5_000,
      expected: 7_500,
    },
    {
      currentDeadline: 30_000,
      extraMs: 0,
      expected: 30_000,
    },
  ])(
    '$currentDeadline에서 $extraMs를 더하면 $expected가 됩니다',
    ({ currentDeadline, extraMs, expected }) => {
      expect.hasAssertions();
      void currentDeadline;
      void extraMs;
      void expected;
      // 여기에 테스트 코드를 작성합니다.
    },
  );
});
```

파일: `src/shared/create-mock-req-res.spec.ts`

```ts
import { createMockReqRes } from '#src/shared/create-mock-req-res.js';

void createMockReqRes;

describe('createMockReqRes', () => {
  test('expect.any로 준비된 객체의 형태를 검증합니다', () => {
    expect.hasAssertions();
    // 여기에 테스트 코드를 작성합니다.
  });
});
```

## 해야 할 일

- `src/users/user-lookup.service.spec.ts` 스켈레톤 안에서 `resolves`, `rejects.toThrow`, `beforeEach`를 사용해 테스트 본문을 직접 작성합니다.
- `src/session/session.service.spec.ts` 스켈레톤 안에서 `toThrow`, `test.each`를 사용해 테스트 본문을 직접 작성합니다.
- `src/shared/create-mock-req-res.spec.ts` 스켈레톤 안에서 `expect.any`와 `toMatchObject`를 사용해 테스트 본문을 직접 작성합니다.
- `src/setup.ts`와 `jest.config.mjs`를 함께 읽고, 공통 정리가 어떤 경로로 연결되는지 확인합니다.
- `pnpm test`를 실행해 다섯 파일의 테스트가 모두 통과하는지 확인합니다.

## 완료 기준

- `pnpm test`가 정상적으로 통과합니다.
- 언제 `toStrictEqual`을 쓰는지 설명할 수 있습니다.
- 언제 부분 일치 검증이 더 자연스러운지 설명할 수 있습니다.
- `jest.spyOn()`이 기존 메서드를 감시하는 역할이라는 점을 설명할 수 있습니다.
- 비동기 함수에서 `resolves`와 `rejects`를 왜 구분하는지 설명할 수 있습니다.
- `test.each`를 왜 복붙 대신 쓰는지 설명할 수 있습니다.
- `setupFilesAfterEnv`가 공통 정리 파일을 어떻게 연결하는지 설명할 수 있습니다.
