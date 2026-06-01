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

const port = Number(process.env.PORT ?? 4006);
const userRepository = new UserRepository([
  {
    id: 1,
    email: 'teacher@example.com',
    name: 'Teacher',
    passwordHash: 'class-based-jest',
  },
]);
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

application.listen(port);
