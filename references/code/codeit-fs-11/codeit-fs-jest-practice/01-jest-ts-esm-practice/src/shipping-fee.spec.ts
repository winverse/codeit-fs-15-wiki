import { shippingFee } from '#src/shipping-fee.js';

void shippingFee;

describe('shippingFee', () => {
  test('주문 금액이 50_000원 이상이면 배송비 0원을 반환합니다', () => {
    expect.hasAssertions();
    // 여기에 테스트 코드를 작성합니다.
  });

  test('주문 금액이 50_000원보다 작으면 배송비 3_000원을 반환합니다', () => {
    expect.hasAssertions();
    // 여기에 테스트 코드를 작성합니다.
  });
});
