import { jest } from '@jest/globals';

export function createMockReqRes() {
  const req = {
    body: {},
    params: {},
    query: {},
    headers: {},
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    redirect: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
  };

  return { req, res };
}
