export type Id = unknown;
export type Timestamp = unknown;

export type Product = any;
export type User = any;

export const product: Product = {
  id: 'c001',
  name: '코드잇 블랙 후드티',
  price: 129_000,
};

export const user: User = {
  id: 'u001',
  username: 'codeit',
  email: 'typescript@codeit.kr',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function getEntityId(entity: Product | User): string {
  return entity.id;
}

// 추가 문제
export interface Attacker {
  attackPower: unknown;
  attack(): void;
}

export interface Defender {
  defensePower: unknown;
  defend(): void;
}

export type BattleCharacter = any;

export const character: BattleCharacter = {
  name: '팔라딘',
  attackPower: 80,
  defensePower: 60,
  attack() {
    console.log('공격!');
  },
  defend() {
    console.log('방어!');
  },
};
