// 1-01. 객체 지향 프로그래밍이란

// ─────────────────────────────────────
// 절차 지향 방식
// ─────────────────────────────────────
let userEmail = "user@example.com";
let userBirthdate = "1989-11-24";

let itemName = "스웨터";
let itemPrice = 30_000;

function buyItem(email, name) {
  console.log(`${email} buys ${name}`);
}

buyItem(userEmail, itemName); // "user@example.com buys 스웨터"

// ─────────────────────────────────────
// 객체 지향 방식
// ─────────────────────────────────────
const user = {
  email: "user@example.com",
  birthdate: "1989-11-24",
  buy(item) {
    console.log(`${this.email} buys ${item.name}`);
  },
};

const item = {
  name: "스웨터",
  price: 30_000,
};

user.buy(item); // "user@example.com buys 스웨터"
