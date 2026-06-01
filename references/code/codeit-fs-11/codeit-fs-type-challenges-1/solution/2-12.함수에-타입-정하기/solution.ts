export function reserveSeat(seatId: string, count: number = 1): boolean {
  return seatId.length > 0 && count > 0;
}

export function printReservation(title?: string): void {
  if (title) {
    console.log(title);
  }
}

export function appendTags(...tags: string[]): number {
  return tags.length;
}

// 추가 문제 해답
export function createLabel(id: string, prefix: string = 'ORD'): string {
  return `${prefix}-${id}`;
}

export function printMessages(title?: string): void {
  if (title) {
    console.log(title);
  }
}

export function addKeywords(...keywords: string[]): string {
  return keywords.join(',');
}
