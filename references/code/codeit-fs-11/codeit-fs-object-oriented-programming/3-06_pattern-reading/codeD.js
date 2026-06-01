// 3-06. 패턴 독해 실습 - 코드 D
// 어떤 패턴이 사용되었는지 분석해보세요

class CardPayment {
  pay(amount) {
    console.log(`[CARD] ${amount}원 결제`);
  }
}

class KakaoPayment {
  pay(amount) {
    console.log(`[KAKAO] ${amount}원 결제`);
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

checkout.setPaymentStrategy(new KakaoPayment());
checkout.pay(30_000);
