export interface UserRecord {
  id: number;
  email: string;
  name: string;
  passwordHash: string;
}

export class UserRepository {
  constructor(private readonly users: UserRecord[] = []) {}

  async findByEmail(email: string): Promise<UserRecord | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async findById(id: number): Promise<UserRecord | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }
}
