export class PasswordProvider {
  hash(password: string) {
    return `hashed:${password}`;
  }

  compare(password: string, passwordHash: string) {
    return this.hash(password) === passwordHash;
  }
}
