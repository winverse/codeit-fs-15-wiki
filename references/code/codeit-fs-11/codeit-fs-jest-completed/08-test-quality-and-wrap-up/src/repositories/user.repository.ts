import type { FakeDatabase } from '#src/database/fake-database.js';

export interface UserRecord {
  id: number;
  email: string;
  passwordHash: string;
  name: string;
}

export class UserRepository {
  constructor(private readonly database: FakeDatabase) {}

  findByEmail(email: string): Promise<UserRecord | null> {
    return this.database.findUserByEmail(email);
  }

  findById(id: number): Promise<UserRecord | null> {
    return this.database.findUserById(id);
  }

  create(user: Omit<UserRecord, 'id'>): Promise<UserRecord> {
    return this.database.seedUser(user);
  }
}
