# frontend-starter

이 저장소에 포함된 학생용 시작 프로젝트입니다.

## 목적

- `frontend-starter`: 학생이 교재를 따라가며 타입을 채워 넣는 시작본
- `backend`: 함께 실행하는 공용 API 서버

## 실행 순서

1. 백엔드 실행

```bash
cd ../backend
pnpm install
pnpm dev
```

2. 스타터 프론트엔드 실행

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

## 환경 변수

`.env.local` 파일에 아래 값을 넣습니다.

```bash
NEXT_PUBLIC_API_BASE_URL=
```

## 라우트 구성

- `/`: 학생용 시작 인덱스
- `/posts`: 3장~5장 학습 구간
- `/posts/[postId]`: `useParams` 시작본
- `/context`: 6장 Context 학습 구간
- `/query`: 7장 TanStack Query 학습 구간
