// 2-06. super

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

  constructor(email, birthdate, level) {
    // super(email, birthdate); // 1. 먼저 부모 초기화
    this.#level = level;     // 2. 그 다음 자식 초기화
  }

  get level() {
    return this.#level;
  }

  streamMusicForFree() {
    console.log(`Free music streaming for ${this.email}`);
  }
}

const item = { name: "스웨터", price: 30_000 };
const pUser1 = new PremiumUser("chris123@google.com", "1992-03-21", 3);

console.log(pUser1.email);    // "chris123@google.com" (부모 constructor가 설정)
console.log(pUser1.birthdate); // "1992-03-21"
console.log(pUser1.level);    // 3
pUser1.buy(item);              // "chris123@google.com buys 스웨터"
pUser1.streamMusicForFree();   // "Free music streaming for chris123@google.com"
