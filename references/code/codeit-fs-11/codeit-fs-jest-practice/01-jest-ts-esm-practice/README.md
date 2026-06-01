# 01-jest-ts-esm

이 폴더는 1장 실습의 상세 기준입니다. 교재 본문에서는 시작 경로만 안내하고, 실제 과제 내용은 이 README를 기준으로 진행합니다.

## 역할

- Jest 실행 환경을 스스로 다시 맞춥니다.
- 준비된 테스트 대상 코드 위에 첫 테스트를 붙입니다.
- coverage를 점수표가 아니라 비어 있는 분기 확인 도구로 읽는 연습을 합니다.

## 현재 상태

- `src/shipping-fee.ts`는 이미 준비되어 있습니다.
- `src/shipping-fee.spec.ts`는 `describe(...)`와 `test(...)` 스켈레톤만 들어 있습니다.
- 아직 `tsconfig.json`, `jest.config.mjs`, Jest 실행 스크립트는 없습니다.
- 이 실습은 설정까지 직접 완성하는 starter입니다.

## 실습 목표

1장 실습의 목표는 세 가지입니다.

- Jest 실행 환경을 스스로 다시 맞춰 봅니다.
- `describe(...)`와 `test(...)`를 이용해 테스트 대상을 분명하게 나눕니다.
- `coverage` 리포트를 이용해 비어 있는 분기를 테스트로 채웁니다.

여기서 중요한 점은 coverage를 점수표처럼 보지 않는 것입니다. coverage `100%`가 항상 좋은 테스트를 뜻하지는 않습니다. 이 실습에서는 숫자 자체보다, 비어 있는 분기를 실제 테스트로 닿게 만드는 경험을 더 중요하게 봅니다.

## 시작 코드

이 실습에서는 아래 `src/shipping-fee.ts`를 출발점으로 두고, 학생은 그 위에 테스트를 붙입니다.

파일: `src/shipping-fee.ts`

```ts
export function shippingFee(totalAmount: number) {
  if (totalAmount >= 50_000) {
    return 0;
  }

  return 3_000;
}
```

테스트 파일도 완전히 비워 두지 않습니다. `describe(...)`와 `test(...)` 제목까지는 먼저 잡아 두고, 학생은 각 테스트 본문을 직접 채우는 방식으로 진행합니다.

파일: `src/shipping-fee.spec.ts`

```ts
import { shippingFee } from '#src/shipping-fee.js';

describe('shippingFee', () => {
  test('주문 금액이 50_000원 이상이면 배송비 0원을 반환합니다', () => {
    // 여기에 테스트 코드를 작성합니다.
  });

  test('주문 금액이 50_000원보다 작으면 배송비 3_000원을 반환합니다', () => {
    // 여기에 테스트 코드를 작성합니다.
  });
});
```

## 해야 할 일

- `package.json`에 ESM 설정, `test`, `test:cov` 스크립트를 넣습니다.
- `tsconfig.json`과 `jest.config.mjs`를 작성합니다.
- 이미 준비된 `src/shipping-fee.ts`를 읽고, 어떤 분기가 있는지 먼저 확인합니다.
- `src/shipping-fee.spec.ts` 스켈레톤 안에서 각 `test(...)` 본문을 직접 작성합니다.
- `pnpm test`를 실행해 테스트가 통과하는지 확인합니다.
- `pnpm test:cov`를 실행해 비어 있는 분기가 없는지 확인합니다.

## 완료 기준

- `pnpm test`가 정상적으로 통과합니다.
- `pnpm test:cov`가 실행되고, `shippingFee`의 두 분기가 모두 테스트에 닿습니다.
- `src/shipping-fee.spec.ts`가 실제로 실행됩니다.
- 왜 `type: "module"`이 필요한지 설명할 수 있습니다.
- 왜 `NodeNext`를 쓰는지 설명할 수 있습니다.
- 왜 Jest 설정 파일이 필요한지 설명할 수 있습니다.
- 왜 coverage를 점수표가 아니라 비어 있는 분기 확인 도구로 봐야 하는지 설명할 수 있습니다.
