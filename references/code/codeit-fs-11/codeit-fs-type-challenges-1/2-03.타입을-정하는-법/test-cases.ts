import type { Equal, Expect } from '../_helpers/type-test';
import {
  classroomLabel,
  courseName,
  currentWeek,
  hasHomework,
  isClosed,
  membersOnly,
  managerName,
  maxStudents,
  price,
  productId,
  lessonCount,
} from './template';

type cases = [
  Expect<Equal<typeof productId, string>>,
  Expect<Equal<typeof price, number>>,
  Expect<Equal<typeof membersOnly, boolean>>,
  Expect<Equal<typeof managerName, string>>,
  Expect<Equal<typeof maxStudents, number>>,
  Expect<Equal<typeof isClosed, boolean>>,
  Expect<Equal<typeof courseName, string>>,
  Expect<Equal<typeof lessonCount, number>>,
  Expect<Equal<typeof classroomLabel, string>>,
  Expect<Equal<typeof currentWeek, number>>,
  Expect<Equal<typeof hasHomework, boolean>>,
];

export {};
