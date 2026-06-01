import { jest } from '@jest/globals';
import { UserRepository } from '#src/repositories/user.repository.js';

export class StubUserRepository extends UserRepository {
  constructor() {
    super();
  }

  findByEmail = jest.fn<UserRepository['findByEmail']>();

  findById = jest.fn<UserRepository['findById']>();
}
