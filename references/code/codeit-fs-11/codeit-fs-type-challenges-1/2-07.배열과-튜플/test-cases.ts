import type { Equal, Expect } from '../_helpers/type-test';
import {
  cartIds,
  coordinate,
  discountGroups,
  orderLine,
  point,
  sizeMatrix,
} from './template';

type cases = [
  Expect<Equal<typeof cartIds, string[]>>,
  Expect<Equal<typeof sizeMatrix, number[][]>>,
  Expect<Equal<typeof point, [number, number]>>,
  Expect<Equal<typeof orderLine, [string, number, boolean]>>,
  Expect<Equal<typeof discountGroups, string[][]>>,
  Expect<Equal<typeof coordinate, [number, number]>>,
];

export {};
