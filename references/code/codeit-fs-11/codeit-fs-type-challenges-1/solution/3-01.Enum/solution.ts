export enum Size {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export const productSize: Size = Size.M;

export function printSize(size: Size): string {
  return `사이즈: ${size}`;
}

// 추가 문제 해답
export enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

export const moveDirection: Direction = Direction.Left;

export function formatDirection(direction: Direction): string {
  return `이동 방향: ${direction}`;
}
