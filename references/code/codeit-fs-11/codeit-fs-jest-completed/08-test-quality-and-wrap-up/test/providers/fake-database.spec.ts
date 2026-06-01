import { FakeDatabase } from '#src/database/fake-database.js';

describe('FakeDatabase', () => {
  afterEach(async () => {
    delete process.env.NODE_ENV;
  });

  test('NODE_ENV가 test면 테스트 DB 이름을 고른다', async () => {
    process.env.NODE_ENV = 'test';
    const database = new FakeDatabase();

    await database.connect();

    expect(database.databaseName).toBe('app_test');

    await database.disconnect();
  });

  test('연결 전에 reset을 호출하면 명확한 에러를 던진다', async () => {
    const database = new FakeDatabase();

    await expect(database.reset()).rejects.toThrow(
      '테스트 DB 연결이 아직 준비되지 않았습니다.',
    );
  });
});
