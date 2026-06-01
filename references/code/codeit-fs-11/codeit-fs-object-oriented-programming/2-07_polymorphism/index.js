// 2-07. 다형성

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

  // 오버라이딩: 부모의 buy를 덮어씁니다
  buy(item) {
    console.log(`${this.email} buys ${item.name} with a 5% discount`);
  }

  streamMusicForFree() {
    console.log(`Free music streaming for ${this.email}`);
  }
}

const item = { name: "스웨터", price: 30_000 };

const user1 = new User("chris123@google.com", "1992-03-21");
const user2 = new User("rachel@google.com", "1988-05-16");
const user3 = new User("brian@google.com", "2005-11-25");
const pUser1 = new PremiumUser("niceguy@google.com", "1989-12-07", 3);
const pUser2 = new PremiumUser("helloMike@google.com", "1990-09-15", 2);
const pUser3 = new PremiumUser("aliceKim@google.com", "2001-07-22", 5);

const users = [user1, pUser1, user2, pUser2, user3, pUser3];

// 같은 코드지만 객체 타입에 따라 다르게 동작합니다
users.forEach((user) => {
  user.buy(item);
});
