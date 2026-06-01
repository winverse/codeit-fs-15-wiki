import type { Equal, Expect } from '../_helpers/type-test';
import {
  book,
  ebook,
  guestProfile,
  levelByCourse,
  memberProfile,
  stockByIsbn,
} from './template';

type Book = {
  id: string;
  title: string;
  price: number;
  discountRate?: number;
  tags: string[];
};

type Profile = {
  id: string;
  email: string;
  nickname?: string;
  favoriteTags: string[];
  marketingOptIn: boolean;
};

type cases = [
  Expect<Equal<typeof book, Book>>,
  Expect<Equal<typeof ebook, Book>>,
  Expect<Equal<typeof memberProfile, Profile>>,
  Expect<Equal<typeof guestProfile, Profile>>,
];

const typedStock: { [isbn: string]: number } = stockByIsbn;
const typedLevelMap: { [courseId: string]: number } = levelByCourse;
void typedStock;
void typedLevelMap;

export {};
