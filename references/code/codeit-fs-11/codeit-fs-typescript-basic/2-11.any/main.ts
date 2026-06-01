const priceJson = '"129000원"';

// any는 타입 검사를 꺼 버립니다.
const unsafePrice: any = JSON.parse(priceJson);
console.log(unsafePrice * 0.9); // 컴파일은 통과하지만 결과는 의도와 다를 수 있습니다

const parsedPrice: unknown = JSON.parse(priceJson);

// console.log(parsedPrice * 0.9); // ❌ unknown은 바로 계산할 수 없습니다

if (typeof parsedPrice === 'number') {
  console.log(parsedPrice * 0.9);
} else {
  console.log('숫자 데이터가 아닙니다.');
}
