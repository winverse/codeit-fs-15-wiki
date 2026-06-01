# React Query Auth Project

React Query + Next.js 16(App Router) 프론트엔드와 Express + Prisma 백엔드로 구성된 인증 예제 프로젝트입니다.

## 사전 요구 사항

- Node.js `>= 22`
- `pnpm`
- PostgreSQL

## 디렉터리 구성

- `backend`: Express + Prisma API 서버
- `frontend`: Next.js 16 + React Query 클라이언트

## 1. 백엔드 실행

```bash
cd backend
pnpm install
cp env/.env.example env/.env.development
```

`backend/env/.env.development`에서 다음 값을 반드시 설정합니다.

- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `CORS_ORIGIN` (기본값: `http://localhost:3000`)

DB 생성(기본 DB 이름: `react-auth`):

- macOS/Linux (zsh, bash)

```bash
psql -U postgres -d postgres -c 'CREATE DATABASE "react-auth";'
```

- Windows (`SQL Shell (psql)`)

1. 시작 메뉴에서 `psql`을 검색해 `SQL Shell (psql)`을 실행합니다.
2. 프롬프트가 나오면 아래처럼 입력합니다.

```text
Server [localhost]:
Database [postgres]:
Port [5432]:
Username [postgres]:
Password for user postgres:
```

`Server`, `Database`, `Port`, `Username`은 기본값이면 `Enter`만 눌러도 됩니다.
로그인 후 아래 SQL을 실행합니다.

```sql
CREATE DATABASE "react-auth";
\q
```

`DATABASE_URL` 예시:

```env
DATABASE_URL=
`

초기 DB 준비:

```bash
pnpm run prisma:generate
pnpm run prisma:migrate
```

개발 서버 실행:

```bash
pnpm run dev
```

- Backend URL: `http://localhost:5001`

## 2. 프론트엔드 실행

```bash
cd frontend
pnpm install
cp .env.example .env.development
```

`frontend/.env.development`에서 확인:

- `NEXT_PUBLIC_BACKEND_BASE_URL=`

개발 서버 실행:

```bash
pnpm dev
```

- Frontend URL: `http://localhost:3000`

## 3. 전체 실행 순서

1. `backend`에서 `pnpm run dev` 실행
2. `frontend`에서 `pnpm dev` 실행
3. 브라우저에서 `http://localhost:3000` 접속
