import { container } from 'tsyringe';
import { Controller, UserController } from '#controllers';
import { PrismaService } from '#db';
import { PasswordProvider } from '#providers';
import { UserRepository } from '#repositories';
import { UserService } from '#services';

export function setupContainer() {
  if (container.isRegistered(PrismaService)) {
    return container;
  }

  container.registerSingleton(PrismaService);
  container.registerSingleton(PasswordProvider);
  container.registerSingleton(UserRepository);
  container.registerSingleton(UserService);
  container.registerSingleton(UserController);
  container.registerSingleton(Controller);

  return container;
}
