export interface UserGateway {
  findNameById(id: string): Promise<string | null>;
}

export class UserLookupService {
  constructor(private readonly gateway: UserGateway) {}

  async getDisplayName(userId: string): Promise<string> {
    const name = await this.gateway.findNameById(userId);

    if (!name) {
      throw new Error('USER_NOT_FOUND');
    }

    return `${name} 님`;
  }
}
