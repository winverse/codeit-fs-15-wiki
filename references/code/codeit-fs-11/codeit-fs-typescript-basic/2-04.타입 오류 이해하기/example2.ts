let product = {
  id: "c001",
  name: "라이트 윈드 브레이커",
  price: 129_000,
  sizes: ["M", "L", "XL"], // string[]
};

const newProduct = {
  id: "c002",
  name: "다크 윈드 브레이커",
  price: 139_000,
  sizes: [90, 95, 100], // number[]
};

product = newProduct; // ❌ 오류

export {};
