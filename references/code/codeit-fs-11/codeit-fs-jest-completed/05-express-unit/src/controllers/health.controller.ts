import type { Request, Response, Router } from 'express';
import { BaseController } from '#src/controllers/base.controller.js';

export class HealthController extends BaseController {
  public routes(): Router {
    this.router.get('/health', (req, res) => this.handleGetStatus(req, res));
    return this.router;
  }

  public getStatus(_req: Request, res: Response) {
    return this.handleGetStatus(_req, res);
  }

  private handleGetStatus(_req: Request, res: Response) {
    return res.status(200).json({ status: 'ok' });
  }
}
