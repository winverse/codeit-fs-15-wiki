// 3-05. 옵저버 패턴, Observer

class EmailSubscriber {
  constructor(email) {
    this.email = email;
  }

  update(product) {
    console.log(`[이메일 → ${this.email}] "${product.name}" 재입고 알림`);
  }
}

class SmsSubscriber {
  constructor(phone) {
    this.phone = phone;
  }

  update(product) {
    console.log(`[SMS → ${this.phone}] "${product.name}" 재입고 알림`);
  }
}

class Product {
  #name;
  #stock;
  #subscribers;

  constructor(name, stock) {
    this.#name = name;
    this.#stock = stock;
    this.#subscribers = [];
  }

  get name() {
    return this.#name;
  }

  get stock() {
    return this.#stock;
  }

  subscribe(subscriber) {
    this.#subscribers = [...this.#subscribers, subscriber];
  }

  unsubscribe(subscriber) {
    this.#subscribers = this.#subscribers.filter((s) => s !== subscriber);
  }

  #notifyAll() {
    this.#subscribers.forEach((subscriber) => subscriber.update(this));
  }

  setStock(newStock) {
    const wasOutOfStock = this.#stock === 0;
    this.#stock = newStock;

    if (wasOutOfStock && newStock > 0) {
      this.#notifyAll();
    }
  }
}

const jacket = new Product("겨울 자켓", 0);

const emailUser = new EmailSubscriber("chris@google.com");
const smsUser = new SmsSubscriber("010-1234-5678");

jacket.subscribe(emailUser);
jacket.subscribe(smsUser);

jacket.setStock(10);
// [이메일 → chris@google.com] "겨울 자켓" 재입고 알림
// [SMS → 010-1234-5678] "겨울 자켓" 재입고 알림

jacket.unsubscribe(smsUser);
jacket.setStock(0);
jacket.setStock(5);
// [이메일 → chris@google.com] "겨울 자켓" 재입고 알림
