function printArray<T>(items: T[]): void {
  for (const item of items) {
    console.log(item);
  }
}

function getFirstItem<T>(items: T[]): T | undefined {
  return items[0];
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface Product {
  id: string;
  name: string;
}

printArray([230, 250, 280]);
printArray(['M', 'L', 'XL']);
printArray<boolean>([true, false]);

const firstShoeSize = getFirstItem([230, 250, 280]);
const firstClothingSize = getFirstItem(['M', 'L', 'XL']);

const response: ApiResponse<Product> = {
  data: { id: 'c001', name: '코드잇 후드' },
  status: 200,
  message: 'OK',
};

const listResponse: ApiResponse<Product[]> = {
  data: [{ id: 'c001', name: '코드잇 후드' }],
  status: 200,
  message: 'OK',
};

console.log(firstShoeSize, firstClothingSize);
console.log(response, listResponse);
