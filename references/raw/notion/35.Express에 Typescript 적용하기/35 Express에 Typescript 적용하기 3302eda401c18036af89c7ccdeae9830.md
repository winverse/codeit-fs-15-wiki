# 35. Express에 Typescript 적용하기

# 제 1장: 교재 개요와 TypeScript 전환 범위

## **1-01. 완성 코드**

이 교재의 완성된 코드는 아래 저장소에서 클론해서 받을 수 있습니다.

```bash
git clone https://github.com/winverse/codeit-fs-express-typescript
```

## **1-02. 이 교재의 범위와 학습 관점**

기존 JavaScript Express 프로젝트를 한 번이라도 끝까지 만들어 본 상태라면, 이번 시점의 핵심 과제는 라우터를 새로 만드는 일이 아닙니다. 이미 동작하는 구조 위에 타입을 도입하면 어디에서 정보가 흐려지는지, 어느 계층에서 책임을 더 명확하게 표현해야 하는지 판단하는 문제가 생깁니다.

JavaScript에서는 코드를 실행해 보면서 문제를 확인하는 방식이 자주 통했습니다. 반면 TypeScript를 도입하면 실행 전 단계에서 `params`, `query`, `body`, Prisma 결과, 서비스 반환값이 각각 어떤 모양이어야 하는지 먼저 정리해야 합니다. 기존 JavaScript 프로젝트에서는 암묵적으로 넘겨도 되던 데이터의 모양이 TypeScript에서는 명시적으로 드러나기 시작합니다.

이 때문에 이번 교재는 `users` CRUD와 공통 예외 처리, 환경 변수, Prisma, `tsyringe` 조립만 남기고 인증 흐름은 과감히 제외합니다. 다만 `User` 모델이 비밀번호 필드를 가지는 만큼, 사용자 생성 시 비밀번호를 그대로 저장하지 않고 해시해서 저장하는 최소 규칙은 유지합니다. 기능 수를 줄이는 이유는 구현량을 줄이기 위해서가 아니라, 타입이 실제로 가장 많이 교차하는 구간을 선명하게 보여 주기 위해서입니다.

| 영역 | 이 교재에서 중심적으로 확인할 포인트 |
| --- | --- |
| `users` CRUD | 입력 DTO, Prisma 타입, 서비스 반환 타입이 어떻게 나뉘는지 확인합니다. |
| 공통 예외 처리 | `unknown` 에러를 안전하게 좁혀 가는 흐름을 확인합니다. |
| Prisma `User` 모델 | CRUD 코드와 데이터 타입 매핑이 어떤 관계를 갖는지 확인합니다. |
| `tsyringe` DI | `Decorator`와 런타임 타입 정보가 어떻게 연결되는지 확인합니다. |

이 교재의 질문은 “어떻게 Express 서버를 띄우는가”가 아니라, “문자열 입력이 어느 지점에서 숫자로 바뀌어야 하는가”, “Prisma 타입과 DTO 타입을 왜 분리해야 하는가”, “의존성 주입 정보를 TypeScript가 어떻게 읽게 만드는가”로 바뀝니다. 이 관점이 잡혀야 뒤 장의 설정과 코드가 각각 왜 필요한지 설명할 수 있습니다.

이 질문들은 이후 장 구성과도 직접 연결됩니다. 2장에서는 실행 체인과 함께 env/config 흐름을 먼저 잡아 두고, 3장에서는 모듈 알리아스 경로 규칙을 잡아 이후 import 경로를 일관되게 유지합니다. 4장에서는 HTTP 요청과 응답 타입을 다루면서 입력 경계를 정리합니다. 5장에서는 앞서 만든 config를 Prisma 연결에 연결하고, 6장에서는 공통 예외, validation 미들웨어, `users` CRUD를 한 흐름으로 묶어 각 계층이 어떤 타입 모양을 전제로 움직이는지 확인합니다. 7장에서는 TypeScript로 서버 코드를 작성할 때 자주 만나는 타입 문제를 정리하고, 8장과 9장에서는 런타임 메타데이터와 객체 조립이 왜 TypeScript 전환의 일부인지까지 이어집니다.

# 제 2장: TypeScript 기반 Express 프로젝트 시작하기

## **2-01. TypeScript 프로젝트**

이미 JavaScript 완성본이 존재하더라도 이 교재에서는 새 프로젝트부터 만듭니다. 기존 코드를 그대로 복사하면 당장 서버는 빠르게 띄울 수 있지만, 어떤 설정이 TypeScript 때문에 새로 필요해졌는지 설명하기 어려워지기 때문입니다.

특히 `@swc-node/register`, 타입 정의 패키지, `tsconfig.json`은 JavaScript 프로젝트에는 없거나 필요하지 않았던 요소입니다. 따라서 이번 장에서는 먼저 TypeScript 실행과 검사 체인을 새로 만들고, 그 위에 이전 프로젝트에서 가져올 구조를 차례로 얹는 방식으로 진행합니다.

새 프로젝트부터 만드는 방식은 학생이 직접 밑바닥을 확인하도록 만드는 효과도 있습니다. 복사 후 수정 방식에서는 이미 만들어진 파일이 너무 많아서 어느 지점이 TypeScript 전환의 핵심인지 흐려집니다. 반면 빈 프로젝트에서 시작하면 설치, 설정, 실행, 검사라는 네 단계가 분리되어 보이므로 구조 확장이 어느 지점에서 일어나는지 추적할 수 있습니다.

## **2-02. 패키지 설치보다 실행 체인을 먼저 이해해야 하는 이유**

`.ts` 파일은 Node.js가 바로 실행할 수 없으므로, 패키지를 설치하기 전에 이 파일이 어떤 체인을 거쳐 실제 서버 프로세스로 이어지는지부터 이해해야 합니다.

특히 이 과정은 뒤 장의 타입 오류를 읽는 기준점이 됩니다. 개발 서버가 켜지지 않았을 때 런타임 문제를 봐야 하는지, 아니면 `typecheck`가 실패한 정적 타입 문제를 봐야 하는지 구분하려면 실행 체인을 먼저 알아야 하기 때문입니다.

TypeScript 파일을 개발 중에 바로 실행하는 방법은 여러 가지입니다. `tsc`로 먼저 빌드한 뒤 `nodemon`으로 감시하거나, `tsx`를 사용해 `.ts` 파일을 직접 실행하는 방식이 흔히 쓰입니다. 그러나 이 교재에서는 `@swc-node/register`를 선택합니다. SWC는 Rust로 작성된 컴파일러로 변환 속도가 빠르고, Node.js의 `--import` 플래그와 결합해 별도 감시 프로세스 없이 `node --watch` 만으로 파일 변경을 감지할 수 있습니다. `tsx`도 같은 목적으로 쓸 수 있지만, 이 교재의 프로젝트는 `emitDecoratorMetadata`에 의존하는 `tsyringe`(9장에서 다루는 DI 라이브러리)를 사용하기 때문에 해당 옵션을 지원하는 SWC를 기준으로 잡았습니다.

처음 이 흐름을 접하면 패키지 이름이 많아 보여서 무엇이 실제 실행 단계이고 무엇이 별도 검증 단계인지 구분하기 어렵습니다. 아래 흐름도는 부가 도구를 모두 펼쳐 놓기보다, `Node.js`가 실제 실행을 맡고 그 사이에서 SWC가 어떤 방식으로 `.ts` 파일을 해석하게 만드는지 보이도록 단순화한 것입니다. 이 절에서는 개별 패키지 이름을 외우기보다 `dev`와 `typecheck`가 어디서 갈라지고, `swc`가 그 사이에서 무슨 역할을 하는지만 먼저 잡아 두는 편이 더 중요합니다.

```mermaid
flowchart LR
  A["TypeScript 코드<br/>src/main.ts 등"] --> B["pnpm dev"]
  B --> C["Node.js 시작<br/>node --watch"]
  C --> D["--import로 SWC 등록기 로드"]
  D --> E["SWC가 .ts를 실행 직전에<br/>JavaScript로 변환"]
  E --> F["Node.js가 변환된 코드 실행"]
  F --> G["서버 실행"]

  A --> T["pnpm typecheck"]
  T --> U["TypeScript 컴파일러<br/>tsc --noEmit"]
  U --> V["타입 규칙 검사"]
```

흐름도를 먼저 보면 `swc`는 서버를 직접 띄우는 도구가 아니라, `Node.js`가 TypeScript 파일을 읽을 수 있도록 중간에서 변환을 맡는 등록기라는 점이 더 분명해집니다. 동시에 `dev`와 `typecheck`가 같은 TypeScript 코드를 다루더라도 목적이 다르다는 사실도 함께 보입니다. 이제 아래 `package.json` 스크립트를 읽으면 한 줄 명령이 단순한 실행 문장이 아니라, Node.js 실행 경로와 TypeScript 검증 경로를 어떻게 연결하는지 더 쉽게 이해할 수 있습니다.

파일: `package.json`

```json
{
  "scripts": {
    "dev": "dotenv -e ./env/.env.development -- node --import @swc-node/register/esm-register --watch src/main.ts"
  }
}
```

`pnpm dev`를 실행하면 `dev` 스크립트가 왼쪽에서 오른쪽으로 해석되며 환경 변수 주입부터 `src/main.ts` 실행까지 실제 서버 프로세스로 이어집니다. 이 교재에서 이 한 줄이 중요한 이유는, TypeScript를 “빌드 후 실행”이 아니라 “개발 중 즉시 해석”하는 흐름 위에서 다루기 때문입니다.

| 단계 | 담당 도구 | 역할 |
| --- | --- | --- |
| 환경 변수 주입 | `dotenv-cli` | `env/.env.development`를 먼저 읽습니다. |
| 파일 감시와 프로세스 시작 | `node --watch` | 시작 파일을 감시하고 변경 시 다시 실행합니다. |
| TypeScript 런타임 변환 | `@swc-node/register/esm-register` | `.ts` 파일을 실행 직전에 JavaScript로 바꿔, 미리 빌드하지 않아도 바로 실행할 수 있게 합니다. |
| 애플리케이션 시작 | `src/main.ts` | Express 앱을 실제로 부트스트랩합니다. |

여기까지가 `pnpm dev` 한 줄 안에서 실제로 서버를 띄우는 실행 체인입니다. 반면 `typecheck`는 이 체인 안에 들어 있는 단계가 아니라, TypeScript가 코드의 해석 규칙을 지키는지 따로 확인하는 별도 검증 단계입니다.

| 별도 검증 단계 | 담당 도구 | 역할 |
| --- | --- | --- |
| 정적 타입 검사 | `tsc --noEmit` | 서버를 실행하지 않고 타입 오류만 따로 확인합니다. |

패키지 설치는 아래 두 줄로 끝납니다.

```bash
pnpm init
pnpm add express zod dotenv dotenv-cli bcrypt @prisma/client @prisma/adapter-pg reflect-metadata tsyringe
pnpm add -D typescript @swc-node/register @swc/core @swc/helpers @types/node @types/express @types/bcrypt prisma eslint prettier @eslint/js typescript-eslint
pnpm approve-builds
```

실행용과 타입용 의존성이 섞이지 않도록 구분해 두는 것이 중요합니다. Express, Prisma Client, `bcrypt`는 실제 서버 실행에 필요한 런타임 의존성이고, `typescript`, `@swc-node/register`, `@swc/core`, `@types/*`, ESLint는 TypeScript 해석과 검증을 위한 개발 도구입니다. 특히 `@types/*` 패키지는 Node.js가 직접 실행하는 라이브러리가 아니라, TypeScript가 외부 패키지의 타입 정보를 이해하도록 돕는 선언 파일 모음입니다. 따라서 편집기 자동완성, 타입 체크, 컴파일 단계에서는 필요하지만, 실제 배포 환경에서는 TypeScript 코드가 JavaScript로 변환되어 실행되고 이 선언 파일은 타입 검사 단계에서만 쓰이므로 `-D`로 설치합니다.

`@prisma/adapter-pg`는 5장에서 Prisma 연결 계층을 붙일 때 사용합니다. `reflect-metadata`는 8장에서 TypeScript 타입 정보를 런타임까지 이어주는 역할을 설명할 때, `tsyringe`는 9장에서 의존성 주입을 실제 코드에 연결할 때 씁니다. 이 교재는 PostgreSQL 연결 문자열을 adapter에 바로 넘기는 방식으로 정리하므로, `pg`와 `@types/pg`를 프로젝트 의존성으로 별도 설치하지 않습니다. 패키지 이름보다 중요한 것은 어떤 패키지가 런타임 의존성이고 어떤 패키지가 타입 검사와 개발 도구에 속하는지를 구분하는 것입니다.

## **2-03. `tsconfig.json`은 단순 옵션 모음이 아니라 프로젝트의 해석 규칙이다** ⭐⭐⭐

지난 파트에서 `tsconfig.json`의 기본 역할은 이미 확인했습니다. 이번 장에서는 옵션 목록을 다시 설명하기보다, Express 기반 TypeScript 서버에서 어떤 옵션이 실제로 문제를 만들고 또 해결하는지에 집중합니다.

먼저 아래 명령으로 TypeScript 기본 설정 파일을 생성합니다. `tsc --init`은 TypeScript 컴파일러가 `tsconfig.json`의 초기 형태를 만들어 주는 명령입니다. 여기서 `pnpm exec`는 전역으로 설치된 `tsc`가 아니라 현재 프로젝트에 설치된 TypeScript 바이너리를 찾아 실행하게 합니다. 따라서 학습자마다 전역 환경이 달라도, 교재에서는 같은 버전을 기준으로 설정 파일을 만들 수 있습니다. 이 교재에서는 생성된 기본값을 그대로 사용하는 대신, 현재 프로젝트의 실행 방식과 타입 해석 규칙에 맞는 최종 형태로 다시 정리합니다.

```bash
pnpm exec tsc --init
```

이 명령을 실행하면 `tsconfig.json`이 기본값으로 생성되지만, 이 교재에서는 그 상태를 그대로 사용하지 않고 아래와 같이 현재 프로젝트에 맞는 설정으로 수정해 사용합니다.

특히 중요한 선택은 `module`과 `moduleResolution`, 그리고 데코레이터 관련 옵션입니다. 여기서 데코레이터 문법은 `@injectable()`처럼 클래스나 메서드 앞에 `@` 형태로 붙여 추가 정보를 선언하는 문법을 뜻합니다. 이 교재는 Node ESM 환경을 유지하고 `tsyringe`를 사용하므로, import 해석 규칙과 런타임 메타데이터 규칙이 초반부터 함께 맞아 있어야 뒤 장의 설정과 설명이 서로 어긋나지 않습니다.

또한 현재 교재는 TypeScript 6.0.2 기준으로 검증합니다. 이 버전에서는 `paths`를 함께 쓰더라도 `baseUrl`을 따로 두지 않아도 되므로, 불필요한 경로 기준 옵션은 제거하고 실제로 필요한 해석 규칙만 남깁니다.

생성된 `tsconfig.json`은 아래 내용으로 정리합니다.

파일: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022", // 최신 문법 기준으로 타입을 해석합니다.
    "module": "NodeNext", // Node.js의 ESM/CJS 해석 규칙에 맞춰 모듈 형식을 읽습니다.
    "moduleResolution": "NodeNext", // import 경로를 Node.js 방식으로 해석합니다.
    "strict": true, // null/undefined 포함 각종 느슨한 타입 허용을 막습니다.
    "noEmit": true, // tsc가 JavaScript 파일을 만들지 않고 타입 검사만 하게 합니다.
    "esModuleInterop": true, // CommonJS 패키지를 default import처럼 다루기 쉽게 만듭니다.
    "skipLibCheck": true, // 외부 라이브러리 선언 파일 전체 검사는 건너뜁니다.
    "experimentalDecorators": true, // `@injectable()` 같은 `@` 데코레이터 문법을 허용합니다.
    "emitDecoratorMetadata": true, // DI에 필요한 타입 메타데이터를 런타임까지 남깁니다.
    "types": [
      "node", // Node.js 전역 타입(process, Buffer 등)을 포함합니다.
    ],
  },
  "include": [
    "src/**/*", // 애플리케이션 소스 전체를 타입 검사에 포함합니다.
    "prisma/**/*.ts", // Prisma 관련 TypeScript 파일도 함께 검사합니다.
    "generated/**/*.ts", // Prisma generate 결과물도 타입 검사 범위에 포함합니다.
    "prisma.config.ts", // Prisma 설정 파일도 같은 규칙으로 검사합니다.
  ],
}
```

`noEmit: true`를 둔 이유는 이 교재의 기본 개발 흐름이 “먼저 타입을 맞추고, 런타임은 별도 체인으로 실행한다”는 원칙 위에 있기 때문입니다. 이 설정에서 `tsc`는 JavaScript 파일을 만드는 도구가 아니라, 코드가 타입 규칙을 지키는지 확인하는 `검사기`로 작동합니다.

`include`에 `generated/**/*.ts`를 추가하는 이유는 `pnpm prisma:generate`로 생성되는 Prisma 클라이언트 코드(`generated/prisma/`)도 타입 검사 범위에 포함해야 하기 때문입니다. `prisma.config.ts`를 포함하는 이유도 같습니다. TypeScript 교재에서는 애플리케이션 코드만이 아니라, 실제로 import하는 생성 코드와 설정 코드까지 같은 해석 규칙 아래에 두어야 경계가 맞습니다.

`pnpm build`로 `dist` 결과물을 만들고 싶다면, `noEmit` 설정과 충돌하지 않도록 빌드 전용 설정 파일을 따로 둡니다. 다만 이 교재에서 더 중요한 점은 “개발 중 해석 규칙”과 “배포용 산출물 규칙”을 분리해 생각하는 태도입니다.

파일: `tsconfig.build.json`

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "outDir": "./dist",
    "rootDir": "."
  },
  "include": ["src/**/*", "generated/**/*.ts"],
  "exclude": ["dist", "node_modules"]
}
```

`tsconfig.build.json`은 개발 중 타입 검사 규칙은 그대로 상속하되, `build` 명령을 실행할 때만 `dist`에 JavaScript를 출력하도록 역할을 분리합니다. 이렇게 두 파일을 나누면 “지금 TypeScript가 코드를 어떻게 읽는가”와 “최종 산출물을 어디에 만들 것인가”를 별개 문제로 다룰 수 있습니다.

한 가지 주의할 점이 있습니다. `rootDir`이 `"."`(프로젝트 루트)로 설정되어 있기 때문에, `src/main.ts`의 컴파일 결과물은 `dist/main.js`가 아니라 `dist/src/main.js`에 생성됩니다. 이 구조는 `src/`와 `generated/` 두 디렉터리를 모두 `rootDir` 안에 포함시키기 위한 것입니다. 따라서 빌드 결과물을 직접 실행하는 `prod` 스크립트도 `node dist/src/main.js`를 가리킵니다.

## **2-04. 첫 번째 TypeScript Express 앱은 가능한 한 단순하게 시작한다**

프로젝트를 시작하자마자 계층 구조까지 모두 도입하면 어느 설정 때문에 실행이 실패했는지 추적하기 어려워집니다. 그래서 첫 번째 앱은 라우터 분리도, Prisma 연결도 없이 “TypeScript 파일이 실제로 실행되는가”만 확인하는 수준으로 유지합니다.

이 시점에서는 서버를 복잡하게 만드는 것보다 `app.ts`와 `main.ts`를 나누는 이유를 먼저 이해해야 합니다. `app.ts`는 Express 인스턴스와 미들웨어 구성을 맡고, `main.ts`는 실행 시점과 환경 변수를 조립하는 시작점이 됩니다.

파일: `src/app.ts`

```tsx
import express, { type Express } from "express";

export class App {
  public readonly app: Express;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  private middleware() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.get("/health", (_req, res) => {
      res.status(200).json({ message: "ok" });
    });
  }

  listen(port: number) {
    return this.app.listen(port, () => {
      console.log(`Server is running on port${port}`);
    });
  }
}
```

파일: `src/main.ts`

```tsx
import { App } from "./app.js";

const app = new App();
app.listen(3000);
```

아직 환경 변수나 DI를 쓰지 않는 이유는 런타임 체인이 먼저 안정적으로 동작해야 이후 장의 변화가 어디에서 생겼는지 분명해지기 때문입니다. 이 코드는 이후 구조 확장을 위한 기준점입니다.

## **2-05. 시작 단계에서 바로 준비해야 하는 스크립트**

프로젝트를 손으로 실행만 하는 방식은 초반에는 가능해 보이지만, TypeScript 전환을 시작하면 같은 오류를 두 종류의 명령으로 나누어 확인해야 합니다. 따라서 처음부터 `dev`, `typecheck`, `lint` 스크립트를 분리해 두어야 어느 문제가 런타임 문제이고 어느 문제가 타입 문제인지 기준이 선명해집니다.

여기서 `dev` 스크립트에 사용하는 `@swc-node/register`는 TypeScript 문법을 빠르게 JavaScript로 변환해 Node.js에서 실행하도록 돕는 도구입니다. 하지만 `swc`는 TypeScript 컴파일러의 타입 검사기(Type Checker)를 대신하지 않습니다. 다시 말해 `pnpm dev`로 서버가 정상 기동되더라도, 잘못된 DTO 타입 연결이나 반환 타입 불일치 같은 문제는 별도 검사 없이는 그대로 지나갈 수 있습니다.

그래서 `typecheck`를 `tsc --noEmit`로 분리해 두어야 합니다. `swc`는 실행 속도를 담당하고, `tsc`는 타입 안정성을 담당하도록 책임을 나누어야 개발 서버가 뜬다는 사실과 코드가 타입 규칙을 만족한다는 사실을 혼동하지 않게 됩니다. 이 구분은 뒤에서 DTO, Prisma 타입, `unknown` 에러를 설명할 때도 계속 같은 축으로 반복됩니다.

이 교재는 JavaScript 기준 프로젝트와 같은 `env/.env.development` 구조를 유지합니다. 개발 서버와 Prisma 명령도 이 파일을 먼저 읽도록 스크립트에서 환경 변수를 주입합니다.

`package.json`에서 이 교재가 실제로 중요하게 보는 항목은 `type`, `main`, `scripts`입니다. 이미 앞 단계에서 필요한 패키지를 설치했다면, 먼저 확인해야 하는 것은 의존성 버전 문자열보다 실행 명령과 모듈 규칙이 어떤 방식으로 정리되어 있는가입니다. 그래서 아래에는 전체 파일을 그대로 옮기기보다, 학습 흐름과 직접 연결되는 항목만 발췌합니다.

파일: `package.json`

```json
{
  "name": "layered-architecture-ts",
  "private": true,
  "type": "module",
  "main": "./src/main.ts",
  "scripts": {
    "dev": "dotenv -e ./env/.env.development -- node --import @swc-node/register/esm-register --watch src/main.ts",
    "build": "tsc -p tsconfig.build.json",
    "prod": "dotenv -e ./env/.env.development -- node dist/src/main.js",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "format": "prettier --write .",
    "prisma:generate": "dotenv -e ./env/.env.development -- prisma generate",
    "prisma:migrate": "dotenv -e ./env/.env.development -- prisma migrate dev",
    "prisma:studio": "dotenv -e ./env/.env.development -- prisma studio"
  }
}
```

실제 `package.json`에는 앞에서 설치한 런타임 의존성과 개발 의존성이 함께 기록됩니다. 다만 재현 검증에서 더 중요한 기준은 버전 문자열의 일치 여부보다, `type`, `scripts`, Prisma 명령 흐름이 같은 학습 구조를 만들고 있는가입니다. `build` 스크립트는 이 시점에는 `tsc`만 실행하지만, 10장에서 path alias 후처리를 위해 `tsc-alias`가 추가됩니다.

여기서 핵심은 `dev`와 `typecheck`가 같은 TypeScript 코드를 서로 다른 관점으로 다룬다는 점입니다. `dev`는 `swc`를 통해 빠르게 실행 체인을 만들고, `typecheck`는 `tsc --noEmit`으로 산출물 없이 타입 관계만 검증합니다. 따라서 시작 단계에서부터 두 스크립트를 모두 준비해야 이후 장에서 “실행은 되지만 타입 검사는 실패하는 상태”를 별개의 문제로 추적할 수 있습니다.

이 역할 분리가 현실적으로 가능한 이유 중 하나는 VSCode가 TypeScript Language Service를 통해 편집 단계에서 타입 오류를 바로 보여 주기 때문입니다. 즉, 코드를 작성하는 동안에는 에디터가 빠른 피드백을 제공하고, 터미널에서는 `pnpm dev`가 실행 흐름을 확인하며, `pnpm typecheck`가 프로젝트 전체 타입 규칙을 다시 점검하는 식으로 책임이 나뉩니다. 다만 VSCode 진단은 개인 편집기 환경에 기대는 기능이므로, 팀 전체가 같은 기준으로 확인하고 재현 검증까지 연결하려면 별도의 CLI 타입 검사 스크립트가 여전히 필요합니다.

`"type": "module"`은 이 프로젝트가 ESM(ECMAScript Modules) 방식을 사용한다는 선언입니다. `import`/`export` 문법과 `.js` 확장자 import 방식을 Node.js가 올바르게 해석하려면 이 설정이 반드시 있어야 합니다. 이 값이 없으면 `@swc-node/register/esm-register`를 통해 변환해도 런타임에서 모듈을 찾지 못하는 오류가 생깁니다.

## **2-06. 환경 변수, 데이터베이스, Prisma 최소 설정을 초반에 함께 맞춘다**

실행 가능한 프로젝트를 재현하려면 스크립트와 환경 변수 기준이 먼저 맞아야 합니다. 특히 `dev`와 Prisma 명령은 모두 `env/.env.development`를 먼저 읽으므로, 이 파일이 없으면 뒤 장의 코드가 맞더라도 시작점에서 바로 멈추게 됩니다. 따라서 이 교재에서는 스크립트를 정리한 직후 곧바로 데이터베이스와 환경 변수 파일, `config` 진입점을 함께 맞춥니다.

`DATABASE_URL`에 `layered_architecture_ts`라는 데이터베이스 이름이 들어가려면, PostgreSQL에 같은 이름의 데이터베이스가 먼저 있어야 합니다. 따라서 환경 변수 파일을 작성하기 전에 `psql`로 개발용 데이터베이스를 먼저 생성합니다.

**Mac (Homebrew PostgreSQL)**

```bash
psql postgres
```

```sql
CREATE DATABASE layered_architecture_ts;
\q
```

**Windows (psql)**

시작 메뉴에서 `SQL Shell (psql)`을 실행합니다. 접속 정보를 물어보면 기본값을 사용하고, 비밀번호는 설치 시 설정한 값을 입력합니다.

```sql
CREATE DATABASE layered_architecture_ts;
\q
```

다음 내용을 `env/.env.development`에 저장합니다.

```
# 환경 변수 예시 파일
# 실제 사용 시 이 파일을 복사하여 .env.development 파일을 관리합니다.

# 환경 설정
NODE_ENV=development

# 서버 포트
PORT=3000

# PostgreSQL 연결 URL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/layered_architecture_ts"
```

이 시점에서 한 가지를 더 맞춰 둘 필요가 있습니다. 2장에서 이미 `package.json`에 `prisma:generate` 스크립트를 넣어 두었으므로, 장 끝 게이트에서 이 명령이 실제로 성공하려면 Prisma CLI가 읽을 최소 기준 파일도 함께 있어야 합니다. 다만 여기서는 ORM 설계를 본격적으로 설명하려는 것이 아니라, 타입 생성 명령이 가리킬 출발점을 먼저 고정하는 수준으로만 준비합니다.

먼저 가장 단순한 `User` 모델을 기준으로 `prisma/schema.prisma`를 만듭니다. 이 파일의 의미와 DTO, Prisma 타입, 응답 타입의 관계는 5장에서 다시 자세히 설명하므로, 여기서는 “Prisma Client가 생성될 수 있는 최소 스키마”를 먼저 갖춘다고 이해하면 됩니다.

파일: `prisma/schema.prisma`

```
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Prisma 7에서는 `datasource`에 `url`을 직접 넣지 않고, 프로젝트 루트의 `prisma.config.ts`에서 연결 문자열을 읽습니다. 2장에서 이 파일까지 함께 두어야 `pnpm prisma:generate`가 현재 개발 환경의 `DATABASE_URL`을 기준으로 정상 동작하고, 5장에서 같은 파일을 다시 설명할 때도 흐름이 끊기지 않습니다.

파일: `prisma.config.ts`

```tsx
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

환경 변수 파일을 만들었다면, 사용하는 곳마다 `process.env`를 직접 읽기 전에 `config` 파일도 함께 준비합니다. 아직 `main.ts`는 고정 포트 `3000`으로 시작하지만, 5장 이후 Prisma 연결과 9장의 앱 시작점에서는 `PORT`, `DATABASE_URL`을 공통 기준으로 읽어야 하므로 이 파일을 초반에 만들어 두는 편이 더 자연스럽습니다.

파일: `src/config/config.ts`

```tsx
import { flattenError, z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce
    .number()
    .min(1000)
    .max(65535)
    .default(3000),
  DATABASE_URL: z.url(),
});

const parseEnvironment = () => {
  try {
    return envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      DATABASE_URL: process.env.DATABASE_URL,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { fieldErrors } = flattenError(error);
      console.error("환경 변수 검증 실패:", fieldErrors);
    }
    process.exit(1);
  }
};

export const config = parseEnvironment();

export const isDevelopment =
  config.NODE_ENV === "development";
export const isProduction =
  config.NODE_ENV === "production";
export const isTest = config.NODE_ENV === "test";
```

이렇게 해 두면 이후 장에서 `config.DATABASE_URL`, `config.PORT`를 설명할 때 “왜 이제 와서 설정 파일이 필요한가”를 다시 돌아가지 않아도 됩니다. 타입 관점에서도 환경 변수는 런타임 입력이므로, 프로젝트 초반에 한 번 검증하고 공용 값으로 내보내는 구조를 먼저 잡아 두는 편이 안정적입니다.

`config.ts`를 만들었으면 `#config` 별칭이 가리킬 진입점 파일도 바로 함께 만듭니다. 이 파일이 없으면 3장에서 설정한 `#config` 별칭이 동작하지 않습니다.

파일: `src/config/index.ts`

```tsx
export * from "./config.js";
```

`.gitignore`는 완성본과 한 줄까지 같을 필요는 없지만, `dist`, `generated`, `node_modules`처럼 실행과 생성 과정에서 반복적으로 생기는 출력물을 버전 관리에서 제외한다는 원칙은 미리 정해 두는 편이 안정적입니다.

다음 내용을 `.gitignore`에 저장합니다.

파일: `.gitignore`

```
node_modules
.env
pnpm-debug.log

dist
generated
```

## **2-07. Prettier와 ESLint의 역할이 다른 이유**

앞선 예제에서 `Prettier`와 `ESLint` 설정은 여러 번 반복했으므로, 여기서는 설명을 길게 늘리지 않고 최소 설정만 정리합니다. `Prettier`는 코드 형식을 맞추고, `ESLint`는 정적 분석으로 코드 품질 문제를 찾습니다.

다음 설정은 이 교재에서 사용할 최소 Prettier 규칙이며, 루트 `.prettierrc`에 저장합니다.

파일: `.prettierrc`

```json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all",
  "printWidth": 80
}
```

이 교재에서는 예제 모양을 일정하게 유지하는 데 필요한 수준만 사용합니다. Prettier 설정이 끝나면, 비슷한 목적으로 코드 품질을 잡아 주는 ESLint를 함께 설정합니다.

## **2-08. ESLint는 TypeScript 코드의 품질 경계도 함께 정리한다**

TypeScript만으로는 미사용 변수 같은 품질 문제를 모두 정리할 수 없으므로, 최소 ESLint 규칙은 함께 두고 시작합니다. 다만 이번 교재에서는 ESLint 자체를 길게 설명하지 않고, 이후 예제에서 바로 걸릴 실수만 먼저 막는 수준으로만 사용합니다.

아래는 ESM 기반 TypeScript 프로젝트에 맞춘 최소 ESLint 구성입니다.

파일: `eslint.config.mjs`

```tsx
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    ignores: ["dist/**", "generated/**"],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
);
```

규칙을 과하게 늘리지 않고, 반복적으로 등장할 실수만 초기에 정리하는 수준으로 유지합니다.

## **2-09. 폴더 구조를 초반에 정리해야 이후 장의 서술 순서가 안정된다**

파일이 몇 개 없는 시점에서는 `src` 아래에 모든 코드를 넣어도 당장은 문제가 없어 보입니다. 그러나 이번 교재는 Express 기능 자체보다 타입 경계가 어느 폴더에서 드러나는지를 반복해서 보여 주어야 하므로, 타입 파일과 실행 파일의 자리를 초반에 나누어 둘 필요가 있습니다.

이번 장에서는 아직 기능이 많지 않더라도, 이후 장에서 바로 사용할 최소 폴더 구조를 먼저 잡아 둡니다. 복잡한 구조를 미리 도입하는 것이 아니라, DTO, 예외, DI, Prisma 진입점이 각각 어디에 놓일지를 먼저 고정하는 작업입니다.

```
src/
├─ app.ts
├─ main.ts
├─ common/
│  ├─ constants/
│  ├─ di/
│  ├─ exceptions/
│  └─ schemas/
├─ config/
├─ controllers/
│  └─ user/
│     └─ dto/
├─ db/
├─ middlewares/
├─ providers/
├─ repositories/
└─ services/
```

이 구조는 6장에서 `users` CRUD를 구현하고 9장에서 DI를 붙일 때 다시 바뀌지 않도록 설계한 최소 형태입니다. 지금 만드는 폴더는 단순한 정리 작업이 아니라, “입력 타입은 어디서 정의하고, 실행 객체는 어디서 조립하는가”를 계속 같은 위치에서 설명하기 위한 장치입니다.

`common/di/` 폴더는 9장에서 `tsyringe` container 설정 파일(`container.ts`)을 두는 자리입니다. 지금 당장 채울 내용은 없지만, 객체 조립 책임이 어디에 모이는지 미리 위치를 잡아 두는 의미가 있습니다.

# 제 3장: 모듈 알리아스 설정하기

## **3-01. 긴 상대 경로 대신 경로 별칭을 도입하는 이유**

계층 구조를 나누고 파일이 깊어지기 시작하면 `../../../common/exceptions/http.exception.js` 같은 import가 빠르게 늘어납니다. JavaScript에서는 경로만 맞으면 일단 동작할 수 있지만, TypeScript 교재에서는 이런 긴 상대 경로가 코드의 핵심과 함께 경로 계산 자체도 같이 눈에 들어오게 됩니다.

문제는 학습이 불가능해진다는 뜻이 아니라, 설명의 중심을 어디에 둘 것인가에 있습니다. 컨트롤러, 서비스, 리포지토리의 타입 경계를 설명해야 하는 시점에 import 경로가 길어지면, “이 클래스가 어디서 왔는가”보다 “점을 몇 개 써야 하는가”가 먼저 보이기 쉽습니다. 이번 장에서는 경로 별칭을 단순한 편의 기능이 아니라 설명의 초점을 정리하는 장치로 다룹니다.

TypeScript 전환 과정에서는 구조를 조금만 바꿔도 파일 이동이 자주 생깁니다. 상대 경로가 과도하게 길면 디렉터리 재배치 때마다 import가 연쇄적으로 흔들리고, 경로 수정 작업이 타입 설계 설명보다 더 자주 눈에 띄게 됩니다. 별칭은 이런 반복 비용을 줄이면서 코드가 어느 계층을 바라보는지 더 명확하게 드러내는 수단이 됩니다.

## **3-02. TypeScript가 이해하는 경로와 런타임이 이해하는 경로를 따로 보면 문제가 생긴다**

별칭 설정을 보면 TypeScript의 `paths`만 맞추면 import가 모두 정리된다고 오해하기 쉽습니다. 하지만 런타임까지 함께 신경 써야 합니다. TypeScript가 코드를 해석하는 방식과 Node.js가 실제로 모듈을 찾는 방식이 서로 다른 층위이기 때문입니다.

TypeScript의 `paths`는 편집기와 타입 체커가 import를 이해하도록 돕습니다. 반면 실제 실행 시점에는 Node.js가 그 경로를 해석해야 합니다. 개발 중에는 `@swc-node/register`가 `.ts` 파일을 실행 직전에 JavaScript로 변환하고, Node.js의 `--watch`가 변경을 감지해 프로세스를 다시 시작합니다. 따라서 둘 중 하나만 맞추면 편집기에서는 정상으로 보이는데 런타임에서는 실패하거나, 반대로 실행은 되는데 타입 체커가 오류를 내는 상황이 생깁니다.

기존에 JavaScript만 사용하던 흐름에서는 import 경로를 런타임 기준으로만 생각해도 큰 문제가 드러나지 않는 경우가 많았습니다. 그러나 TypeScript로 넘어오면 같은 import 문장을 편집기와 런타임이 각각 따로 읽기 때문에, 어느 쪽이 무엇을 보고 있는지 한 번 분리해서 볼 필요가 있습니다.

아래 그림은 `#config` 같은 별칭 import가 실제로는 두 해석 경로를 동시에 거치고, 두 규칙이 어긋날 때 어떤 종류의 문제가 생기는지를 보여 줍니다.

```mermaid
flowchart TB
    A["코드에서 import '#config' 작성"]

    subgraph TS["TypeScript / 편집기"]
      B["tsconfig.json의 paths 확인"]
      C["자동완성, 타입 검사, import 해석"]
    end

    subgraph RT["Node.js 런타임"]
      D["package.json의 imports 확인"]
      E["실행 시 실제 파일 위치 해석"]
    end

    A --> B
    A --> D
    B --> C
    D --> E
    C --> F{"두 설정이<br/>같은 대상을 가리키는가?"}
    E --> F
    F -->|예| G["편집기와 런타임이<br/>같은 import를 같은 의미로 읽음"]
    F -->|아니오| H["편집기는 정상인데 서버가 실패하거나,<br/>서버는 실행되는데 타입 오류가 남음"]
```

핵심은 한쪽 설정이 다른 쪽 설정을 대신하지 못한다는 점입니다. `paths`만 맞추면 편집기에서는 정상으로 보여도 실행이 실패할 수 있고, `imports`만 맞추면 서버는 켜지는데 타입 체커와 자동완성이 별칭을 이해하지 못할 수 있습니다.

이 차이를 초반에 이해하지 못하면 이후 문제를 잘못 진단하기 쉽습니다. 편집기에서 빨간 줄이 없는데 서버가 켜지지 않으면 런타임 해석 문제부터 의심해야 하고, 반대로 실행은 되는데 타입 체커가 불평하면 `tsconfig.json` 쪽 별칭 규칙을 확인해야 합니다. 이 장의 핵심은 별칭 편의가 아니라, TypeScript와 런타임이 같은 import를 같은 의미로 읽게 만드는 데 있습니다.

이 시점에서 별칭 문법은 여러 선택지가 있을 수 있습니다. 그러나 이 교재는 이전에 작성한 JavaScript 버전 프로젝트에서 이미 `package.json`의 `imports`를 사용해 `#config`, `#repositories`, `#controllers` 같은 이름을 쓰고 있으므로, 같은 표현을 유지하는 것이 학습 흐름에 더 잘 맞습니다.

이 교재의 별칭은 새로운 스타일을 발명하는 것이 아니라, 기존 JavaScript 프로젝트의 표현을 TypeScript에서도 같은 의미로 읽게 만드는 작업입니다. 다만 세부 파일마다 별칭을 늘리기보다 `src` 바로 아래의 최상위 폴더만 진입점으로 두고, 세부 파일은 각 폴더의 `index.ts`가 다시 내보내는 방식으로 정리합니다. 그래야 JavaScript와 TypeScript 버전을 비교할 때 경로 문법보다 타입 설계 차이에 집중할 수 있습니다.

아래는 TypeScript와 런타임이 같은 별칭을 읽도록 맞추는 기본 구성입니다.

파일: `package.json`

```json
{
  "imports": {
    "#generated/prisma/client.js": "./generated/prisma/client.ts",
    "#common": "./src/common/index.ts",
    "#config": "./src/config/index.ts",
    "#controllers": "./src/controllers/index.ts",
    "#db": "./src/db/index.ts",
    "#middlewares": "./src/middlewares/index.ts",
    "#providers": "./src/providers/index.ts",
    "#repositories": "./src/repositories/index.ts",
    "#services": "./src/services/index.ts",
  },
}
```

같은 이름을 편집기와 타입 체커도 이해하도록 `tsconfig.json`의 `paths`를 같은 구조로 맞춥니다.

파일: `tsconfig.json`

```json
{
  "compilerOptions": {
    // ... 기존 옵션 ...
    "paths": {
      "#generated/prisma/client.js": [
        "./generated/prisma/client.ts"
      ],
      "#common": ["./src/common/index.ts"],
      "#config": ["./src/config/index.ts"],
      "#controllers": ["./src/controllers/index.ts"],
      "#db": ["./src/db/index.ts"],
      "#middlewares": ["./src/middlewares/index.ts"],
      "#providers": ["./src/providers/index.ts"],
      "#repositories": ["./src/repositories/index.ts"],
      "#services": ["./src/services/index.ts"]
    }
  },
  "include": [
    // ... 기존 include ...
  ]
}
```

이 시점에서 먼저 맞춰 둘 것은 alias 이름과 해석 규칙입니다. 실제 `src/common/index.ts`, `src/config/index.ts`, `src/db/index.ts` 같은 export 진입점 파일은 각 장에서 대상 모듈이 생기는 순서에 맞춰 채웁니다. 그래야 아직 없는 파일을 앞 장에서 먼저 참조하지 않고도, 장별 게이트를 현재 단계 기준으로 안정적으로 통과할 수 있습니다.

별칭을 많이 만드는 것이 목적이 아닙니다. 반복적으로 등장하는 공통 경로만 추려서 설명을 간단하게 만드는 데 의미가 있습니다. 세부 파일 경로를 별칭으로 다시 늘리기 시작하면 오히려 규칙이 흐려지므로, 최상위 진입점과 `index.ts` 재수출만 유지하면 구조가 더 선명하게 드러납니다.

예를 들어 `#common`은 공통 상수, 예외, 타입을 한 진입점에서 읽는다는 뜻을 주고, `#repositories`는 데이터 접근 계층의 공개 객체를 읽는다는 뜻을 줍니다. 이런 이름은 경로를 줄이는 동시에 계층의 위치와 공개 범위를 함께 설명해 주므로, 교재 서술에도 더 잘 맞습니다.

이 기준이 없으면 별칭이 오히려 새로운 잡음을 만듭니다. 역할이 드러나는 이름을 쓰면 import 자체가 일종의 설계 문장처럼 작동하므로, 타입 경계를 설명하는 장에서도 같은 용어를 계속 재사용할 수 있습니다.

상대 경로가 실제로 얼마나 설명을 방해하는지는 import 문장 하나만 비교해 봐도 드러납니다.

```tsx
// 상대 경로 기반
import { NotFoundException } from "../../common/index.js";

// 별칭 기반
import { NotFoundException } from "#common";
```

단순히 길이의 문제가 아닙니다. 별칭 기반 import는 “공통 모듈에서 예외를 읽는다”는 의미를 먼저 보여 주고, 상대 경로 기반 import는 “두 단계 위로 올라가서 common으로 간다”는 계산부터 요구합니다.

# 제 4장: Express 요청과 응답을 타입으로 다루기

## **4-01. Express의 요청 객체는 한 덩어리로 보면 금방 흐려진다**

JavaScript에서는 `req.body`, `req.params`, `req.query`를 필요할 때마다 꺼내 쓰는 방식으로도 기능을 만들 수 있었습니다. 하지만 TypeScript에서는 이 세 값이 서로 다른 출처와 규칙을 가진다는 사실을 먼저 구분해야 합니다. URL 경로에서 오는 값과 쿼리 문자열, JSON 본문은 형태와 변환 방식이 각각 다르기 때문입니다.

구분이 흐려지면 곧바로 문제가 생깁니다. `req.params.id`는 문자열인데 이를 숫자처럼 쓰기 시작하면 서비스나 리포지토리에서 타입이 엉킵니다. 각 영역을 따로 다루는 태도가 필요합니다.

이 태도는 제네릭을 예쁘게 쓰기 위한 습관이 아닙니다. 컨트롤러는 HTTP 입력이 처음 들어오는 자리이므로, 어떤 데이터가 문자열 그대로 들어오고 어떤 데이터가 구조화된 객체로 들어오는지를 가장 먼저 선언해야 합니다. 그래야 뒤 계층은 이미 정리된 값만 받게 되고, 서비스와 리포지토리의 타입도 단순하게 유지할 수 있습니다.

이 구분을 코드에 옮길 때 기준점이 되는 것이 Express의 `Request` 제네릭입니다. TypeScript에서 이 타입을 처음 볼 때 가장 많이 헷갈리는 부분은 제네릭 위치인데, 각 칸이 무엇을 담는지 파악하면 어느 자리에 어떤 타입을 넣어야 하는지 보입니다. 보통은 `params`, `res body`, `req body`, `query` 순서로 읽습니다.

어떤 라우트가 경로 매개변수와 본문만 사용한다면 그 두 칸을 먼저 채우고 나머지는 기본값에 맡기는 식으로 접근할 수 있습니다. `req.params.id`는 HTTP 경로 매개변수이므로 처음 선언할 때는 숫자가 아니라 문자열로 둡니다. 실제 프로젝트 코드에서는 검증 미들웨어를 두고 컨트롤러 시그니처는 더 가볍게 유지하는 경우가 많습니다.

다음 예시는 `params`와 `body`를 각각 다른 타입으로 다루는 기본 형태를 보여 줍니다. 관련 타입이 서로 다른 위치에 놓이므로, 파일 단위로 나누어 보면 관계가 더 분명해집니다.

파일: `src/common/schemas/request.schema.ts`

```tsx
export type IdParams = {
  id: string;
};
```

파일: `src/controllers/user/dto/user.dto.ts`

```tsx
export type UserResponse = {
  id: number;
  email: string;
  name: string | null;
};

export type CreateUserBody = {
  email: string;
  name?: string;
  password: string;
};
```

`UserResponse`는 응답 형태를 정의하는 타입입니다. 요청 타입(`CreateUserBody`)과 같은 DTO 파일에 둡니다. 둘 다 HTTP 경계에서 어떤 데이터가 드나드는지를 선언하는 컨트롤러 레이어의 관심사이기 때문입니다. 6장에서는 이 파일을 Zod 스키마와 타입 추론 기반으로 교체하고, `UserResponse`도 함께 완성합니다. 마찬가지로 `common/schemas/request.schema.ts`의 `IdParams`도 6장에서 Zod 기반으로 전환됩니다.

3장에서는 모듈 alias 경로 규칙만 먼저 잡아 두었습니다. 따라서 4장부터는 실제로 만들어진 모듈에 한해서 export 진입점을 순서대로 채워야 합니다. 이 단계에서는 `#common`, `#controllers`가 가리킬 최소 진입점부터 열어 두고, 아직 없는 `#db` 같은 경로는 관련 파일이 등장하는 장에서 나중에 연결합니다.

여기서는 일부러 실제 `user.controller.ts` 파일을 먼저 만듭니다. 이유는 `Request` 제네릭이 문장 설명 안에서만 이해되는 개념이 아니라, VSCode 편집기에서 `req.body`, `req.params`, `res.json()`에 어떤 타입 추천이 붙는지 직접 확인해야 체감되는 개념이기 때문입니다. 따라서 이 장의 컨트롤러는 최종 구조를 미리 완성하는 단계가 아니라, 실제 파일 안에서 타입 경계를 먼저 눈으로 확인하는 1차 구현 단계로 읽는 편이 맞습니다.

파일: `src/common/schemas/index.ts`

```tsx
export * from "./request.schema.js";
```

파일: `src/common/index.ts`

```tsx
export * from "./schemas/index.js";
```

파일: `src/controllers/user/index.ts`

```tsx
export * from "./dto/user.dto.js";
```

파일: `src/controllers/index.ts`

```tsx
export * from "./user/index.js";
```

파일: `src/controllers/user/user.controller.ts`

```tsx
import type { Request, Response } from "express";
import type { IdParams } from "#common";
import type {
  CreateUserBody,
  UserResponse,
} from "#controllers";

export async function createUser(
  req: Request<
    Record<string, never>, // 경로 파라미터 없음
    UserResponse, // 응답 본문 타입
    CreateUserBody // 요청 본문 타입
  >,
  res: Response<UserResponse>,
) {
  const { email, name } = req.body;
  res
    .status(201)
    .json({ id: 1, email, name: name ?? null });
}

export async function findUserById(
  req: Request<IdParams>,
  res: Response<UserResponse>,
) {
  const { id } = req.params;
  res.status(200).json({
    id: Number(id),
    email: "test@example.com",
    name: null,
  });
}
```

`Request` 제네릭은 `<Params, ResBody, ReqBody, ReqQuery>` 순서로 네 가지 타입을 받습니다. `createUser`처럼 경로 파라미터가 없는 핸들러는 첫 번째 자리에 `Record<string, never>`를 두어 “파라미터 없음”을 명시합니다. 반면 `findUserById`처럼 `:id`를 사용하는 핸들러는 `IdParams`를 직접 넣으면 됩니다.

핵심은 타입을 복잡하게 많이 쓰는 데 있지 않습니다. 어떤 데이터가 어느 경로로 들어오는지 먼저 분리해서 표현함으로써, 서비스 계층에 전달할 값의 모양을 미리 고정하는 데 의미가 있습니다. 다만 이 예시는 미들웨어가 아직 개입하지 않은 원본 요청을 설명하기 위한 것입니다. 검증 미들웨어에서 문자열을 숫자로 자동 변환하는 `coerce` 옵션을 적용하면 컨트롤러가 읽는 `id`는 스키마 결과에 맞춰 숫자로 바뀔 수 있습니다. `coerce`는 6장에서 Zod를 도입할 때 자세히 다룹니다.

여기서 보여 준 `IdParams`, `CreateUserBody`, `UserResponse`는 타입 분리 방식을 설명하기 위한 1차 구현입니다. 중요한 점은 이 파일이 잠깐 읽고 지나가는 예시가 아니라, 실제로 코드를 입력한 뒤 편집기에서 타입 추천과 오류 표시를 확인해 보는 출발점이라는 데 있습니다. 이 단계에서는 클래스 구조나 서비스 연결까지 한꺼번에 넓히기보다, 요청과 응답의 타입 경계를 먼저 눈으로 확인하는 데 집중합니다.

이 시점에서는 `Request` 쪽만 보는 것으로 끝나지 않습니다. 같은 코드 안에 함께 적힌 `Response<UserResponse>`도 이미 중요한 역할을 하고 있습니다. 요청 타입이 들어오는 값을 설명한다면, 응답 타입은 나가는 값의 형태를 고정합니다. JavaScript에서는 응답 객체에 무엇을 담든 실행만 되면 문제가 없어 보일 수 있지만, TypeScript에서는 컨트롤러가 어떤 구조를 반환해야 하는지 미리 선언해 두어야 타입 불일치를 조기에 확인할 수 있습니다.

서비스 반환 타입과 실제 JSON 응답 형태가 어긋날 때 빠르게 확인할 수 있다는 점도 같은 자리에서 함께 읽는 편이 자연스럽습니다. Prisma 결과를 그대로 넘기지 않고 응답에 필요한 필드만 추리는 구조를 만들려면 `Response<T>` 타입이 중심이 됩니다. 응답은 프로젝트 바깥으로 나가는 마지막 형식이므로, 데이터베이스에 `password` 필드가 존재하더라도 응답에는 절대로 포함되면 안 됩니다. 응답 타입을 코드 옆에 바로 적어 두면 이런 정책이 문장 설명이 아니라 컨트롤러가 실제로 돌려주는 응답 모양으로 남습니다.

## **4-02. `params`, `query`, `body`를 같은 방식으로 처리하면 안 되는 이유**

`body`는 JSON 파싱 결과라서 비교적 구조화된 객체로 들어오지만, `params`와 `query`는 문자열 기반 입력입니다. 같은 검증 흐름을 적용하더라도 변환 시점을 다르게 잡아야 합니다.

예를 들어 `params.id`는 컨트롤러에서 숫자로 바꾸거나, Zod 스키마에서 `coerce`를 이용해 숫자로 바꾸는 식으로 처리할 수 있습니다. 반면 `body`는 이미 필드 구조가 있는 객체이므로, 필수값과 길이, 형식을 중심으로 검증합니다. 세 입력 영역은 모두 “요청 데이터”라는 공통점이 있지만, 검증과 변환 전략은 같지 않습니다.

이 차이를 무시하면 서비스 계층이 입력 정리 책임까지 떠안게 됩니다. 서비스는 비즈니스 규칙을 설명하는 대신 문자열 변환과 기본값 처리까지 함께 다루게 되고, 계층 구분도 빠르게 흐려집니다. 어떤 입력을 어디에서 변환할지 고정하는 일은 타입 선언 문제이면서 동시에 설계 문제입니다.

`query`에도 같은 원칙이 적용되지만, 처리 방식이 다소 다릅니다. `req.query`의 값은 Express 내부에서 `string | string[] | ParsedQs | undefined` 타입으로 들어옵니다. `ParsedQs`는 Express가 중첩 객체 형태의 쿼리 파라미터를 파싱할 때 쓰는 타입으로, `qs` 라이브러리에서 가져옵니다. TypeScript가 이 값을 자동으로 좁혀 주지 않으므로 실제로 사용하려면 명시적으로 처리해야 합니다.

이 절도 같은 `user.controller.ts` 파일 안에서 이어서 보는 편이 자연스럽습니다. 그래야 `params`, `body`뿐 아니라 `query` 역시 컨트롤러에서 먼저 해석해야 한다는 점이 한 흐름으로 보이기 때문입니다.

실무에서 가장 흔하게 쓰이는 방식은 단순 캐스팅입니다. 앞에서 만든 `src/controllers/user/user.controller.ts` 파일 하단에 아래 함수를 이어서 추가합니다.

파일: `src/controllers/user/user.controller.ts`

```tsx
export async function listUsers(
  req: Request,
  res: Response<UserResponse[]>,
) {
  const page = req.query.page as string | undefined;
  const search = req.query.search as string | undefined;

  if (page || search) {
    // 숫자가 필요하면 Number(page) 또는 parseInt(page ?? '', 10) 형태로 변환합니다.
  }

  res.status(200).json([]);
}
```

지금 단계에서는 빈 배열을 응답으로 돌려주는 임시 구현이어도 괜찮습니다. 중요한 것은 `req.query.page`, `req.query.search`가 자동으로 좁혀지지 않는 값을 어떻게 직접 다루는지 파일 안에서 함께 확인하는 데 있습니다. 이후 6장에서는 이 목록 조회도 다른 메서드들과 마찬가지로 서비스 호출 구조 안으로 옮겨 갑니다.

입력 검증이 더 엄격하게 필요하다면 Zod 같은 스키마 라이브러리로 `req.query` 전체를 파싱하는 방향도 있습니다. 이 교재에서는 Zod를 깊게 다루지 않으므로 이 방향은 참고 수준으로만 언급합니다. 핵심은 `Request` 제네릭의 네 번째 인자를 채우는 방식보다, 값을 꺼내는 시점에 타입을 직접 다루는 쪽이 더 현실적이라는 점입니다.

이번 단계에서 확인해야 할 것은 새로운 기능을 늘리는 일이 아니라, 이미 동작하는 라우트 안에서 `params`, `query`, `body` 경계를 다시 선명하게 나누는 일입니다. 이 작업을 한 번 해 보면 TypeScript에서 가장 먼저 정리해야 하는 경계가 컨트롤러라는 사실이 분명해집니다. 서비스나 리포지토리보다 앞단에서 입력이 정리되어 있어야 뒤 계층의 타입도 안정적으로 이어지기 때문입니다.

결국 지금의 체크포인트는 코드 양을 늘리는 단계가 아니라, 잘못 섞여 있던 입력 경계를 바로잡는 단계입니다. 새로운 엔드포인트를 무작정 추가하기보다, 기존 라우트 하나를 골라 입력 타입을 선명하게 다시 적어 보는 쪽이 TypeScript 전환의 감각을 훨씬 빠르게 익히게 해 줍니다.

## **4-03.** #Quiz **Express 요청과 응답을 타입으로 다루기**

### 문제 1

`req.params.id`를 처음부터 `number`로 선언하지 않는 이유로 가장 적절한 것은 무엇인가?

1. Express는 URL 경로 값을 항상 문자열로 전달하기 때문이다.
2. `z.coerce.number()`가 있으면 `string`과 `number` 모두 자동으로 받을 수 있기 때문이다.
3. TypeScript의 `strict` 모드에서는 `params` 타입을 숫자로 쓸 수 없기 때문이다.
4. `number` 타입은 제네릭 첫 번째 인수로 전달할 수 없기 때문이다.
- 정답 및 해설
    
    **정답:** 1번
    
    **해설:** HTTP 경로 매개변수는 네트워크를 통해 전달되므로 항상 문자열입니다. Express가 이를 자동으로 숫자로 바꿔 주지 않습니다. 먼저 문자열이라는 사실을 인정한 뒤, 필요한 지점에서 변환해야 타입 흐름이 정확해집니다.
    

### 문제 2

`Request<Params, ResBody, ReqBody>` 제네릭에서 각 칸을 분리해서 채우는 이유로 가장 적절한 것은 무엇인가?

1. 제네릭을 쓰지 않으면 TypeScript 컴파일 자체가 실패하기 때문이다.
2. `params`, `body`, `query`의 형태와 검증 전략이 달라 각각 타입을 따로 지정해야 하기 때문이다.
3. `body`는 런타임에 자동으로 타입이 붙지만 `params`는 그렇지 않기 때문이다.
4. Express 5에서는 제네릭 없이 `req.body`에 접근하면 오류가 발생하기 때문이다.
- 정답 및 해설
    
    **정답:** 2번
    
    **해설:** `params`는 URL 경로에서 오고, `body`는 JSON 본문에서 오며, `query`는 쿼리 문자열에서 옵니다. 출처와 형태가 다르기 때문에 검증 전략도 다르고, 타입도 각 영역을 분리해 표현해야 설명이 정확해집니다.
    

### 문제 3

컨트롤러에서 입력을 먼저 정리한 뒤 서비스를 호출하는 이유로 가장 적절한 것은 무엇인가?

1. 서비스에서 `req.body`를 직접 읽으면 TypeScript 컴파일 오류가 발생하기 때문이다.
2. 뒤 계층이 HTTP 입력 형태를 계속 알지 않게 하기 위해서다.
3. 컨트롤러를 거치지 않으면 Zod 검증 미들웨어가 실행되지 않기 때문이다.
4. 서비스 레이어는 Express의 `Request` 타입을 직접 import할 수 없기 때문이다.
- 정답 및 해설
    
    **정답:** 2번
    
    해설: 컨트롤러는 HTTP 입력이 처음 들어오는 경계입니다. 문자열 `id`, 요청 본문, 쿼리 값을 이 지점에서 먼저 해석해 두면, 서비스와 리포지토리는 이미 정리된 값만 받아도 되므로 각 계층의 타입이 단순하게 유지됩니다. 서비스에서 `Request` 타입을 import하거나 `req.body`를 직접 읽는 것이 컴파일 오류는 아니지만, 그렇게 하면 서비스가 HTTP 전송 계층에 종속됩니다.
    

### 문제 4

`Response<UserResponse>` 타입이 하는 역할로 가장 적절한 것은 무엇인가?

1. 컨트롤러가 반환하는 JSON 구조를 타입으로 명시해 서비스 반환값과의 불일치를 잡아 준다.
2. `res.json()` 호출 시 자동으로 `UserResponse` 형태로 데이터를 변환해 반환한다.
3. 클라이언트가 보낸 요청 본문의 형태를 검증한다.
4. Prisma 조회 결과를 자동으로 `UserResponse` 타입으로 변환해 준다.
- 정답 및 해설
    
    **정답:** 1번
    
    **해설:** `Response&lt;UserResponse&gt;`는 컨트롤러가 어떤 모양의 JSON을 반환해야 하는지 타입으로 명시합니다. 자동 변환은 하지 않으며, 서비스가 반환한 값과 응답 타입이 어긋날 때 컴파일 시점에 오류로 드러나도록 돕습니다.
    

# 제 5장: Prisma를 TypeScript 프로젝트에 연결하기

## **5-01. Prisma와 `schema.prisma`는 TypeScript 타입의 출발점이다**

Prisma의 패키지, 스크립트, 기본 `schema.prisma`, `prisma.config.ts`는 이미 2장에서 준비했습니다. 그때는 장 끝 게이트에서 `prisma:generate`가 실제로 성공하도록 타입 생성 흐름만 먼저 잡아 두었다면, 이번 장에서는 그 파일들이 왜 TypeScript 타입 정보가 시작되는 자리인지 설명하는 데 집중합니다.

이후 장에서 DTO 타입과 Prisma 타입을 비교하려면, Prisma가 “이미 알고 있는 데이터 구조”를 바탕으로 타입 정보를 만들어 준다는 사실이 필요합니다. 따라서 이 장의 Prisma는 데이터베이스 접근 도구이면서 동시에 뒤 코드에서 참조할 타입 정보를 만들어 주는 도구로 읽어야 합니다. 아래 코드는 2장에서 먼저 만들어 둔 파일을 다시 가져와, 각 줄이 어떤 의미를 갖는지 해석하는 출발점으로 사용합니다.

`schema.prisma`에서 필드 하나를 바꾸는 일은 데이터베이스 구조만 바꾸는 것이 아니라, 리포지토리와 서비스에서 참조할 타입 정보도 함께 바꾸는 일입니다. 이번 교재에서 Prisma를 남기는 이유도 바로 이 지점 때문입니다.

이 관점에서 `schema.prisma`가 실제로 어떤 역할을 하는지 더 구체적으로 살펴보면, JavaScript와의 차이가 드러납니다. JavaScript 프로젝트에서는 모델 스키마가 주로 데이터베이스 구조 설명처럼 보입니다. TypeScript에서는 `schema.prisma`가 코드가 읽게 될 데이터 모양을 처음 정해 주는 자리이기도 합니다. 어떤 필드가 필수인지, 어떤 필드가 선택적인지, 생성 시점과 조회 시점에 어떤 값이 존재하는지 모두 여기서 출발하기 때문입니다.

이 교재에서는 가장 단순한 `User` 모델만 남깁니다. 기능을 줄이기 위한 것이 아니라, TypeScript가 입력 타입, Prisma 타입, 응답 타입을 어떻게 다르게 읽는지 한 축으로 설명하기 위한 선택입니다.

2장에서 만든 `prisma/schema.prisma`에서 타입 논의와 직접 관련된 부분은 `model User` 정의입니다.

```
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

여기서 중요한 부분은 `name` 필드의 선택성입니다. 생성 입력에서는 생략 가능하지만, 조회 응답에서는 `string | null`로 나타날 수 있기 때문입니다. 같은 필드라도 경계가 바뀌면 타입 해석이 달라진다는 사실을 이 모델 하나로 충분히 보여 줄 수 있습니다.

2장에서 만든 `prisma.config.ts`는 `env("DATABASE_URL")`로 연결 문자열을 읽고, `generator`의 `output` 경로를 `../generated/prisma`로 지정합니다. 그래서 이후 코드에서는 Prisma Client를 `#generated/prisma/client.js`로 import합니다.

## **5-02. Prisma Client를 어디에서 만들 것인가도 구조 설계의 일부다**

Prisma 설정을 이해하고 나면 Prisma Client 생성 위치도 구조 문제로 보이기 시작합니다. 필요한 파일마다 `new PrismaClient()`를 호출하는 방식도 기술적으로는 가능하지만, 이번 교재에서는 TypeScript가 데이터 접근 진입점을 어디로 보는지까지 함께 정리해야 하므로 공통 위치에서 한 번 만들고 나중에 주입 가능한 형태로 확장하는 구조를 선택합니다.

이 단계에서는 먼저 `src/db/prisma.ts`에서 `PrismaService`의 기본 형태만 만듭니다. 이렇게 해야 리포지토리는 Prisma 쿼리와 반환 타입에 집중하고, 클라이언트 생성 책임은 한곳에 모일 수 있습니다. `@injectable()`과 singleton 등록은 아직 설명하지 않고, 9장에서 DI를 실제로 도입할 때 이 파일에 다시 붙입니다.

파일: `src/db/prisma.ts`

```tsx
import { PrismaClient } from "#generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "#config";

export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: config.DATABASE_URL,
    });
    super({ adapter });
  }
}
```

여기서 adapter에 `connectionString` 설정 객체를 직접 넘기는 이유는 두 가지입니다. 첫째, 연결 정보가 어디서 들어오는지 코드 한 줄로 곧바로 드러납니다. 둘째, 현재 PostgreSQL 타입 패키지 조합에서는 `pg.Pool` 인스턴스를 직접 넘길 때 adapter 내부 타입과 프로젝트 타입이 어긋날 수 있는데, 이 방식은 그 충돌을 만들지 않습니다.

코드는 단순해 보이지만, 이 파일을 별도로 두는 이유는 9장에서 다루는 DI(의존성 주입)와 연결될 때 더 분명해집니다. 지금은 Prisma 타입이 흘러 들어오는 진입점을 한곳으로 모으는 데 집중하고, 데코레이터(`@injectable()`처럼 `@`로 시작하는 문법)와 container 등록은 나중에 객체 조립 규칙을 설명할 때 한꺼번에 붙이는 편이 흐름상 더 자연스럽습니다.

`#db` 별칭으로 `PrismaService`를 내보내려면 `src/db/index.ts`도 함께 만들어야 합니다.

파일: `src/db/index.ts`

```tsx
export * from "./prisma.js";
```

여기까지 작성하면 `src/db/prisma.ts`는 이미 `#generated/prisma/client.js`를 import하는 상태가 됩니다. 하지만 생성된 Prisma Client는 아직 만들어지지 않았으므로, 이 시점에서는 생성된 타입 파일을 한 번 먼저 만들어 두어야 합니다. 그렇지 않으면 장 끝 게이트에서 `pnpm typecheck`가 생성 코드 import를 찾지 못해 바로 멈추게 됩니다.

따라서 5장에서는 아래 명령을 한 번 먼저 실행한 뒤 다음 설명으로 넘어갑니다. 이 명령은 데이터베이스 마이그레이션을 적용하는 단계가 아니라, 현재 `schema.prisma`를 기준으로 TypeScript가 읽을 Prisma Client와 관련 타입을 생성하는 단계입니다.

```bash
pnpm prisma:generate
```

## **5-03. Prisma 타입이 자동으로 생긴다고 해서 DTO가 필요 없어지는 것은 아니다**

Prisma Client를 생성하면 `User`, `Prisma.UserCreateInput` 같은 타입을 활용할 수 있습니다. 이 사실만 보면 DTO 타입을 따로 만들 필요가 없어 보입니다. 그러나 이 지점이 바로 이번 교재가 TypeScript 중심 교재가 되어야 하는 이유이기도 합니다.

Prisma 타입은 데이터베이스 작업을 설명하는 타입이고, DTO는 HTTP 요청과 응답 경계를 설명하는 타입입니다. 비밀번호는 생성 요청에는 필요하지만 목록 조회 응답에는 나오면 안 됩니다. Prisma 타입이 자동 생성된다고 해서 HTTP 경계 타입이 자동으로 정리되는 것은 아닙니다.

생성, 수정, 조회는 같은 `User`를 다루더라도 요구하는 필드 조합이 서로 다릅니다. 생성 요청은 비밀번호와 이메일이 모두 필요하고, 수정 요청은 일부 필드만 선택적으로 받아야 하며, 목록 조회 응답은 민감한 필드를 숨겨야 합니다. DTO를 따로 두는 이유는 이 서로 다른 문맥을 한 모델 이름 안에 억지로 밀어 넣지 않기 위해서입니다.

이 차이는 타입 이름만 읽을 때보다 코드를 나란히 놓고 볼 때 더 선명해집니다. 아래 예시는 실제 파일을 그대로 옮긴 코드는 아니고, 사용자 생성 하나만 골라 요청 본문이 Prisma 저장 데이터로 바뀌고 다시 응답 데이터로 정리되는 흐름을 한곳에 모아 둔 개념 설명용 예시입니다. 같은 `User`를 다루는 것처럼 보여도, 단계마다 필요한 필드가 어떻게 달라지는지 눈으로 확인하는 데 목적이 있습니다.

```tsx
// 개념 설명용 예시
import type {
  Prisma,
  User,
} from "#generated/prisma/client.js";
import type {
  UserResponse,
  CreateUserBody,
} from "#controllers";

const createBody: CreateUserBody = {
  email: "test@example.com",
  password: "plain-password",
  name: "winverse",
};

const createData: Prisma.UserCreateInput = {
  email: createBody.email,
  password: "hashed-password",
  name: createBody.name ?? null,
};

const createdUser: User = {
  id: 1,
  email: "test@example.com",
  name: "winverse",
  password: "hashed-password",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const responseBody: UserResponse = {
  id: createdUser.id,
  email: createdUser.email,
  name: createdUser.name,
};
```

이 예시에서 `CreateUserBody`는 브라우저가 보낸 요청 본문 모양을 설명하고, `Prisma.UserCreateInput`은 데이터베이스에 저장할 `data` 객체 모양을 설명합니다. 같은 생성 흐름 안에서도 중간에서는 비밀번호가 해시된 값으로 바뀌고, Prisma가 돌려준 `User`에는 `password`, `createdAt`, `updatedAt`까지 포함됩니다. 그러나 마지막에 바깥으로 내보내는 `UserResponse`에서는 다시 민감한 필드와 내부 관리 필드를 걷어 내야 하므로, HTTP 경계 타입과 Prisma 타입을 하나로 합쳐 두면 오히려 각 단계의 역할이 흐려지게 됩니다.

## **5-04. Prisma 연결 단계에서 확인해야 할 명령 흐름**

Prisma를 프로젝트에 붙일 때는 설치 방법 자체보다 “타입 정보가 언제 새로 만들어지는가”를 아는 편이 더 중요합니다. `schema.prisma`를 수정한 뒤 클라이언트 생성과 마이그레이션이 어떤 순서로 이어지는지 알아야, 현재 보고 있는 오류가 오래된 생성 코드 때문인지 실제 비즈니스 코드 문제인지 구분할 수 있기 때문입니다.

이 스크립트들은 2장에서 `package.json`을 정리할 때 이미 넣어 두었습니다. 여기서는 목록을 다시 외우는 것이 아니라, 각 명령이 생성되는 타입 정보와 어떤 관계를 갖는지를 확인하는 것이 핵심입니다.

파일: `package.json`

```json
{
  "scripts": {
    "prisma:generate": "dotenv -e ./env/.env.development -- prisma generate",
    "prisma:migrate": "dotenv -e ./env/.env.development -- prisma migrate dev",
    "prisma:studio": "dotenv -e ./env/.env.development -- prisma studio"
  }
}
```

이 흐름을 익혀 두면 모델이 바뀌었을 때 무엇을 다시 생성해야 하는지, 타입이 왜 아직 옛 구조를 바라보는지 같은 문제를 훨씬 빠르게 추적할 수 있습니다. 즉, 이 장의 명령 정리는 Prisma 사용법 복습이라기보다 TypeScript 타입 정보를 다시 만들어 주는 절차를 정리하는 단계에 가깝습니다.

여기서 한 가지를 더 구분해야 합니다. `pnpm prisma:generate`는 Prisma Client와 관련 타입을 갱신하는 명령이고, 실제 개발 데이터베이스에 `User` 테이블을 만드는 일까지 대신하지는 않습니다. 따라서 5장에서 처음 정의한 모델을 이후 `GET /api/users` 같은 실제 조회 흐름에서 사용하려면, 개발용 마이그레이션도 한 번 적용해 두어야 합니다.

이 교재의 `package.json`에는 이미 `prisma:migrate` 스크립트가 들어 있으므로, 여기서는 긴 Prisma CLI 명령을 다시 적지 않고 스크립트를 그대로 실행합니다. 다만 이 스크립트는 내부적으로 `prisma migrate dev`를 호출하므로, 첫 실행에서는 마이그레이션 이름을 프롬프트에 직접 입력하는 흐름으로 이해하는 편이 더 자연스럽습니다.

```bash
pnpm prisma:migrate
```

명령을 실행하면 아래처럼 새 마이그레이션 이름을 묻는 프롬프트가 나타납니다. 이때 `init`을 입력하고 Enter를 누릅니다.

```
? Enter a name for the new migration: › init
```

이 단계까지 끝나야 생성된 Prisma Client가 바라보는 스키마와 실제 개발 데이터베이스 테이블 상태가 같은 기준으로 맞춰집니다. 타입 생성과 데이터베이스 반영을 서로 다른 단계로 분리해서 이해해야, 이후 CRUD 검증에서 어떤 명령이 빠졌는지 더 정확하게 추적할 수 있습니다.

# 제 6장: Users CRUD를 타입 안전하게 구현하기

## **6-01. DTO는 HTTP 경계를 설명하는 타입이다**

설정과 기반 구조를 만든 뒤에도 TypeScript 전환이 어떤 의미를 갖는지는 기능 하나를 끝까지 구현해 봐야 분명해집니다. 이 교재에서는 그 중심 역할을 `users` CRUD가 맡습니다. 입력, 조회, 수정, 삭제가 각각 다른 타입 문제를 드러내기 때문입니다.

생성에서는 요청 본문 DTO가 중요하고, 조회와 삭제에서는 `params.id` 변환 지점이 중요합니다. 수정에서는 부분 업데이트 타입과 기존 사용자 존재 여부가 함께 등장합니다. `users` CRUD 하나만 제대로 구현해도 이 교재의 핵심 질문 대부분을 실제 코드로 확인할 수 있습니다.

CRUD 구현을 시작하면 가장 먼저 HTTP 경계를 고정해야 합니다. DTO를 단순히 “컨트롤러 옆에 두는 타입 파일” 정도로 보면 왜 필요한지 설명이 약해집니다. DTO는 요청과 응답이 어떤 모양으로 드나드는지 선언하는 기준이므로, 컨트롤러보다 먼저 준비하는 편이 자연스럽습니다.

먼저 공용 경로 파라미터 스키마와 users DTO를 완성합니다. 4장에서는 `IdParams`를 순수 타입 예시로 다뤘지만, 이제 실제로 실행되는 Zod 검증 규칙이 생기므로 공용 스키마는 `src/common/schemas` 아래로 모으는 편이 더 자연스럽습니다. 스키마와 그 스키마에서 추론한 타입은 같은 파일에 둡니다. 여러 파일로 나눠야 할 이유가 없고, 함께 두는 편이 패턴이 일관됩니다.

파일: `src/common/schemas/request.schema.ts`

```tsx
import { z } from "zod";

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive({
    message: "ID는 양수여야 합니다.",
  }),
});

export type IdParams = z.infer<typeof idParamSchema>;
```

파일: `src/controllers/user/dto/user.dto.ts`

```tsx
import { z } from "zod";

export type UserResponse = {
  id: number;
  email: string;
  name: string | null;
};

export const createUserSchema = z.object({
  email: z.email("유효한 이메일 형식이 아닙니다."),
  password: z
    .string({ error: "비밀번호는 필수입니다." })
    .min(6, "비밀번호는 6자 이상이어야 합니다."),
  name: z
    .string()
    .min(2, "이름은 2자 이상이어야 합니다.")
    .optional(),
});

export const updateUserSchema = z.object({
  email: z
    .email("유효한 이메일 형식이 아닙니다.")
    .optional(),
  name: z
    .string()
    .min(2, "이름은 2자 이상이어야 합니다.")
    .optional(),
});

export type CreateUserInput = z.infer<
  typeof createUserSchema
>;
export type UpdateUserInput = z.infer<
  typeof updateUserSchema
>;
```

`UserResponse`는 HTTP 응답 본문의 구조를 정의하는 타입으로, 요청 스키마와 같은 DTO 파일에 둡니다. 요청과 응답 모두 HTTP 경계를 설명하는 컨트롤러 레이어의 관심사이기 때문입니다. 서비스와 리포지토리도 이 타입을 `#controllers`에서 가져와 반환 타입으로 씁니다. `password` 같은 민감한 필드는 Prisma `select`로 걸러지지만, 반환 형태를 명시적으로 고정해 두면 나중에 필드가 추가되거나 바뀔 때 타입 불일치를 바로 확인할 수 있습니다.

경로 파라미터처럼 여러 컨트롤러에서 함께 쓰는 스키마는 `common/schemas/request.schema.ts`에 두고, users 기능에만 묶인 스키마와 응답 타입은 DTO 파일 안에서 함께 관리합니다. 이렇게 나누면 공용 규칙은 공통 위치에 모으고, 기능별 HTTP 계약은 DTO 파일 하나에서 한 번에 읽을 수 있습니다.

4장에서는 `src/common/schemas/request.schema.ts`, `src/common/schemas/index.ts`, `src/common/index.ts`, `src/controllers/user/index.ts`, `src/controllers/index.ts` 같은 최소 진입점을 먼저 열어 두었습니다. 따라서 이 장에서는 그 흐름을 유지하되, 공용 요청 규칙이 런타임 스키마로 바뀌는 시점에 `request.schema.ts` 내용을 Zod 기반으로 교체하고 `#common` 진입점이 그대로 유지되도록 확장합니다. 실제 `UserController` 클래스와 루트 `Controller`는 뒤 절에서 같은 파일들에 이어 붙여 최종 형태로 확장합니다.

## **6-02. 서비스에 들어가기 전에 공통 예외 처리와 비밀번호 해싱 제공자부터 준비한다**

서비스 계층을 TypeScript로 옮길 때 가장 흔한 실수는 “타입을 많이 적는 곳”이라고만 이해하는 것입니다. 그러나 서비스는 타입 주석을 달기 위한 공간이 아닙니다. 중복 이메일이 있으면 어떤 예외를 던질지, 비밀번호를 저장하기 전에 어떻게 변환할지 같은 비즈니스 규칙을 결정하고 집행하는 곳입니다.

이 때문에 서비스 코드를 보기 전에 공통 응답 타입과 예외 클래스부터 준비해 두는 편이 더 자연스럽습니다. 그래야 `ConflictException`, `ERROR_MESSAGE`, `HTTP_STATUS` 같은 이름이 서비스와 컨트롤러 코드에 등장했을 때, 이런 이름들이 어디서 온 규칙인지 다시 뒤로 돌아가지 않아도 됩니다.

`#common` 진입점은 앞 절에서 이미 열어 두었으므로, 여기서는 내용을 Zod 스키마 기반으로 교체하고 상태 코드 상수와 공통 예외를 추가합니다. 그래야 서비스와 컨트롤러가 같은 `#common` 경로에서 규칙을 읽을 수 있습니다. 아직 전역 에러 핸들러는 뒤쪽 장에서 자세히 다루겠지만, 서비스와 미들웨어가 어떤 예외 이름을 사용할지는 이 단계에서 먼저 고정해 두어야 이후 코드가 한 방향으로 읽힙니다.

파일: `src/common/constants/index.ts`

```tsx
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGE = {
  VALIDATION_FAILED: "입력값 검증에 실패했습니다.",
  RESOURCE_NOT_FOUND: "리소스를 찾을 수 없습니다.",
  USER_EMAIL_ALREADY_EXISTS: "이미 사용 중인 이메일입니다.",
  INTERNAL_SERVER_ERROR: "서버 내부 오류가 발생했습니다.",
} as const;
```

파일: `src/common/exceptions/http.exception.ts`

```tsx
export class HttpException extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string, details?: unknown) {
    super(400, message, details);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string, details?: unknown) {
    super(404, message, details);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string, details?: unknown) {
    super(409, message, details);
  }
}
```

파일: `src/common/exceptions/index.ts`

```tsx
export * from "./http.exception.js";
```

파일: `src/common/index.ts`

```tsx
export * from "./constants/index.js";
export * from "./exceptions/index.js";
export * from "./schemas/index.js";
```

한 가지 더 짚을 점이 있습니다. 인증 전체 흐름은 이 교재의 범위 밖이지만, 사용자 생성 시 비밀번호를 평문으로 저장해도 된다는 뜻은 아닙니다. 이번 장에서는 “서비스 계층에서 해시를 만든 뒤 리포지토리에 넘긴다”는 최소 규칙만 유지합니다. 인증 챕터를 열지 않아도 서비스 책임이 어디까지인지 설명할 수 있게 됩니다.

따라서 비밀번호 해시 라이브러리인 `bcrypt` 호출도 서비스 본문에 직접 섞지 않고, 비밀번호 관련 연산만 담당하는 별도 클래스(Provider)로 먼저 분리해 둡니다. 아직 DI를 설명하지 않았으므로 여기서는 순수 클래스 형태만 먼저 만들고, `@injectable()`은 9장에서 객체 조립을 설명할 때 한꺼번에 붙입니다.

파일: `src/providers/password.provider.ts`

```tsx
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export class PasswordProvider {
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  compare(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
```

파일: `src/providers/index.ts`

```tsx
export * from "./password.provider.js";
```

`compare` 메서드를 미리 두는 이유는 인증 기능을 추가할 때 bcrypt를 직접 호출하는 일을 방지하기 위해서입니다. 비밀번호 관련 연산을 이 클래스 하나에서 담당하도록 추상화를 미리 완성해 두면, 서비스는 “어떤 값을 저장 가능한 형태로 바꿀 것인가”에 집중할 수 있습니다.

## **6-03. 리포지토리는 Prisma와 가장 가까운 계층이므로 숫자 변환은 앞 계층에서 완료한다**

컨트롤러에서 받은 `id`가 문자열이라는 사실을 알고 있으면, 어느 지점에서 숫자로 바꿔야 하는지도 함께 결정해야 합니다. 이때 리포지토리에 문자열을 넘겨 `Number(id)`를 계속 호출하게 만들 수도 있지만, 그렇게 하면 Prisma와 가장 가까운 계층이 HTTP 입력 형태를 함께 떠안게 됩니다.

그래서 이 교재에서는 컨트롤러 또는 검증 단계에서 이미 숫자 형태를 확보하고, 리포지토리는 숫자 `id`를 받는다고 가정합니다. 이렇게 해야 리포지토리가 Prisma 쿼리와 필드 선택, 반환 타입 모양에만 집중할 수 있고, TypeScript 기준으로도 “리포지토리 계층에 들어오는 값은 이미 정리된 값”이라는 전제가 유지됩니다.

이제 리포지토리를 구현할 차례입니다. 4장에서 미리 열어 둔 DTO 진입점 파일이 실제로 필요해지는 시점이기도 합니다. 리포지토리가 `CreateUserInput`, `UpdateUserInput`을 `#controllers` 경로로 읽어야 하기 때문입니다. 아직 실제 컨트롤러 클래스는 필요하지 않습니다. 지금 필요한 것은 DTO 타입 export 경로뿐입니다.

파일: `src/repositories/user.repository.ts`

```tsx
import type {
  CreateUserInput,
  UpdateUserInput,
  UserResponse,
} from "#controllers";
import { PrismaService } from "#db";

export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  findById(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  findByEmail(
    email: string,
  ): Promise<{ id: number } | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
  }

  create(data: CreateUserInput) {
    return this.prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  update(
    id: number,
    data: UpdateUserInput,
  ): Promise<UserResponse> {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
```

이 코드에서 리포지토리가 Prisma `select` 필드를 직접 지정하는 이유는 서비스에 넘길 데이터 범위를 쿼리 단계에서 제한하기 위해서입니다. 예를 들어 이메일 중복 확인은 같은 사용자인지만 판단하면 되므로 `findByEmail()`은 `id`만 조회합니다.

또한 수정과 삭제처럼 Prisma가 `P2025` 예외를 던질 수 있는 작업도 이 계층에서 따로 변환하지 않습니다. 리포지토리가 맡는 일은 쿼리와 반환 모양을 정리하는 것이고, 저장소 예외를 HTTP 의미로 바꾸는 책임은 전역 에러 핸들러에 남겨 둡니다. 그래야 모든 리포지토리에서 같은 `try/catch`를 반복하지 않아도 되고, 서비스도 Prisma 고유 예외 코드나 에러 처리를 위한 추가 반환값에 의존하지 않게 됩니다.

파일: `src/repositories/index.ts`

```tsx
export * from "./user.repository.js";
```

## **6-04. validation 미들웨어와 BaseController를 먼저 두면 컨트롤러 역할이 선명해진다**

이제 실제 컨트롤러를 만들기 전에 컨트롤러가 의존하는 공통 기반을 먼저 정리합니다. 컨트롤러가 해야 할 일은 HTTP 입력을 받고 서비스 호출 결과를 응답으로 보내는 것에 집중하는 편이 좋지만, 이 원칙이 자연스럽게 유지되려면 검증과 라우터 초기화 책임이 먼저 바깥으로 빠져 있어야 합니다.

첫 번째 준비물은 validation 미들웨어입니다. `req.body`, `req.params`, `req.query`를 각 라우트마다 수동으로 파싱하기 시작하면, 컨트롤러 메서드는 금방 검증 코드와 서비스 호출 코드가 뒤섞이게 됩니다. 따라서 Zod 검증 결과를 `req` 객체에 반영하는 공통 미들웨어를 먼저 둡니다.

파일: `src/middlewares/validation.middleware.ts`

```tsx
import type { Request, RequestHandler } from "express";
import { flattenError, type ZodType } from "zod";
import {
  BadRequestException,
  ERROR_MESSAGE,
} from "#common";

type ValidationTarget = "body" | "params" | "query";

export function validate(
  target: ValidationTarget,
  schema: ZodType,
): RequestHandler {
  return (req, _res, next) => {
    try {
      const result = schema.safeParse(req[target]);

      if (!result.success) {
        const { fieldErrors } = flattenError(result.error);
        throw new BadRequestException(
          ERROR_MESSAGE.VALIDATION_FAILED,
          fieldErrors,
        );
      }

      Object.assign(
        req[target] as Request[ValidationTarget],
        result.data,
      );
      next();
    } catch (error) {
      next(error);
    }
  };
}
```

파일: `src/middlewares/index.ts`

```tsx
export * from "./validation.middleware.js";
```

검증 미들웨어가 먼저 값을 정리해 두면, 컨트롤러는 `schema.parse()`를 반복하지 않아도 됩니다. 검증 실패 시에는 `BadRequestException`이 올라가고, 성공 시에는 변환된 값이 `req` 객체에 반영되므로 컨트롤러는 서비스 호출 직전의 연결 역할에 집중할 수 있습니다.

두 번째 준비물은 `BaseController`입니다. 각 컨트롤러가 매번 `Router()` 생성과 공통 필드 선언을 반복하기 시작하면, 라우트 정의와 공통 초기화 코드가 섞여 읽히게 됩니다. 이 교재에서는 기반 클래스를 먼저 두어, 실제 기능 컨트롤러가 어떤 공통 전제를 상속받는지부터 보여 줍니다.

여기서 처음 만나는 문법이 `abstract`입니다. `abstract`는 “공통 뼈대는 여기서 제공하지만, 세부 동작은 하위 클래스가 반드시 채워 넣어야 한다”는 뜻으로 이해하면 됩니다. 즉, `BaseController`는 모든 컨트롤러가 `router`를 가진다는 사실은 고정하지만, 어떤 라우트를 등록할지는 각 컨트롤러가 직접 결정하게 만듭니다.

파일: `src/controllers/base.controller.ts`

```tsx
import { Router } from "express";

export abstract class BaseController {
  public readonly router: Router;

  constructor() {
    this.router = Router();
  }

  public abstract routes(): Router;
}
```

| 선언 | 뜻 | `BaseController`에서 하는 일 |
| --- | --- | --- |
| `abstract class BaseController` | 직접 객체를 만드는 완성형 클래스가 아니라, 상속용 기반 클래스를 뜻합니다. | 모든 컨트롤러가 `router`를 중복 선언하지 않도록 초기화 로직을 한 곳에서 상속받게 합니다. |
| `public abstract routes(): Router;` | 메서드 이름과 반환 타입만 약속하고, 실제 구현은 하위 클래스에 맡긴다는 뜻입니다. | 각 컨트롤러가 자기 라우트 등록 로직을 반드시 직접 작성하게 강제합니다. |

`abstract class`는 완성된 클래스와 미완성 클래스 사이의 중간 단계라고 보면 됩니다. 생성자와 필드처럼 모든 컨트롤러에 공통으로 필요한 부분은 이 안에 직접 구현할 수 있지만, `routes()`처럼 컨트롤러마다 달라질 수밖에 없는 부분은 구현을 비워 둔 채 약속만 선언합니다. 그래서 `new BaseController()`처럼 이 클래스를 직접 만들어 쓰는 것은 허용되지 않습니다.

반대로 `BaseController`를 상속받는 하위 클래스는 `routes()`를 반드시 구현해야 합니다. TypeScript는 `abstract routes(): Router`를 선언해 둔 상태에서 하위 클래스가 이 메서드를 빠뜨리면 컴파일 단계에서 오류를 내므로, “라우터는 있어야 하고 라우트 등록 메서드도 반드시 제공해야 한다”는 규칙이 코드 수준에서 고정됩니다.

중요한 점은 `abstract`가 “나중에 구현해도 되는 선택 사항”이 아니라 “상속받는 쪽이 반드시 채워야 하는 빈칸”이라는 점입니다. 이 빈칸 덕분에 공통 초기화 코드는 `BaseController`에 모으고, 실제 HTTP 경로 등록 코드는 각 기능 컨트롤러 안에 남겨 둘 수 있습니다.

여기까지 오면 컨트롤러가 기대는 공통 기반이 모두 준비됩니다. 아직 실제 `UserController`는 없지만, 이제부터는 라우트 코드만 읽어도 “검증은 어디서 했는가”, “공통 Router는 어디서 왔는가”를 다시 거슬러 올라가지 않아도 됩니다.

## **6-05. 서비스는 타입을 많이 적는 곳이 아니라 규칙을 모으는 곳이다**

리포지토리와 비밀번호 제공자, 공통 예외가 준비되면 그다음에야 서비스가 왜 “타입을 많이 적는 곳”이 아니라 “규칙을 명확히 두는 곳”인지가 명확해집니다. 중복 이메일 판단, 비밀번호 해시 적용, 조회 응답 타입 반환은 모두 서비스가 DTO와 리포지토리 사이에서 어떤 규칙을 적용할지 정하는 일입니다.

앞의 절들에서 필요한 import 경로도 모두 준비되었습니다. DTO는 `#controllers`의 임시 진입점에서 읽을 수 있고, 리포지토리와 provider도 각자의 `index.ts`를 통해 공개되어 있으므로 이제 서비스 코드를 본문 순서대로 바로 작성할 수 있습니다.

파일: `src/services/user.service.ts`

```tsx
import { ConflictException, ERROR_MESSAGE } from "#common";
import type {
  CreateUserInput,
  UpdateUserInput,
  UserResponse,
} from "#controllers";
import { PasswordProvider } from "#providers";
import { UserRepository } from "#repositories";

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordProvider: PasswordProvider,
  ) {}

  async listUsers(): Promise<UserResponse[]> {
    return this.userRepository.findAll();
  }

  async getUserDetail(id: number): Promise<UserResponse> {
    return this.userRepository.findById(id);
  }

  async registerUser(
    input: CreateUserInput,
  ): Promise<UserResponse> {
    const existingUser =
      await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictException(
        ERROR_MESSAGE.USER_EMAIL_ALREADY_EXISTS,
      );
    }

    const hashedPassword = await this.passwordProvider.hash(
      input.password,
    );

    return this.userRepository.create({
      ...input,
      password: hashedPassword,
    });
  }

  async changeProfile(
    id: number,
    input: UpdateUserInput,
  ): Promise<UserResponse> {
    const duplicateUser = input.email
      ? await this.userRepository.findByEmail(input.email)
      : null;

    if (duplicateUser && duplicateUser.id !== id) {
      throw new ConflictException(
        ERROR_MESSAGE.USER_EMAIL_ALREADY_EXISTS,
      );
    }

    return this.userRepository.update(id, input);
  }

  async deleteAccount(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
```

서비스는 중복 이메일 확인 같은 비즈니스 규칙만 직접 판단하고, Prisma 예외는 전역 에러 핸들러로 전파합니다. `findById()`, `update()`, `delete()`에서 대상 레코드가 없을 때 발생하는 P2025 예외도 서비스가 따로 잡지 않습니다. 생성과 수정 입력 타입을 `#controllers` 진입점에서 가져오므로, 서비스는 컨트롤러 계층이 공개한 DTO 정의를 따라가면서도 세부 파일 경로에는 의존하지 않습니다.

파일: `src/services/index.ts`

```tsx
export * from "./user.service.js";
```

## **6-06. 컨트롤러는 입력을 받고 서비스로 넘기는 자리에서 타입 경계를 가장 먼저 드러낸다**

이제 DTO, 검증 미들웨어, `BaseController`, 서비스, 리포지토리가 모두 준비되었습니다. 이 상태에서 컨트롤러를 보면 “얇게 유지한다”는 말이 실제로 무엇을 뜻하는지 더 분명하게 읽을 수 있습니다. 단순히 코드 줄 수가 적다는 뜻이 아니라, HTTP 입력을 받고 서비스 호출로 넘기는 역할에만 집중한다는 뜻입니다.

먼저 실제 `UserController`를 작성합니다. 4장에서는 같은 파일을 함수형으로 열어 두고 `Request` 제네릭과 응답 타입 추천을 먼저 확인했습니다. 여기서는 그때 다뤘던 입력·응답 타입 경계를 버리는 것이 아니라, 같은 기능을 `BaseController`, 검증 미들웨어, 서비스 호출 흐름 안으로 옮겨 담는 리팩터링을 수행합니다.

검증은 미들웨어가 담당하고, 공통 Router 초기화는 `BaseController`가 담당하므로, 컨트롤러 메서드는 입력을 읽어 서비스에 넘기고 응답을 직렬화하는 역할에 머물게 됩니다. 따라서 6장의 핵심은 새로운 기능을 추가하는 데 있지 않고, 4장에서 체감한 타입 경계를 애플리케이션 구조 전체와 맞물리게 재배치하는 데 있습니다.

파일: `src/controllers/user/user.controller.ts`

```tsx
import {
  type Router,
  type Request,
  type Response,
} from "express";
import { HTTP_STATUS, idParamSchema } from "#common";
import { validate } from "#middlewares";
import { UserService } from "#services";
import { BaseController } from "../base.controller.js";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserInput,
  type UpdateUserInput,
  type UserResponse,
} from "./dto/user.dto.js";

export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  public routes(): Router {
    this.router.get("/", (req, res) =>
      this.getUsers(req, res),
    );
    this.router.get(
      "/:id",
      validate("params", idParamSchema),
      (req, res) => this.getUser(req, res),
    );
    this.router.post(
      "/",
      validate("body", createUserSchema),
      (req, res) => this.createUser(req, res),
    );
    this.router.patch(
      "/:id",
      validate("params", idParamSchema),
      validate("body", updateUserSchema),
      (req, res) => this.updateUser(req, res),
    );
    this.router.delete(
      "/:id",
      validate("params", idParamSchema),
      (req, res) => this.deleteUser(req, res),
    );
    return this.router;
  }

  private async getUsers(
    _req: Request,
    res: Response<UserResponse[]>,
  ) {
    const users = await this.userService.listUsers();
    res.status(HTTP_STATUS.OK).json(users);
  }

  private async getUser(
    req: Request,
    res: Response<UserResponse>,
  ) {
    const userId = Number(req.params.id);
    const user =
      await this.userService.getUserDetail(userId);
    res.status(HTTP_STATUS.OK).json(user);
  }

  private async createUser(
    req: Request,
    res: Response<UserResponse>,
  ) {
    const body = req.body as CreateUserInput;
    const user = await this.userService.registerUser(body);
    res.status(HTTP_STATUS.CREATED).json(user);
  }

  private async updateUser(
    req: Request,
    res: Response<UserResponse>,
  ) {
    const userId = Number(req.params.id);
    const body = req.body as UpdateUserInput;
    const user = await this.userService.changeProfile(
      userId,
      body,
    );
    res.status(HTTP_STATUS.OK).json(user);
  }

  private async deleteUser(req: Request, res: Response) {
    const userId = Number(req.params.id);
    await this.userService.deleteAccount(userId);
    res.sendStatus(HTTP_STATUS.NO_CONTENT);
  }
}
```

이 컨트롤러는 기능 수가 많아 보이지만, 실제로는 입력을 읽고 서비스 호출 결과를 응답으로 보내는 역할에만 집중합니다. 메서드 이름이 HTTP 행위를 표현하므로 리포지토리 메서드(findAll, create 등)와도 자연스럽게 구분됩니다.

여기서 `Number(req.params.id)`가 남아 있는 이유도 함께 정리해야 합니다. validation 미들웨어가 런타임에 값을 검증했더라도, TypeScript의 타입 체커는 그 미들웨어가 실행됐다는 사실을 알지 못합니다. Express의 `Request` 타입은 미들웨어 실행만으로 자동으로 좁혀지지 않기 때문입니다. 따라서 컨트롤러에서는 `userId`라는 지역 변수로 “이 값은 숫자”임을 타입 체커에게 명시적으로 알려야 합니다.

이제 4장에서 먼저 만들어 두었던 진입점 파일에 필요한 export를 채웁니다. `user` 폴더의 `index.ts`는 DTO와 컨트롤러를 함께 내보내고, 루트 `controllers/index.ts`는 최상위 `Controller`까지 포함해 라우트 연결에 필요한 공개 경로를 정리합니다. 다시 새 파일을 만드는 단계가 아니라, 앞에서 열어 둔 파일에 실제 구조에 맞는 내용을 이어 붙이는 단계라고 보면 됩니다.

파일: `src/controllers/user/index.ts`

```tsx
export * from "./user.controller.js";
export * from "./dto/user.dto.js";
```

파일: `src/controllers/index.ts`

```tsx
import {
  type Request,
  type Response,
  type Router,
} from "express";
import { HTTP_STATUS } from "#common";
import { BaseController } from "./base.controller.js";
import { UserController } from "./user/index.js";

export * from "./base.controller.js";
export * from "./user/index.js";

export class Controller extends BaseController {
  constructor(
    private readonly userController: UserController,
  ) {
    super();
  }

  public routes(): Router {
    this.router.use("/users", this.userController.routes());
    this.router.get("/ping", (req, res) =>
      this.ping(req, res),
    );

    return this.router;
  }

  private ping(_req: Request, res: Response) {
    res.status(HTTP_STATUS.OK).json({ message: "ok" });
  }
}
```

이제 `#controllers` 경로는 DTO 타입 export와 실제 라우팅 조립을 모두 담당하는 최종 진입점이 됩니다. 앞 절에서는 타입 import를 위해 최소 형태만 두었고, 여기서 컨트롤러와 루트 라우터를 추가해 애플리케이션이 기대하는 최종 구조를 완성한 셈입니다.

## **6-07.** #Quiz **Users CRUD를 타입 안전하게 구현하기**

### 문제 1

`idParamSchema`에서 `z.coerce.number()`를 사용하는 이유로 가장 적절한 것은 무엇인가?

1. Zod는 숫자 타입 검증만 지원하기 때문이다.
2. URL 경로 파라미터는 항상 문자열로 들어오므로, 숫자로 변환하면서 동시에 검증하기 위해서다.
3. TypeScript가 `string`과 `number`를 런타임에 자동으로 구별하지 못하기 때문이다.
4. Express의 `params` 객체는 TypeScript 타입 선언이 없기 때문이다.
- 정답 및 해설
    
    **정답:** 2번
    
    **해설:** `req.params.id`는 HTTP 경로에서 오므로 항상 문자열입니다. `z.coerce.number()`는 이 문자열을 숫자로 강제 변환하면서, 변환이 불가능한 값(예: `"abc"`)이 들어오면 검증 오류를 내보냅니다. 변환과 검증을 한 번에 처리합니다.
    

### 문제 2

DTO를 컨트롤러보다 먼저 만드는 이유로 가장 적절한 것은 무엇인가?

1. HTTP 요청과 응답 경계를 어떤 타입으로 설명할지 먼저 고정하기 위해서다.
2. Zod 스키마는 DTO 파일이 있어야 import할 수 있기 때문이다.
3. 리포지토리의 반환값이 DTO 형태여야 컨트롤러가 받을 수 있기 때문이다.
4. TypeScript는 클래스 선언 이전에 타입 파일이 있어야 컴파일이 가능하기 때문이다.
- 정답 및 해설
    
    **정답:** 1번
    
    **해설:** DTO는 HTTP 경계에서 드나드는 데이터의 모양을 선언합니다. 먼저 이 경계를 고정해야 컨트롤러와 검증 미들웨어가 같은 형태를 기준으로 동작할 수 있습니다.
    

### 문제 3

서비스를 “Prisma 타입을 그대로 전달하는 통로”가 아니라 “규칙을 가진 계층”으로 보는 이유로 가장 적절한 것은 무엇인가?

1. 서비스 레이어가 없으면 컨트롤러에서 Prisma를 직접 호출해야 하기 때문이다.
2. 서비스는 Prisma 타입을 그대로 다음 계층에 전달하는 통로이기 때문이다.
3. 서비스는 입력 타입을 비즈니스 규칙으로 해석하고, 어떤 값이 다음 계층으로 넘어갈지 결정하는 자리이기 때문이다.
4. 서비스가 없으면 `@injectable()` 데코레이터를 쓸 수 없기 때문이다.
- 정답 및 해설
    
    **정답:** 3번
    
    **해설:** 서비스는 DTO와 Prisma 타입 사이를 기계적으로 복사하는 계층이 아닙니다. 어떤 값이 필수인지, 어떤 예외를 던질지, 어떤 변환이 끝난 값인지를 규칙으로 결정합니다. 그 결과로 리포지토리는 이미 정제된 값만 받아도 됩니다.
    

### 문제 4

리포지토리 메서드가 문자열 `id`가 아닌 숫자 `id`를 받도록 하는 이유로 가장 적절한 것은 무엇인가?

1. 리포지토리가 HTTP 입력 형태를 알면 계층 책임이 섞이기 때문이다.
2. Prisma의 `findUnique`는 `where` 조건을 아예 지원하지 않기 때문이다.
3. 문자열 `id`는 Zod 스키마를 통과하지 못하기 때문이다.
4. Express 라우터는 `params.id`를 숫자로 자동 변환해 주기 때문이다.
- 정답 및 해설
    
    **정답:** 1번
    
    **해설:** 문자열 `id`는 HTTP 계층의 특성입니다. 리포지토리가 이를 알게 되면 데이터 접근 계층이 전송 계층의 형식에 의존하게 됩니다. 문자열을 숫자로 변환하는 책임은 HTTP 경계에 가장 가까운 컨트롤러 또는 검증 단계에서 끝내야 계층 책임이 선명해집니다.
    

# 제 7장: TypeScript에서 자주 만나는 서버 코드 문제

## **7-01. 타입을 붙였다고 해서 서버 코드가 자동으로 안전해지는 것은 아니다**

TypeScript를 도입하면 많은 문제가 빨리 드러나는 것은 사실입니다. 그러나 이것이 곧 서버 코드가 자동으로 안전해진다는 뜻은 아닙니다. 실제로 자주 만나는 문제는 따로 있습니다. 특히 환경 변수, `unknown` 에러, 문자열 `id`와 숫자 `id` 변환 문제는 TypeScript를 도입한 직후 가장 많이 부딪히는 대표 사례입니다.

이 장의 목적은 새로운 기능을 추가하는 데 있지 않습니다. 오히려 이미 만들고 있는 코드가 “왜 아직도 불편한가”를 설명하고, 그 불편을 줄이는 기준을 정리하는 데 있습니다.

TypeScript는 모든 문제를 대신 해결하는 도구가 아니라 문제를 더 앞에서 드러내는 도구에 가깝습니다. 어떤 값이 문자열인지, 어떤 에러가 좁혀지지 않았는지, 어떤 입력이 아직 런타임 검증을 거치지 않았는지를 더 빨리 보여 줄 뿐입니다. 이 장에서는 그 “드러난 불편”을 어떻게 읽고 정리할지를 다룹니다.

## **7-02. 환경 변수 정리 기준은 앞 장과 같다**

이 장에서도 환경 변수 처리 방식은 새로 설명할 필요가 없습니다. 앞에서 만든 `config.ts`가 이미 문자열 환경 변수를 필요한 형태로 정리해 두었으므로, 이후 코드는 `process.env`를 다시 읽지 않고 `config`만 사용한다는 기준만 유지하면 됩니다.

중요한 점은 에러 핸들러나 서버 시작 코드처럼 뒤쪽으로 갈수록 실행 경로가 길어지는 부분일수록, 설정 값을 읽는 방식이 흔들리지 않아야 한다는 사실입니다. 따라서 7장에서도 환경 변수 자체를 다시 다루기보다, 앞 장에서 정한 설정 진입점을 그대로 재사용한다는 점만 확인하고 넘어가면 충분합니다.

## **7-03. `unknown` 에러는 귀찮은 제한이 아니라 안전한 출발점이다**

예외 처리에서도 비슷한 상황이 등장합니다. `throw`로 던져지는 값은 런타임에서 결정되기 때문에 TypeScript가 컴파일 시점에 그 타입을 확정할 수 없고, 그래서 타입을 지정해도 실제로 무엇이 던져질지 보장되지 않습니다.

예외 처리 단계로 넘어오면 `err`를 그냥 `Error`로 선언하는 것이 간단해 보입니다. 그러나 서버 예외야말로 컴파일러가 끝까지 알 수 없는 입력입니다. 런타임에서 던져지는 값이 항상 `Error` 인스턴스라는 보장이 없기 때문입니다. 따라서 `err`의 타입은 `unknown`에서 시작해야 합니다.

서버 코드에서는 문자열, 객체, Prisma 에러, 커스텀 예외가 모두 throw될 수 있습니다. 처음부터 `err.message`를 읽기 시작하면 실제 런타임 값과 타입 선언이 어긋날 수 있습니다. `unknown`은 이 값을 먼저 좁혀서 확인하라는 안전한 출발점입니다.

이 출발점을 받아들이면 에러 처리 코드의 구조도 달라집니다. 먼저 값의 정체를 확인하고, 그다음 공통 예외인지 일반 `Error`인지 분기한 뒤, 마지막에 예상하지 못한 값에 대한 기본 응답을 두는 흐름이 잡힙니다.

## **7-04. `instanceof`는 에러 분기 기준으로 쓰인다**

`unknown` 타입으로 받은 에러는 컴파일 시점에 어떤 클래스 인스턴스인지 알 수 없습니다. `instanceof`는 런타임에서 이 값을 직접 확인해 타입을 좁혀 주는 연산자입니다. 에러 분기에서 `instanceof`가 필요한 이유도 바로 이 `unknown` 좁히기 흐름과 같습니다.

이 교재에서 `instanceof`를 다루는 이유는 문법을 소개하기 위해서가 아닙니다. 실제 서버 코드에서 어떤 에러가 들어왔는지 분기하고, 상태 코드와 메시지를 다르게 내보내기 위해 필요하기 때문입니다. 특히 `HttpException`과 Prisma 에러, 일반 `Error`를 구분할 때 이 흐름이 자주 쓰이며, 이 과정 자체가 TypeScript의 런타임 좁히기 예제가 됩니다.

앞 장에서 공통 상수와 `HttpException` 계층을 먼저 만든 이유도 바로 이 분기 규칙을 위한 준비였습니다. 에러 핸들러는 새로운 규칙을 만드는 곳이 아니라, 이미 정해 둔 예외 규칙과 Prisma 리포지토리 오류를 한곳에서 HTTP 응답으로 바꾸는 자리입니다.

| 들어온 값 | 분기 기준 | 반환하는 응답 의미 |
| --- | --- | --- |
| `HttpException` | `err instanceof HttpException` | 이미 애플리케이션 규칙으로 정리된 상태 코드와 메시지 |
| Prisma 예외 | `err instanceof Prisma.PrismaClientKnownRequestError` | 리포지토리 오류를 프로젝트 공통 메시지로 변환한 응답 |
| 일반 `Error` | `err instanceof Error` | 내부 로그를 남기고 공통 500 응답 |
| 그 외 값 | 기본 분기 | 예상하지 못한 값도 안전하게 500 응답 |

다음 미들웨어는 `unknown` 에러를 받고, 좁히기 순서에 따라 응답 의미를 분리하는 예시입니다. 중요한 점은 각 계층이 제각각 `try/catch`를 두는 것이 아니라, 마지막 경계에서 한 번만 해석한다는 데 있습니다.

파일: `src/middlewares/error-handler.middleware.ts`

```tsx
import type {
  NextFunction,
  Request,
  Response,
} from "express";
import { Prisma } from "#generated/prisma/client.js";
import {
  ERROR_MESSAGE,
  HTTP_STATUS,
  HttpException,
} from "#common";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGE.RESOURCE_NOT_FOUND,
      });
    }

    if (err.code === "P2002") {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: ERROR_MESSAGE.USER_EMAIL_ALREADY_EXISTS,
      });
    }

    console.error(
      `[Prisma Error] code=${err.code}`,
      err.message,
    );
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      });
  }

  if (err instanceof Error) {
    console.error("[Unhandled Error]", err);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      });
  }

  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({
      success: false,
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    });
}
```

Prisma 에러 코드 중 `P2002`는 unique 제약 조건 위반(예: 이미 존재하는 이메일), `P2025`는 대상 레코드를 찾을 수 없을 때 발생합니다. 이 두 코드는 에러 핸들러에서 가장 자주 분기하는 Prisma 오류이므로, 어떤 상황에서 나타나는지 기억해 두면 좋습니다.

이 예시의 핵심은 에러 종류를 많이 외우는 데 있지 않습니다. 오히려 “서버 코드에서는 어떤 값이든 던져질 수 있으므로, 먼저 좁혀서 안전하게 읽어야 한다”는 태도를 익히는 데 있습니다. 예상치 못한 에러 메시지를 클라이언트에 그대로 내보내지 않는 이유는 내부 DB 구조나 스택 경로가 노출될 수 있기 때문입니다. 서버 로그에는 `console.error`로 전체 정보를 기록하고, 클라이언트에는 미리 정의된 제네릭 메시지만 반환하는 원칙을 유지합니다.

## **7-05. `id` 처리 기준도 앞 장에서 정한 흐름을 그대로 따른다**

`id` 처리도 새로 설명할 내용은 많지 않습니다. 6장에서 만든 `idParamSchema`가 `z.coerce.number()`를 사용하므로, HTTP 경계에서는 이미 숫자 기준 검증과 변환이 끝난 상태라고 보면 됩니다.

다만 앞서 6장에서도 확인했듯이 Express의 `Request` 타입은 미들웨어 실행 결과만으로 자동으로 좁혀지지 않습니다. 그래서 컨트롤러에서는 `Number(req.params.id)`처럼 지역 숫자 변수를 한 번 더 두어 서비스에 넘길 값의 기준을 분명히 드러냅니다. 핵심은 서비스와 리포지토리까지 문자열 `id`를 끌고 가지 않는 구조를 유지하는 데 있습니다.

이 기준까지 확인했으므로, 이 장의 마지막으로 미들웨어 진입점만 정리합니다. 6장에서 만든 `validation.middleware.ts`와 이번 장의 `error-handler.middleware.ts`를 같은 공개 경로에서 읽을 수 있도록 `#middlewares`의 `index.ts`를 맞춰 두면, 시작점 코드에서도 미들웨어 조립 순서를 더 단순하게 설명할 수 있습니다.

파일: `src/middlewares/index.ts`

```tsx
export * from "./error-handler.middleware.js";
export * from "./validation.middleware.js";
```

## **7-06.** #Quiz **TypeScript에서 자주 만나는 서버 코드 문제**

### 문제 1

환경 변수를 설정 파일에서 한 번에 파싱하는 이유로 가장 적절한 것은 무엇인가?

1. 환경 변수를 파싱하지 않으면 `process.env`가 항상 `undefined`를 반환하기 때문이다.
2. 모든 환경 변수는 문자열 또는 `undefined`로 들어오므로, 초기에 한 번 정리해야 이후 코드가 타입 안전하게 사용할 수 있기 때문이다.
3. `.env` 파일은 배포 환경에서 자동으로 삭제되기 때문이다.
4. `dotenv-cli`는 숫자형 환경 변수를 직접 지원하지 않기 때문이다.
- 정답 및 해설
    
    **정답:** 2번
    
    **해설:** `process.env`의 모든 값은 `string | undefined`입니다. 설정 파일에서 한 번만 파싱하고 타입을 확정해 두면, 이후 코드는 `undefined` 여부를 매번 확인하지 않아도 됩니다. 파싱 자체가 없어도 `process.env`는 동작하지만, 이후 코드에서 타입이 흔들립니다.
    

### 문제 2

에러 미들웨어의 `err` 값을 `unknown`으로 두는 가장 자연스러운 이유는 무엇인가?

1. 서버에서 던져지는 값이 항상 `Error` 인스턴스라는 보장이 없기 때문이다.
2. TypeScript가 `any`로 선언한 변수의 프로퍼티 접근을 금지하기 때문이다.
3. `unknown`으로 선언하면 `err.message`에 바로 접근할 수 있어 더 편리하기 때문이다.
4. Express의 에러 미들웨어가 `err: unknown` 형태를 강제하기 때문이다.
- 정답 및 해설
    
    **정답:** 1번
    
    **해설:** 런타임에서는 문자열, 객체, 커스텀 예외, Prisma 에러 등 다양한 값이 throw될 수 있습니다. `unknown`으로 받으면 먼저 좁혀서 확인하도록 강제됩니다. `unknown`은 `err.message`에 바로 접근할 수 없으며, `any`와 반대로 프로퍼티 접근이 허용되지 않습니다.
    

### 문제 3

에러 미들웨어에서 `err instanceof HttpException` 검사를 먼저 하는 이유로 가장 적절한 것은 무엇인가?

1. `HttpException`을 `instanceof`로 확인하지 않으면 TypeScript 컴파일 오류가 발생하기 때문이다.
2. Express 에러 미들웨어는 `HttpException` 타입만 처리할 수 있기 때문이다.
3. `unknown` 타입에서 `statusCode`, `message` 같은 프로퍼티에 안전하게 접근하려면 먼저 타입을 좁혀야 하기 때문이다.
4. `instanceof`를 사용하면 런타임에서 예외를 자동으로 처리해 주기 때문이다.
- 정답 및 해설
    
    **정답:** 3번
    
    **해설:** `unknown` 타입은 프로퍼티에 직접 접근할 수 없습니다. `instanceof HttpException`으로 좁혀야 TypeScript가 `statusCode`, `message` 같은 프로퍼티가 있다는 것을 인식합니다. 이 검사는 컴파일 오류를 피하기 위한 것이 아니라, 런타임에서도 안전하게 분기하기 위한 것입니다.
    

### 문제 4

문자열 `id`와 숫자 `id` 문제를 줄이기 위한 가장 자연스러운 원칙은 무엇인가?

1. Prisma 모델의 `id` 타입을 `String`으로 바꾸면 변환이 필요 없어진다.
2. 서비스 레이어에서 문자열과 숫자 `id`를 모두 오버로드로 받으면 된다.
3. HTTP 경계(컨트롤러 또는 검증 미들웨어)에서 숫자로 변환한 뒤, 뒤 계층은 숫자만 처리하게 만든다.
4. TypeScript가 런타임에 문자열을 숫자로 자동 변환하기 때문에 별도 처리가 필요 없다.
- 정답 및 해설
    
    **정답:** 3번
    
    **해설:** 변환 지점을 HTTP 경계에 고정해야 계층마다 자료형 해석이 달라지는 문제를 막을 수 있습니다. 서비스나 리포지토리에서 변환하면 어느 계층에서 변환이 일어났는지 추적하기 어려워집니다. TypeScript는 런타임 자동 변환을 하지 않습니다.
    

# 제 8장: Decorator와 reflect-metadata 이해하기

## **8-01. 데코레이터는 DI 컨테이너가 읽을 단서를 만드는 도구다** ⭐⭐⭐

2장 `tsconfig.json` 설정에서 잠깐 언급했던 데코레이터를 이제 본격적으로 살펴봅니다. `@injectable()`에서 `@` 기호는 TypeScript의 **데코레이터(Decorator)** 문법입니다. 데코레이터는 클래스, 메서드, 프로퍼티 앞에 `@함수명` 형식으로 붙이는 특수한 표기법으로, 클래스가 정의되는 시점에 해당 함수를 실행합니다. `@injectable()`은 `injectable()`이라는 함수를 클래스에 적용한다는 의미입니다.

```tsx
// 데코레이터 표기
@injectable()
class UserService { ... }

// 실제 동작을 풀어 쓰면 이런 의미입니다(개념 설명용)
injectable()(UserService);
```

데코레이터는 클래스를 꾸미거나 정보를 덧붙이는 범용 도구입니다. DI 컨텍스트에서 `@injectable()`이 하는 역할은 “컨테이너가 이 클래스를 주입 가능한 대상으로 취급해도 된다”는 표식을 남기는 것입니다.

그런데 `@injectable()`을 붙이는 것만으로는 `tsyringe`가 자동 주입을 할 수 없습니다. 생성자에 `UserRepository`, `PasswordProvider`라고 적혀 있어도, 그 타입 정보는 TypeScript가 컴파일하면 기본적으로 사라집니다. `tsyringe`가 런타임에서 “어떤 객체를 넣어야 하는가”를 판단하려면 세 가지 조건이 모두 갖춰져야 합니다.

| 조건 | 하는 일 | 없으면 |
| --- | --- | --- |
| `@injectable()` 데코레이터 | 컨테이너 주입 대상임을 표시 | 컨테이너가 이 클래스를 주입 대상으로 인식하지 못함 |
| `emitDecoratorMetadata: true` (tsconfig) | 컴파일 시 생성자 타입 목록을 런타임 코드로 삽입 | 타입 정보가 컴파일 후 완전히 사라짐 |
| `import "reflect-metadata"` | 런타임에서 메타데이터를 읽는 Reflect API 제공 | 타입 정보를 읽는 API 자체가 없음 |

이 장에서는 이 세 가지가 각각 무슨 역할을 하는지, 그리고 세 가지가 어떤 순서로 연결되는지를 살펴봅니다.

데코레이터 역할은 `Awilix`와 비교하면 훨씬 빨리 잡힙니다. `Awilix`를 설명할 때는 보통 컨테이너 등록 파일에서 어떤 이름으로 어떤 클래스를 등록할지 먼저 적고, 그 등록 규칙을 따라 객체를 조립한다고 이해해도 충분합니다. 즉, 입문자 관점에서는 조립 단서가 주로 컨테이너 설정 코드 쪽에 모여 있다고 볼 수 있습니다.

반면 이 교재에서 사용하는 `tsyringe`는 등록 파일만 보는 방식으로 끝나지 않습니다. 클래스 선언과 생성자 타입 정보도 함께 읽어야 하므로, `@injectable()` 같은 데코레이터가 왜 필요한지를 먼저 이해해야 합니다. 여기서 데코레이터를 “특별한 문법 장식”으로 보기보다, “컨테이너가 이 클래스를 주입 가능한 대상으로 취급해도 된다”는 표식을 붙이는 도구라고 이해하는 편이 더 자연스럽습니다.

이 차이를 코드로 보면 더 분명합니다. 아래 비교는 실제 프로젝트 전체를 그대로 옮긴 예시가 아니라, `Awilix`와 `tsyringe`가 각각 어디에서 조립 단서를 읽는지 보여 주기 위한 개념 비교용 코드입니다.

```tsx
// Awilix 스타일(개념 비교용)
container.register({
  userRepository: asClass(UserRepository).singleton(),
  passwordProvider: asClass(PasswordProvider).singleton(),
  userService: asClass(UserService).singleton(),
});

const userService =
  container.resolve<UserService>("userService");

// tsyringe 스타일(이 교재의 방식)
@injectable()
class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordProvider: PasswordProvider,
  ) {}
}

container.registerSingleton(UserRepository);
container.registerSingleton(PasswordProvider);
container.registerSingleton(UserService);

const userService = container.resolve(UserService);
```

두 방식의 차이는 등록 코드가 있느냐 없느냐가 아닙니다. `Awilix` 쪽은 컨테이너 설정 파일을 펼쳐 보면서 조립 규칙을 따라가는 느낌이 강하고, `tsyringe` 쪽은 클래스 선언 자체가 “무엇이 필요한 객체인가”라는 단서를 함께 들고 다니는 쪽에 가깝습니다.

| 관점 | `Awilix`를 읽을 때 먼저 보게 되는 곳 | `tsyringe`를 읽을 때 먼저 보게 되는 곳 |
| --- | --- | --- |
| 조립 단서의 중심 | 컨테이너 등록 코드 | 클래스 선언과 생성자 타입 정보 |
| 클래스 위 데코레이터 필요 여부 | 보통 필수 전제는 아님 | `@injectable()` 같은 표식이 중요함 |
| 입문자가 처음 읽을 때의 질문 | 어떤 이름으로 무엇을 등록했는가 | 이 클래스는 무엇을 필요로 하는가 |

따라서 `@injectable()`을 읽을 때 가장 먼저 잡아야 할 뜻은 “이 클래스의 동작이 바뀐다”가 아닙니다. 오히려 “컨테이너가 이 클래스를 주입 가능한 대상으로 취급할 수 있게 표시한다”에 가깝습니다. 하지만 이 표식 하나만으로는 부족합니다. 생성자 타입 정보가 런타임에 남아 있으려면 `tsconfig.json`의 `emitDecoratorMetadata: true`가 함께 켜져 있어야 하고, 그 정보를 실제로 읽으려면 `reflect-metadata`가 먼저 import되어 있어야 합니다. 다음 두 절에서 이 흐름을 순서대로 짚어봅니다.

## **8-02. `tsconfig.json`의 데코레이터 옵션은 DI를 위해 꼭 켜 두어야 한다**

`@injectable()`을 붙여도 `tsconfig.json`에 두 가지 옵션이 없으면 DI가 정상 동작하지 않습니다. 각 옵션이 하는 일을 분리해서 이해하는 것이 중요합니다.

파일: `tsconfig.json`

```json
{
  "compilerOptions": {
    // ... 기존 옵션 ...
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
    "types": [
	    // ... 기존 옵션 ...
    ],
  },
  "include": [
    // ... 기존 include ...
  ]
}
```

**`experimentalDecorators: true`**

TypeScript에서 `@` 데코레이터 문법 자체를 허용하는 옵션입니다. 이 옵션이 없으면 `@injectable()`을 코드에 쓰는 것 자체가 컴파일 오류가 됩니다. `@` 문법을 쓸 수 있는 상태를 만드는 스위치입니다.

**`emitDecoratorMetadata: true`**

이 옵션이 훨씬 중요합니다. TypeScript의 타입 정보는 컴파일하면 기본적으로 사라집니다. `private readonly userRepository: UserRepository`에서 `UserRepository`라는 타입 이름은 컴파일 후 JavaScript에 남지 않습니다. 하지만 이 옵션을 켜면 TypeScript가 컴파일 시 생성자 타입 목록을 JavaScript 코드 안에 별도로 삽입합니다.

컴파일 전후를 비교하면 차이가 명확합니다.

```tsx
// 컴파일 전 (TypeScript 소스)
@injectable()
class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordProvider: PasswordProvider,
  ) {}
}
```

```jsx
// 컴파일 후 (JavaScript, emitDecoratorMetadata: true 일 때)
UserService = __decorate(
  [
    injectable(),
    __metadata("design:paramtypes", [
      UserRepository,
      PasswordProvider,
    ]),
  ],
  UserService,
);
```

`__metadata("design:paramtypes", [UserRepository, PasswordProvider])` 부분이 핵심입니다. 이 호출이 생성자 타입 목록을 런타임에서 읽을 수 있는 형태로 저장합니다. `emitDecoratorMetadata` 옵션이 없으면 이 `__metadata(...)` 호출 자체가 생성되지 않으므로, `tsyringe`는 “이 자리에 어떤 객체를 넣어야 하는가”를 알 방법이 없습니다.

| 옵션 | 없으면 |
| --- | --- |
| `experimentalDecorators` | `@injectable()` 문법 자체가 컴파일 오류 |
| `emitDecoratorMetadata` | 컴파일 결과에 `__metadata(...)` 코드가 생성되지 않아 tsyringe가 주입 타입을 알 수 없음 |

## **8-03. `reflect-metadata`는 왜 별도로 import해야 하는가** ⭐⭐⭐

`emitDecoratorMetadata: true`로 `__metadata(...)` 코드가 JavaScript에 삽입되었더라도, 그 정보를 실제로 읽는 API가 런타임에 없으면 소용이 없습니다. `reflect-metadata`는 바로 이 API를 제공하는 패키지입니다.

`reflect-metadata`를 import하면 전역 `Reflect` 객체에 `getMetadata`, `defineMetadata` 같은 메서드가 추가됩니다. `tsyringe`는 `container.resolve(UserService)`를 호출했을 때 내부적으로 `Reflect.getMetadata("design:paramtypes", UserService)`를 호출해 생성자 타입 목록을 읽고, 어떤 객체를 주입할지 결정합니다.

`reflect-metadata`는 또 다른 작은 DI 컨테이너처럼 보일 수 있습니다. 하지만 둘이 저장하는 것은 전혀 다릅니다.

|  | 저장하는 것 | 역할 |
| --- | --- | --- |
| DI 컨테이너(`tsyringe`) | 실제 객체(인스턴스) | 객체를 만들고 꺼내 줌 |
| `reflect-metadata` | 타입 이름 같은 메타데이터(설명서) | “이 생성자에 뭐가 필요한지” 기록해 둠 |

비유하자면 DI 컨테이너는 창고이고, `reflect-metadata`는 창고 앞 안내판입니다. `tsyringe`는 안내판(`reflect-metadata`)을 먼저 읽어 무엇이 필요한지 파악한 뒤, 창고(DI 컨테이너)에서 해당 객체를 꺼냅니다. `reflect-metadata` 자체는 객체를 보관하거나 조립하지 않습니다.

```mermaid
sequenceDiagram
    participant Dev as 개발자
    participant TSyringe as tsyringe
    participant RM as reflect-metadata (안내판)
    participant DC as DI 컨테이너 (창고)

    Dev->>TSyringe: container.resolve(UserService)
    TSyringe->>RM: Reflect.getMetadata("design:paramtypes", UserService)
    RM-->>TSyringe: [UserRepository, PasswordProvider]
    TSyringe->>DC: UserRepository 인스턴스 요청
    DC-->>TSyringe: UserRepository 인스턴스
    TSyringe->>DC: PasswordProvider 인스턴스 요청
    DC-->>TSyringe: PasswordProvider 인스턴스
    TSyringe->>TSyringe: new UserService(userRepository, passwordProvider)
    TSyringe-->>Dev: UserService 인스턴스
```

생성자에 이미 `UserRepository`, `PasswordProvider`라고 적혀 있는데 왜 또 다른 장치가 필요한가 의문이 들 수 있습니다. 이유는 TypeScript가 알고 있는 타입 정보와 JavaScript 런타임이 들고 있는 정보가 다르기 때문입니다. 앞 절에서 본 것처럼, `emitDecoratorMetadata`가 타입 정보를 런타임 코드로 변환해 저장해 두었고, `reflect-metadata`는 그렇게 저장된 정보를 꺼내 읽는 도구입니다. 두 역할이 나뉘어 있습니다.

이 흐름을 단계로 나누면 다음과 같습니다.

| 단계 | 일어나는 일 | DI 컨테이너 관점에서 의미 |
| --- | --- | --- |
| TypeScript 코드 작성 | 생성자에 `UserRepository`, `PasswordProvider` 같은 타입을 적습니다. | 개발자는 “무엇이 필요한 객체인가”를 선언합니다. |
| 컴파일 시점 | `emitDecoratorMetadata: true`가 켜져 있으면 타입 목록을 `__metadata(...)` 호출로 삽입합니다. | 타입 정보가 런타임에서 읽을 수 있는 형태로 보존됩니다. |
| 런타임 시작 시점 | `import "reflect-metadata"`가 `Reflect.getMetadata(...)` 같은 API를 전역에 등록합니다. | 컨테이너가 메타데이터를 실제로 읽을 수 있게 됩니다. |
| 객체 조립 시점 | `tsyringe`가 생성자 메타데이터를 읽어 필요한 의존성을 찾습니다. | `UserService`에 무엇을 넣어야 하는지 판단할 수 있습니다. |

아래 코드는 이 원리를 확인하기 위한 개념 예시입니다. 실제 프로젝트 본문에서 `Reflect.getMetadata(...)`를 직접 호출하지는 않지만, 컨테이너 내부에서는 결국 이런 식으로 생성자 타입 정보를 읽는다고 이해하면 됩니다.

```tsx
// 개념 확인용 예시
import "reflect-metadata";
import { injectable } from "tsyringe";

class UserRepository {}

class PasswordProvider {}

@injectable()
class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordProvider: PasswordProvider,
  ) {}
}

const paramTypes = Reflect.getMetadata(
  "design:paramtypes",
  UserService,
);

console.log(paramTypes.map((type: Function) => type.name));
// ["UserRepository", "PasswordProvider"]
```

이 예시에서 중요한 것은 `Reflect.getMetadata("design:paramtypes", UserService)`가 생성자 타입 목록을 읽어 온다는 점입니다. `tsyringe`는 이 목록을 바탕으로 “첫 번째 자리에는 `UserRepository`, 두 번째 자리에는 `PasswordProvider`가 필요하다”고 판단합니다. 따라서 앞서 설명한 ‘안내판’ 역할처럼, `reflect-metadata`는 단순한 보조 패키지가 아니라 데코레이터 기반 DI에서 타입 선언을 런타임 조립으로 연결해 주는 핵심 연결 고리입니다.

실제 프로젝트에서는 이 메타데이터 API를 직접 다루지 않고, 시작점에서 한 번 import만 해 둡니다. 중요한 점은 이 import가 컨테이너 설정이나 `resolve()` 호출보다 먼저 실행되어야 한다는 사실입니다. 그래야 이후에 만들어지는 주입 흐름이 같은 런타임 메타데이터 환경 위에서 동작합니다.

파일: `src/main.ts`

```tsx
import "reflect-metadata";
```

코드는 한 줄이지만, 이 한 줄이 빠지면 데코레이터 기반 DI에서 주입 대상 타입을 읽지 못해 런타임 오류로 이어집니다. 이 import는 옵션이 아니라, 이 교재의 DI 흐름을 여는 필수 전제입니다.

## **8-04.** #Quiz **Decorator와 reflect-metadata 이해하기**

### 문제 1

`tsconfig.json`에서 `emitDecoratorMetadata: true` 없이 `@injectable()`만 붙이면 어떻게 되는가?

1. `@injectable()` 문법 자체가 컴파일 오류가 된다.
2. `reflect-metadata` import가 자동으로 추가된다.
3. 데코레이터는 붙지만 생성자 타입 목록이 런타임 코드에 포함되지 않아 tsyringe가 무엇을 주입할지 알 수 없다.
4. `container.resolve()` 호출 시 즉시 TypeScript 컴파일 오류가 발생한다.
- 정답 및 해설
    
    **정답:** 3번
    
    **해설:** `@injectable()`은 컨테이너 주입 대상임을 표시하는 역할만 합니다. 실제로 어떤 타입을 주입해야 하는지 알려면 생성자 타입 목록이 런타임 코드에 남아 있어야 합니다. `emitDecoratorMetadata: true`가 없으면 이 목록이 컴파일 결과에 포함되지 않습니다. `@injectable()` 문법 허용은 `experimentalDecorators`가 담당합니다.
    

### 문제 2

`reflect-metadata`와 DI 컨테이너(`tsyringe`)가 각각 저장하는 것의 차이로 가장 적절한 것은 무엇인가?

1. `reflect-metadata`는 클래스 인스턴스를 저장하고, tsyringe는 타입 이름을 저장한다.
2. `reflect-metadata`는 생성자 파라미터 타입 목록 같은 메타데이터를 저장하고, tsyringe는 실제 객체 인스턴스를 관리한다.
3. 둘 다 같은 저장소를 공유하며 서로 다른 키로 구분한다.
4. `reflect-metadata`는 런타임에만 동작하고, tsyringe는 컴파일 시점에만 동작한다.
- 정답 및 해설
    
    **정답:** 2번
    
    **해설:** `reflect-metadata`는 “이 생성자에 어떤 타입이 필요한가”라는 설명서(메타데이터)를 저장합니다. tsyringe는 이 설명서를 읽어 실제 객체 인스턴스를 만들어 주입합니다. 창고 앞 안내판(`reflect-metadata`)과 창고(DI 컨테이너)로 역할이 나뉩니다.
    

### 문제 3

`experimentalDecorators: true`와 `emitDecoratorMetadata: true`가 각각 하는 일로 가장 적절한 것은 무엇인가?

1. 둘 다 `@injectable()` 실행 속도를 높이는 최적화 옵션이다.
2. `experimentalDecorators`는 `@` 데코레이터 문법을 허용하고, `emitDecoratorMetadata`는 생성자 타입 목록을 JavaScript 코드에 삽입한다.
3. `experimentalDecorators`는 런타임 타입 저장을 담당하고, `emitDecoratorMetadata`는 `@` 문법을 허용한다.
4. 두 옵션은 내용이 같으며 하나만 켜도 동일하게 동작한다.
- 정답 및 해설
    
    **정답:** 2번
    
    **해설:** 역할이 구분됩니다. `experimentalDecorators`는 TypeScript에서 `@` 데코레이터 문법 자체를 허용하는 스위치입니다. `emitDecoratorMetadata`는 데코레이터가 붙은 클래스의 생성자 타입 목록을 `__metadata(...)` 형태로 컴파일 결과에 삽입하게 합니다. 3번은 두 역할을 바꿔 설명한 함정입니다.
    

### 문제 4

`import "reflect-metadata"`를 `container.resolve()` 호출 이후에 두면 어떻게 되는가?

1. TypeScript 컴파일러가 import 순서 오류를 감지해 빌드가 실패한다.
2. `reflect-metadata` import 위치는 실행 순서에 영향을 주지 않는다.
3. `Reflect.getMetadata`가 등록되기 전에 tsyringe가 메타데이터를 읽으려 해서 런타임 오류가 발생할 수 있다.
4. 메타데이터가 두 번 등록되어 중복 주입 오류가 발생한다.
- 정답 및 해설
    
    **정답:** 3번
    
    **해설:** `reflect-metadata`를 import하면 전역 `Reflect` 객체에 `getMetadata` 같은 API가 등록됩니다. `container.resolve()`는 이 API를 사용해 생성자 타입을 읽습니다. import가 resolve보다 늦으면 API가 아직 없는 상태에서 호출이 발생해 런타임 오류로 이어집니다. TypeScript 컴파일러는 이 순서 문제를 잡아 주지 않습니다.
    

# 제 9장: tsyringe로 DI 적용하기

## **9-01. `@injectable()`과 생성자 타입 정보는 클래스 의존성을 드러내는 단서가 된다**

이 교재에서 `tsyringe`를 선택한 이유는 가장 기능이 많은 DI 도구여서가 아닙니다. TypeScript의 `Decorator`와 `reflect-metadata`가 런타임 의존성 주입과 어떻게 연결되는지, 그 전체 흐름을 가장 직접적으로 드러내는 도구이기 때문입니다. 이를 통해 TypeScript 타입 정보가 어떻게 JavaScript 런타임까지 이어지는지 전체 흐름을 이해할 수 있습니다.

이 교재의 완성 코드는 `@inject()`를 사용하지 않고, `@injectable()`과 생성자 매개변수 타입 정보를 조합해 컨테이너가 의존성을 해석하도록 구성되어 있습니다. JavaScript에서는 조립 규칙이 주로 외부 팩토리나 container 설정 파일에 모여 있었다면, 지금 구조에서는 클래스 선언만 읽어도 “이 객체는 무엇을 필요로 하는가”를 먼저 파악할 수 있습니다.

다만 앞 장들에서 일부러 `@injectable()`을 붙이지 않은 이유도 함께 정리할 필요가 있습니다. 데코레이터는 클래스를 “주입 가능한 대상”으로 표시할 뿐이고, 이 단계만으로 객체가 자동 생성되거나 싱글톤이 되는 것은 아닙니다. 그래서 먼저 계층 구조와 역할을 설명한 뒤, 9장에서 한꺼번에 DI 단서를 붙이는 편이 학습 흐름상 더 자연스럽습니다.

| 클래스 위치 | 생성자에서 받는 의존성 | 이 장에서 `@injectable()`을 붙이는 이유 |
| --- | --- | --- |
| `PrismaService`, `PasswordProvider` | 없음 | 컨테이너가 생성 가능한 기본 객체로 인식해야 하기 때문 |
| `UserRepository`, `UserService` | 다른 클래스 인스턴스 | 생성자 타입 정보를 통해 다음 의존성을 해석해야 하기 때문 |
| `UserController`, `Controller` | 하위 계층 객체 | 루트 컨트롤러 해석 과정에서 전체 그래프가 조립되게 하기 때문 |

먼저 가장 아래쪽에서 직접 생성되는 객체부터 주입 가능한 대상으로 표시합니다. 생성자 매개변수가 없는 클래스라도 컨테이너가 생성 책임을 가져가려면, 이 단계에서 `@injectable()`이 붙어 있어야 이후 등록 흐름과 자연스럽게 연결됩니다.

파일: `src/db/prisma.ts`

```diff
 import { PrismaClient } from '#generated/prisma/client.js';
 import { PrismaPg } from '@prisma/adapter-pg';
+import { injectable } from 'tsyringe';
 import { config } from '#config';

+@injectable()
 export class PrismaService extends PrismaClient {
```

파일: `src/providers/password.provider.ts`

```diff
 import bcrypt from 'bcrypt';
+import { injectable } from 'tsyringe';

 const SALT_ROUNDS = 10;

+@injectable()
 export class PasswordProvider {
```

그다음에는 생성자에서 다른 클래스를 받는 리포지토리와 서비스를 표시합니다. 이 시점부터는 단순히 “만들 수 있는 클래스”가 아니라 “무엇을 받아야 만들어지는 클래스”라는 정보가 중요해지며, `reflect-metadata`가 남긴 생성자 타입 정보도 여기서 실제 의미를 갖기 시작합니다.

파일: `src/repositories/user.repository.ts`

```diff
+import { injectable } from 'tsyringe';
 import type {
   CreateUserInput,
   UpdateUserInput,
   UserResponse,
 } from '#controllers';
 import { PrismaService } from '#db';

+@injectable()
 export class UserRepository {
```

파일: `src/services/user.service.ts`

```diff
+import { injectable } from 'tsyringe';
 import { ConflictException, ERROR_MESSAGE } from '#common';
 import type {
   CreateUserInput,
   UpdateUserInput,
   UserResponse,
 } from '#controllers';
 import { PasswordProvider } from '#providers';
 import { UserRepository } from '#repositories';

+@injectable()
 export class UserService {
```

마지막으로 컨트롤러 계층에도 같은 표시를 붙입니다. 이 교재의 루트 해석 대상은 최상위 `Controller` 하나이므로, `UserController`와 `Controller`가 모두 주입 가능한 클래스로 등록되어 있어야 `container.resolve(Controller)` 한 번으로 전체 라우팅 그래프가 조립됩니다.

파일: `src/controllers/user/user.controller.ts`

```diff
 import { type Router, type Request, type Response } from 'express';
+import { injectable } from 'tsyringe';
 import { HTTP_STATUS, idParamSchema } from '#common';
 import { validate } from '#middlewares';
 import { UserService } from '#services';
 import { BaseController } from '../base.controller.js';
 import {
   createUserSchema,
   updateUserSchema,
   type CreateUserInput,
   type UpdateUserInput,
 } from './dto/user.dto.js';

+@injectable()
 export class UserController extends BaseController {
```

파일: `src/controllers/index.ts`

```diff
 import { type Request, type Response, type Router } from 'express';
+import { injectable } from 'tsyringe';
 import { HTTP_STATUS } from '#common';
 import { BaseController } from './base.controller.js';
 import { UserController } from './user/index.js';

 export * from './base.controller.js';
 export * from './user/index.js';

+@injectable()
 export class Controller extends BaseController {
```

따라서 이번 절의 핵심은 `@injectable()`을 많이 붙이는 데 있지 않습니다. 각 클래스가 “컨테이너가 생성해도 되는 객체인가”를 표시하고, 생성자 타입 정보를 통해 다음 의존성으로 이어질 단서를 남기는 데 있습니다. 실제로 어떤 객체를 싱글톤으로 둘지, 어떤 순서로 등록할지는 다음 절의 container 설정이 결정합니다.

## **9-02. container 등록은 객체 생성 책임을 애플리케이션 시작점으로 모으는 작업이다** ⭐⭐⭐

앞 절에서 `@injectable()`을 붙였다고 해서 객체 라이프사이클까지 정해진 것은 아닙니다. 이 데코레이터는 주입 가능한 대상임을 표시할 뿐이고, 실제로 싱글톤으로 둘지, 언제 어떤 클래스를 등록할지는 container 설정이 결정합니다.

DI 도구를 도입했더라도 결국 누군가는 어떤 클래스를 어떤 방식으로 등록할지 결정해야 합니다. 이 작업이 바로 container 설정입니다. 이번 장에서도 핵심은 DI 일반론 자체보다, TypeScript 클래스 타입 정보를 실제 조립 그래프로 연결하는 위치가 어디인가를 확인하는 데 있습니다.

이렇게 해야 컨트롤러, 서비스, 리포지토리가 스스로 `new`를 호출하지 않아도 되고, 각 클래스는 필요한 의존성만 선언하면 됩니다. 그 결과 구조 설명도 더 선명해집니다. 클래스는 “무엇이 필요한가”만 말하고, container는 “무엇을 어떤 라이프사이클로 제공할 것인가”를 책임지게 되기 때문입니다.

이 교재의 완성 코드는 container를 최소한으로 줄이는 방향보다, 애플리케이션의 조립 그래프를 시작점에서 한눈에 보여 주는 방향을 택합니다. 그래서 `PrismaService`만 등록하는 것이 아니라 `PasswordProvider`, `UserRepository`, `UserService`, `UserController`, 최상위 `Controller`까지 모두 container에 명시적으로 등록합니다.

이렇게 해 두면 어떤 객체가 어떤 순서로 조립되는지 추적할 수 있습니다. 특히 루트 컨트롤러를 기준으로 아래 계층이 어떻게 연결되는지 한 파일에서 읽을 수 있으므로, DI를 “자동으로 뭔가 생성되는 기능”이 아니라 “조립 책임을 시작점에 모아 두는 구조”로 이해하기에 더 적합합니다.

파일: `src/common/di/container.ts`

```tsx
import { container } from "tsyringe";
import { Controller, UserController } from "#controllers";
import { PrismaService } from "#db";
import { PasswordProvider } from "#providers";
import { UserRepository } from "#repositories";
import { UserService } from "#services";

export function setupContainer() {
  if (container.isRegistered(PrismaService)) {
    return container;
  }

  container.registerSingleton(PrismaService);
  container.registerSingleton(PasswordProvider);
  container.registerSingleton(UserRepository);
  container.registerSingleton(UserService);
  container.registerSingleton(UserController);
  container.registerSingleton(Controller);

  return container;
}
```

현재 구현은 별도의 boolean 플래그 대신 `container.isRegistered(PrismaService)`로 초기화 여부를 확인합니다. 루트에 가까운 `PrismaService`가 이미 등록되어 있다면, 그 아래 조립 그래프도 한 번 설정되었다고 판단할 수 있기 때문입니다.

이 코드는 단순한 등록 목록처럼 보일 수 있지만, 실제로는 애플리케이션의 객체 생성 책임이 어디에 있는지를 고정하는 역할을 합니다. 서비스와 컨트롤러는 자신의 의존성만 선언하고, 어떤 구현을 어떤 생명주기로 제공할지는 시작점 근처의 container 함수가 맡는 구조가 여기서 완성됩니다.

## **9-03. Express 앱 시작점에서 DI 컨테이너를 해석하는 흐름**

DI 구조가 완성되었다고 하더라도, 실제 애플리케이션 시작점에서 어떤 객체를 해석하고 무엇을 앱에 연결할지 정리해야 합니다. 그렇지 않으면 데코레이터는 붙어 있는데 container가 실제 실행 흐름에서 어디에 개입하는지 흐려질 수 있습니다.

현재 완성 코드의 시작점은 `reflect-metadata`를 먼저 불러오고, `setupContainer()`를 실행한 뒤, 최상위 `Controller` 하나만 container에서 resolve합니다. `UserController`, `UserService`, `UserRepository`, `PrismaService`는 이 루트 객체를 해석하는 과정에서 내부적으로 함께 조립되므로, `main.ts`가 각 객체를 하나씩 직접 꺼낼 필요는 없습니다.

2-04에서 만든 `src/app.ts`와 `src/main.ts`는 이 시점에서 최종 형태로 교체됩니다. `App` 클래스는 `Controller`를 생성자 인자로 받고, 에러 미들웨어까지 한곳에서 묶는 구조로 바뀝니다. `main.ts`는 컨테이너를 먼저 구성하고 루트 컨트롤러 하나를 resolve해 앱에 건네는 부트스트랩 형태로 교체됩니다.

`src/app.ts`를 아래 내용으로 교체합니다.

파일: `src/app.ts`

```tsx
import express, { type Express } from "express";
import { errorHandler } from "#middlewares";
import type { Controller } from "#controllers";

export class App {
  public readonly app: Express;

  constructor(controller: Controller) {
    this.app = express();
    this.middleware();
    this.routes(controller);
    this.errorHandling();
  }

  private middleware() {
    this.app.use(express.json());
  }

  private routes(controller: Controller) {
    this.app.use("/api", controller.routes());
  }

  private errorHandling() {
    this.app.use(errorHandler);
  }

  listen(port: number) {
    return this.app.listen(port, () => {
      console.log(`Server is running on port${port}`);
    });
  }
}
```

`src/main.ts`를 아래 내용으로 교체합니다.

파일: `src/main.ts`

```tsx
import "reflect-metadata";
import { config } from "#config";
import { Controller } from "#controllers";
import { App } from "./app.js";
import { setupContainer } from "./common/di/container.js";

async function bootstrap() {
  const container = setupContainer();
  const controller = container.resolve(Controller);

  const app = new App(controller);
  app.listen(config.PORT);
}

bootstrap();
```

이 코드에서 중요한 점은 `setupContainer()`로 모든 클래스를 container에 등록한 뒤, `main.ts`가 최상위 `Controller` 하나만 resolve한다는 사실입니다. 최상위 객체 하나를 해석하면 그 아래 의존성 그래프가 함께 조립되므로, 시작점은 “무엇을 실행할 것인가”에만 집중할 수 있습니다.

역할 분리를 정리하면 다음과 같습니다. 객체 생성 책임은 container에 있고, 클래스 간 의존성 선언 책임은 각 생성자에 있으며, `main.ts`는 그 결과를 받아 서버를 띄우는 부트스트랩 책임만 맡습니다. 이 구조가 맞춰져 있어야 DI가 설정 파일의 문법이 아니라, 실제 실행 흐름을 정리하는 설계 도구로 읽힙니다.

## **9-04. 이번 장의 실습 목표는 비워 둔 container를 직접 완성하는 것이다**

이번 장의 실습은 기능 추가보다 조립 책임 이동을 체감하는 데 초점이 있습니다. 앞 장들에서는 각 클래스가 어떤 의존성을 받는지와 계층 역할을 먼저 정리했고, 이번 장에서는 그 객체 생성 책임을 container가 가져가도록 완성하는 과정입니다.

이 과정을 직접 해 보면 DI가 단순히 라이브러리를 바꾸는 작업이 아니라, 객체 생성 위치와 책임을 다시 배치하는 설계 결정이라는 점이 분명해집니다. 이 재배치로 인해 TypeScript에서 타입 선언과 의존성 구조가 일관되게 연결됩니다.

중요한 점은 기능 결과가 같아 보여도 구조의 의미는 크게 달라진다는 사실입니다. 화면 밖에서는 같은 `users` 기능이 동작하더라도, 내부에서는 서비스가 더 이상 구현체를 직접 만들지 않고 생성자에 적힌 의존성만 바라보게 됩니다. 학생이 이 차이를 직접 손으로 바꿔 봐야 DI가 단순 설정 파일 작업이 아니라 설계 책임 이동이라는 점을 체감할 수 있습니다.

## **9-05.** #Quiz **tsyringe로 DI 적용하기**

### 문제 1

`container.resolve(UserService)`를 호출했을 때 `UserService`에 `@injectable()`이 없으면 어떻게 되는가?

1. TypeScript 컴파일 시 오류가 발생해 빌드가 실패한다.
2. tsyringe가 `UserService`를 주입 가능한 대상으로 인식하지 못해 런타임 오류가 발생한다.
3. 의존성 없이 빈 `UserService` 인스턴스가 생성된다.
4. `UserService`의 생성자가 자동으로 빈 생성자로 교체된다.
- 정답 및 해설
    
    **정답:** 2번
    
    **해설:** `@injectable()`은 컨테이너가 이 클래스를 주입 대상으로 인식하게 하는 표식입니다. 이 표식이 없으면 tsyringe는 `resolve()` 시점에 주입을 거부하고 런타임 오류를 냅니다. TypeScript 컴파일러는 이 문제를 컴파일 시점에 잡지 않습니다.
    

### 문제 2

이 교재의 완성 코드에서 `@injectable()`을 읽을 때 가장 중요하게 봐야 할 점은 무엇인가?

1. Prisma Client를 자동으로 클래스에 주입하는 표시다.
2. 클래스를 자동으로 싱글톤으로 만드는 표시다.
3. 생성자 타입 정보와 함께 이 클래스의 의존성을 컨테이너가 해석할 수 있게 만드는 단서다.
4. 클래스를 export할 때 자동으로 `registerSingleton`이 호출되게 하는 표시다.
- 정답 및 해설
    
    **정답:** 3번
    
    **해설:** `@injectable()`은 단독으로는 싱글톤을 보장하거나 자동 등록을 하지 않습니다. 생성자에 적힌 타입 정보와 함께 읽어야 “이 클래스가 어떤 의존성을 필요로 하는가”가 드러납니다. 싱글톤 여부는 `registerSingleton`으로 결정됩니다.
    

### 문제 3

`container.registerSingleton(UserService)`가 하는 일로 가장 적절한 것은 무엇인가?

1. Prisma 스키마를 읽어 DI 등록 코드를 자동 생성한다.
2. `@injectable()`이 붙은 클래스를 자동으로 검색해 등록한다.
3. `container.resolve(UserService)` 호출 시 `UserService` 인스턴스를 싱글톤으로 제공하도록 등록한다.
4. `main.ts` 실행 시 자동으로 모든 클래스 인스턴스를 미리 만들어 둔다.
- 정답 및 해설
    
    **정답:** 3번
    
    **해설:** `registerSingleton`은 해당 토큰으로 resolve 요청이 올 때 인스턴스를 한 번만 만들어 재사용하도록 등록합니다. 등록 자체가 인스턴스를 즉시 생성하지는 않으며, `@injectable()` 클래스를 자동 탐색하지도 않습니다.
    

### 문제 4

**`@injectable()`이 붙은 클래스를 `container.resolve()` 대신 `new UserService()`로 직접 생성하면 어떻게 되는가?**

1. `@injectable()`이 붙어 있으면 직접 생성해도 컨테이너가 자동으로 의존성을 주입해 준다.
2. 컨테이너를 우회하므로 의존성이 주입되지 않은 상태의 인스턴스가 만들어진다.
3. `@injectable()`이 붙은 클래스는 `new`로 직접 생성할 수 없어 TypeScript 컴파일 오류가 발생한다.
4. 이전에 `resolve()`로 만들어 둔 싱글톤 인스턴스가 반환된다.
- 정답 및 해설
    
    **정답:** 2번
    
    **해설:**  **`@injectable()`은 컨테이너에게 "이 클래스는 주입 가능한 대상"이라고 알리는 표식일 뿐입니다. `new UserService()`로 직접 생성하면 컨테이너를 완전히 우회하므로, 생성자에 필요한 의존성이 주입되지 않고 싱글톤 관리도 받지 못합니다. `container.resolve()`를 통해야만 컨테이너가 의존성 그래프 전체를 해석해 올바른 인스턴스를 건네줍니다.**
    

# 제 10장: TypeScript 전환 이후의 프로젝트 정리 ⭐⭐⭐

## **10-01. TypeScript 전환의 성과를 평가하는 기준**

비교해야 할 것은 코드 길이보다, 어디에서 데이터 모양이 분명해졌고 어떤 오류가 더 빨리 드러나게 되었는지입니다. 동일한 `users` CRUD를 두고, 요청 타입, DTO, Prisma 타입, 예외 분기, DI 선언이 어디에서 더 명확해졌는지를 기준으로 정리합니다.

| 비교 기준 | JavaScript 버전 | TypeScript 버전 |
| --- | --- | --- |
| 요청 입력 | 실행 시점에 형태 확인 | 컴파일 단계에서 경계 선언 |
| Prisma 결과 사용 | 필요한 필드를 관습적으로 추림 | 반환 타입과 응답 타입을 더 명시적으로 분리 |
| 예외 처리 | 런타임 확인 중심 | `unknown`과 `instanceof` 분기 중심 |
| DI | 수동 조립 또는 Awilix 기반 명시적 등록 | `Decorator`와 `tsyringe` 기반 주입 선언 |

TypeScript의 이점은 오류를 없애는 데 있지 않습니다. 오류를 더 이른 단계에서 더 작은 범위로 드러내고, 계층별 타입 경계가 정리되면 협업과 코드 리뷰에서도 무엇을 어디서 고쳐야 하는지 판단 기준이 명확해집니다.

반면 TypeScript를 도입했다고 해서 설계가 자동으로 좋아지지는 않습니다. `any`를 곳곳에 두거나, Prisma 타입을 그대로 응답으로 넘기고(예: 비밀번호 필드가 포함된 `User` 객체를 클라이언트에 그대로 반환하는 경우), 리포지토리에서 문자열 `id`를 다시 숫자로 바꾸기 시작하면 오히려 타입만 늘고 구조는 흐려질 수 있습니다. “타입을 많이 쓰는 것”과 “타입을 올바른 위치에 두는 것”을 구분해야 효과가 드러납니다.

## **10-02. 전환 이후 점검 절차와 학습의 핵심**

TypeScript 전환이 끝난 뒤에는 코드가 실행되는지만 확인하는 것으로 충분하지 않습니다. 타입 오류, 정적 품질, Prisma 클라이언트 상태, 빌드 산출물 정합성을 순서대로 통과시켜야 “전환이 완료됐다”고 판단할 수 있습니다.

```bash
pnpm typecheck
pnpm lint
pnpm prisma:generate
pnpm build
pnpm prod
```

각 단계가 분리된 이유가 있습니다. `typecheck`는 타입 오류만 잡고 파일을 만들지 않습니다. `lint`는 정적 품질 규칙을 검사합니다. `prisma:generate`는 Prisma 클라이언트를 최신 스키마 기준으로 다시 생성합니다. `build`는 `dist`에 실제 JavaScript를 출력합니다. 마지막 `prod`는 컴파일된 `dist/src/main.js`를 직접 실행해 빌드 결과물이 독립적으로 동작하는지 확인합니다. 이 순서로 돌리면 오류가 생겼을 때 어느 단계가 원인인지 빠르게 좁힐 수 있습니다.

그런데 `pnpm build` 이후 `pnpm prod`를 바로 실행하면 **path alias 문제**가 발생합니다. 개발 서버(`pnpm dev`)에서는 SWC가 TypeScript import를 처리할 때 `tsconfig.json`의 `paths` 설정을 참조해 `#config`, `#controllers` 같은 별칭을 실제 파일 경로로 바꿔 줍니다. 하지만 `tsc`가 생성한 `dist/src/main.js` 안에는 별칭 import가 그대로 남아 있고, `package.json imports`는 여전히 `src/*.ts`를 가리키므로 `node`가 `.ts` 파일을 읽으려다 실패합니다.

이때 추가하는 도구가 `tsc-alias`입니다. 이 도구는 TypeScript 컴파일러를 대신하지 않습니다. 먼저 `tsc`가 `dist`를 만든 뒤, 같은 `tsconfig.build.json`을 기준으로 `#config`, `#controllers` 같은 path alias import를 실제 상대 경로 `.js` import로 바꾸는 후처리를 맡습니다. 이렇게 하면 `dist` 안의 import가 `dist` 구조 기준으로 정리됩니다.

먼저 `tsc-alias`를 개발 의존성으로 추가합니다.

```bash
pnpm add -D tsc-alias
```

그다음 `package.json`의 `build` 스크립트에 `tsc-alias` 후처리를 연결합니다. `prod` 스크립트는 수정된 산출물의 진입점 `dist/src/main.js`를 그대로 실행합니다.

파일: `package.json`

```json
{
  "scripts": {
    "build": "tsc -p tsconfig.build.json && tsc-alias -p tsconfig.build.json",
    "prod": "dotenv -e ./env/.env.development -- node dist/src/main.js"
  }
}
```

`pnpm prod`까지 통과했다면 개발 서버에서만 동작하던 상태를 넘어서, 실제 빌드 결과물도 독립적으로 실행된다는 뜻이 됩니다. TypeScript 전환의 마무리는 문법을 `.ts`로 바꾸는 데 있지 않고, 개발 중 실행 체인과 배포용 실행 체인이 같은 구조를 공유하도록 맞추는 데 있습니다.

이 점검 절차는 소스 구조와 동작 기준을 확인하는 절차입니다. 패키지 세부 버전, 코드 포맷, `.gitignore`, lock 파일이 교재의 완성 코드와 완전히 같아야 한다는 뜻은 아닙니다.

이 교재는 Express 프로젝트를 TypeScript 문법으로만 옮기는 시간이 아니었습니다. 이미 알고 있는 백엔드 구조를 “타입이 머무는 자리”와 “객체가 조립되는 자리”까지 포함해 다시 읽는 시간이었습니다. 요청/응답 타입, DTO와 Prisma 타입, `unknown` 에러, `Decorator`, `tsyringe`를 하나의 구조 안에서 설명할 수 있게 되는 것이 이 교재의 학습 결과입니다.

## **10-03.** #Quiz **TypeScript 전환 이후의 프로젝트 정리**

### 문제 1

JavaScript 버전과 TypeScript 버전을 비교할 때 가장 적절한 기준은 무엇인가?

1. 코드 줄 수가 더 적은 쪽이 무조건 더 나은 전환이다.
2. `.ts` 파일이 더 많을수록 전환이 더 완전하다.
3. 타입 경계가 더 명확해지고 오류가 더 이른 단계에서 드러나는지를 본다.
4. Prisma 마이그레이션 수가 줄어드는지를 본다.
- 정답 및 해설
    
    **정답:** 3번
    
    **해설:** TypeScript 전환의 핵심은 파일 수나 코드 길이가 아닙니다. 데이터가 어느 경계에서 검증되는지, 오류가 런타임이 아닌 컴파일 단계에서 드러나는지가 더 의미 있는 기준입니다.
    

### 문제 2

TypeScript를 도입하면서 얻는 가장 중요한 이점으로 가장 적절한 것은 무엇인가?

1. 런타임 오류가 모두 사라지고 프로그램이 항상 정상 동작한다.
2. 오류를 더 이른 단계에서 발견하고 계층별 타입 경계를 더 명확하게 표현할 수 있다.
3. JavaScript 코드보다 서버 실행 속도가 빨라진다.
4. 라이브러리 의존성이 자동으로 관리된다.
- 정답 및 해설
    
    **정답:** 2번
    
    **해설:** TypeScript는 런타임 오류를 완전히 없애 주지 않습니다. 컴파일 단계에서 더 많은 오류를 미리 드러내고, 각 계층의 타입 경계를 명시적으로 표현하게 만드는 것이 핵심 이점입니다.
    

### 문제 3

TypeScript를 도입했는데도 구조가 흐려질 수 있는 경우로 가장 적절한 것은 무엇인가?

1. `any`를 남발하고 Prisma 타입을 그대로 HTTP 응답으로 넘기는 경우
2. `strict: true`를 켜는 경우
3. DTO와 Prisma 타입을 별도로 관리하는 경우
4. 컨트롤러에서 입력 검증을 먼저 처리하는 경우
- 정답 및 해설
    
    **정답:** 1번
    
    **해설:** TypeScript는 타입을 붙일 수 있게 해 주는 도구이지, 설계를 자동으로 정리해 주지 않습니다. `any`를 남발하거나 DB 타입과 HTTP 응답 타입 경계를 섞으면 타입은 있어도 구조는 흐려집니다. 2, 3, 4번은 모두 올바른 방향의 선택입니다.
    

### 문제 4

10장에서 `build` 스크립트 뒤에 `tsc-alias`를 연결하는 이유로 가장 적절한 것은 무엇인가?

1. `tsc-alias`가 `tsc`보다 먼저 실행되어야 TypeScript 타입 검사가 가능하기 때문이다.
2. 빌드 산출물에 남아 있는 path alias import를 `dist` 기준 상대 경로로 바꿔 `pnpm prod`가 `src`가 아니라 `dist`만 읽게 하기 위해서다.
3. `tsc-alias`가 TypeScript 컴파일 기능을 포함하므로 `tsc`를 먼저 실행할 필요가 없기 때문이다.
4. Prisma Client가 `dist/generated` 대신 `src/generated`를 읽도록 강제하기 위해서다.
- 정답 및 해설
    
    **정답:** 2번
    
    **해설:** `tsc`는 JavaScript를 출력하지만, `#config` 같은 path alias import를 자동으로 상대 경로로 바꾸지는 않습니다. 그래서 `dist`를 직접 실행하는 단계에서는 별칭이 다시 `src`를 가리키거나 런타임 해석 오류를 만들 수 있습니다. `tsc-alias`는 이 빌드 결과물을 후처리해 `dist` 기준의 실제 상대 경로 `.js` import로 바꾸는 역할을 합니다.