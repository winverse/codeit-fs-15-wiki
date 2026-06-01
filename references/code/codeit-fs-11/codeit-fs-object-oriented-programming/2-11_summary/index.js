// 2-11. 핵심 개념 정리
// 추상화 · 캡슐화 · 상속 · 다형성을 모두 적용한 최종 User/PremiumUser 구조

class User {
  #email;
  #birthdate;

  constructor(email, birthdate) {
    // 사용자의 이메일 주소
    this.#email = email;
    // 사용자의 생일
    this.#birthdate = birthdate;
  }

  get email() {
    return this.#email;
  }

  get birthdate() {
    return this.#birthdate;
  }

  set email(address) {
    if (address.includes("@")) {
      this.#email = address;
    } else {
      throw new Error("invalid email address");
    }
  }

  // 물건 구매하기
  buy(item) {
    console.log(`${this.email} buys ${item.name}`);
  }
}

class PremiumUser extends User {
  #level;

  constructor(email, birthdate, level) {
    super(email, birthdate);
    this.#level = level;
  }

  get level() {
    return this.#level;
  }

  // 오버라이딩: 5% 할인 구매
  buy(item) {
    console.log(`${this.email} buys ${item.name} with a 5% discount`);
  }

  streamMusicForFree() {
    console.log(`Free music streaming for ${this.email}`);
  }
}

const item = { name: "스웨터", price: 30_000 };

const users = [
  new User("chris123@google.com", "1992-03-21"),
  new PremiumUser("niceguy@google.com", "1989-12-07", 3),
  new User("rachel@google.com", "1988-05-16"),
  new PremiumUser("helloMike@google.com", "1990-09-15", 2),
];

users.forEach((user) => {
  user.buy(item);
});
