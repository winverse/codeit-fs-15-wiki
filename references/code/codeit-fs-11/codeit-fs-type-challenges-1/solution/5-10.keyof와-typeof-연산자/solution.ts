export const book = {
  id: 'b001',
  title: '타입 시스템 입문',
  price: 18_000,
  inStock: true,
};

export type BookFromValue = typeof book;
export type BookKey = keyof typeof book;

export const bookKeys: BookKey[] = ['title', 'price', 'inStock'];

export function readBookValue(item: BookFromValue, key: BookKey) {
  return item[key];
}

// 추가 문제 해답
export const filter = {
  sort: 'latest',
  page: 1,
  onlyMembers: false,
};

export type FilterFromValue = typeof filter;
export type FilterKey = keyof typeof filter;

export const filterKeys: FilterKey[] = ['sort', 'page', 'onlyMembers'];

export function readFilterValue(item: FilterFromValue, key: FilterKey) {
  return item[key];
}
