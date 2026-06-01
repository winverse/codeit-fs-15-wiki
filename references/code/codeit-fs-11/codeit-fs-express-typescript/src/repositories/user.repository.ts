import type {
  CreateUserInput,
  UpdateUserInput,
  UserResponse,
} from '#controllers';
import { PrismaService } from '#db';
import { injectable } from 'tsyringe';

@injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  findById(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  findByEmail(email: string): Promise<{ id: number } | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
  }

  create(data: CreateUserInput) {
    return this.prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  update(id: number, data: UpdateUserInput): Promise<UserResponse> {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
