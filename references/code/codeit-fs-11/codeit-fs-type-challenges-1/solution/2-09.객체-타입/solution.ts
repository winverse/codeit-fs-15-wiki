export const book: {
  id: string;
  title: string;
  price: number;
  discountRate?: number;
  tags: string[];
} = {
  id: 'b001',
  title: '정적 타이핑 안내서',
  price: 18_000,
  discountRate: 0.1,
  tags: ['typescript', 'types'],
};

export const ebook: {
  id: string;
  title: string;
  price: number;
  discountRate?: number;
  tags: string[];
} = {
  id: 'b002',
  title: '타입 시스템 입문',
  price: 12_000,
  tags: ['ebook'],
};

export const stockByIsbn: { [isbn: string]: number } = {
  b001: 3,
  b002: 10,
};

// 추가 문제 해답
export const memberProfile: {
  id: string;
  email: string;
  nickname?: string;
  favoriteTags: string[];
  marketingOptIn: boolean;
} = {
  id: 'u001',
  email: 'teacher@codeit.kr',
  nickname: '타입 선생님',
  favoriteTags: ['typescript', 'backend'],
  marketingOptIn: true,
};

export const guestProfile: {
  id: string;
  email: string;
  nickname?: string;
  favoriteTags: string[];
  marketingOptIn: boolean;
} = {
  id: 'u002',
  email: 'guest@codeit.kr',
  favoriteTags: ['typescript'],
  marketingOptIn: false,
};

export const levelByCourse: { [courseId: string]: number } = {
  ts101: 3,
  ts201: 1,
};
