import httpMocks from 'node-mocks-http';
import { HealthController } from '#src/controllers/health.controller.js';

describe('HealthController', () => {
  test('status ok를 응답한다', () => {
    const controller = new HealthController();
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    controller.getStatus(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ status: 'ok' });
  });
});
