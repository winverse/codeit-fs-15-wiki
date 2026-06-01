import { App } from '#src/app.js';
import {
  AuthController,
  Controller,
  HealthController,
} from '#src/controllers/index.js';
import { FakeDatabase } from '#src/database/index.js';
import { PasswordProvider } from '#src/providers/index.js';
import { UserRepository } from '#src/repositories/index.js';
import { AuthService } from '#src/services/index.js';

const bootstrap = async () => {
  const database = new FakeDatabase();
  await database.connect();
  const passwordProvider = new PasswordProvider();
  const userRepository = new UserRepository(database);
  const authService = new AuthService(userRepository, passwordProvider);
  await userRepository.create({
    email: 'teacher@example.com',
    passwordHash: passwordProvider.hash('class-based-jest'),
    name: 'Teacher',
  });
  const controller = new Controller(
    new HealthController(database),
    new AuthController(authService),
  );
  const application = new App(controller);
  const port = Number(process.env.PORT ?? 3000);

  application.listen(port);
};

void bootstrap();
