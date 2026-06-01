import { jest } from '@jest/globals';
import { userGateway } from '#src/users/user-gateway.js';
import { UserLookupService } from '#src/users/user-lookup.service.js';

void jest;
void userGateway;
void UserLookupService;

describe('UserLookupService', () => {
  test('Promise를 resolve해서 결과를 검증합니다', async () => {
    expect.hasAssertions();
    // 여기에 테스트 코드를 작성합니다.
  });

  test('Promise를 reject하는 에러 흐름을 검증합니다', async () => {
    expect.hasAssertions();
    // 여기에 테스트 코드를 작성합니다.
  });
});
