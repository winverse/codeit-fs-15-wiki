enum ClothingSize {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

interface Product {
  id: string;
  name: string;
  price: number;
  membersOnly?: boolean;
}

interface ClothingProduct extends Product {
  sizes: ClothingSize[];
  color: string;
}

interface ShoeProduct extends Product {
  sizes: number[];
  handmade: boolean;
}

function printProduct(product: ClothingProduct | ShoeProduct) {
  console.log(`${product.name}: ${product.price.toLocaleString()}원`);
  console.log(`구매 가능한 사이즈: ${product.sizes.join(', ')}`);

  if ('color' in product) {
    console.log(`색상: ${product.color}`);
  } else {
    console.log(`수제화 여부: ${product.handmade}`);
  }
}

const product1: ClothingProduct = {
  id: 'c001',
  name: '코드잇 블랙 후드 집업',
  price: 129_000,
  membersOnly: true,
  sizes: [ClothingSize.M, ClothingSize.L],
  color: 'black',
};

const product2: ShoeProduct = {
  id: 's001',
  name: '코드잇 스니커즈',
  price: 69_000,
  membersOnly: false,
  sizes: [220, 230, 240, 260, 280],
  handmade: false,
};

printProduct(product1);
printProduct(product2);

type ClothingSizeOption = 'S' | 'M' | 'L' | 'XL';
type ShoeSizeOption = 220 | 230 | 240 | 250 | 260 | 270 | 280;

function selectClothingSize(size: ClothingSizeOption) {
  console.log(`선택한 의류 사이즈: ${size}`);
}

const selectedClothingSize: ClothingSizeOption = 'M';
const selectedShoeSize: ShoeSizeOption = 260;

selectClothingSize(selectedClothingSize);
console.log(`선택한 신발 사이즈: ${selectedShoeSize}`);
// selectClothingSize('XXL'); // 오류: 허용된 값이 아닙니다
