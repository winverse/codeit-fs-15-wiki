type Id = {
  id: string;
};

type Timestamp = {
  createdAt: Date;
  updatedAt: Date;
};

type Product = Id & {
  name: string;
  price: number;
  membersOnly?: boolean;
};

type User = Id &
  Timestamp & {
    username: string;
    email: string;
  };

type Review = Id &
  Timestamp & {
    productId: string;
    userId: string;
    content: string;
  };

interface Attacker {
  attackPower: number;
  attack(): void;
}

interface Defender {
  defensePower: number;
  defend(): void;
}

type BattleCharacter = Attacker &
  Defender & {
    name: string;
  };

const product: Product = {
  id: 'c001',
  name: '코드잇 블랙 후드티',
  price: 129_000,
};

const user: User = {
  id: 'user0001',
  username: 'codeit',
  email: 'typescript@codeit.kr',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const review: Review = {
  id: 'review001',
  userId: user.id,
  productId: product.id,
  content: '아주 좋음',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const character: BattleCharacter = {
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

console.log(product.name);
console.log(review.content);
character.attack();
character.defend();
