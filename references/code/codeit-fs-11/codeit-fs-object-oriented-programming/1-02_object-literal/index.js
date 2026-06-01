// 1-02. 객체 만들기, Object Literal

// ─────────────────────────────────────
// 기본 Object Literal
// ─────────────────────────────────────
const user = {
  email: "chris123@google.com",
  birthdate: "1992-03-21",
  buy(item) {
    console.log(`${this.email} buys ${item.name}`);
  },
};

const item = {
  name: "스웨터",
  price: 30_000,
};

console.log(user.email);    // "chris123@google.com"
console.log(user.birthdate); // "1992-03-21"
user.buy(item);              // "chris123@google.com buys 스웨터"

// ─────────────────────────────────────
// this를 활용한 함수 재사용
// ─────────────────────────────────────
function introduce() {
  console.log(`Hello, I am ${this.name}`);
}

const user1 = { name: "Chris", introduce: introduce };
const user2 = { name: "Alice", introduce: introduce };

user1.introduce(); // "Hello, I am Chris"
user2.introduce(); // "Hello, I am Alice"
