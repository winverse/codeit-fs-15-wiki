const stock: { [id: string]: number } = { c001: 3, c002: 1 };
const cart: string[] = [];

// id: string  → 첫 번째 파라미터는 문자열
// quantity: number = 1  → 두 번째는 숫자, 기본값은 1
// : boolean  → 리턴값은 불린형
function addToCart(id: string, quantity: number = 1): boolean {
  if (stock[id] < quantity) {
    return false;
  }

  stock[id] -= quantity;
  for (let i = 0; i < quantity; i++) {
    cart.push(id);
  }

  return true;
}

addToCart('c001', 2);
addToCart('c001');
// addToCart(123, 2);

function printCart(title?: string): void {
  if (title) {
    console.log(title);
  }

  console.log(cart);
}

printCart();
printCart('현재 장바구니');

function addManyToCart(...ids: string[]): void {
  for (const id of ids) {
    addToCart(id);
  }
}

addManyToCart('c001', 'c002');
