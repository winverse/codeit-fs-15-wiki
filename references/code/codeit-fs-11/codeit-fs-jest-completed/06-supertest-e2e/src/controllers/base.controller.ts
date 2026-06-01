import { Router, type Router as ExpressRouter } from 'express';

export abstract class BaseController {
  public readonly router: ExpressRouter;

  constructor() {
    this.router = Router();
  }

  public abstract routes(): ExpressRouter;
}
