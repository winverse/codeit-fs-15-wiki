import { add } from '#src/add.js';

describe('add', () => {
  test('두 수의 합을 반환한다', () => {
    expect(add(1, 2)).toBe(3);
  });
});
