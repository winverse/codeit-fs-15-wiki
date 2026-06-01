import { SessionService } from '#src/session/session.service.js';

void SessionService;

describe('SessionService', () => {
  test('timeout이 1000보다 작으면 에러를 던집니다', () => {
    expect.hasAssertions();
    // 여기에 테스트 코드를 작성합니다.
  });

  test.each([
    {
      currentDeadline: 1_000,
      extraMs: 10_000,
      expected: 11_000,
    },
    {
      currentDeadline: 2_500,
      extraMs: 5_000,
      expected: 7_500,
    },
    {
      currentDeadline: 30_000,
      extraMs: 0,
      expected: 30_000,
    },
  ])(
    '$currentDeadline에서 $extraMs를 더하면 $expected가 됩니다',
    ({ currentDeadline, extraMs, expected }) => {
      expect.hasAssertions();
      void currentDeadline;
      void extraMs;
      void expected;
      // 여기에 테스트 코드를 작성합니다.
    },
  );
});
