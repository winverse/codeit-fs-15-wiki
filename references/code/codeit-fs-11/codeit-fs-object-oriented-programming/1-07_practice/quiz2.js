// 1-07. 퀴즈 2 - 메서드를 prototype으로 이동 (리팩터링)

class User {
  constructor(email) {
    this.email = email;
    this.buy = function (item) {
      return `${this.email} buys ${item.name}`;
    };
  }
}

const u1 = new User("a@shop.com");
const u2 = new User("b@shop.com");
console.log(u1.buy({ name: "청바지" }));

// TODO: buy가 인스턴스마다 새로 생성되지 않도록 클래스 구조를 개선하세요
