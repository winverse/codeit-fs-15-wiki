// 3-03. 단순 팩토리 패턴, Simple Factory

class EmailNotification {
  send(message) {
    console.log(`[이메일] ${message}`);
  }
}

class SmsNotification {
  send(message) {
    console.log(`[SMS] ${message}`);
  }
}

class PushNotification {
  send(message) {
    console.log(`[푸시] ${message}`);
  }
}

class NotificationFactory {
  static #creators = {
    email: () => new EmailNotification(),
    sms: () => new SmsNotification(),
    push: () => new PushNotification(),
  };

  static create(channel) {
    const creator = NotificationFactory.#creators[channel];
    if (!creator)
      throw new Error(`지원하지 않는 채널입니다: ${channel}`);
    return creator();
  }
}

const channels = ["email", "sms", "push"];

channels.forEach((channel) => {
  const notifier = NotificationFactory.create(channel);
  notifier.send("주문이 완료되었습니다.");
});

// [이메일] 주문이 완료되었습니다.
// [SMS] 주문이 완료되었습니다.
// [푸시] 주문이 완료되었습니다.
