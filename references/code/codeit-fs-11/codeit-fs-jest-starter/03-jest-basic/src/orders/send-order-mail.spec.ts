import { jest } from '@jest/globals';
import { formatter } from '#src/orders/formatter.js';
import { mailer } from '#src/orders/mailer.js';
import { sendOrderMail } from '#src/orders/send-order-mail.js';

describe('sendOrderMail', () => {
  test('호출 횟수와 호출 인자를 검증한다', async () => {
    const formatSpy = jest
      .spyOn(formatter, 'format')
      .mockReturnValueOnce('1,000원')
      .mockReturnValueOnce('46,000원');
    const sendSpy = jest.spyOn(mailer, 'send').mockResolvedValue(undefined);

    await sendOrderMail(
      {
        email: 'student@example.com',
        shippingFee: 1_000,
        total: 46_000,
      },
      { mailer, formatter },
    );

    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).toHaveBeenCalledWith({
      to: 'student@example.com',
      subject: '[order] 주문이 접수되었습니다',
      body: '배송비는 1,000원이고, 총 결제 금액은 46,000원입니다.',
    });
    expect(formatSpy).toHaveBeenNthCalledWith(1, 1_000);
    expect(formatSpy).toHaveBeenNthCalledWith(2, 46_000);
  });

  test('호출 순서에 따라 다른 동작을 줄 수 있다', () => {
    const formatSpy = jest.spyOn(formatter, 'format');

    formatSpy
      .mockImplementationOnce((amount: number) => `첫 호출:${amount}`)
      .mockReturnValueOnce('두 번째 호출')
      .mockReturnValue('기본 반환값');

    expect(formatter.format(1_000)).toBe('첫 호출:1000');
    expect(formatter.format(2_000)).toBe('두 번째 호출');
    expect(formatter.format(3_000)).toBe('기본 반환값');
    expect(formatSpy).toHaveBeenCalledTimes(3);
  });
});
