// 3-06. 패턴 독해 실습 - 코드 A
// 어떤 패턴이 사용되었는지 분석해보세요

class Logger {
  static #instance = null;

  static getInstance() {
    if (!Logger.#instance) {
      Logger.#instance = new Logger();
    }
    return Logger.#instance;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }
}

const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

logger1.log("서버 시작");
logger2.log("사용자 로그인");

console.log(logger1 === logger2); // true
