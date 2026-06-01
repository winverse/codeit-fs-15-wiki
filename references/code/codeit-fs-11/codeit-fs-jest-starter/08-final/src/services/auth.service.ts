import { PasswordProvider } from '#src/providers/password.provider.js';
import {
  UserRepository,
  type UserRecord,
} from '#src/repositories/user.repository.js';

export interface PublicUser {
  id: number;
  email: string;
  name: string;
}

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordProvider: PasswordProvider,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<PublicUser | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const isMatched = await this.passwordProvider.compare(
      password,
      user.password,
    );
    if (!isMatched) {
      return null;
    }

    return this.toPublicUser(user);
  }

  private toPublicUser(user: UserRecord): PublicUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
