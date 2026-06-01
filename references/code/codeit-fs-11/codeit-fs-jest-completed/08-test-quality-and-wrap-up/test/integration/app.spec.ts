import request from 'supertest';
import {
  closeTestResources,
  createTestEnvironment,
  resetTestDatabase,
  seedAssistantUser,
  type TestEnvironment,
} from '#test/helper/app-environment.js';
import { assistantAccount, teacherAccount } from '#test/mock/users.js';

describe('integration/app', () => {
  let environment: TestEnvironment;

  beforeAll(async () => {
    environment = await createTestEnvironment();
  });

  beforeEach(async () => {
    await resetTestDatabase(environment);
  });

  afterAll(async () => {
    await closeTestResources(environment);
  });

  test('health 응답은 테스트 전용 DB 이름과 연결 상태를 보여 준다', async () => {
    const response = await request(environment.application.app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      databaseName: 'app_test',
      connected: true,
      message:
        '테스트 전용 DB와 반복 실행 환경을 기준으로 통합 테스트를 운영합니다.',
    });
  });

  test('beforeAll과 afterAll 바깥틀 안에서 agent 로그인 흐름을 반복 실행할 수 있다', async () => {
    const agent = request.agent(environment.application.app);

    const loginResponse = await agent.post('/auth/login').send({
      email: teacherAccount.email,
      password: teacherAccount.password,
    });

    expect(loginResponse.status).toBe(200);

    const meResponse = await agent.get('/auth/me');

    expect(meResponse.status).toBe(200);
    expect(meResponse.body).toEqual({
      user: {
        id: 1,
        email: teacherAccount.email,
        name: teacherAccount.name,
      },
    });
  });

  test('테스트마다 필요한 데이터는 개별 테스트 안에서 추가로 준비할 수 있다', async () => {
    await seedAssistantUser(environment);

    const response = await request(environment.application.app)
      .post('/auth/login')
      .send({
        email: assistantAccount.email,
        password: assistantAccount.password,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      user: {
        id: 2,
        email: assistantAccount.email,
        name: assistantAccount.name,
      },
    });
  });

  test('잘못된 비밀번호는 401로 막히고, 누락된 본문은 400으로 분기된다', async () => {
    const wrongPasswordResponse = await request(environment.application.app)
      .post('/auth/login')
      .send({
        email: teacherAccount.email,
        password: 'wrong',
      });

    expect(wrongPasswordResponse.status).toBe(401);
    expect(wrongPasswordResponse.body).toEqual({
      message: '로그인 정보가 올바르지 않습니다.',
    });

    const missingBodyResponse = await request(environment.application.app)
      .post('/auth/login')
      .send({
        email: teacherAccount.email,
      });

    expect(missingBodyResponse.status).toBe(400);
    expect(missingBodyResponse.body).toEqual({
      message: '이메일과 비밀번호를 모두 입력해야 합니다.',
    });
  });

  test('로그아웃 이후에는 같은 agent라도 다시 인증이 필요하다', async () => {
    const agent = request.agent(environment.application.app);

    await agent.post('/auth/login').send({
      email: teacherAccount.email,
      password: teacherAccount.password,
    });

    const logoutResponse = await agent.post('/auth/logout');
    expect(logoutResponse.status).toBe(204);

    const meResponse = await agent.get('/auth/me');

    expect(meResponse.status).toBe(401);
    expect(meResponse.body).toEqual({
      message: '로그인이 필요합니다.',
    });
  });
});
