import { jest } from '@jest/globals';
import { PasswordProvider } from '#src/providers/password.provider.js';
import type { Stub } from '#test/stub/stub.interface.js';

export class StubPasswordProvider
  extends PasswordProvider
  implements Stub<PasswordProvider>
{
  override compare = jest
    .fn<PasswordProvider['compare']>()
    .mockResolvedValue(false);
}
