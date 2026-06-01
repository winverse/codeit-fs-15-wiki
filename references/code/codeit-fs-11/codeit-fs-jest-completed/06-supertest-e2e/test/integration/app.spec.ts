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

  test('health 요청은 done 방식으로도 검증할 수 있다', (done) => {
    request(environment.application.app)
      .get('/health')
      .expect(200)
      .end((error, response) => {
        if (error) {
          done(error);
          return;
        }

        expect(response.headers['x-test-layer']).toBe('supertest');
        expect(response.body).toEqual({
          status: 'ok',
          message:
            'App 조립과 main 실행을 분리한 뒤 supertest로 요청 흐름을 검증합니다.',
        });
        done();
      });
  });

  test('잘못된 로그인은 return 기반 검증으로도 읽을 수 있다', () => {
    return request(environment.application.app)
      .post('/auth/login')
      .send({
        email: 'teacher@example.com',
        password: 'wrong',
      })
      .expect(401)
      .expect(({ body }) => {
        expect(body).toEqual({
          message: '로그인 정보가 올바르지 않습니다.',
        });
      });
  });

  test('로그인 성공 시 상태 코드, 헤더, 응답 본문을 함께 검증한다', async () => {
    const response = await request(environment.application.app)
      .post('/auth/login')
      .send({
        email: 'teacher@example.com',
        password: 'class-based-jest',
      });

    expect(response.status).toBe(200);
    expect(response.headers['x-auth-step']).toBe('login');
    const authCookie = response.headers['set-cookie']?.[0] ?? '';

    expect(authCookie).toContain('uid=1');
    expect(response.body).toEqual({
      user: {
        id: 1,
        email: 'teacher@example.com',
        name: 'Teacher',
      },
    });
  });

  test('supertest.agent는 로그인 이후 같은 세션으로 me 요청을 보낼 수 있다', async () => {
    const agent = request.agent(environment.application.app);

    await agent.post('/auth/login').send({
      email: 'teacher@example.com',
      password: 'class-based-jest',
    });

    const response = await agent.get('/auth/me');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      user: {
        id: 1,
        email: 'teacher@example.com',
        name: 'Teacher',
      },
    });
  });
});
