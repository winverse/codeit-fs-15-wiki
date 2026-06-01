import prisma from '#src/db/prisma.js';

export interface CreateUserInput {
  email: string;
  name: string;
  passwordHash: string;
  acceptTermsAndConditions: boolean;
}

export interface RenameUserInput {
  id: number;
  name: string;
}

export interface PublicUser {
  id: number;
  email: string;
  name: string;
}

export class UserService {
  constructor(private readonly prismaService = prisma) {}

  async createUser(input: CreateUserInput): Promise<PublicUser> {
    if (!input.acceptTermsAndConditions) {
      throw new Error('TERMS_NOT_ACCEPTED');
    }

    const user = await this.prismaService.user.create({
      data: {
        email: input.email,
        name: input.name,
        passwordHash: input.passwordHash,
      },
    });

    return this.toPublicUser(user);
  }

  async renameUser(input: RenameUserInput): Promise<PublicUser> {
    const user = await this.prismaService.user.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
      },
    });

    return this.toPublicUser(user);
  }

  async getPublicUserByEmail(email: string): Promise<PublicUser | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return this.toPublicUser(user);
  }

  private toPublicUser(user: {
    id: number;
    email: string;
    name: string;
  }) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
