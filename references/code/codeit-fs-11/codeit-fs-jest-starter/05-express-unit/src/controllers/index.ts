import { type Router } from 'express';
import { AuthController } from '#src/controllers/auth.controller.js';
import { BaseController } from '#src/controllers/base.controller.js';
import { HealthController } from '#src/controllers/health.controller.js';

export * from '#src/controllers/auth.controller.js';
export * from '#src/controllers/base.controller.js';
export * from '#src/controllers/health.controller.js';

export class Controller extends BaseController {
  constructor(
    private readonly healthController: HealthController,
    private readonly authController: AuthController,
  ) {
    super();
  }

  public routes(): Router {
    this.router.use(this.healthController.routes());
    this.router.use(this.authController.routes());
    return this.router;
  }
}
