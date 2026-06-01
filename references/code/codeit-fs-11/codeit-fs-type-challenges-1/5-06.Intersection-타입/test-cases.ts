import type { Equal, Expect } from '../_helpers/type-test';
import { character, getEntityId, product, user } from './template';
import type {
  Attacker,
  BattleCharacter,
  Defender,
  Id,
  Product,
  Timestamp,
  User,
} from './template';

type cases = [
  Expect<Equal<Id, { id: string }>>,
  Expect<Equal<Timestamp, { createdAt: Date; updatedAt: Date }>>,
  Expect<Equal<Product, Id & { name: string; price: number }>>,
  Expect<Equal<User, Id & Timestamp & { username: string; email: string }>>,
  Expect<Equal<Attacker['attackPower'], number>>,
  Expect<Equal<Defender['defensePower'], number>>,
  Expect<Equal<BattleCharacter, Attacker & Defender & { name: string }>>,
];

const productId: string = getEntityId(product);
const userId: string = getEntityId(user);
const totalPower: number = character.attackPower + character.defensePower;
character.attack();
character.defend();
void [productId, userId, totalPower];

export {};
