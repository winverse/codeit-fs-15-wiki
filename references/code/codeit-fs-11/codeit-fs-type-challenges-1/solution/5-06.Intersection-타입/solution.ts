export type Id = {
  id: string;
};

export type Timestamp = {
  createdAt: Date;
  updatedAt: Date;
};

export type Product = Id & {
  name: string;
  price: number;
};

export type User = Id &
  Timestamp & {
    username: string;
    email: string;
  };

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

// 추가 문제 해답
export interface Attacker {
  attackPower: number;
  attack(): void;
}

export interface Defender {
  defensePower: number;
  defend(): void;
}

export type BattleCharacter = Attacker &
  Defender & {
    name: string;
  };

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
