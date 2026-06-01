// 1-03. 객체 만들기, Factory function

function createUser(email, birthdate) {
  const user = {
    email,
    birthdate,
    buy(item) {
      console.log(`${this.email} buys ${item.name}`);
    },
  };
  return user;
}

const item = {
  name: "스웨터",
  price: 30_000,
};

const user1 = createUser("chris123@google.com", "1992-03-21");
const user2 = createUser("jerry99@google.com", "1995-07-19");
const user3 = createUser("alice@google.com", "1993-12-24");

console.log(user1.email); // "chris123@google.com"
console.log(user2.email); // "jerry99@google.com"
console.log(user3.email); // "alice@google.com"

user1.buy(item); // "chris123@google.com buys 스웨터"
user2.buy(item); // "jerry99@google.com buys 스웨터"
user3.buy(item); // "alice@google.com buys 스웨터"

// ─────────────────────────────────────
// 메모리 비효율 확인
// ─────────────────────────────────────
console.log(user1.buy === user2.buy); // false
console.log(user1.buy === user3.buy); // false
