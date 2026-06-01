// 2-02. 추상화

// ─────────────────────────────────────
// 같은 대상, 다른 추상화
// ─────────────────────────────────────

// 쇼핑몰 서비스의 User
class User {
  constructor(email, birthdate) {
    this.email = email;
    this.birthdate = birthdate;
  }

  buy(item) {
    console.log(`${this.email} buys ${item.name}`);
  }
}

// 병원 예약 서비스의 Patient
class Patient {
  constructor(name, residentNumber, symptom) {
    this.name = name;
    this.residentNumber = residentNumber;
    this.symptom = symptom;
  }

  makeAppointment(doctor) {
    console.log(`${this.name} schedules appointment with ${doctor.name}`);
  }
}

// SNS 서비스의 Member
class Member {
  constructor(nickname, followerCount) {
    this.nickname = nickname;
    this.followerCount = followerCount;
  }

  post(content) {
    console.log(`${this.nickname} posts: ${content}`);
  }
}

// ─────────────────────────────────────
// 이름 짓기 비교
// ─────────────────────────────────────
const item = { name: "스웨터", price: 30_000 };
const user1 = new User("chris123@google.com", "1992-03-21");
user1.buy(item); // "chris123@google.com buys 스웨터"
