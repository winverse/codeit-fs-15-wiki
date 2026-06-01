export function reserveSeat(seatId: unknown, count: unknown = 1): unknown {
  return typeof seatId === 'string' && typeof count === 'number' && count > 0;
}

export function printReservation(title?: unknown): void {
  if (typeof title === 'string') {
    console.log(title);
  }
}

export function appendTags(...tags: unknown[]): unknown {
  return tags.length;
}

// 추가 문제
export function createLabel(id: unknown, prefix: unknown = 'ORD'): unknown {
  if (typeof id === 'string' && typeof prefix === 'string') {
    return `${prefix}-${id}`;
  }

  return '';
}

export function printMessages(title?: unknown): void {
  if (typeof title === 'string') {
    console.log(title);
  }
}

export function addKeywords(...keywords: unknown[]): unknown {
  return keywords.join(',');
}
