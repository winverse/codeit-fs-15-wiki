// 똑같은 타입이 여러 곳에 반복되는 상황
const cart1: string[] = ['c001', 'c001', 'c002'];

interface User1 {
  username: string;
  email: string;
  cart: string[];
}

const user1: User1 = {
  username: 'codeit',
  email: 'typescript@codeit.kr',
  cart: cart1,
};

// 타입 별칭으로 의미를 붙여 재사용
type Cart = string[];

const cart2: Cart = ['c001', 'c001', 'c002'];

interface User2 {
  username: string;
  email: string;
  cart: Cart;
}

const user2: User2 = {
  username: 'codeit',
  email: 'typescript@codeit.kr',
  cart: cart2,
};

type AddToCartCallback = (result: boolean) => void;

function addToCartWithCallback(
  id: string,
  callback: AddToCartCallback,
): void {
  const result = true;
  callback(result);
}

addToCartWithCallback('c001', (result) => {
  console.log(result ? '장바구니 담기 성공' : '재고 없음');
});
