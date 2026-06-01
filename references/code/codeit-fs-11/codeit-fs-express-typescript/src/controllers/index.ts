import { type Request, type Response, type Router } from 'express';
import { HTTP_STATUS } from '#common';
import { BaseController } from './base.controller.js';
import { UserController } from './user/index.js';
import { injectable } from 'tsyringe';

export * from './base.controller.js';
export * from './user/index.js';

@injectable()
export class Controller extends BaseController {
  constructor(private readonly userController: UserController) {
    super();
  }

  public routes(): Router {
    this.router.use('/users', this.userController.routes());
    this.router.get('/ping', (req, res) => this.ping(req, res));

    return this.router;
  }

  private ping(_req: Request, res: Response) {
    res.status(HTTP_STATUS.OK).json({ message: 'ok' });
  }
}
