import { App } from '#src/app.js';
import {
  AuthController,
  Controller,
  HealthController,
} from '#src/controllers/index.js';
import { PasswordProvider } from '#src/providers/index.js';
import { UserRepository } from '#src/repositories/index.js';
import { AuthService } from '#src/services/index.js';

const port = Number(process.env.PORT ?? 4005);
const userRepository = new UserRepository([
  {
    id: 1,
    email: 'teacher@example.com',
    name: 'Teacher',
    password: 'class-based-jest',
  },
]);
const passwordProvider = new PasswordProvider();
const authService = new AuthService(userRepository, passwordProvider);
const healthController = new HealthController();
const authController = new AuthController(authService);
const controller = new Controller(healthController, authController);
const application = new App(controller);

application.listen(port);
