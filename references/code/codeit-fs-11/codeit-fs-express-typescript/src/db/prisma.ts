import { PrismaClient } from '#generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from '#config';
import { injectable } from 'tsyringe';

@injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: config.DATABASE_URL,
    });
    super({ adapter });
  }
}
