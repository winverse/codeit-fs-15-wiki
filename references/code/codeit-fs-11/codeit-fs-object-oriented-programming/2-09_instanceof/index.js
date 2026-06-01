// 2-09. instanceof 연산자

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

const user1 = new User("chris123@google.com", "1992-03-21");
const user2 = new User("rachel@google.com", "1988-05-16");
const user3 = new User("brian@google.com", "2005-11-25");
const pUser1 = new PremiumUser("niceguy@google.com", "1989-12-07", 3);
const pUser2 = new PremiumUser("helloMike@google.com", "1990-09-15", 2);
const pUser3 = new PremiumUser("aliceKim@google.com", "2001-07-22", 5);

const users = [user1, pUser1, user2, pUser2, user3, pUser3];

// PremiumUser 인스턴스 여부 판별
users.forEach((user) => {
  console.log(user instanceof PremiumUser);
});
// 출력: false, true, false, true, false, true

// 자식은 부모로도 true
users.forEach((user) => {
  console.log(user instanceof User);
});
// 출력: true, true, true, true, true, true
