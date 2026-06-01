import { App } from '#src/app.js';
import {
  AuthController,
  Controller,
  HealthController,
} from '#src/controllers/index.js';
import { RequireAuthMiddleware } from '#src/middlewares/index.js';
import { PasswordProvider } from '#src/providers/index.js';
import { UserRepository } from '#src/repositories/index.js';
import { AuthService } from '#src/services/index.js';
import { teacherUserRecord } from '#test/mock/users.js';

export interface TestEnvironment {
  application: App;
  authService: AuthService;
  userRepository: UserRepository;
}

export function createTestEnvironment(): TestEnvironment {
  const userRepository = new UserRepository([teacherUserRecord]);
  const authService = new AuthService(
    userRepository,
    new PasswordProvider(),
  );
  const requireAuthMiddleware = new RequireAuthMiddleware(userRepository);
  const controller = new Controller(
    new HealthController(),
    new AuthController(authService, requireAuthMiddleware),
  );
  const application = new App(controller);

  return {
    application,
    authService,
    userRepository,
  };
}
