export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface OrderSummaryItem {
  name: string;
  subtotal: number;
}

export interface OrderSummary {
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  items: OrderSummaryItem[];
}

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
