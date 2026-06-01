// 2-04. 캡슐화 더 알아보기 (클로저)

// ─────────────────────────────────────
// 클로저로 상태를 숨기는 기본 구조
// ─────────────────────────────────────
function createUser(email, birthdate) {
  let _email = email;

  return {
    birthdate,

    get email() {
      return _email;
    },

    set email(address) {
      if (!address.includes("@")) {
        throw new Error("invalid email address");
      }
      _email = address;
    },
  };
}

const user1 = createUser("chris123@google.com", "1992-03-21");

console.log(user1.email);  // "chris123@google.com"
console.log(user1._email); // undefined (클로저 변수라 외부 접근 불가)

// ─────────────────────────────────────
// 내부 함수까지 숨기기
// ─────────────────────────────────────
function createUserWithPoint(email, birthdate) {
  const _email = email;
  let _point = 0;

  function increasePoint() {
    _point += 1;
  }

  return {
    birthdate,

    get email() {
      return _email;
    },

    get point() {
      return _point;
    },

    buy(item) {
      console.log(`${_email} buys ${item.name}`);
      increasePoint();
    },
  };
}

const item = { name: "스웨터", price: 30_000 };
const user2 = createUserWithPoint("chris123@google.com", "1992-03-21");

user2.buy(item);
user2.buy(item);
user2.buy(item);
console.log(user2.point); // 3

try {
  user2.increasePoint(); // ❌ TypeError: user2.increasePoint is not a function
} catch (error) {
  console.log(error.message); // "user2.increasePoint is not a function"
}
