import { createOrderSummary } from '#src/orders/create-order-summary.js';

describe('createOrderSummary', () => {
  test('원시값은 toBe와 not으로, 객체는 toStrictEqual로 비교한다', () => {
    const summary = createOrderSummary([
      { name: 'Node.js 책', price: 18_000, quantity: 2 },
      { name: 'Jest 스티커', price: 6_000, quantity: 1 },
      { name: 'TypeScript 카드', price: 0, quantity: 0 },
    ]);

    expect(summary.itemCount).toBe(3);
    expect(summary.shippingFee).not.toBe(0);
    expect(summary).toStrictEqual({
      itemCount: 3,
      subtotal: 42_000,
      shippingFee: 3_000,
      total: 45_000,
      items: [
        { name: 'Node.js 책', subtotal: 36_000 },
        { name: 'Jest 스티커', subtotal: 6_000 },
      ],
    });
  });

  test('부분 일치와 배열 포함 관계를 검증한다', () => {
    const freeShippingSummary = createOrderSummary([
      { name: 'Express 강의', price: 50_000, quantity: 1 },
    ]);

    expect(freeShippingSummary).toMatchObject({
      shippingFee: 0,
      total: 50_000,
    });
    expect(freeShippingSummary.items).toContainEqual({
      name: 'Express 강의',
      subtotal: 50_000,
    });
  });
});
