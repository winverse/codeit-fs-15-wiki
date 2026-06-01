// 2-03. 캡슐화

// ─────────────────────────────────────
// 1단계: _email 관례 (개발자 약속)
// ─────────────────────────────────────
class UserV1 {
  constructor(email, birthdate) {
    this._email = email;
    this.birthdate = birthdate;
  }

  get email() {
    return this._email;
  }

  set email(address) {
    if (address.includes("@")) {
      this._email = address;
    } else {
      throw new Error("invalid email address");
    }
  }

  buy(item) {
    console.log(`${this.email} buys ${item.name}`);
  }
}

// ─────────────────────────────────────
// 2단계: #email private field (언어 문법 차단)
// ─────────────────────────────────────
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

  set email(address) {
    if (address.includes("@")) {
      this.#email = address;
    } else {
      throw new Error("invalid email address");
    }
  }

  buy(item) {
    console.log(`${this.email} buys ${item.name}`);
  }
}

const user1 = new User("chris123@google.com", "1992-03-21");
user1.email = "newChris123@google.com"; // setter 실행 → 정상 저장
console.log(user1.email);               // getter 실행 → "newChris123@google.com"

try {
  user1.email = "chris robert"; // setter 실행 → "@" 없음 → 에러 발생!
} catch (error) {
  console.log(error.message); // "invalid email address"
}
