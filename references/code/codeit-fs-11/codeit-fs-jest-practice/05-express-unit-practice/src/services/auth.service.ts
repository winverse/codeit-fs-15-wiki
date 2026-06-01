import type { PasswordProvider } from '#src/providers/password.provider.js';
import type {
  UserRecord,
  UserRepository,
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

  async login(email: string, password: string): Promise<PublicUser | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = await this.passwordProvider.compare(
      password,
      user.passwordHash,
    );
    if (!isValid) {
      return null;
    }

    return this.toPublicUser(user);
  }

  async getUserProfile(id: number): Promise<PublicUser | null> {
    const user = await this.userRepository.findById(id);
    return user ? this.toPublicUser(user) : null;
  }

  private toPublicUser(user: UserRecord): PublicUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
