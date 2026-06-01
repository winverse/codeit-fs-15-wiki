import {
  beforeEach,
  describe,
  expect,
  test,
} from '@jest/globals';
import { UserService } from '#src/services/user.service.js';
import {
  assistantUserRecord,
  teacherUserRecord,
} from '#test/mock/users.js';
import { prismaMock } from '#test/mock/prisma.js';

describe('UserService.createUser', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  test('약관에 동의하면 Prisma Client로 사용자를 생성한다', async () => {
    prismaMock.user.create.mockResolvedValue(teacherUserRecord);

    await expect(
      service.createUser({
        email: 'teacher@example.com',
        name: 'Teacher',
        passwordHash: 'hashed:pw',
        acceptTermsAndConditions: true,
      }),
    ).resolves.toEqual({
      id: 1,
      email: 'teacher@example.com',
      name: 'Teacher',
    });

    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        email: 'teacher@example.com',
        name: 'Teacher',
        passwordHash: 'hashed:pw',
      },
    });
  });

  test('약관에 동의하지 않으면 Prisma Client를 호출하지 않는다', async () => {
    await expect(
      service.createUser({
        email: 'teacher@example.com',
        name: 'Teacher',
        passwordHash: 'hashed:pw',
        acceptTermsAndConditions: false,
      }),
    ).rejects.toThrow('TERMS_NOT_ACCEPTED');

    expect(prismaMock.user.create).not.toHaveBeenCalled();
  });
});

describe('UserService.renameUser', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  test('사용자 이름을 수정한다', async () => {
    prismaMock.user.update.mockResolvedValue({
      ...teacherUserRecord,
      name: 'Teacher Park',
    });

    await expect(
      service.renameUser({
        id: 1,
        name: 'Teacher Park',
      }),
    ).resolves.toEqual({
      id: 1,
      email: 'teacher@example.com',
      name: 'Teacher Park',
    });

    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
      data: {
        name: 'Teacher Park',
      },
    });
  });
});

describe('UserService.getPublicUserByEmail', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  test('사용자를 찾으면 공개 정보만 반환한다', async () => {
    prismaMock.user.findUnique.mockResolvedValue(assistantUserRecord);

    await expect(
      service.getPublicUserByEmail('assistant@example.com'),
    ).resolves.toEqual({
      id: 2,
      email: 'assistant@example.com',
      name: 'Assistant',
    });

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: 'assistant@example.com',
      },
    });
  });

  test('사용자를 찾지 못하면 null을 반환한다', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    await expect(
      service.getPublicUserByEmail('missing@example.com'),
    ).resolves.toBeNull();

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: 'missing@example.com',
      },
    });
  });
});
