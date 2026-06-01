export const book: unknown = {
  id: 'b001',
  title: '정적 타이핑 안내서',
  price: 18_000,
  discountRate: 0.1,
  tags: ['typescript', 'types'],
};

export const ebook: unknown = {
  id: 'b002',
  title: '타입 시스템 입문',
  price: 12_000,
  tags: ['ebook'],
};

export const stockByIsbn: unknown = {
  b001: 3,
  b002: 10,
};

// 추가 문제
export const memberProfile: unknown = {
  id: 'u001',
  email: 'teacher@codeit.kr',
  nickname: '타입 선생님',
  favoriteTags: ['typescript', 'backend'],
  marketingOptIn: true,
};

export const guestProfile: unknown = {
  id: 'u002',
  email: 'guest@codeit.kr',
  favoriteTags: ['typescript'],
  marketingOptIn: false,
};

export const levelByCourse: unknown = {
  ts101: 3,
  ts201: 1,
};
