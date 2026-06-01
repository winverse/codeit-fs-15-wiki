import { jest } from '@jest/globals';
import { formatter } from '#src/orders/formatter.js';
import { mailer } from '#src/orders/mailer.js';
import { sendOrderMail } from '#src/orders/send-order-mail.js';

void jest;
void formatter;
void mailer;
void sendOrderMail;

describe('sendOrderMail', () => {
  test('메일 payload를 조합해 메일러를 호출한다', async () => {
    expect.hasAssertions();
    // 여기에 테스트 코드를 작성합니다.
  });

  test('입력한 금액에 따라 다른 문자열을 반환한다', () => {
    expect.hasAssertions();
    // 여기에 테스트 코드를 작성합니다.
  });
});
