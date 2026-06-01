// 더하기
//type (x: number, y: number) -> number;
const add = (a, b) => a + b;

// 뺄셈
// type (x: number, y: number) -> number;
const substract = (a, b) => a - b;

// 곱셈
// type (x: number, y: number) -> number;
const multiply = (a, b) => a * b;

// 나눗셈
// type (x: number, y: number) -> number;
const divide = (a, b) => {
  if (b === 0) return;
  return a / b;
};

// 유료 버전 나눗셈
const divide_for_premium = (a, b) => a / b;

// 무료 버전 나눗셈
const divide_for_free = (a, b) => a / b;

// type (x: number) -> number
const square = (a) => a * a;
