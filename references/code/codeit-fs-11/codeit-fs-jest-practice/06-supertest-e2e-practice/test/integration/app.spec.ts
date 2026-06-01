import request from 'supertest';
import {
  createTestEnvironment,
  type TestEnvironment,
} from '#test/helper/app-environment.js';

describe('integration/app', () => {
  let environment!: TestEnvironment;

  beforeEach(() => {
    environment = createTestEnvironment();
  });
  void environment;

  test('health 요청은 done 방식으로도 검증할 수 있다', (done) => {
    void request;
    void done;
    // 여기에 테스트 코드를 작성합니다.
  });

  test('잘못된 로그인은 return 기반 검증으로도 읽을 수 있다', () => {
    // 여기에 테스트 코드를 작성합니다.
  });

  test('로그인 성공 시 상태 코드, 헤더, 응답 본문을 함께 검증한다', async () => {
    // 여기에 테스트 코드를 작성합니다.
  });

  test('supertest.agent는 로그인 이후 같은 세션으로 me 요청을 보낼 수 있다', async () => {
    // 여기에 테스트 코드를 작성합니다.
  });
});
