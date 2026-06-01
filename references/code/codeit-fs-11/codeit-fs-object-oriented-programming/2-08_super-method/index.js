// 2-08. 부모 클래스의 메서드가 필요하다면? (super.메서드())

class User {
  #email;
  #birthdate;

  constructor(email, birthdate) {
    this.#email = email;
    this.#birthdate = birthdate;
  }

  get email() {
    return this.#email;
  }

  get birthdate() {
    return this.#birthdate;
  }

  buy(item) {
    console.log(`${this.email} buys ${item.name}`);
  }
}

class PremiumUser extends User {
  #level;
  #point;

  constructor(email, birthdate, level, point) {
    super(email, birthdate);
    this.#level = level;
    this.#point = point;
  }

  get level() {
    return this.#level;
  }

  get point() {
    return this.#point;
  }

  buy(item) {
    super.buy(item);                    // 부모의 buy를 그대로 실행
    this.#point += item.price * 0.05;   // 포인트 적립 추가
  }

  streamMusicForFree() {
    console.log(`Free music streaming for ${this.email}`);
  }
}

const item = { name: "스웨터", price: 30_000 };
const pUser1 = new PremiumUser("chris123@google.com", "1992-03-21", 3, 0);

pUser1.buy(item);             // "chris123@google.com buys 스웨터"
console.log(pUser1.point);   // 1500 (30_000 * 0.05)
