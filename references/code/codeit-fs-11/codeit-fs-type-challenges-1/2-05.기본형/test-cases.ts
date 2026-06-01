import type { Equal, Expect } from '../_helpers/type-test';
import {
  archivedAt,
  discountRate,
  deletedAt,
  emptyTitle,
  hasCoupon,
  isDigital,
  lastUpdated,
  publishedAt,
  sellerName,
  stock,
  shippingFee,
} from './template';

type cases = [
  Expect<Equal<typeof emptyTitle, string>>,
  Expect<Equal<typeof stock, number>>,
  Expect<Equal<typeof shippingFee, number>>,
  Expect<Equal<typeof isDigital, boolean>>,
  Expect<Equal<typeof lastUpdated, undefined>>,
  Expect<Equal<typeof archivedAt, null>>,
  Expect<Equal<typeof sellerName, string>>,
  Expect<Equal<typeof discountRate, number>>,
  Expect<Equal<typeof hasCoupon, boolean>>,
  Expect<Equal<typeof deletedAt, null>>,
  Expect<Equal<typeof publishedAt, undefined>>,
];

export {};
