export function shippingFee(totalAmount: number) {
  if (totalAmount >= 50_000) {
    return 0;
  }

  return 3_000;
}
