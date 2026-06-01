import { jest } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import type { AuthenticatedRequest } from '#src/middlewares/require-auth.middleware.js';
import { RequireAuthMiddleware } from '#src/middlewares/require-auth.middleware.js';
import { teacherUserRecord } from '#test/mock/users.js';
import { StubUserRepository } from '#test/stub/repository/user.repository.js';

describe('RequireAuthMiddleware', () => {
  test('uid 쿠키가 없으면 사용자 조회 없이 401로 차단한다', async () => {
    const userRepository = new StubUserRepository();
    const middleware = new RequireAuthMiddleware(userRepository);
    const req = httpMocks.createRequest() as AuthenticatedRequest;
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await middleware.handle(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({
      message: '로그인이 필요합니다.',
    });
    expect(userRepository.findById).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test('uid 쿠키와 사용자가 모두 있으면 next를 호출한다', async () => {
    const userRepository = new StubUserRepository();
    userRepository.findById.mockResolvedValue(teacherUserRecord);
    const middleware = new RequireAuthMiddleware(userRepository);
    const req = httpMocks.createRequest({
      cookies: { uid: '1' },
    }) as AuthenticatedRequest;
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await middleware.handle(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({
      id: 1,
      email: 'teacher@example.com',
      name: 'Teacher',
    });
  });

  test('uid 쿠키가 숫자가 아니면 사용자 조회 없이 401로 차단한다', async () => {
    const userRepository = new StubUserRepository();
    const middleware = new RequireAuthMiddleware(userRepository);
    const req = httpMocks.createRequest({
      cookies: { uid: 'not-a-number' },
    }) as AuthenticatedRequest;
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await middleware.handle(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({
      message: '로그인이 필요합니다.',
    });
    expect(userRepository.findById).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test('uid는 있지만 사용자를 못 찾으면 401을 돌려준다', async () => {
    const userRepository = new StubUserRepository();
    userRepository.findById.mockResolvedValue(null);
    const middleware = new RequireAuthMiddleware(userRepository);
    const req = httpMocks.createRequest({
      cookies: { uid: '999' },
    }) as AuthenticatedRequest;
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await middleware.handle(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({
      message: '사용자를 찾을 수 없습니다.',
    });
    expect(next).not.toHaveBeenCalled();
  });
});
