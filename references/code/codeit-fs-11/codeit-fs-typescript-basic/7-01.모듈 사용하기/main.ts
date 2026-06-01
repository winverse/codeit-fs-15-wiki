import Product from './Product';
import Size from './Size';

const product1: Product = {
  id: 'c001',
  name: '코드잇 블랙 후드 집업',
  price: 129_000,
  membersOnly: true,
  sizes: [Size.S, Size.M],
};

const product2: Product = {
  id: 'd001',
  name: '코드잇 텀블러',
  price: 25_000,
};

function printProduct(product: Product) {
  console.log(product);
}

printProduct(product1);
printProduct(product2);
