import cookieParser from 'cookie-parser';
import express, { type Express } from 'express';
import type { Controller } from '#src/controllers/index.js';
import { errorHandler } from '#src/middlewares/index.js';

export class App {
  public readonly app: Express;

  constructor(controller: Controller) {
    this.app = express();
    this.middleware();
    this.routes(controller);
    this.errorHandling();
  }

  private middleware() {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private routes(controller: Controller) {
    this.app.use(controller.routes());
  }

  private errorHandling() {
    this.app.use(errorHandler);
  }

  listen(port: number) {
    return this.app.listen(port, () => {
      console.log(`06-supertest-e2e listening on ${port}`);
    });
  }
}
