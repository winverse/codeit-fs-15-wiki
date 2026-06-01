import type { UserGateway } from '#src/users/user-lookup.service.js';

export const userGateway: UserGateway = {
  async findNameById(_id: string): Promise<string | null> {
    return null;
  },
};
