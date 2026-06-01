export interface Course {
  id: unknown;
  title: unknown;
  price: unknown;
  published?: unknown;
}

export const course: Course = {
  id: 'ts-101',
  title: 'TypeScript 시작하기',
  price: 39_000,
  published: true,
};

export interface OnlineCourse extends Course {
  streamingHours: unknown;
}

export const onlineCourse: OnlineCourse = {
  id: 'ts-201',
  title: 'TypeScript 실전',
  price: 59_000,
  streamingHours: 12,
};

// 추가 문제
export interface Account {
  id: unknown;
  email: unknown;
  displayName?: unknown;
}

export const account: Account = {
  id: 'u001',
  email: 'creator@codeit.kr',
  displayName: '타입 크리에이터',
};

export interface CreatorAccount extends Account {
  subscriberCount: unknown;
}

export const creatorAccount: CreatorAccount = {
  id: 'u002',
  email: 'streamer@codeit.kr',
  subscriberCount: 1200,
};
