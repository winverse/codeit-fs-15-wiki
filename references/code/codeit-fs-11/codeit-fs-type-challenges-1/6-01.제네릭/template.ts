export function wrapInArray(value: any): any[] {
  return [value];
}

export function getFirstValue(items: any[]): any {
  return items[0];
}

export interface ApiEnvelope<T> {
  data: any;
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

// 추가 문제
export interface Box<T> {
  value: any;
  createdAt: string;
}

export function pickLast(items: any[]): any {
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
