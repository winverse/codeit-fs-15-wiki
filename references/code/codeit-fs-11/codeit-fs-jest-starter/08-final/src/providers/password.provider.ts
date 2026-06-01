export class PasswordProvider {
  async compare(
    plainPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return plainPassword === storedPassword;
  }
}
