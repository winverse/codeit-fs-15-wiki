# React Query Auth Backend

Express + Prisma 기반 인증 API 서버입니다.

## 사전 요구 사항

- Node.js `>= 22`
- `pnpm`
- PostgreSQL

## 빠른 시작

```bash
pnpm install
cp env/.env.example env/.env.development
```

`env/.env.development`에서 다음 값을 설정합니다.

- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `CORS_ORIGIN` (기본: `http://localhost:3000`)

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

- 기본 주소: `http://localhost:5001`

## 주요 스크립트

```bash
pnpm run dev             # 개발 서버 실행 (.env.development)
pnpm run prisma:generate # Prisma Client 생성
pnpm run prisma:migrate  # 개발 마이그레이션
pnpm run prisma:studio   # Prisma Studio 실행
pnpm run seed            # 시드 데이터 입력
pnpm run lint            # ESLint
pnpm run format          # Prettier 포맷
```
