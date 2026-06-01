const unsafeParsedData: unknown = JSON.parse(
  '{"size":"M"}',
);

// const unsafeSizes = unsafeParsedData as string[];
// console.log(unsafeSizes.join(', '));
// ↑ 컴파일은 통과하지만, 실제 값은 배열이 아니라서 실행하면 오류가 납니다.

const parsedData: unknown = JSON.parse(
  '["S", "M", "L"]',
);

if (
  Array.isArray(parsedData) &&
  parsedData.every(
    (size) => typeof size === 'string',
  )
) {
  const sizes = parsedData as string[];
  console.log(sizes.join(', '));
}
