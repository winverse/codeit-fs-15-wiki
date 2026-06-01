import { jest } from '@jest/globals';
import { userGateway } from '#src/users/user-gateway.js';
import { UserLookupService } from '#src/users/user-lookup.service.js';

describe('UserLookupService', () => {
  const service = new UserLookupService(userGateway);
  let findNameByIdSpy: jest.SpiedFunction<typeof userGateway.findNameById>;

  beforeEach(() => {
    findNameByIdSpy = jest.spyOn(userGateway, 'findNameById');
  });

  test('Promise를 resolve해서 결과를 검증합니다', async () => {
    findNameByIdSpy.mockResolvedValue('win');

    await expect(service.getDisplayName('user-1')).resolves.toBe('win 님');
    expect(findNameByIdSpy).toHaveBeenCalledWith('user-1');
  });

  test('Promise를 reject하는 에러 흐름을 검증합니다', async () => {
    findNameByIdSpy.mockResolvedValue(null);

    await expect(service.getDisplayName('missing')).rejects.toThrow(
      'USER_NOT_FOUND',
    );
  });

  test('상태 오염을 막기 위해 각 테스트마다 호출 기록을 비웁니다', async () => {
    findNameByIdSpy.mockResolvedValue('win');
    await service.getDisplayName('user-1');
    expect(findNameByIdSpy).toHaveBeenCalledTimes(1);
  });
});
