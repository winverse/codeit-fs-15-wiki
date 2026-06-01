import type { Equal, Expect } from '../_helpers/type-test';
import { account, course, creatorAccount, onlineCourse } from './template';
import type { Account, Course, CreatorAccount, OnlineCourse } from './template';

type cases = [
  Expect<Equal<Course['id'], string>>,
  Expect<Equal<Course['title'], string>>,
  Expect<Equal<Course['price'], number>>,
  Expect<Equal<Course['published'], boolean | undefined>>,
  Expect<Equal<OnlineCourse['streamingHours'], number>>,
  Expect<Equal<Account['id'], string>>,
  Expect<Equal<Account['email'], string>>,
  Expect<Equal<Account['displayName'], string | undefined>>,
  Expect<Equal<CreatorAccount['subscriberCount'], number>>,
];

const baseCourse: Course = course;
const extendedCourse: OnlineCourse = onlineCourse;
const upcastCourse: Course = onlineCourse;
const baseAccount: Account = account;
const extendedAccount: CreatorAccount = creatorAccount;
const upcastAccount: Account = creatorAccount;
void [
  baseCourse,
  extendedCourse,
  upcastCourse,
  baseAccount,
  extendedAccount,
  upcastAccount,
];

export {};
