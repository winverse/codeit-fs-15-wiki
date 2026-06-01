export const book = {
  id: 'b001',
  title: '타입 시스템 입문',
  price: 18_000,
  inStock: true,
};

export type BookFromValue = any;
export type BookKey = any;

export const bookKeys: BookKey[] = ['id', 'title', 'price', 'inStock'];

export function readBookValue(item: BookFromValue, key: BookKey) {
  return item[key];
}

// 추가 문제
export const filter = {
  sort: 'latest',
  page: 1,
  onlyMembers: false,
};

export type FilterFromValue = any;
export type FilterKey = any;

export const filterKeys: FilterKey[] = ['sort', 'page', 'onlyMembers'];

export function readFilterValue(item: FilterFromValue, key: FilterKey) {
  return item[key];
}
