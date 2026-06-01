export class SessionService {
  validateTimeout(timeoutMs: number): void {
    if (timeoutMs < 1_000) {
      throw new Error('MIN_TIMEOUT');
    }
  }

  getExpiryTime(now: number, timeoutMs: number): number {
    this.validateTimeout(timeoutMs);
    return now + timeoutMs;
  }

  startIdleTimer(timeoutMs: number, onExpire: () => void): NodeJS.Timeout {
    this.validateTimeout(timeoutMs);
    return setTimeout(onExpire, timeoutMs);
  }

  extendDeadline(currentDeadline: number, extraMs: number): number {
    return currentDeadline + extraMs;
  }
}
