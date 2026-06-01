import type { CurrencyFormatter } from '#src/orders/formatter.js';
import type { Mailer } from '#src/orders/mailer.js';

export interface OrderMailInput {
  email: string;
  shippingFee: number;
  total: number;
}

export async function sendOrderMail(
  input: OrderMailInput,
  dependencies: { mailer: Mailer; formatter: CurrencyFormatter },
): Promise<void> {
  const formattedShippingFee = dependencies.formatter.format(input.shippingFee);
  const formattedTotal = dependencies.formatter.format(input.total);

  await dependencies.mailer.send({
    to: input.email,
    subject: '[order] 주문이 접수되었습니다',
    body: `배송비는 ${formattedShippingFee}이고, 총 결제 금액은 ${formattedTotal}입니다.`,
  });
}
