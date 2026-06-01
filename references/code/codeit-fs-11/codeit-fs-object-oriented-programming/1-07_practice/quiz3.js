// 1-07. 퀴즈 3 - 장바구니 총합

class Cart {
  constructor() {
    // TODO
  }

  addItem(item) {
    // TODO
  }

  getTotalPrice() {
    // TODO
  }
}

const cart = new Cart();
cart.addItem({ name: "스웨터", price: 30_000 });
cart.addItem({ name: "청바지", price: 50_000 });
console.log(cart.getTotalPrice()); // 80000
