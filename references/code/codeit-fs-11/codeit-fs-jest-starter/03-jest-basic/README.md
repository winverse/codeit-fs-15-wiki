# 03-async-lifecycle-and-each

## 목표

- async, error, lifecycle, `each`까지 실전 테스트 기본기를 한 묶음으로 정리합니다.

## 교재 대응

- 3장 `비동기 테스트와 실행 제어`

## 도달 상태

- `src/` 안에 테스트 대상 코드와 `*.spec.ts` 테스트 파일을 함께 두는 구조가 유지된 상태입니다.
- 2장에서 다뤘던 `add`, `createOrderSummary`, `sendOrderMail`, `auditLogger` 테스트도 같은 폴더 구조 안에 누적되어 있습니다.
- `resolves`, `rejects`, `toThrow` 예제가 준비된 상태입니다.
- `beforeEach`, `afterEach`, `setupFilesAfterEnv`로 공통 정리를 연결하는 예제가 준비된 상태입니다.
- `test.each`, `expect.any`, 공통 테스트 유틸과 `setupFilesAfterEnv` 정리 예제가 준비된 상태입니다.
- `runInBand` 기준 테스트 실행 스크립트가 정리된 상태입니다.
