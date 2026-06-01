export interface Course {
  id: string;
  title: string;
  price: number;
  published?: boolean;
}

export const course: Course = {
  id: 'ts-101',
  title: 'TypeScript 시작하기',
  price: 39_000,
  published: true,
};

export interface OnlineCourse extends Course {
  streamingHours: number;
}

export const onlineCourse: OnlineCourse = {
  id: 'ts-201',
  title: 'TypeScript 실전',
  price: 59_000,
  streamingHours: 12,
};

// 추가 문제 해답
export interface Account {
  id: string;
  email: string;
  displayName?: string;
}

export const account: Account = {
  id: 'u001',
  email: 'creator@codeit.kr',
  displayName: '타입 크리에이터',
};

export interface CreatorAccount extends Account {
  subscriberCount: number;
}

export const creatorAccount: CreatorAccount = {
  id: 'u002',
  email: 'streamer@codeit.kr',
  subscriberCount: 1200,
};
