import 'reflect-metadata';
import { config } from '#config';
import { Controller } from '#controllers';
import { App } from './app.js';
import { setupContainer } from './common/di/container.js';

async function bootstrap() {
  const container = setupContainer();
  const controller = container.resolve(Controller);

  const app = new App(controller);
  app.listen(config.PORT);
}

bootstrap();
