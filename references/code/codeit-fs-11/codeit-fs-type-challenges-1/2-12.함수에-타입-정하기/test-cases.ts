import type { Equal, Expect } from '../_helpers/type-test';
import {
  addKeywords,
  appendTags,
  createLabel,
  printMessages,
  printReservation,
  reserveSeat,
} from './template';

type cases = [
  Expect<
    Equal<typeof reserveSeat, (seatId: string, count?: number) => boolean>
  >,
  Expect<Equal<typeof printReservation, (title?: string) => void>>,
  Expect<Equal<typeof appendTags, (...tags: string[]) => number>>,
  Expect<Equal<typeof createLabel, (id: string, prefix?: string) => string>>,
  Expect<Equal<typeof printMessages, (title?: string) => void>>,
  Expect<Equal<typeof addKeywords, (...keywords: string[]) => string>>,
];

export {};
