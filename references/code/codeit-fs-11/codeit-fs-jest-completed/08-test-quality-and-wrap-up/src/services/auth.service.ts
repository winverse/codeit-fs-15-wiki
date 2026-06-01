import { PasswordProvider } from '#src/providers/password.provider.js';
import {
  type UserRecord,
  UserRepository,
} from '#src/repositories/user.repository.js';

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordProvider: PasswordProvider,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return {
        ok: false as const,
        reason: 'INVALID_CREDENTIALS' as const,
      };
    }

    const verified = this.passwordProvider.compare(password, user.passwordHash);

    if (!verified) {
      return {
        ok: false as const,
        reason: 'INVALID_CREDENTIALS' as const,
      };
    }

    return {
      ok: true as const,
      user: this.toSafeUser(user),
    };
  }

  async getUserProfile(id: number) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return null;
    }

    return this.toSafeUser(user);
  }

  private toSafeUser(user: UserRecord) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
