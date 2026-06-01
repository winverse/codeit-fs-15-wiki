# 2-03. 타입을 정하는 법

## 목표

타입 추론에 맡겨도 되는 자리와 타입을 직접 선언해야 하는 자리를 구분합니다.

## 해야 할 일

1. `template.ts`를 열고 기본 문제부터 순서대로 풉니다.
2. 이미 값이 있는 변수는 추론 결과를 읽고, 나중에 값을 넣는 변수에는 타입을 직접 선언합니다.
3. `test-cases.ts`로 타입 검사를 통과시킵니다.
4. 풀이를 마친 뒤에만 해설 위치의 파일과 비교합니다.

## 파일 구성

- `template.ts`: 학생용 문제 파일
- `test-cases.ts`: 타입 검사 기준
- 해설 위치: `type-challenge/solution/2-03.타입을-정하는-법/solution.ts`

## 실행 방법

```bash
pnpm --package=typescript dlx tsc --noEmit type-challenge/2-03.타입을-정하는-법/test-cases.ts
```
