import type { PrismaClient } from '#generated/prisma/client.js';
import { beforeEach, jest } from '@jest/globals';
import {
  mockDeep,
  mockReset,
  type DeepMockProxy,
} from 'jest-mock-extended';

export const prismaMock =
  mockDeep<PrismaClient>() as DeepMockProxy<PrismaClient>;

await jest.unstable_mockModule('#src/db/prisma.js', () => ({
  __esModule: true,
  default: prismaMock,
}));

beforeEach(() => {
  mockReset(prismaMock);
});
