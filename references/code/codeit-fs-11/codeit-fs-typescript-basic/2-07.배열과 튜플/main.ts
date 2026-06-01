// string[] : 문자열 배열
const cart: string[] = ['c001', 'c002'];
cart.push('c003'); // OK
// cart.push(123); // ❌ 오류: number는 넣을 수 없습니다

// string[][] : 배열의 배열
const carts: string[][] = [['c001', 'c002'], ['c003']];

// number[] : 신발 사이즈 목록 (길이 제한 없음)
const shoeSizes: number[] = [230, 250, 280];
shoeSizes.push(300); // OK, 언제든 추가 가능

// [number, number] : 키와 허리 사이즈 (순서와 개수 고정)
const measurements: [number, number] = [175, 80];

// [string, number] : 사이즈 라벨과 재고 수량
const sizeStock: [string, number] = ['M', 50];

// measurements = [175, 80, 90]; // ❌ 오류: 개수가 맞지 않습니다
// sizeStock = [50, 'M']; // ❌ 오류: 순서가 맞지 않습니다
