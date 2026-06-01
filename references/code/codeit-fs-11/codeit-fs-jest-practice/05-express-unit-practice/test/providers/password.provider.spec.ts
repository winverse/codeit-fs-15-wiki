import { PasswordProvider } from '#src/providers/password.provider.js';

describe('PasswordProvider', () => {
  test.each([
    {
      label: '같은 문자열',
      candidate: 'pw',
      storedHash: 'pw',
      expected: true,
    },
    {
      label: '다른 문자열',
      candidate: 'pw',
      storedHash: 'wrong',
      expected: false,
    },
  ])(
    '$label이면 compare는 $expected를 반환합니다',
    async ({ candidate, storedHash, expected }) => {
      const provider = new PasswordProvider();

      await expect(provider.compare(candidate, storedHash)).resolves.toBe(
        expected,
      );
    },
  );
});
