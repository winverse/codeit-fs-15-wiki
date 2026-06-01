// 2-10. static 프로퍼티와 static 메서드

// ─────────────────────────────────────
// 기본 예시: MathUtils
// ─────────────────────────────────────
class MathUtils {
  static PI = 3.14;

  static getCircleArea(radius) {
    return MathUtils.PI * radius * radius;
  }
}

console.log(MathUtils.PI);              // 3.14
console.log(MathUtils.getCircleArea(5)); // 78.5

// ─────────────────────────────────────
// 유틸리티 클래스 패턴: Validator
// ─────────────────────────────────────
class Validator {
  static isEmail(value) {
    return typeof value === "string" && value.includes("@");
  }

  static isValidPrice(value) {
    return Number.isInteger(value) && value > 0;
  }

  static isDateFormat(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  }
}

console.log(Validator.isEmail("chris@google.com")); // true
console.log(Validator.isEmail("chris google"));     // false
console.log(Validator.isValidPrice(30_000));        // true
console.log(Validator.isValidPrice(-100));          // false

// ─────────────────────────────────────
// static factory method 패턴: User
// ─────────────────────────────────────
class User {
  #email;
  #birthdate;
  #role;

  constructor(email, birthdate, role) {
    this.#email = email;
    this.#birthdate = birthdate;
    this.#role = role;
  }

  get email() {
    return this.#email;
  }

  get role() {
    return this.#role;
  }

  static createNormal(email, birthdate) {
    return new User(email, birthdate, "normal");
  }

  static createAdmin(email, birthdate) {
    return new User(email, birthdate, "admin");
  }

  static fromJSON(json) {
    const parsed = JSON.parse(json);
    return new User(parsed.email, parsed.birthdate, parsed.role);
  }
}

const normalUser = User.createNormal("chris@google.com", "1992-03-21");
const adminUser = User.createAdmin("alice@google.com", "1988-07-15");
const restored = User.fromJSON(
  '{"email":"bob@google.com","birthdate":"1995-11-30","role":"normal"}',
);

console.log(normalUser.role); // "normal"
console.log(adminUser.role);  // "admin"
console.log(restored.email);  // "bob@google.com"
