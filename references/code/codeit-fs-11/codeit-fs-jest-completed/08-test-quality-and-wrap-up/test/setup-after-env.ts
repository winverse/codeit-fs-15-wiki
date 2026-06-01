import { jest } from '@jest/globals';

beforeEach(() => {
  jest.useRealTimers();
});

afterEach(() => {
  jest.restoreAllMocks();
});
