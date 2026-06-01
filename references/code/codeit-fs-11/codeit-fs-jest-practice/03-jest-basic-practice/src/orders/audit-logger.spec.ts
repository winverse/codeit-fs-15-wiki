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
