interface Product {
  id: string;
  name: string;
  price: number;
  membersOnly?: boolean;
}

const product: Product = {
  id: 'c001',
  name: '코드잇 블랙 후드 집업',
  price: 129_000,
  membersOnly: true,
};

type ProductFromValue = typeof product;
type ProductProperty = keyof typeof product;

const productTableKeys: ProductProperty[] = [
  'name',
  'price',
  'membersOnly',
];

function printProductValue(
  item: ProductFromValue,
  key: ProductProperty,
) {
  console.log(`${key} | ${item[key]}`);
}

for (const key of productTableKeys) {
  printProductValue(product, key);
}

const product2: typeof product = {
  id: 'c002',
  name: '코드잇 텀블러',
  price: 25_000,
};

const product3: ProductFromValue = {
  id: 'c003',
  name: '코드잇 머그컵',
  price: 19_000,
  membersOnly: false,
};

console.log(product2, product3);
