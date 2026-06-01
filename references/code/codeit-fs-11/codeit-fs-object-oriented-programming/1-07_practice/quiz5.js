// 1-07. 퀴즈 5 - 독립적인 인스턴스 상태

class Member {
  constructor(name, level) {
    // TODO
  }

  levelUp() {
    // TODO
  }

  getInfo() {
    // TODO
  }
}

const m1 = new Member("철수", 1);
const m2 = new Member("영희", 3);

m1.levelUp();

console.log(m1.getInfo()); // "철수 - Lv.2"
console.log(m2.getInfo()); // "영희 - Lv.3"
