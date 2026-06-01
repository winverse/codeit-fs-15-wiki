import { jest } from '@jest/globals';
import { formatter } from '#src/orders/formatter.js';
import { mailer } from '#src/orders/mailer.js';
import { sendOrderMail } from '#src/orders/send-order-mail.js';

void jest;
void formatter;
void mailer;
void sendOrderMail;

describe('sendOrderMail', () => {
  test('호출 횟수와 호출 인자를 검증합니다', async () => {
    expect.hasAssertions();
    // 여기에 테스트 코드를 작성합니다.
  });

  test('호출 순서에 따라 다른 동작을 줄 수 있습니다', () => {
    expect.hasAssertions();
    // 여기에 테스트 코드를 작성합니다.
  });
});
