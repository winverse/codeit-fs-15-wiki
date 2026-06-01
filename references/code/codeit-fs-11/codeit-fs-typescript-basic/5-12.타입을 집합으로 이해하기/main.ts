type ClothingSize = 'S' | 'M' | 'L';
type MediumSize = 'M';
type SizeOrCount = ClothingSize | number;

type HasId = {
  id: string;
};

type HasName = {
  name: string;
};

type NamedProduct = HasId & HasName;

const selectedSize: MediumSize = 'M';
const sizeOption: ClothingSize = selectedSize;
const displayValue: SizeOrCount = 260;

const product: NamedProduct = {
  id: 'c001',
  name: '코드잇 블랙 후드 집업',
};

function fail(message: string): never {
  throw new Error(message);
}

console.log(sizeOption, displayValue, product);

try {
  fail('never 예시');
} catch (error) {
  console.log(error);
}
