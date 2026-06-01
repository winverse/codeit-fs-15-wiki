# 07-prisma-client-testing

## 목표

- Prisma Client를 Jest 단위 테스트에서 어떻게 준비하는지 익힌다.
- 레퍼런스처럼 `src/db/prisma.ts` 한 곳에 Prisma Client를 모아 두고 singleton으로 쓰는 구조를 익힌다.
- `PrismaService`를 한 곳에 두고, 테스트에서는 singleton Prisma Client를 mock 하는 흐름을 익힌다.

## 교재 대응

- 현재 인정 버전 교재의 7장
- 교재 본문 예시는 이 폴더를 기준으로 읽고, 별도 장 끝 실습 폴더 없이 이 장 코드 안에서 Prisma 테스트 셋업 흐름을 다시 확인한다.
- `prisma/schema.prisma`, `prisma.config.ts`, `.env`, 기본 스크립트는 이미 준비된 상태에서 시작한다.

## 도달 상태

- `prisma/schema.prisma`와 `generated/prisma` 출력 구조를 reference와 비슷하게 준비
- `src/db/prisma.ts`에서 `PrismaService`와 singleton `prisma` export
- `test/mock/prisma.ts`에서 singleton Prisma Client mock 과 `mockReset(...)` 준비
- `src/services/user.service.ts`에서 전역 singleton Prisma Client 사용
- `test/services/user.service.spec.ts`에서 `prismaMock.user.*`로 결과와 호출 인자 검증
