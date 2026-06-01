enum Size {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

const productSize: Size = Size.M;
console.log(productSize);

function printSize(size: Size): void {
  console.log(`사이즈: ${size}`);
}

printSize(Size.L);
// printSize('L');

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

function move(direction: Direction): void {
  console.log(`이동 방향: ${direction}`);
}

move(Direction.Up);
move(Direction.Left);
// move('UP');

enum NumericDirection {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

console.log(NumericDirection.Left);

enum StringDirection {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

console.log(StringDirection.Left);
