# 06-supertest-e2e

## 목표

- supertest로 Express 앱 전체 요청 흐름을 검증한다.

## 교재 대응

- 현재 인정 버전 교재의 6장

## 도달 상태

- `supertest` 설치와 기본 진입점 준비
- `app` export 구조와 `server` 실행 코드 분리
- `request(application.app)` 기반 첫 응답 테스트
- 상태 코드, 헤더, 응답 본문 검증 예제
- 로그인 흐름과 `supertest.agent` 예제
- `done`, `return`, `async/await` 중 어떤 종료 방식을 쓸지 판단할 수 있는 예제
