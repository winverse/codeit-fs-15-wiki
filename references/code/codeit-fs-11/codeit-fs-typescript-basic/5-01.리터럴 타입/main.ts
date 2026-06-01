let productName1 = '코드잇 블랙 후드';
const productName2 = '코드잇 텀블러';

let discountRate1 = 10;
const discountRate2 = 15;

function printSelectedSize(size: 'M') {
  console.log(`선택한 사이즈: ${size}`);
}

const selectedSize1 = 'M';
let selectedSize2 = 'M';

printSelectedSize(selectedSize1);
// printSelectedSize(selectedSize2); // 오류: string은 'M'에 바로 넣을 수 없습니다.
