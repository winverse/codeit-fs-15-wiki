export type Stub<T, K extends keyof T = never> = {
  [P in keyof Omit<T, K>]: Omit<T, K>[P] extends (
    ...args: never[]
  ) => unknown
    ? jest.MockedFunction<Omit<T, K>[P]>
    : Omit<T, K>[P];
};
