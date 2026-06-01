// 3-06. 패턴 독해 실습 - 코드 C
// 어떤 패턴이 사용되었는지 분석해보세요

class EmailNotification {
  send(message) {
    console.log(`[EMAIL] ${message}`);
  }
}

class SmsNotification {
  send(message) {
    console.log(`[SMS] ${message}`);
  }
}

class NotificationFactory {
  static create(channel) {
    if (channel === "email") {
      return new EmailNotification();
    }
    if (channel === "sms") {
      return new SmsNotification();
    }
    throw new Error(`지원하지 않는 채널: ${channel}`);
  }
}

function sendWelcome(channel, message) {
  const notifier = NotificationFactory.create(channel);
  notifier.send(message);
}

sendWelcome("email", "회원가입이 완료되었습니다.");
sendWelcome("sms", "인증번호는 1234입니다.");
