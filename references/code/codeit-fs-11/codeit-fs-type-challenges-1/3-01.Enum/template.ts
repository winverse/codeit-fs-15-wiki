export enum Size {
  S = 'Small',
  M = 'Medium',
  L = 'Large',
  XL = 'Extra Large',
}

export const productSize: Size = Size.M;

export function printSize(size: Size): string {
  return `사이즈: ${size}`;
}

// 추가 문제
export enum Direction {
  Up = 'U',
  Down = 'D',
  Left = 'L',
  Right = 'R',
}

export const moveDirection: Direction = Direction.Left;

export function formatDirection(direction: Direction): string {
  return `이동 방향: ${direction}`;
}
