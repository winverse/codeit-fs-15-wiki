import { type Request, type Response, type Router } from 'express';
import type { FakeDatabase } from '#src/database/fake-database.js';
import { BaseController } from '#src/controllers/base.controller.js';

export class HealthController extends BaseController {
  constructor(private readonly database: FakeDatabase) {
    super();
  }

  public routes(): Router {
    this.router.get('/health', (req, res) => this.getStatus(req, res));
    return this.router;
  }

  private getStatus(_request: Request, response: Response) {
    response.status(200).json({
      status: 'ok',
      databaseName: this.database.databaseName,
      connected: this.database.isConnected(),
      message:
        '테스트 전용 DB와 반복 실행 환경을 기준으로 통합 테스트를 운영합니다.',
    });
  }
}
