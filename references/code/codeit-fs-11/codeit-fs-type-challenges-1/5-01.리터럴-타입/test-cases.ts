import type { Equal, Expect } from '../_helpers/type-test';
import {
  acceptFirstStep,
  currentNotice,
  currentStep,
  freeShipping,
  pinnedNotice,
  printPinnedNotice,
} from './template';

type cases = [
  Expect<Equal<typeof pinnedNotice, '공지'>>,
  Expect<Equal<typeof currentNotice, string>>,
  Expect<Equal<typeof printPinnedNotice, (notice: '공지') => '공지'>>,
  Expect<Equal<typeof freeShipping, true>>,
  Expect<Equal<typeof currentStep, number>>,
  Expect<Equal<typeof acceptFirstStep, (step: 1) => 1>>,
];

export {};
