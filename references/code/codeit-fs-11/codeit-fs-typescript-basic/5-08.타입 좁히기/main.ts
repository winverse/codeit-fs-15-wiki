interface ClothingProduct {
  id: string;
  name: string;
  color: string;
  sizes: string[];
}

interface ShoeProduct {
  id: string;
  name: string;
  handmade: boolean;
  sizes: number[];
}

function printSize(size: string | number) {
  if (typeof size === 'string') {
    console.log(`의류 사이즈: ${size}`);
  } else {
    console.log(`신발 사이즈: ${size}mm`);
  }
}

function printProductDetail(
  product: ClothingProduct | ShoeProduct,
) {
  console.log(product.name);

  if ('color' in product) {
    console.log(`색상: ${product.color}`);
    console.log(`사이즈: ${product.sizes.join(', ')}`);
  } else {
    console.log(`수제화: ${product.handmade}`);
    console.log(`사이즈: ${product.sizes.join(', ')}mm`);
  }
}

function printSelectedSizes(
  sizes: string | string[],
) {
  if (Array.isArray(sizes)) {
    console.log(`선택 가능한 사이즈: ${sizes.join(', ')}`);
  } else {
    console.log(`대표 사이즈: ${sizes}`);
  }
}

printSize('M');
printSize(260);

const hoodie: ClothingProduct = {
  id: 'c001',
  name: '코드잇 블랙 후드 집업',
  color: 'black',
  sizes: ['M', 'L'],
};

const sneakers: ShoeProduct = {
  id: 's001',
  name: '코드잇 스니커즈',
  handmade: false,
  sizes: [260, 270],
};

printProductDetail(hoodie);
printProductDetail(sneakers);

printSelectedSizes('M');
printSelectedSizes(['S', 'M', 'L']);
