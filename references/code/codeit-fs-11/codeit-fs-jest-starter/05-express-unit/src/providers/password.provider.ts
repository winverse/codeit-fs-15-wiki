export class PasswordProvider {
  async compare(candidate: string, storedHash: string) {
    return candidate === storedHash;
  }
}
