// 2-05. 상속

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
    super(email, birthdate);
    this.#level = level;
  }

  get level() {
    return this.#level;
  }

  streamMusicForFree() {
    console.log(`Free music streaming for ${this.email}`);
  }
}

const item = { name: "스웨터", price: 30_000 };

const user1 = new User("chris123@google.com", "1992-03-21");
const pUser1 = new PremiumUser("niceguy@google.com", "1989-12-07", 3);

user1.buy(item);             // "chris123@google.com buys 스웨터"
pUser1.buy(item);            // "niceguy@google.com buys 스웨터" (부모에서 상속)
pUser1.streamMusicForFree(); // "Free music streaming for niceguy@google.com"
console.log(pUser1.level);   // 3
