// 3-06. 패턴 독해 실습 - 코드 B
// 어떤 패턴이 사용되었는지 분석해보세요

class YoutubeChannel {
  #subscribers = [];

  subscribe(user) {
    this.#subscribers.push(user);
  }

  unsubscribe(user) {
    this.#subscribers = this.#subscribers.filter((u) => u !== user);
  }

  uploadVideo(title) {
    console.log(`[Youtube] 영상 업로드: ${title}`);
    this.#subscribers.forEach((user) => user.notify(title));
  }
}

class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  notify(videoTitle) {
    console.log(`[${this.#name}님의 알림창] 새 영상이 올라왔습니다: ${videoTitle}`);
  }
}

const channel = new YoutubeChannel();

const user1 = new User("김철수");
const user2 = new User("이영희");

channel.subscribe(user1);
channel.subscribe(user2);

channel.uploadVideo("자바스크립트 기초 강좌 1강");
// [Youtube] 영상 업로드: 자바스크립트 기초 강좌 1강
// [김철수님의 알림창] 새 영상이 올라왔습니다: 자바스크립트 기초 강좌 1강
// [이영희님의 알림창] 새 영상이 올라왔습니다: 자바스크립트 기초 강좌 1강

channel.unsubscribe(user2);
channel.uploadVideo("자바스크립트 기초 강좌 2강");
// [Youtube] 영상 업로드: 자바스크립트 기초 강좌 2강
// [김철수님의 알림창] 새 영상이 올라왔습니다: 자바스크립트 기초 강좌 2강
