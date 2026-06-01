import { type Request, type Response, type Router } from 'express';
import { BaseController } from '#src/controllers/base.controller.js';

export class HealthController extends BaseController {
  public routes(): Router {
    this.router.get('/health', (req, res) => this.getStatus(req, res));
    return this.router;
  }

  private getStatus(_req: Request, res: Response) {
    res.setHeader('x-test-layer', 'supertest');
    return res.status(200).json({
      status: 'ok',
      message:
        'App 조립과 main 실행을 분리한 뒤 supertest로 요청 흐름을 검증합니다.',
    });
  }
}
