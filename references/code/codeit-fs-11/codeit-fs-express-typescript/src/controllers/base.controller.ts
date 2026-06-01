import { Router } from 'express';

export abstract class BaseController {
  public readonly router: Router;

  constructor() {
    this.router = Router();
  }

  public abstract routes(): Router;
}
