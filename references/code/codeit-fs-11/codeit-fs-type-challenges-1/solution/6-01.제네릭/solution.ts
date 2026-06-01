export function wrapInArray<T>(value: T): T[] {
  return [value];
}

export function getFirstValue<T>(items: T[]): T | undefined {
  return items[0];
}

export interface ApiEnvelope<T> {
  data: T;
  status: number;
}

export const numberEnvelope: ApiEnvelope<number> = {
  data: 1,
  status: 200,
};

export const stringEnvelope: ApiEnvelope<string> = {
  data: 'done',
  status: 200,
};

// 추가 문제 해답
export interface Box<T> {
  value: T;
  createdAt: string;
}

export function pickLast<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

export const stringBox: Box<string> = {
  value: 'done',
  createdAt: '2026-03-12',
};

export const numberBox: Box<number> = {
  value: 3,
  createdAt: '2026-03-12',
};
