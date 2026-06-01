// 3-04. 전략 패턴, Strategy

class CardPayment {
  pay(amount) {
    console.log(`카드사 PG API 호출 — ${amount}원 결제 요청`);
  }
}

class KakaoPayment {
  pay(amount) {
    console.log(`카카오페이 API 호출 — ${amount}원 결제 요청`);
  }
}

class NaverPayment {
  pay(amount) {
    console.log(`네이버페이 API 호출 — ${amount}원 결제 요청`);
  }
}

class Checkout {
  #paymentStrategy;

  constructor(paymentStrategy) {
    this.#paymentStrategy = paymentStrategy;
  }

  setPaymentStrategy(paymentStrategy) {
    this.#paymentStrategy = paymentStrategy;
  }

  pay(amount) {
    this.#paymentStrategy.pay(amount);
  }
}

const checkout = new Checkout(new CardPayment());
checkout.pay(30_000);
// "카드사 PG API 호출 — 30000원 결제 요청"

checkout.setPaymentStrategy(new KakaoPayment());
checkout.pay(30_000);
// "카카오페이 API 호출 — 30000원 결제 요청"

checkout.setPaymentStrategy(new NaverPayment());
checkout.pay(30_000);
// "네이버페이 API 호출 — 30000원 결제 요청"
