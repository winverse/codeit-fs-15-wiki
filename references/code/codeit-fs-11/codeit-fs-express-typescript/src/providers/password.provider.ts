import bcrypt from 'bcrypt';
import { injectable } from 'tsyringe';

const SALT_ROUNDS = 10;

@injectable()
export class PasswordProvider {
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
