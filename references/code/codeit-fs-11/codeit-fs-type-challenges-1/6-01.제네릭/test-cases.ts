import type { Equal, Expect } from '../_helpers/type-test';
import {
  getFirstValue,
  numberBox,
  numberEnvelope,
  pickLast,
  stringBox,
  stringEnvelope,
  wrapInArray,
} from './template';
import type { ApiEnvelope, Box } from './template';

const wrappedNumber = wrapInArray(3);
const wrappedText = wrapInArray('TS');
const firstNumber = getFirstValue([10, 20]);
const firstText = getFirstValue(['A', 'B']);
const lastNumber = pickLast([1, 2, 3]);
const lastText = pickLast(['A', 'B']);

type cases = [
  Expect<Equal<typeof wrappedNumber, number[]>>,
  Expect<Equal<typeof wrappedText, string[]>>,
  Expect<Equal<typeof firstNumber, number | undefined>>,
  Expect<Equal<typeof firstText, string | undefined>>,
  Expect<Equal<ApiEnvelope<string>['data'], string>>,
  Expect<Equal<typeof numberEnvelope.data, number>>,
  Expect<Equal<typeof stringEnvelope.data, string>>,
  Expect<Equal<Box<string>['value'], string>>,
  Expect<Equal<Box<number>['value'], number>>,
  Expect<Equal<typeof stringBox.value, string>>,
  Expect<Equal<typeof numberBox.value, number>>,
  Expect<Equal<typeof lastNumber, number | undefined>>,
  Expect<Equal<typeof lastText, string | undefined>>,
];

export {};
