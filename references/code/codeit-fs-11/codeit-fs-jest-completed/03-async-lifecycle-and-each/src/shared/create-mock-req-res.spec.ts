import { createMockReqRes } from '#src/shared/create-mock-req-res.js';

describe('createMockReqRes', () => {
  test('req와 res의 기본 모양을 확인한다', () => {
    const { req, res } = createMockReqRes();

    expect(req).toMatchObject({
      body: expect.any(Object),
      params: expect.any(Object),
    });
    expect(res).toMatchObject({
      status: expect.any(Function),
      json: expect.any(Function),
      cookie: expect.any(Function),
    });
  });
});
