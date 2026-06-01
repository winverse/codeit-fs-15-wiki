import type { Equal, Expect } from '../_helpers/type-test';
import {
  Direction,
  Size,
  formatDirection,
  moveDirection,
  printSize,
  productSize,
} from './template';

type cases = [
  Expect<Equal<keyof typeof Size, 'S' | 'M' | 'L' | 'XL'>>,
  Expect<Equal<typeof productSize, Size>>,
  Expect<Equal<typeof printSize, (size: Size) => string>>,
  Expect<Equal<keyof typeof Direction, 'Up' | 'Down' | 'Left' | 'Right'>>,
  Expect<Equal<typeof moveDirection, Direction>>,
  Expect<Equal<typeof formatDirection, (direction: Direction) => string>>,
];

const mediumValue: 'M' = Size.M;
const leftValue: 'LEFT' = Direction.Left;
const sizeMessage: string = printSize(Size.L);
const directionMessage: string = formatDirection(Direction.Up);
void [mediumValue, leftValue, sizeMessage, directionMessage];

export {};
