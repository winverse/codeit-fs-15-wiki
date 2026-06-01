import { jest } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import { AuthController } from '#src/controllers/auth.controller.js';
import type { AuthenticatedRequest } from '#src/middlewares/require-auth.middleware.js';
import { StubAuthService } from '#test/stub/services/auth.service.js';

describe('AuthController', () => {
  let authService: StubAuthService;
  let controller: AuthController;

  beforeEach(() => {
    authService = new StubAuthService();
    controller = new AuthController(authService);
  });

  test('로그인 성공 시 쿠키를 심고 공개 사용자 정보를 돌려준다', async () => {
    authService.login.mockResolvedValue({
      id: 1,
      email: 'teacher@example.com',
      name: 'Teacher',
    });
    const req = httpMocks.createRequest({
      body: {
        email: 'teacher@example.com',
        password: 'pw',
      },
    });
    const res = httpMocks.createResponse();
    const cookieSpy = jest.spyOn(res, 'cookie');

    await controller.login(req, res);

    expect(authService.login).toHaveBeenCalledWith('teacher@example.com', 'pw');
    expect(cookieSpy).toHaveBeenCalledWith('uid', '1', {
      httpOnly: true,
      sameSite: 'lax',
    });
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      user: {
        id: 1,
        email: 'teacher@example.com',
        name: 'Teacher',
      },
    });
  });

  test('로그인 실패 시 401을 돌려준다', async () => {
    const req = httpMocks.createRequest({
      body: {
        email: 'teacher@example.com',
        password: 'wrong',
      },
    });
    const res = httpMocks.createResponse();

    await controller.login(req, res);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({
      message: '로그인 정보가 올바르지 않습니다.',
    });
  });

  test('email이나 password가 없으면 서비스 호출 없이 400을 돌려준다', async () => {
    const req = httpMocks.createRequest({
      body: {
        email: 'teacher@example.com',
      },
    });
    const res = httpMocks.createResponse();

    await controller.login(req, res);

    expect(authService.login).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({
      message: 'email과 password를 모두 전달해야 합니다.',
    });
  });

  test('me는 미들웨어가 준비한 user를 그대로 응답으로 보낸다', async () => {
    const req = httpMocks.createRequest() as AuthenticatedRequest;
    req.user = {
      id: 1,
      email: 'teacher@example.com',
      name: 'Teacher',
    };
    const res = httpMocks.createResponse();

    await controller.me(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      user: {
        id: 1,
        email: 'teacher@example.com',
        name: 'Teacher',
      },
    });
  });

  test('me에서 user가 없으면 500을 돌려준다', async () => {
    const req = httpMocks.createRequest() as AuthenticatedRequest;
    const res = httpMocks.createResponse();

    await controller.me(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({
      message: '인증 미들웨어가 사용자 정보를 준비하지 못했습니다.',
    });
  });
});
