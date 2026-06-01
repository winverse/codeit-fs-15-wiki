export interface UserRecord {
  id: number;
  email: string;
  name: string;
  password: string;
}

export class UserRepository {
  constructor(private readonly users: UserRecord[]) {}

  async findByEmail(email: string): Promise<UserRecord | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }
}
