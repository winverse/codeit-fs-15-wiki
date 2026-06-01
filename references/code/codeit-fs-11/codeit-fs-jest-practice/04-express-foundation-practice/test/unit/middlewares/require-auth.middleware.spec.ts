import { jest } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import type { AuthenticatedRequest } from '#src/middlewares/require-auth.middleware.js';
import { RequireAuthMiddleware } from '#src/middlewares/require-auth.middleware.js';
import { teacherUserRecord } from '#test/mock/users.js';
import { StubUserRepository } from '#test/stub/repository/user.repository.js';

describe('RequireAuthMiddleware.handle', () => {
  let userRepository: StubUserRepository;
  let middleware: RequireAuthMiddleware;
  let next: ReturnType<typeof jest.fn>;
  let req = httpMocks.createRequest<AuthenticatedRequest>();
  let res = httpMocks.createResponse();

  beforeEach(() => {
    userRepository = new StubUserRepository();
    middleware = new RequireAuthMiddleware(userRepository);
    next = jest.fn();
    req = httpMocks.createRequest<AuthenticatedRequest>();
    res = httpMocks.createResponse();
  });

  test('uid 쿠키가 없으면 401로 차단한다', async () => {
    await middleware.handle(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({
      message: '로그인이 필요합니다.',
    });
    expect(userRepository.findById).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test('정상 흐름이면 req.user를 채우고 next를 호출한다', async () => {
    userRepository.findById.mockResolvedValue(teacherUserRecord);
    req.cookies = { uid: '1' };

    await middleware.handle(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({
      id: 1,
      email: 'teacher@example.com',
      name: 'Teacher',
    });
  });

  test('uid 쿠키가 숫자가 아니면 사용자 조회 없이 401로 차단한다', async () => {
    expect.hasAssertions();
    // 여기에 테스트 코드를 작성합니다.
  });

  test('uid 쿠키는 있지만 사용자를 찾지 못하면 401로 차단한다', async () => {
    userRepository.findById.mockResolvedValue(null);
    req.cookies = { uid: '999' };

    await middleware.handle(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({
      message: '사용자를 찾을 수 없습니다.',
    });
    expect(next).not.toHaveBeenCalled();
  });
});
