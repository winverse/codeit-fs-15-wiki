import { ConflictException, ERROR_MESSAGE } from '#common';
import type {
  CreateUserInput,
  UpdateUserInput,
  UserResponse,
} from '#controllers';
import { PasswordProvider } from '#providers';
import { UserRepository } from '#repositories';
import { injectable } from 'tsyringe';

@injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordProvider: PasswordProvider,
  ) {}

  async listUsers(): Promise<UserResponse[]> {
    return this.userRepository.findAll();
  }

  async getUserDetail(id: number): Promise<UserResponse> {
    return this.userRepository.findById(id);
  }

  async registerUser(input: CreateUserInput): Promise<UserResponse> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictException(ERROR_MESSAGE.USER_EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await this.passwordProvider.hash(input.password);

    return this.userRepository.create({
      ...input,
      password: hashedPassword,
    });
  }

  async changeProfile(
    id: number,
    input: UpdateUserInput,
  ): Promise<UserResponse> {
    const duplicateUser = input.email
      ? await this.userRepository.findByEmail(input.email)
      : null;

    if (duplicateUser && duplicateUser.id !== id) {
      throw new ConflictException(ERROR_MESSAGE.USER_EMAIL_ALREADY_EXISTS);
    }

    return this.userRepository.update(id, input);
  }

  async deleteAccount(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
