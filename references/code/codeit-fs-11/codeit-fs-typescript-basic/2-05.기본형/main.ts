let itemName: string = '코드잇 블랙 후드';
let greet: string = `안녕하세요, ${itemName}`;

// itemName = 42;  // ❌ 오류: number를 string 자리에 넣을 수 없습니다

let price: number = 129_000;
let rate: number = 0.1;
let stock: number = NaN;

function applyDiscount(price: number): number {
  if (Number.isNaN(price)) {
    return 0;  // 비정상 입력 처리
  }

  return price * 0.9;
}

let isLoggedIn: boolean = false;
let membersOnly: boolean = true;

let lastSeen: undefined;
let deletedAt: null = null;

// let username: string;
// console.log(username);  // ❌ 오류: 초기화 전에 사용
