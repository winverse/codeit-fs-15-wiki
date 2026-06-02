# 34. Nextjs에 Typescript 적용하기

# 제 1장: 셋팅하기

## **1-01. git clone으로 실습 코드 받기**

아래 저장소를 내려받으면 `frontend-starter`와 `backend`를 같은 기준으로 따라갈 수 있습니다.

```bash
git clone https://github.com/winverse/codeit-fs-nextjs-typescript
cd codeit-fs-nextjs-typescript
```

이후 실습은 `frontend-starter`와 `backend` 두 폴더를 중심으로 진행합니다.

## **1-02. 단일 저장소 구조와 실행 순서**

clone을 마친 뒤 바로 확인할 폴더는 두 곳입니다. 이 실습은 하나의 저장소 안에서 백엔드와 프런트엔드를 함께 관리하므로, 처음부터 모든 파일을 살펴볼 필요는 없습니다. 시작 단계에서는 아래 두 폴더의 역할만 구분하면 충분합니다.

```
backend
frontend-starter
```

`backend`는 API 응답을 제공하는 서버이고, `frontend-starter`는 교재의 예제와 실습 화면을 직접 확인하는 프런트엔드 프로젝트입니다. 따라서 실행 순서도 이 역할 차이에 맞춰 잡으면 됩니다.

`backend`를 실행한 뒤 `frontend-starter`를 실행합니다. 프런트엔드는 API를 호출하는 쪽이므로, 백엔드가 먼저 떠 있어야 초기 화면과 이후 실습 흐름을 바로 확인할 수 있습니다. `frontend-starter`는 실행 전에 `.env.local` 파일도 함께 준비합니다.

```bash
# 터미널 1
cd backend
pnpm install
pnpm dev

# 터미널 2
cd frontend-starter
cp .env.example .env.local
pnpm install
pnpm dev
```

실습은 위 순서만 맞추면 충분합니다.

## **1-03. TypeScript 설정 확인하기**

실습 코드를 실행하기 전에 `frontend-starter/tsconfig.json`을 열고, 아래 핵심 설정들이 들어 있는지 확인합니다. 다음 예시는 관련 부분만 발췌한 것입니다.

```json
{
  "compilerOptions": {
    "target": "ES2024",
    "strict": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**`target: "ES2024"`** — TypeScript가 어떤 수준의 JavaScript 문법을 기준으로 코드를 해석하고 출력할지를 정하는 옵션입니다. 이 값이 너무 낮으면 최신 문법을 쓰는 예제가 불필요하게 복잡하게 변환될 수 있고, 너무 높으면 실행 환경과 맞지 않을 수 있습니다. 이 starter는 Next.js 기반의 현대적인 실행 환경을 전제로 하므로 `ES2024` 수준을 기준으로 둡니다.

**`strict: true`** — 이 옵션이 켜져 있어야 TypeScript가 타입을 빠짐없이 검사합니다. 꺼져 있으면 타입이 잘못되어도 오류가 나타나지 않아 이 교재의 실습이 제대로 동작하지 않습니다.

**`module: "esnext"`** — `import`와 `export` 같은 ES Module 문법을 유지하겠다는 뜻입니다. 이 프로젝트는 TypeScript가 파일을 직접 실행하는 구조가 아니라 Next.js가 번들링과 실행 준비를 맡으므로, 모듈 형식도 현재 프런트엔드 생태계에 맞는 ES Module 기준으로 두는 편이 자연스럽습니다.

**`moduleResolution: "bundler"`** — import 경로를 어떤 규칙으로 해석할지를 정하는 옵션입니다. Next.js 같은 번들러 기반 프로젝트에서는 TypeScript도 번들러와 같은 기준으로 모듈을 찾아야 실제 실행 결과와 타입 검사 결과가 어긋나지 않습니다. 이 설정이 있어야 경로 별칭이나 패키지의 export 조건을 더 일관되게 해석할 수 있습니다.

**`paths`의 `@/*`** — 교재 코드 전체에서 `@/domains/posts/types` 같은 경로를 사용합니다. 이 별칭이 `tsconfig.json`에 선언되어 있기 때문에 가능합니다.

**.ts vs .tsx 구분** — JSX를 쓰는 컴포넌트 파일은 `.tsx`, 로직만 있는 파일은 `.ts`를 씁니다. 예제 코드에서 두 확장자가 섞여 나오는 이유입니다.

**`import type`이란** — 교재 코드 전체에서 `import type { Post } from "..."` 형태를 자주 볼 수 있습니다. 일반 `import { Post }`와 달리 `import type`은 TypeScript에게 “이 값은 타입으로만 쓰고, 실제 실행 파일에는 포함하지 않겠다”는 뜻입니다. 인터페이스나 타입 별칭은 TypeScript 전용 문법이라 JavaScript로 변환하면 사라집니다. `import type`을 쓰면 TypeScript가 빌드할 때 해당 줄을 자동으로 제거하므로, 실행 파일의 크기를 줄이고 의도를 명확하게 전달할 수 있습니다. 코드에서 `import type`이 붙은 줄은 “타입 정보만 빌려 오는 줄”로 읽으면 됩니다.

**`@types/*` 패키지란 무엇인가** — npm에 올라와 있는 라이브러리 대부분은 원래 JavaScript로 작성되었습니다. JavaScript 파일에는 “이 함수가 어떤 인자를 받고 어떤 값을 반환하는가”라는 정보가 코드 안에 없습니다. TypeScript는 이 정보 없이는 오류를 잡아 줄 수 없습니다.

이 문제를 해결하기 위해 커뮤니티가 만든 것이 **DefinitelyTyped**라는 오픈소스 저장소입니다. 여기서 수천 개의 JavaScript 라이브러리에 대한 타입 정의 파일(`.d.ts`)을 모아 관리합니다. 이 파일들이 npm에 `@types/라이브러리명` 형태로 배포됩니다. 예를 들어 `react` 패키지 자체에는 타입 정보가 없으므로, 타입 정보만 담긴 `@types/react` 패키지를 따로 설치합니다.

어떤 라이브러리의 타입이 어떻게 정의되어 있는지 직접 확인하고 싶다면 아래 GitHub 저장소에서 찾아볼 수 있습니다.

> https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types
> 

정리하면 다음과 같습니다:

| npm 패키지 | 역할 |
| --- | --- |
| `react` | 실제 실행 코드 (JavaScript) |
| `@types/react` | 타입 정의만 담긴 패키지 (`.d.ts` 파일) |
| `node` | Node.js 런타임 (설치 불필요) |
| `@types/node` | Node.js 전역 API의 타입 정의 |

`@types/*` 패키지는 실제 실행에는 전혀 영향을 주지 않습니다. TypeScript 컴파일러가 코드를 검사할 때만 사용하므로 `devDependencies`에 설치합니다.

**이 프로젝트의 경우** — `package.json`의 `devDependencies`에 `@types/react`와 `@types/node`가 명시적으로 설치되어 있습니다.

- `@types/react` — `useState`, `ChangeEvent`, `SubmitEvent` `React.ReactNode`, 같은 React 전용 타입의 출처입니다.
- `@types/node` — `process.env`, `Buffer`, `__dirname` 같은 Node.js 전역 타입의 출처입니다.

새 프로젝트에서 직접 설치해야 한다면 아래 명령어를 사용합니다. `-D` 옵션은 `devDependencies`에 추가하라는 의미입니다.

```bash
pnpm add -D @types/react @types/node
```

npm이나 yarn을 쓰는 경우에도 동일하게 `-D` 플래그를 붙입니다.

```bash
npm install -D @types/react @types/node
yarn add -D @types/react @types/node
```

TypeScript는 `node_modules/@types/` 디렉터리 안에 있는 패키지를 자동으로 읽어 들입니다. 다만 이 말이 모든 타입 이름을 `import` 없이 쓸 수 있다는 뜻은 아닙니다. `process.env`처럼 전역에 붙는 타입은 바로 읽을 수 있지만, `ChangeEvent`나 `SubmitEvent`처럼 `react` 모듈이 내보내는 타입은 실제 코드에서 `import type { ChangeEvent, SubmitEvent } from "react"`처럼 가져와야 합니다.

# 제 2장: 과정 개요

## **2-01. 실습 구조와 Post 타입 준비**

이 단원은 게시글 하나(`Post`)를 여러 상황에서 다룹니다. 서버에서 불러올 때, 화면에 보여줄 때, 폼에서 수정할 때 — 모두 같은 게시글 데이터이지만 코드를 작성하는 방식은 조금씩 달라집니다.

TypeScript를 처음 배울 때는 “타입을 어떻게 쓰는가”보다 **“타입을 어디에 써야 하는가”** 가 더 헷갈립니다. 함수에 값을 넘길 때, 컴포넌트에 데이터를 전달할 때처럼 값이 이동하는 순간마다 TypeScript는 “이 값이 맞는 형태인가?”를 검사합니다. 타입은 바로 그 검사가 필요한 자리에 씁니다.

이 교재의 실습은 `Post` 데이터가 이동하는 여러 상황을 하나씩 따라가면서, 각 상황에서 타입을 어디에 어떻게 쓰는지 비교합니다.

처음 읽을 때 낯설 수 있는 용어는 아래 표처럼 가볍게 이해하면 충분합니다. 이후 장에서는 같은 용어를 다시 사용할 때마다 문맥에 맞게 한 번씩 더 설명합니다.

| 용어 | 이 단원에서의 뜻 |
| --- | --- |
| 도메인 | 같은 종류의 데이터를 하나로 묶어 보는 기준 |
| `props` | 부모 컴포넌트가 자식 컴포넌트에 넘기는 값 |

| 실습 라우트 | 중심 개념 | 타입을 쓰는 자리 |
| --- | --- | --- |
| `/posts` | `props`, 이벤트, `useState` | 컴포넌트 입력과 로컬 상태 |
| `/posts/[postId]` | `useParams`, `useQuery` | URL 파라미터와 상세 조회 |
| `/context` | `Context` | 여러 컴포넌트가 함께 쓰는 값 |
| `/query` | `useQuery`, `useMutation`, `useInfiniteQuery` | 서버에서 받은 데이터와 다시 읽기 규칙 |

위 표는 장 구성을 그대로 반영합니다. 이어지는 장에서 정의할 `Post` 타입은 공유 상태 실습과 서버 데이터 실습까지 계속 이어집니다. 타입 선언 하나가 프로젝트 전체에서 공통으로 쓰이는 구조입니다.

# 제 3장: 컴포넌트 타입 적용하기

## **3-01. 실습 전반을 지탱하는 타입 선언**

`frontend-starter`의 `src/domains/posts/components/PostCard/PostCard.tsx`, `src/domains/posts/components/PostForm/PostForm.tsx`, `src/domains/posts/types.ts`를 함께 읽으면, 같은 게시글 데이터를 서로 다른 자리에서 조금씩 다른 방식으로 다루고 있다는 점을 확인할 수 있습니다. 카드와 폼이 받을 값, 그리고 여러 페이지 조회 결과를 나타내는 `PostPage`를 어떤 공통 타입으로 정리해야 할지가 이 절의 출발점입니다.

각 컴포넌트마다 `{ id: string; title: string; content: string; authorId: string }`를 직접 쓰는 방법도 있지만, 필드 하나가 바뀌면 모든 파일을 찾아서 고쳐야 합니다. 3장에서는 그 공통 기준을 `types.ts` 하나에 모아 두고, 이후 장에서 계속 쓸 타입 이름을 미리 정리합니다.

`PostCard`, `PostForm`, `PostPage`는 이름은 다르지만 모두 같은 `Post` 도메인을 바탕으로 움직입니다. 카드 쪽에는 `isSelected`, `onSelect`처럼 화면 상호작용 정보가 붙고, 폼 쪽에는 제출 함수·초기값·로딩 상태가 함께 필요합니다. 페이지 조회 쪽은 목록과 다음 페이지 번호를 한 묶음으로 받습니다. 이런 차이를 이름 있는 타입으로 분리해 두어야, 이후 장에서 `props`, `Context`, `TanStack Query`가 같은 기준을 공유할 수 있습니다.

필드를 여러 파일에서 중복 선언하는 문제를 막는 가장 직접적인 방법은 `Post`, `PostMutationInput`, `PostFormInitialData`, `PostPage`처럼 실습 전반에서 공통으로 쓸 이름을 먼저 고정하는 것입니다. 이렇게 해 두면 다른 파일에서도 같은 타입 이름을 그대로 가져다 쓸 수 있습니다. 타입을 한 곳에만 정의해 두었기 때문에, 필드가 바뀌어도 `types.ts` 하나만 수정하면 됩니다.

| 타입 이름 | 의미 | 사용 위치 |
| --- | --- | --- |
| `Post` | 서버와 UI가 공통으로 읽는 게시글 전체 형태 | 목록, 상세, 공유 상태, 서버 조회 |
| `PostMutationInput` | 생성·수정 폼이 서버에 보내는 입력 형태 | `PostForm`, 데이터 변경 요청 |
| `PostFormInitialData` | 수정 폼 초기값처럼 일부 필드만 필요한 경우 | `PostForm` |
| `PostPage` | 여러 페이지로 나눠 읽을 때 한 페이지 결과와 다음 페이지 정보 | 여러 페이지를 이어 읽는 Hook |

아래 파일은 이 단원 전체에서 공통으로 참조할 타입 선언을 모아 둔 곳입니다. 이어지는 장에서 `props`, `Context`, `TanStack Query`를 다루더라도, 실제로는 모두 이 파일에 선언한 타입 이름들을 각자 다른 자리에서 가져다 쓰는 과정입니다.

파일: `src/domains/posts/types.ts`

```tsx
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

export type PostMutationInput = Omit<Post, "id">;

export type PostFormInitialData = Partial<PostMutationInput>;

export interface PostPage {
  items: Post[];
  nextPage: number | null;
}

export interface AuthorOption {
  value: string;
  label: string;
}
```

이 파일에서 특히 주목할 부분은 두 가지 유틸리티 타입입니다.

`PostMutationInput = Omit<Post, "id">`에서 `Omit`은 기존 타입에서 특정 필드만 빼고 새 타입을 만듭니다. 생성과 수정에 필요한 입력은 게시글 전체와 거의 같지만, `id`는 서버가 관리하거나 수정 대상이 별도 인자로 전달되므로 폼 입력에서는 제거하는 편이 자연스럽습니다.

`PostFormInitialData = Partial<PostMutationInput>`에서 `Partial`은 모든 필드를 선택적(`?`)으로 만듭니다. 수정 폼은 기존 값을 미리 채워두고 변경된 부분만 넘기면 되므로, 일부 필드만 타입 오류 없이 전달할 수 있어야 합니다.

`Omit`이나 `Partial` 같은 도구로 기존 타입을 조금씩 변형해서 새 타입을 만들 수 있습니다. 같은 필드를 여러 번 반복해서 선언하지 않아도 되고, `Post`의 필드가 바뀌면 `PostMutationInput`과 `PostFormInitialData`도 자동으로 따라갑니다.

`AuthorOption`처럼 여러 화면이 함께 쓰는 보조 타입은 `types.ts`에 둡니다. 반면 `PostContextValue`처럼 특정 파일에서만 쓰이는 타입은 해당 파일 안에 두는 편이 코드를 이해하기 더 쉽습니다. 이 파일은 도메인 공통 타입만 모으고, 특정 상태 관리 방식에 묶인 타입은 구현 파일 옆에 둡니다.

## **3-02. 컴포넌트 props 타입 적용**

TypeScript를 쓰더라도 컴포넌트 props에 타입을 적지 않으면, 어떤 값을 받는 컴포넌트인지 파일을 열기 전까지 알 수 없습니다. 반면 `PostCardProps`, `PostDetailProps`처럼 컴포넌트가 받는 props를 인터페이스로 먼저 정의해 두면, 목록 카드가 어떤 데이터를 반드시 받아야 하는지, 상세 패널이 비어 있는 상태를 허용하는지 같은 내용이 코드 위쪽에서 바로 드러납니다.

컴포넌트가 어떤 데이터를 받는지는 그 컴포넌트가 화면에서 어떤 역할을 하느냐에 따라 달라집니다. 목록 카드는 항상 하나의 게시글을 받아서 보여 주므로 `Post`를 받고, 상세 패널은 아직 아무것도 선택되지 않은 상태도 있으므로 `Post | null`을 받습니다.

| 컴포넌트 | 입력 타입 | 설계 의도 |
| --- | --- | --- |
| `PostCard` | `post: Post` | 목록에서 항상 완전한 게시글 하나를 그림 |
| `PostCard` | `onSelect?: (post: Post) => void` | 선택 이벤트가 필요할 때만 동작 |
| `PostDetail` | `post: Post | null` | 선택 전 빈 상태를 허용 |

아래 코드는 목록 카드와 상세 패널이 같은 `Post` 도메인을 어떻게 다르게 해석하는지 보여 줍니다. 첫 번째 컴포넌트는 클릭 가능한 단일 카드이므로 선택 콜백까지 함께 받고, 두 번째 컴포넌트는 선택 해제 상태를 직접 표현하기 위해 `null`을 타입에 포함합니다.

파일: `src/domains/posts/components/PostCard/PostCard.tsx`

```tsx
import { clsx } from "clsx";
import type { Post } from "@/domains/posts/types";
import { getAuthorLabel } from "@/domains/posts/utils/constants";
import * as styles from "./PostCard.css";

interface PostCardProps {
  post: Post;
  isSelected?: boolean;
  onSelect?: (post: Post) => void;
}

export default function PostCard({
  post,
  isSelected = false,
  onSelect,
}: PostCardProps) {
  return (
    <button
      type="button"
      className={clsx(styles.card, isSelected && styles.selected)}
      onClick={() => {
        if (!onSelect) return;
        onSelect(post);
      }}
    >
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.content}>{post.content}</p>
      <span className={styles.meta}>{getAuthorLabel(post.authorId)}</span>
    </button>
  );
}
```

`onClick` 핸들러 맨 앞에 `if (!onSelect) return`을 두는 이유는, `onSelect`가 optional props이기 때문입니다. 전달되지 않은 상태에서 그냥 호출하면 런타임 오류가 발생합니다. 조건을 만족하지 않으면 즉시 함수를 끝내는 이 패턴을 **얼리 리턴**이라고 합니다. `return` 아래 줄부터는 TypeScript가 `onSelect`가 반드시 함수임을 알기 때문에, 별도의 타입 단언 없이 바로 호출할 수 있습니다.

파일: `src/domains/posts/components/PostDetail/PostDetail.tsx`

```tsx
import type { Post } from "@/domains/posts/types";
import { getAuthorLabel } from "@/domains/posts/utils/constants";
import * as styles from "./PostDetail.css";

interface PostDetailProps {
  post: Post | null;
}

export default function PostDetail({ post }: PostDetailProps) {
  if (!post) {
    return (
      <p className={styles.empty}>
        포스트를 선택하면 상세 내용이 이 영역에 표시됩니다.
      </p>
    );
  }

  return (
    <article className={styles.wrapper}>
      <span className={styles.meta}>{getAuthorLabel(post.authorId)}</span>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.body}>{post.content}</p>
    </article>
  );
}
```

`PostDetail`은 `null`을 타입에 직접 포함시켜 빈 상태를 명시적으로 처리합니다. 선택되지 않은 상태가 프로그램 오류가 아니라 정상적인 화면 상태로 다뤄집니다.

## **3-02.** #Quiz **컴포넌트 props 타입 적용**

### 문제 1

아래 두 `PostDetailProps` 설계 중, 교재처럼 `selectedPost`의 타입이 `Post | null`일 때 TypeScript 오류 없이 `<PostDetail post={selectedPost} />`를 호출하려면 어느 쪽을 써야 하는가?

```tsx
// Post = { id: string; title: string; content: string; authorId: string }

// A
interface PostDetailProps { post?: Post; }

// B
interface PostDetailProps { post: Post | null; }
```

1. B를 써야 한다 — `selectedPost`가 `Post | null` 타입이므로 A를 쓰면 “null은 Post에 할당할 수 없다”는 타입 오류가 난다
2. A를 써야 한다 — `post?: Post`는 내부적으로 `Post | null | undefined`를 허용하므로 `null`도 받을 수 있다
3. 둘 다 동일하다 — TypeScript는 `null`과 `undefined`를 같은 것으로 처리한다
4. A를 써야 한다 — optional props가 TypeScript의 표준이고, B처럼 명시적으로 `null`을 허용하면 불필요한 null 체크가 늘어난다
- 정답 및 해설
    
    **정답:** 1번
    
    **해설:** `post?: Post`의 실제 타입은 `Post | undefined`입니다. `null`은 포함되지 않습니다. `selectedPost`가 `Post | null` 타입이면 `<PostDetail post={selectedPost} />`를 호출할 때 TypeScript가 “Type ‘null’ is not assignable to type ‘Post | undefined’”를 오류로 잡습니다. `post: Post | null`로 선언하면 `null`을 명시적으로 허용하므로 오류가 사라집니다. `null`은 “의도적으로 없음”, `undefined`는 “아직 값이 없거나 전달되지 않음”이라는 의미 차이가 있습니다. PostDetail에서 “선택 해제” 상태는 의도적으로 비어 있는 것이므로 `null`이 더 정확한 표현입니다.
    

### 문제 2

아래 `PostDetail`에서 `if (!post)` 분기 이전과 이후에 TypeScript가 `post`를 어떤 타입으로 처리하는가? 그리고 조건 체크 없이 바로 `post.title`에 접근하면 어떤 오류가 나는가?

```tsx
// Post = { id: string; title: string; content: string; authorId: string }

interface PostDetailProps {
  post: Post | null;
}

export default function PostDetail({ post }: PostDetailProps) {
  // 여기서 post의 타입: Post | null

  if (!post) {
    return <p>포스트를 선택하면 상세 내용이 이 영역에 표시됩니다.</p>;
  }

  return (
    <article>
      <h2>{post.title}</h2>  {/* ← 이 시점의 post 타입? */}
    </article>
  );
}
```

- 정답 및 해설
    
    `if (!post)` 이전에서 `post`의 타입은 `Post | null`입니다. `if (!post) return`이 실행되면, TypeScript는 그 아래 코드에 도달하려면 `post`가 반드시 `null`이 아니어야 함을 압니다. 이 타입 좁히기(type narrowing) 덕분에 `return` 아래에서 `post`의 타입은 `Post`로 좁혀집니다. `if (!post)` 조건 없이 바로 `post.title`처럼 접근하면 TypeScript가 “Object is possibly null” 오류를 냅니다. `post`가 `null`일 때 `.title`에 접근하면 런타임 오류가 발생하므로, TypeScript가 이를 컴파일 타임에 미리 잡아주는 것입니다. `Post | null` 타입을 쓰는 것과 null 체크가 짝을 이뤄야 하는 이유가 여기 있습니다.
    

### 문제 3

아래 `PostCard`에서 `isSelected = false`처럼 기본값을 지정한 뒤, 함수 본문 안에서 TypeScript가 `isSelected`를 어떤 타입으로 처리하는가?

```tsx
// Post = { id: string; title: string; content: string; authorId: string }

interface PostCardProps {
  isSelected?: boolean;  // ← 선언: boolean | undefined
  // ...
}

function PostCard({ post, isSelected = false, onSelect }: PostCardProps) {
  const cls = isSelected ? styles.selected : "";
  //          ↑ 이 시점의 isSelected 타입?
}
```

1. `boolean | undefined` — interface에 `?`가 붙어 있으므로 함수 안에서도 `undefined`가 유지된다
2. `undefined` — 기본값으로 `false`를 지정했어도 외부에서 명시적으로 전달하면 `undefined`가 된다
3. `boolean` — 기본값 덕분에 `isSelected`는 함수 안에서 항상 `boolean`이 보장된다. `undefined`가 될 가능성이 제거된다
4. `false` — 기본값이 `false`이므로 TypeScript가 리터럴 타입으로 고정한다
- 정답 및 해설
    
    **정답:** 3번
    
    **해설:** `isSelected?: boolean`은 props로 받을 때 `boolean | undefined`를 허용합니다. 그러나 `{ isSelected = false }`처럼 구조 분해 할당에서 기본값을 지정하면, TypeScript는 함수 본문 안에서 `isSelected`의 타입을 `boolean`으로 좁힙니다. `undefined`가 전달되면 기본값 `false`로 대체되어 함수 안에서는 절대 `undefined`가 될 수 없기 때문입니다. 이 덕분에 `isSelected ? ... : ...` 같은 삼항 연산자를 쓸 때 별도의 null 체크 없이도 TypeScript 오류가 나지 않습니다. props 선언과 함수 내부의 타입이 다를 수 있다는 점이 핵심입니다.
    

### 문제 4

`PostCard`의 `onClick` 핸들러에서 `if (!onSelect) return`을 먼저 실행한 뒤, TypeScript는 그 아래 줄의 `onSelect`를 어떤 타입으로 처리하는가?

```tsx
// Post = { id: string; title: string; content: string; authorId: string }

interface PostCardProps {
  onSelect?: (post: Post) => void;
  // ...
}

function PostCard({ post, onSelect }: PostCardProps) {
  return (
    <button onClick={() => {
      if (!onSelect) return;
      onSelect(post);  // ← 이 시점의 onSelect 타입?
    }}>
      ...
    </button>
  );
}
```

1. `(post: Post) => void`다 — `if (!onSelect) return` 이후에는 TypeScript가 `onSelect`에서 `undefined`를 제거하고 함수 타입만 남긴다
2. 여전히 `((post: Post) => void) | undefined`다 — if문은 런타임 검사일 뿐 TypeScript 타입에는 영향을 주지 않는다
3. `never`다 — `return`으로 분기가 끝났으므로 이후 코드에서 `onSelect`는 `never`가 된다
4. `void`다 — `onSelect`의 반환 타입이 `void`이므로 TypeScript가 함수 자체를 `void`로 추론한다
- 정답 및 해설
    
    **정답:** 1번
    
    **해설:** TypeScript의 타입 좁히기(type narrowing)는 if문 같은 조건 분기 결과를 타입에 반영합니다. `if (!onSelect) return`은 “onSelect가 없으면(undefined이면) 즉시 리턴”을 의미합니다. if 블록에서 return이 실행되면, 그 아래 코드에 도달하려면 `onSelect`가 반드시 `undefined`가 아니어야 합니다. TypeScript는 이 흐름을 분석해 `onSelect`의 타입을 `(post: Post) => void`로 좁힙니다. 이 덕분에 `onSelect(post)` 호출 시 별도의 타입 단언 없이도 오류가 나지 않습니다. 이 패턴을 **얼리 리턴**이라고 합니다.
    

# 제 4장: 이벤트 타입 적용하기

## **4-01. 이벤트 타입 적용 ⭐️⭐️⭐️**

사용자가 input에 글자를 입력하거나 폼을 제출할 때, React는 이벤트 객체를 핸들러 함수에 넘겨줍니다. 이 이벤트 객체에는 어떤 요소에서 이벤트가 발생했는지, 입력된 값이 무엇인지 같은 정보가 담겨 있습니다.

TypeScript를 쓸 때는 이 이벤트 객체에도 타입을 지정해야 합니다. 요소 종류마다 이벤트 타입이 다르기 때문입니다. 예를 들어 `<input>`에서 발생한 변경 이벤트와 `<select>`에서 발생한 변경 이벤트는 모두 “값이 바뀐 이벤트”지만, TypeScript에서는 서로 다른 타입으로 구분합니다. 또한 폼을 제출할 때는 브라우저가 페이지를 새로고침하려는 기본 동작을 막기 위해 `event.preventDefault()`를 호출하는데, 이때도 올바른 이벤트 타입이 지정되어 있어야 합니다.

이 장에서 다루는 이벤트 타입은 아래와 같습니다. 이 타입들은 모두 `@types/react`에 정의되어 있습니다. 다만 React 19 계열 타입 정의에서는 `FormEvent`가 더 이상 구체적인 DOM 이벤트를 반영하지 않는 이름으로 취급되어 deprecated 상태이므로, 폼 제출은 `SubmitEvent<HTMLFormElement>`로 설명하는 편이 현재 기준에 더 가깝습니다.

| 이벤트 타입 | 대상 요소 | 실제 처리 |
| --- | --- | --- |
| `ChangeEvent<HTMLInputElement>` | 제목 입력 | 문자열 제목 갱신 |
| `ChangeEvent<HTMLTextAreaElement>` | 본문 입력 | 긴 본문 문자열 갱신 |
| `ChangeEvent<HTMLSelectElement>` | 작성자 선택 | 선택한 작성자 ID 문자열 반영 |
| `SubmitEvent<HTMLFormEvent>` | 폼 제출 | 기본 제출 차단 후 검증 수행 |

아래 폼 컴포넌트는 타입 구분이 실제 코드에서 어떤 차이를 만드는지 잘 보여 줍니다. `authorId`는 `<select>`에서 들어오므로 브라우저가 문자열로 읽어 오고, `handleSubmit`은 기본 제출을 막은 뒤 공백 검증과 `focus()` 호출까지 이어지기 때문에 입력 이벤트와는 전혀 다른 책임을 가집니다. 최근 React 타입 정의에서는 `event.target`보다 `event.currentTarget`이 "지금 핸들러가 연결된 요소"의 타입을 더 정확하게 보장하므로, 이 단원도 그 기준에 맞춰 읽는 편이 좋습니다.

파일: `src/domains/posts/components/PostForm/PostForm.tsx`

```tsx
"use client";

import type { ChangeEvent, SubmitEvent } from "react";
import { useRef, useState } from "react";
import Button from "@/components/Button/Button";
import SelectField from "@/components/SelectField/SelectField";
import TextField from "@/components/TextField/TextField";
import type { PostFormInitialData, PostMutationInput } from "@/domains/posts/types";
import {
  AUTHOR_OPTIONS,
  DEFAULT_POST_FORM_VALUES,
} from "@/domains/posts/utils/constants";
import * as styles from "./PostForm.css";

interface PostFormProps {
  onSubmit: (formData: PostMutationInput) => Promise<void>;
  initialData?: PostFormInitialData;
  isLoading?: boolean;
  submitLabel?: string;
}

export default function PostForm({
  onSubmit,
  initialData = DEFAULT_POST_FORM_VALUES,
  isLoading = false,
  submitLabel = "포스트 저장",
}: PostFormProps) {
  const [formData, setFormData] = useState<PostMutationInput>({
    title: initialData.title ?? DEFAULT_POST_FORM_VALUES.title,
    content: initialData.content ?? DEFAULT_POST_FORM_VALUES.content,
    authorId: initialData.authorId ?? DEFAULT_POST_FORM_VALUES.authorId,
  });
  const [error, setError] = useState<string | null>(null);
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData((previousState) => ({
      ...previousState,
      title: event.currentTarget.value,
    }));
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setFormData((previousState) => ({
      ...previousState,
      content: event.currentTarget.value,
    }));
  }

  function handleAuthorChange(event: ChangeEvent<HTMLSelectElement>) {
    setFormData((previousState) => ({
      ...previousState,
      authorId: event.currentTarget.value,
    }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("제목과 내용을 모두 입력해야 합니다.");
      titleInputRef.current?.focus();
      return;
    }

    setError(null);
    await onSubmit({
      title: formData.title.trim(),
      content: formData.content.trim(),
      authorId: formData.authorId,
    });
  }

  function handleReset() {
    setError(null);
    setFormData({
      title: initialData.title ?? DEFAULT_POST_FORM_VALUES.title,
      content: initialData.content ?? DEFAULT_POST_FORM_VALUES.content,
      authorId: initialData.authorId ?? DEFAULT_POST_FORM_VALUES.authorId,
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        ref={titleInputRef}
        label="제목"
        name="title"
        value={formData.title}
        onChange={handleTitleChange}
        placeholder="포스트 제목을 입력합니다"
      />

      <label className={styles.textareaField}>
        <span className={styles.label}>내용</span>
        <textarea
          className={styles.textarea}
          name="content"
          value={formData.content}
          onChange={handleContentChange}
          placeholder="포스트 본문을 입력합니다"
        />
      </label>

      <SelectField
        label="작성자"
        name="authorId"
        value={formData.authorId}
        onChange={handleAuthorChange}
        options={AUTHOR_OPTIONS}
      />

      {error ? <p className={styles.message}>{error}</p> : null}

      <div className={styles.actions}>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "저장 중" : submitLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={handleReset}>
          폼 초기화
        </Button>
      </div>
    </form>
  );
}
```

이 컴포넌트는 이벤트 타입을 정확히 나눠 두면 폼 로직 자체가 더 읽기 쉬워진다는 점을 보여 줍니다. 각 입력 필드는 서로 다른 DOM 요소를 다루므로, 변경 핸들러도 그 요소의 타입에 맞게 나누는 편이 자연스럽습니다. 이 예제는 각 필드의 타입을 처음부터 명확하게 정해 두어, 이후 서버에 데이터를 보낼 때도 타입이 끊김 없이 이어지도록 작성했습니다.

## **4-01.** #Quiz **이벤트 타입 적용**

### 문제 1

아래 코드는 `handleChange`를 `input`과 `textarea` 두 요소에서 재사용하려는 시도입니다. TypeScript 오류가 나는 이유를 설명하고, 제네릭을 활용해서 오류 없이 동작하도록 수정하세요.

```tsx
function handleChange(event: ChangeEvent<HTMLInputElement>) {
  setFormData((prev) => ({ 
	  ...prev, 
	  [event.currentTarget.name]: event.currentTarget.value 
	}));
}

<input name="title" onChange={handleChange} />
<textarea name="content" onChange={handleChange} />  {/* ← 여기서 오류 */}
```

- 정답 및 해설
    
    `<textarea>`의 `onChange`는 `ChangeEvent<HTMLTextAreaElement>`를 기대합니다. `ChangeEvent<HTMLInputElement>`는 이와 호환되지 않으므로 오류가 납니다. 제네릭을 활용하면 두 요소를 모두 처리하는 단일 핸들러를 만들 수 있습니다.
    
    ```tsx
    function handleChange(
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      setFormData((prev) => ({ 
    	  ...prev, 
    	  [event.currentTarget.name]: event.currentTarget.value 
    	}));
    }
    ```
    
    `ChangeEvent<T>`의 제네릭 `T`에 Union 타입 `HTMLInputElement | HTMLTextAreaElement`를 넣으면 두 요소 모두에서 발생하는 이벤트를 처리할 수 있습니다.  ****현재 React 타입 정의에서는 `event.currentTarget.name`과 `event.currentTarget.value`를 쓰는 편이 안전합니다. `currentTarget`은 핸들러가 직접 연결된 요소 타입을 유지하므로, 두 타입에 공통으로 있는 프로퍼티만 자연스럽게 읽을 수 있기 때문입니다. 단, `HTMLInputElement`에만 있는 `checked`같은 프로퍼티는 이 핸들러 안에서 직접 접근할 수 없습니다.
    

### 문제 2

`handleSubmit`에서 `titleInputRef.current?.focus()`를 호출합니다. 옵셔널 체이닝(`?.`)을 쓰는 이유는 무엇이고, 이를 쓰지 않으면 어떤 오류가 나는가?

```tsx
const titleInputRef = useRef<HTMLInputElement | null>(null);

if (!formData.title.trim()) {
  titleInputRef.current?.focus();  // ← 왜 ?.?
}
```

1. `?.`는 습관적으로 쓰는 것이고, `titleInputRef.current.focus()`로 써도 동일하다
2. `useRef<HTMLInputElement | null>(null)`에서 초기값이 `null`이므로 `current`가 `null`일 수 있다. `?.` 없이 쓰면 TypeScript가 “`null`에 `focus`를 호출할 수 없다”는 오류를 낸다
3. `?.`는 `current`가 `undefined`인 경우를 처리하기 위해 쓴다
4. React에서 `ref.current`에 직접 접근하는 것은 금지되어 있어 `?.`가 필수이다
- 정답 및 해설
    
    **정답:** 2번
    
    **해설:** `useRef<HTMLInputElement | null>(null)`의 반환값에서 `current`의 타입은 `HTMLInputElement | null`입니다. 마운트 전이나 조건부 렌더링에서 ref가 연결되지 않은 상태에서 `current`는 `null`이 됩니다. TypeScript는 `null.focus()`를 오류로 잡습니다. `?.`를 쓰면 `current`가 `null`일 때 `focus()` 호출을 건너뛰어 런타임 오류를 방지합니다. 이 패턴은 `useRef<HTMLInputElement>(null!)`처럼 Non-null assertion(`!`)으로 타입을 좁히는 방식과 대비됩니다. `!`는 “절대 null이 아님”을 단언하는 방식이라, 잘못 쓰면 런타임 오류가 숨겨집니다.
    

### 문제 3

아래 `handleAuthorChange`에서 `event.currentTarget.value`를 그대로 넣을 수 있는 이유는?

```tsx
// PostMutationInput = { title: string; content: string; authorId: string }

function handleAuthorChange(event: ChangeEvent<HTMLSelectElement>) {
  setFormData((prev) => ({
    ...prev,
    authorId: event.currentTarget.value,  // ← 왜 그대로 넣을 수 있나?
  }));
}
```

1. `HTMLSelectElement.value`의 타입은 `number`이므로 `string` 필드에 자동으로 맞춰진다
2. `authorId`와 `HTMLSelectElement.value`가 모두 `string` 타입이므로 별도 변환이 필요 없다
3. React의 `ChangeEvent`는 값을 `unknown`으로 반환하므로 `string` 단언이 생략된 것이다
4. `SelectField` 컴포넌트가 내부에서 문자열 값을 숫자로 바꿔 준다
- 정답 및 해설
    
    **정답:** 2번
    
    **해설:** DOM API에서 `HTMLSelectElement.value`의 타입은 `string`으로 고정되어 있습니다. 현재 `PostMutationInput`의 `authorId`도 `author-1`처럼 문자열 식별자를 쓰므로, `event.currentTarget.value`를 그대로 넣으면 타입이 정확히 맞습니다. 오히려 여기서 `Number()` 변환을 넣으면 `"author-1"` 같은 값을 숫자로 바꾸려는 잘못된 코드가 됩니다. 즉, 브라우저가 문자열을 주기 때문에 데이터 모델도 같은 문자열 ID 체계로 맞춰 두면 폼 처리 흐름이 더 단순해집니다.
    

# 제 5장: 기본 Hook 타입 적용하기

## **5-01. 기본 Hook 타입 적용 ⭐️⭐️⭐️**

`useState`를 쓸 때 타입을 적지 않으면 TypeScript가 초기값만 보고 타입을 추측합니다. 초기값이 `[]`이면 `never[]`로, `null`이면 `null`로만 추측하기 때문에, 나중에 실제 데이터를 넣으려 하면 타입 오류가 생깁니다. 이 장에서는 `useState<Post[]>`, `useState<string | null>` 처럼 상태가 담을 수 있는 값의 범위를 처음부터 명확하게 적습니다.

아래 Hook은 로컬 상태로 목록과 선택을 관리하는 가장 기본적인 예제입니다. 생성은 서버 없이 로컬 배열 앞쪽에 추가하고, 초기화는 백엔드에서 다시 읽어 오는 방식으로 나누었습니다. 이 구분 덕분에 화면 안에서만 바뀌는 상태와 서버에서 새로 불러오는 상태가 어디서 갈리는지 한눈에 드러납니다.

파일: `src/domains/posts/hooks/useLocalPostsPage.ts`

```tsx
"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { getPosts } from "@/lib/api/posts";
import type { Post, PostMutationInput } from "@/domains/posts/types";

export default function useLocalPostsPage(initialPosts: Post[]) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(
    initialPosts[0]?.id ?? null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedPost =
    posts.find((post) => post.id === selectedPostId) ?? null;

  async function handleCreatePost(input: PostMutationInput) {
    setIsLoading(true);

    try {
      const nextPost: Post = {
        id: nanoid(),
        ...input,
      };

      setPosts((previousPosts) => [nextPost, ...previousPosts]);
      setSelectedPostId(nextPost.id);
    } catch {
      setError("로컬 포스트를 추가하지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetPosts() {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
      setSelectedPostId(fetchedPosts[0]?.id ?? null);
    } catch {
      setError("포스트 목록을 다시 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    posts,
    isLoading,
    error,
    selectedPost,
    selectedPostId,
    setSelectedPostId,
    handleCreatePost,
    handleResetPosts,
  };
}
```

| 구성 요소 | 타입 | 의미 |
| --- | --- | --- |
| `useState<Post[]>` | 게시글 목록 | 화면의 기본 데이터 집합 |
| `useState<string | null>` | 선택 ID | 아직 선택이 없을 수 있는 상태 |
| `useState<boolean>` | 로딩 플래그 | 비동기 진행 여부 |
| `useState<string | null>` | 에러 메시지 | 없거나 문자열 하나만 허용 |
| `posts.find(...) ?? null` | `Post | null` 파생 | 선택 ID에 대응하는 실제 게시글 |

`selectedPostId`를 `string | null`로 둔 부분이 특히 중요합니다. 화면은 종종 “아직 아무것도 선택되지 않은 상태”를 가져야 하므로, 선택값이 없을 수 있다는 사실을 타입에 직접 포함해야 이후 상세 패널과 삭제 버튼이 모두 같은 규칙을 따를 수 있습니다.

## **5-01.** #Quiz **기본 Hook 타입 적용**

### 문제 1

아래 코드에서 TypeScript 오류가 발생합니다. 오류가 나는 줄과 근본 원인은?

```tsx
// Post = { id: string; title: string; content: string; authorId: string }
// PostMutationInput = Omit<Post, "id">

function useLocalPostsPage(initialPosts: Post[]) {
  const [posts, setPosts] = useState(initialPosts);           // (A)
  const [selectedPostId, setSelectedPostId] = useState(null); // (B)

  async function handleCreatePost(input: PostMutationInput) {
    const nextPost: Post = { id: nanoid(), ...input };
    setPosts((prev) => [nextPost, ...prev]);
    setSelectedPostId(nextPost.id);  // (C)
  }

  async function handleResetPosts() {
    const fetched = await getPosts(); // 반환: Post[]
    setPosts(fetched);                // (D)
  }
}
```

1. 오류는 없다 — TypeScript는 `useState(null)`에서 상태 타입을 `null | string`으로 자동 추론하므로 이후 `string` 할당이 가능하다
2. (B)가 근본 원인이고 오류는 (C)에서 발생한다 — `useState(null)`로 상태 타입이 `null`로 고정되어, (C)에서 `string`을 넣으려 하면 오류가 난다
3. (C)만 오류다 — `nextPost.id`가 숫자이기 때문이다
4. (B)와 (D) 모두 오류다 — `null`과 `Post[]`는 같은 상태에 담을 수 없다
- 정답 및 해설
    
    **정답:** 2번
    
    **해설:** `useState(null)` 자체는 오류가 아닙니다. 그러나 TypeScript는 초기값 `null`을 보고 상태 타입을 `null`로 추론합니다. 이후 (C)에서 `setSelectedPostId(nextPost.id)`를 호출할 때 `nextPost.id`는 `string`인데, 상태 타입이 `null`로 고정되어 있어 할당할 수 없다는 오류가 납니다. (B)는 오류의 **원인**이고 (C)가 오류가 **표시되는 위치**입니다. `useState<string | null>(null)`처럼 타입을 명시하면 상태가 `string | null`로 넓어져 (C)의 오류가 사라집니다. (A)와 (D)는 `initialPosts`가 `Post[]`이므로 타입 추론이 올바르게 동작합니다.
    

### 문제 2

아래 `useLocalPostsPage`에서 `selectedPost`의 타입이 `Post | null`로 결정되는 과정을 TypeScript 타입 관점에서 설명하세요.

```tsx
// Post = { id: string; title: string; content: string; authorId: string }

const [posts, setPosts] = useState<Post[]>(initialPosts);
const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

const selectedPost =
  posts.find((post) => post.id === selectedPostId) ?? null;
//  ↑ 이 식의 타입은?
```

- 정답 및 해설
    
    `Array.prototype.find()`의 반환 타입은 `T | undefined`입니다. `posts`가 `Post[]`이므로 `posts.find(...)`의 반환 타입은 `Post | undefined`입니다. `??`(nullish coalescing 연산자)는 왼쪽 값이 `null` 또는 `undefined`이면 오른쪽 값을 반환합니다. 왼쪽 타입이 `Post | undefined`이고 오른쪽이 `null`이므로, 연산 결과는 `Post | null`이 됩니다. `undefined`가 `null`로 대체되어 최종 타입에서 `undefined`가 사라집니다. `PostDetail`의 prop 타입 `post: Post | null`과 정확히 일치하게 되어, `<PostDetail post={selectedPost} />`를 타입 오류 없이 호출할 수 있습니다.
    

### 문제 3

아래 코드에서 `prev`의 타입은 무엇이고, TypeScript가 이를 어떻게 알 수 있는가?

```tsx
// Post = { id: string; title: string; content: string; authorId: string }

const [posts, setPosts] = useState<Post[]>(initialPosts);

// ...
const nextPost: Post = { id: nanoid(), ...input };
setPosts((prev) => [nextPost, ...prev]);
//        ↑ prev의 타입?
```

1. `typeof initialPosts` — 초기값의 타입을 그대로 가져온다
2. `Post[] | undefined` — `useState`의 초기 렌더링에서 상태가 아직 설정되지 않을 수 있다
3. `Post[]` — `useState<Post[]>`의 제네릭 인자가 `setPosts`의 콜백 파라미터 타입에도 전달된다
4. `any[]` — 콜백 인자는 TypeScript가 문맥에서 추론하지 못해 `any`가 된다
- 정답 및 해설
    
    **정답:** 3번
    
    **해설:** `useState<Post[]>`는 `[Post[], Dispatch<SetStateAction<Post[]>>]`를 반환합니다. `SetStateAction<Post[]>`의 정의는 `Post[] | ((prevState: Post[]) => Post[])`입니다. 함수 형태의 업데이트를 쓸 때 콜백의 파라미터 타입은 `Post[]`로 고정됩니다. TypeScript는 문맥적 타이핑(contextual typing)을 통해 `setPosts`에 전달하는 콜백 `(prev) => ...`의 `prev`가 `Post[]`임을 자동으로 추론합니다. 이 덕분에 `prev.map(...)`, `prev.filter(...)` 등을 `prev` 위에서 타입 오류 없이 쓸 수 있습니다.
    

## **5-02. `useParams`로 URL 파라미터 타입 고정하기**

동적 라우트는 URL 문자열을 바탕으로 동작하므로, 화면이 기대하는 값의 모양과 실제 파라미터 값이 쉽게 어긋납니다. `useParams()`는 기본적으로 `Record<string, string | string[]>`를 반환하므로, 타입을 따로 적지 않으면 `postId`를 문자열로 바로 쓰기 어렵습니다.

그래서 5-02에서는 클라이언트 컴포넌트 안에서 `params`의 모양을 고정하는 단계를 먼저 살펴봅니다. 다음 절에서 이 책임을 서버 컴포넌트 `page.tsx`로 끌어올리더라도, URL 파라미터를 타입으로 좁히는 가장 가까운 출발점이 어디인지 정리해 두어야 이후 리팩터링의 의미가 분명해집니다.

아래 코드는 `LocalPostRoutePage`가 `useParams<{ postId: string }>()`를 사용하도록 정리한 결과입니다. 이 단계에서는 여전히 클라이언트 컴포넌트가 URL을 직접 읽지만, 적어도 이 라우트가 `postId`라는 문자열 키를 기대한다는 사실이 코드에 명확하게 남습니다.

파일: `src/domains/posts/components/LocalPostRoutePage/LocalPostRoutePage.tsx`

```tsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Panel from "@/components/Panel";
import PostDetail from "@/domains/posts/components/PostDetail";
import useLocalPostDetailPage from "@/domains/posts/hooks/useLocalPostDetailPage";
import * as styles from "./LocalPostRoutePage.css";

export default function LocalPostRoutePage() {
  const params = useParams<{ postId: string }>();
  const postId = typeof params.postId === "string" ? params.postId : null;
  const { post, isLoading, error } = useLocalPostDetailPage(postId);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Panel
          title="useParams 타입 적용 결과"
          description="동적 라우트에서 읽은 postId를 문자열 기준으로 고정한 상태입니다."
        >
          <p className={styles.lead}>
            이 페이지는 <code>useParams</code>로 읽은 <code>postId</code>를 문자열 기준으로
            정리한 뒤 상세 조회 Hook에 전달합니다. 클라이언트 컴포넌트가 URL을 직접 읽는 구조는
            유지하지만, 이 라우트가 어떤 키를 기대하는지는 타입에서 바로 확인할 수 있습니다.
          </p>
          <p>
            <Link href="/posts">게시글 실습 페이지로 돌아가기</Link>
          </p>
          {isLoading ? <p>포스트를 불러오는 중입니다.</p> : null}
          {error ? <p className={styles.status}>{error}</p> : null}
        </Panel>

        <Panel title="PostDetail 라우트 결과">
          <PostDetail post={post} />
        </Panel>
      </div>
    </main>
  );
}
```

여기까지의 구조는 클라이언트 컴포넌트가 URL을 직접 읽는 방식입니다. 이 단계만으로도 `params`가 너무 넓게 잡히는 문제는 해결되지만, 라우트 파라미터를 해석하는 책임은 여전히 화면 컴포넌트 안에 남아 있습니다. 다음 절에서는 같은 `postId` 읽기를 서버 컴포넌트 `page.tsx`로 끌어올려 `PageProps`를 실제로 적용합니다.

## **5-02.** #Quiz **`useParams`로 URL 파라미터 타입 고정하기**

### 문제 1

5-02에서 `useParams()`에 제네릭을 적어 `useParams<{ postId: string }>()`로 바꾸는 가장 직접적인 이유는 무엇인가?

1. `useParams()`는 기본적으로 항상 `number`를 반환하므로 문자열로 고정해야 하기 때문이다
2. 제네릭을 적지 않으면 `postId`가 자동으로 `null`이 되므로 상세 조회 Hook에 전달할 수 없기 때문이다
3. 제네릭을 적으면 `useParams()`가 서버 컴포넌트에서도 동작하게 되기 때문이다
4. 제네릭을 적지 않으면 반환 타입이 너무 넓어 `postId`를 문자열 기준으로 바로 해석하기 어렵기 때문이다
- 정답 및 해설
    
    **정답:** 4번
    
    **해설:** 본문에서 설명했듯이 `useParams()`는 기본적으로 `Record<string, string | string[]>`에 가까운 넓은 모양으로 읽힙니다. 이렇게 두면 `postId`가 정말 문자열 하나인지 바로 확신하기 어렵습니다. `useParams<{ postId: string }>()`로 기대하는 키 이름과 기본 모양을 먼저 고정해 두면, 이 라우트가 어떤 파라미터를 전제로 하는지가 코드에 분명하게 남습니다. 5-02의 목적은 URL을 곧바로 숫자나 다른 값으로 바꾸는 것이 아니라, 파라미터 해석의 출발점을 문자열 기준으로 좁히는 데 있습니다.
    

### 문제 2

`useParams<{ postId: string }>()`로 타입을 명시했는데도 바로 다음 줄에서 `typeof params.postId === "string"` 검사를 추가한 이유는 무엇인가?

```tsx
const params = useParams<{ postId: string }>();
const postId = typeof params.postId === "string" ? params.postId : null;
```

1. `useParams<>()` 제네릭은 TypeScript에게 기대하는 모양을 알려줄 뿐이고, 런타임에서 `params.postId`는 catch-all 라우트 같은 경우에 `string[]`가 될 수 있어 방어 검사가 필요하다
2. `useParams<>()` 제네릭을 쓰면 `postId`가 자동으로 `null`로 변환되므로 typeof 검사로 다시 `string`으로 바꿔야 한다
3. TypeScript는 제네릭 인자를 런타임에서 무시하므로 typeof 검사 없이는 항상 `any`가 된다
4. `useParams()`는 제네릭이 있어도 반환 타입이 항상 `undefined`이므로 string으로 좁혀야 한다
- 정답 및 해설
    
    **정답:** 1번
    
    **해설:** `useParams<{ postId: string }>()`의 제네릭은 “이 라우트에서 `postId`가 문자열 하나일 것”이라는 기대를 TypeScript에 알리는 역할입니다. 그러나 Next.js의 동적 라우트에서는 catch-all 세그먼트나 예상치 못한 경우에 `string[]`가 반환될 수 있습니다. `typeof params.postId === "string"` 검사는 이런 경우를 걸러내, 실제로 문자열 하나가 들어온 경우에만 `postId`를 사용하도록 좁히는 역할을 합니다. 제네릭이 기대를 정의한다면, typeof 검사는 그 기대를 실제로 확인하는 단계입니다.
    

## **5-03. App Router page.tsx: params와 searchParams 타입**

`useParams()`는 클라이언트 컴포넌트 전용입니다. 그래서 `"use client"`가 없는 서버 컴포넌트 `page.tsx`에서는 Hook을 직접 쓸 수 없습니다. 5-02가 클라이언트 컴포넌트 안에서 `postId`를 좁히는 단계였다면, 5-03은 같은 라우트 파라미터 읽기 책임을 서버 컴포넌트 `page.tsx`로 끌어올리는 단계입니다.

App Router를 쓰는 서버 컴포넌트라면 보통 `page.tsx`가 `params`를 받아 필요한 값을 꺼낸 뒤, 그 값을 화면 컴포넌트에 prop으로 넘기는 편이 더 자연스럽습니다. 이렇게 역할을 나누면 라우트 해석은 서버 컴포넌트가 맡고, 클라이언트 컴포넌트는 화면 렌더링과 상세 조회에만 집중하게 됩니다.

Next.js는 이를 위해 **`PageProps`**라는 유틸리티 타입을 제공합니다. `next dev`나 `next build`를 한 번 실행하면 프로젝트의 라우트 구조를 읽어 타입을 자동으로 생성하므로, 별도 import 없이 파일 어디서든 바로 쓸 수 있습니다.

| 유틸리티 타입 | 사용 대상 | 자동으로 포함되는 props |
| --- | --- | --- |
| `PageProps<'/route'>` | `page.tsx` | `params`, `searchParams` |

Next.js 15부터 `params`와 `searchParams`는 `Promise`로 전달됩니다. 따라서 `params.postId`처럼 바로 접근하는 대신, 먼저 `await params`로 값을 꺼내야 합니다. 직접 `type Params = Promise<{ postId: string }>`처럼 선언해도 되지만, `PageProps`를 쓰면 파일이 어느 라우트에 속하는지가 타입에 그대로 드러나고 `searchParams` 타입까지 함께 정리할 수 있습니다.

이 절에서는 `page.tsx`가 `PageProps<'/posts/[postId]'>`를 받아 `await params`로 `postId`를 꺼내고, 그 값을 화면 컴포넌트에 넘기도록 정리합니다. 핵심은 라우트 파라미터 해석을 서버 컴포넌트 경계로 올려서, URL 구조와 화면 로직이 서로 다른 책임으로 나뉘게 만드는 데 있습니다.

파일: `src/app/posts/[postId]/page.tsx`

```tsx
import LocalPostRoutePage from "@/domains/posts/components/LocalPostRoutePage";

export default async function LocalPostDetailPage({
  params,
}: PageProps<'/posts/[postId]'>) {
  const { postId } = await params;

  return <LocalPostRoutePage postId={postId} />;
}
```

이렇게 바꾸면 `LocalPostRoutePage`도 함께 정리해야 합니다. 이제 이 컴포넌트는 URL을 직접 읽지 않고, `page.tsx`가 전달한 `postId`를 props로 받아 상세 조회와 화면 렌더링에만 집중합니다. 라우트 해석과 화면 렌더링의 경계가 여기서 분리됩니다.

파일: `src/domains/posts/components/LocalPostRoutePage/LocalPostRoutePage.tsx`

```tsx
"use client";

import Link from "next/link";
import Panel from "@/components/Panel";
import PostDetail from "@/domains/posts/components/PostDetail";
import useLocalPostDetailPage from "@/domains/posts/hooks/useLocalPostDetailPage";
import * as styles from "./LocalPostRoutePage.css";

type LocalPostRoutePageProps = {
  postId: string;
};

export default function LocalPostRoutePage({ postId }: LocalPostRoutePageProps) {
  const { post, isLoading, error } = useLocalPostDetailPage(postId);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Panel
          title="page.tsx가 전달한 postId"
          description="서버 컴포넌트가 해석한 라우트 파라미터를 이 화면에 전달한 상태입니다."
        >
          <p className={styles.lead}>
            이 페이지는 URL을 직접 읽지 않고, <code>page.tsx</code>가 전달한 <code>postId</code>를
            바로 사용합니다. 라우트 파라미터 해석 책임은 서버 컴포넌트에 두고, 여기서는
            상세 조회와 화면 렌더링에 집중합니다.
          </p>
          <p>
            <Link href="/posts">게시글 실습 페이지로 돌아가기</Link>
          </p>
          {isLoading ? <p>포스트를 불러오는 중입니다.</p> : null}
          {error ? <p className={styles.status}>{error}</p> : null}
        </Panel>

        <Panel title="PostDetail 라우트 결과">
          <PostDetail post={post} />
        </Panel>
      </div>
    </main>
  );
}
```

이제 `LocalPostRoutePage`는 URL 구조를 몰라도 됩니다. 서버 컴포넌트가 `postId`를 책임지고 전달하므로, 클라이언트 컴포넌트의 입력은 `postId: string` prop 하나로 단순해집니다. 5-02가 클라이언트 안에서 타입 경계를 좁히는 단계였다면, 5-03은 그 경계를 서버 컴포넌트 쪽으로 옮겨 책임을 분리하는 단계라고 이해하면 됩니다.

페이지 번호나 정렬 기준을 URL의 `?` 뒤에서 읽어야 하는 서버 컴포넌트라면, 다음처럼 `searchParams`를 props로 받습니다.

파일: `src/app/posts/page.tsx`

```tsx
import LocalPostsPage from "@/domains/posts/components/LocalPostsPage";
import { getPostPage } from "@/lib/api/posts";

export default async function PostsPage({
  searchParams,
}: PageProps<'/posts'>) {
  const { page: rawPage } = await searchParams;
  const page = typeof rawPage === "string" ? (Number(rawPage) || 1) : 1;

  const { items: initialPosts } = await getPostPage(page);

  return <LocalPostsPage initialPosts={initialPosts} />;
}
```

값 타입이 `string | string[] | undefined`인 이유는 같은 키가 URL에 여러 번 등장할 수 있기 때문입니다. `?tag=react&tag=typescript`처럼 쓰면 `tag`는 `["react", "typescript"]` 배열이 됩니다.

`Number(rawPage ?? 1)`처럼 바로 변환하면 안 됩니다. `rawPage`가 `string[]`이면 `Number(["1", "2"])`가 되어 `NaN`이 나오고, `"abc"` 같은 숫자가 아닌 문자열도 `NaN`이 됩니다. `typeof rawPage === "string"`으로 먼저 문자열인지 확인한 뒤 변환하고, `Number(rawPage) || 1`로 `NaN`일 때 기본값 `1`로 대체합니다. `undefined`나 배열인 경우는 `typeof` 체크에서 걸러져 바로 `1`이 됩니다.

이 절에서는 서버 컴포넌트 `page.tsx`가 `async` 함수와 `await params` 조합으로 라우트 값을 해석하는 흐름까지만 이해하면 충분합니다. 핵심은 URL 해석 책임을 서버 경계에 두고, 클라이언트 컴포넌트는 이미 정리된 값을 props로 받는 구조를 익히는 데 있습니다.

## **5-03.** #Quiz **App Router page.tsx: params와 searchParams 타입**

### 문제 1

아래 `page.tsx`에서 `params.postId`처럼 바로 읽지 않고 `await params`를 먼저 하는 이유는 무엇인가?

```tsx
export default async function LocalPostDetailPage({
  params,
}: PageProps<'/posts/[postId]'>) {
  const { postId } = await params;
  return <LocalPostRoutePage postId={postId} />;
}
```

1. `await`를 써야 `postId`가 자동으로 `number`로 변환되기 때문이다
2. `params`는 항상 `Promise<string>`이므로 구조 분해 전에 문자열로 바꿔야 하기 때문이다
3. `PageProps`를 쓰면 `params`와 `searchParams`가 동기 객체가 아니라 `Promise` 형태로 전달되므로, 값을 꺼내기 전에 먼저 풀어야 하기 때문이다
4. `await`를 쓰지 않으면 서버 컴포넌트에서 JSX를 반환할 수 없기 때문이다
- 정답 및 해설
    
    **정답:** 3번
    
    **해설:** 본문에서 설명했듯이 Next.js 15부터 `params`와 `searchParams`는 `Promise`로 전달됩니다. 따라서 `params.postId`처럼 바로 접근하는 대신, 먼저 `await params`로 값을 풀어야 합니다. 여기서 중요한 점은 `await`가 타입을 “변환”하는 것이 아니라, 비동기적으로 전달된 값을 실제 객체 모양으로 꺼내는 단계라는 것입니다. `PageProps<'/posts/[postId]'>`를 쓰면 이 라우트가 어떤 `params` 구조를 갖는지도 함께 드러납니다.
    

### 문제 2

`PageProps<'/posts/[postId]'>`를 쓰는 방식이 직접 `type Params = Promise<{ postId: string }>`를 선언하는 방식보다 어떤 점에서 더 자연스러운지 설명하세요.

- 정답 및 해설
    
    `PageProps<'/posts/[postId]'>`를 쓰면 이 파일이 어느 라우트에 속하는지가 타입에 그대로 남습니다. 또한 `params`뿐 아니라 `searchParams`까지 같은 규칙으로 함께 정리됩니다. 반면 직접 `Promise<{ postId: string }>`를 선언하면 현재 파일이 어떤 라우트 경로와 연결되는지 타입만 보고는 알기 어렵고, `searchParams` 타입은 따로 다시 적어야 합니다. 따라서 `PageProps`는 라우트 구조와 props 모양을 함께 드러내는 유틸리티 타입으로 읽는 편이 자연스럽습니다.
    

### 문제 3

아래 `searchParams` 처리에서 `typeof rawPage === "string"` 검사가 먼저 필요한 이유는 무엇인가?

```tsx
const { page: rawPage } = await searchParams;
const page = typeof rawPage === "string" ? (Number(rawPage) || 1) : 1;
```

1. `searchParams.page`는 `string | string[] | undefined`일 수 있으므로, 배열이나 `undefined`를 곧바로 숫자로 바꾸는 실수를 먼저 걸러야 하기 때문이다
2. `Number()`는 문자열에만 쓸 수 있고 숫자에는 쓸 수 없기 때문이다
3. `typeof` 검사를 넣어야만 `searchParams`를 두 번 이상 읽을 수 있기 때문이다
4. `rawPage`는 항상 배열이므로 먼저 문자열로 합쳐야 하기 때문이다
- 정답 및 해설
    
    **정답:** 1번
    
    **해설:** `searchParams` 값은 같은 키가 여러 번 들어오면 배열이 될 수 있고, 값이 없으면 `undefined`가 됩니다. 따라서 `rawPage`는 `string` 하나라고 단정할 수 없습니다. 본문에서도 `Number(rawPage ?? 1)`처럼 바로 변환하면 배열이나 숫자가 아닌 문자열에서 `NaN`이 생길 수 있다고 설명했습니다. 먼저 문자열인지 확인한 뒤 변환해야만, 페이지 번호가 하나의 문자열로 들어온 경우에만 안전하게 숫자로 바꿀 수 있습니다.
    

## **5-04. `useRef`가 다루는 두 종류의 값**

`useRef`는 흔히 화면 요소를 가리키는 도구처럼 소개되지만, 실제 프로젝트에서는 화면을 다시 그리지 않고도 유지해야 하는 값을 저장하는 용도로도 자주 쓰입니다. 이번 실습에서도 폼 입력 포커스를 위한 화면 요소 참조와, 비동기 요청 중 화면이 사라졌는지 기록하는 표시값 저장이라는 두 가지 사례를 함께 사용합니다.

이 차이를 분리해서 보면 `useRef`의 역할이 더 명확해집니다. 화면 요소 참조는 `current`가 실제 입력창을 가리키고, 표시값 저장은 `current`가 `true`나 `false`를 가리키므로, 같은 Hook이지만 무엇을 보관하느냐에 따라 타입도 달라집니다.

| 사용 위치 | 최종 타입 | 목적 |
| --- | --- | --- |
| `PostForm` | `HTMLInputElement \| null` | 검증 실패 시 제목 입력으로 포커스 이동 |
| `PostContext` | `boolean` | 언마운트 이후 상태 업데이트 방지 |

먼저 `PostForm`의 `titleInputRef`는 제목 입력 요소를 직접 가리키는 참조입니다. 이 값은 아직 DOM이 연결되지 않았을 때 `null`일 수 있고, 연결된 뒤에는 `HTMLInputElement`가 되므로 두 값을 모두 타입에 포함해야 합니다.

파일: `src/domains/posts/components/PostForm/PostForm.tsx`

```tsx
const [error, setError] = useState<string | null>(null);
const titleInputRef = useRef<HTMLInputElement | null>(null);

async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
  event.preventDefault();

  if (!formData.title.trim() || !formData.content.trim()) {
    setError("제목과 내용을 모두 입력해야 합니다.");
    titleInputRef.current?.focus();
    return;
  }
}
```

반면 `PostContext`의 `mountedRef`는 DOM 요소가 아니라 화면이 아직 살아 있는지를 기록하는 표시값입니다. 이 경우 `current`에는 오직 `true`와 `false`만 들어가므로, 참조 대상이 아닌 상태 플래그로 읽는 것이 더 자연스럽습니다.

파일: `src/domains/posts/contexts/PostContext.tsx`

```tsx
const mountedRef = useRef<boolean>(false);

useEffect(() => {
  mountedRef.current = true;

  return () => {
    mountedRef.current = false;
  };
}, []);
```

`useRef`로 만든 값은 바뀌어도 화면이 다시 그려지지 않습니다. 렌더링과 상관없이 값을 유지해야 할 때 쓰는 저장소입니다. 여기서 `titleInputRef.current`는 결국 입력 요소를 가리키므로 `HTMLInputElement | null`로 좁히게 되고, `mountedRef.current`는 `true` 또는 `false`만 다루므로 `boolean`으로 정리하게 됩니다. 서버 요청이 늦게 끝났을 때 이미 사라진 화면을 건드리지 않도록 막는 `mountedRef.current` 점검 패턴도 같은 원리입니다.

## **5-04.** #Quiz **`useRef`가 다루는 두 종류의 값**

### 문제 1

5-04에서 `titleInputRef`와 `mountedRef`를 서로 다른 타입으로 선언한 이유로 가장 알맞은 것은 무엇인가?

1. `useRef`는 DOM 요소를 저장할 때만 타입을 적을 수 있고, 불리언 값은 타입을 적지 않아야 한다
2. `titleInputRef`는 실제 입력 요소를 가리키는 참조이고 `mountedRef`는 렌더링과 무관하게 유지할 표시값을 저장하므로, 보관 대상이 달라 타입도 달라진다
3. `mountedRef`는 `useState`와 완전히 같은 역할이므로 `boolean`으로 적어도 의미 차이가 없다
4. DOM 요소 참조는 항상 `HTMLElement` 하나로 통일해야 하므로 `HTMLInputElement | null`은 잘못된 타입이다
- 정답 및 해설
    
    **정답:** 2번
    
    **해설:** 이 절은 `useRef`가 항상 DOM 요소만 다루는 것이 아니라는 점을 설명합니다. `titleInputRef`는 제목 입력 요소가 아직 연결되지 않았을 때 `null`, 연결된 뒤에는 `HTMLInputElement`가 되므로 `HTMLInputElement | null`이 됩니다. 반면 `mountedRef`는 화면이 아직 살아 있는지를 기록하는 표시값이므로 `true`와 `false`만 저장하면 충분합니다. 같은 Hook이라도 무엇을 보관하느냐에 따라 타입이 달라진다는 점이 핵심입니다.
    

### 문제 2

`useRef`로 만든 `current` 값을 바꿔도 화면이 다시 그려지지 않는 이유와, 이 특성이 `mountedRef` 같은 표시값 저장에 왜 적합한지 설명하세요.

- 정답 및 해설
    
    `useRef`는 렌더링 결과를 다시 계산하기 위한 상태가 아니라, 렌더링과 무관하게 값을 계속 들고 있기 위한 저장소입니다. 따라서 `current`가 바뀌어도 React는 이를 화면 업데이트가 필요한 변경으로 보지 않습니다. 이 특성 덕분에 `mountedRef`처럼 “컴포넌트가 아직 살아 있는가” 같은 표시값을 저장할 때 적합합니다. 값은 비동기 작업 사이에서 유지되지만, 그 값이 바뀌었다고 해서 화면을 다시 그릴 필요는 없기 때문입니다.
    

### 문제 3

비동기 요청이 끝난 뒤 `mountedRef.current`를 확인하는 패턴의 목적은 무엇인가?

1. 요청이 너무 빨리 끝나면 강제로 지연시키기 위해서다
2. `mountedRef.current`가 `true`일 때만 서버 요청을 시작할 수 있도록 제한하기 위해서다
3. `mountedRef.current`를 읽으면 React가 자동으로 다시 렌더링하도록 만들기 위해서다
4. 이미 언마운트된 화면에 상태 업데이트를 시도하지 않도록 막기 위해서다
- 정답 및 해설
    
    **정답:** 4번
    
    **해설:** 본문 마지막 문단은 `mountedRef.current` 점검 패턴의 목적을 분명하게 설명합니다. 서버 요청이 늦게 끝났을 때 화면이 이미 사라졌다면, 그 뒤에 `setState`를 호출하는 것은 잘못된 흐름이 됩니다. `mountedRef.current`는 지금 이 컴포넌트가 아직 살아 있는지를 기억하는 표시값이므로, 비동기 작업이 끝난 시점에 이를 확인하면 언마운트 이후 상태 업데이트를 피할 수 있습니다. 이때 필요한 것은 화면 재렌더링이 아니라, 안전하게 실행 여부를 판단할 기준입니다.
    

# 제 6장: Context 타입 적용하기

## **6-01. Context 타입 적용**

Context를 도입해도 공유하는 값에 타입을 지정하지 않으면, 어떤 컴포넌트가 무엇을 읽고 바꾸는지 파악하기 어려워집니다. `posts`만 읽는 컴포넌트도 있고, `refreshPosts()`나 `setError()`를 직접 호출하는 컴포넌트도 있습니다. 어떤 값을 공유하는지 인터페이스로 먼저 정해 두지 않으면, 나중에 코드를 읽을 때 어디서 무엇을 쓰는지 알기 어렵습니다.

이번 실습에서는 `PostContext.tsx` 안에 `PostContextValue` 인터페이스를 선언하고, `createContext<PostContextValue | undefined>` 형태로 초기값을 둡니다. React 19부터는 `Provider` 전용 프로퍼티 대신 `<PostContext value={...}>`처럼 Context 객체 자체를 provider로 렌더링할 수 있습니다. 이전 문법인 `<PostContext.Provider>`도 여전히 볼 수 있지만, 새로 작성하는 코드는 현재 문법에 맞춰 두는 편이 좋습니다. 이렇게 하면 `Provider` 밖에서 Hook을 호출했을 때 즉시 오류를 알릴 수 있고, 어떤 값을 함께 쓰는지도 타입 정의에 분명하게 남습니다. 무엇보다 타입 정의와 구현이 한 파일 안에 모이므로, `Context`가 외부에 무엇을 공개하는지 한눈에 파악할 수 있습니다.

아래 코드는 `Context` 구성의 핵심 내용을 모두 담고 있습니다. `initialPosts`를 받아 초깃값을 세팅합니다. `mountedRef`는 언마운트 이후 상태 업데이트를 막습니다. 커스텀 Hook은 `Provider` 바깥에서 호출하면 즉시 예외를 던집니다.

파일: `src/domains/posts/contexts/PostContext.tsx`

```tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Dispatch, SetStateAction } from "react";
import { getPosts } from "@/lib/api/posts";
import type { Post } from "@/domains/posts/types";

interface PostContextValue {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  refreshPosts: () => Promise<void>;
}

const PostContext = createContext<PostContextValue | undefined>(undefined);

interface PostProviderProps {
  children: React.ReactNode;
  initialPosts: Post[];
}

export function PostProvider({ children, initialPosts }: PostProviderProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef<boolean>(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  async function refreshPosts() {
    setLoading(true);
    setError(null);

    try {
      const fetchedPosts = await getPosts();
      if (mountedRef.current) {
        setPosts(fetchedPosts);
      }
    } catch {
      if (mountedRef.current) {
        setError("Context에서 포스트를 다시 불러오지 못했습니다.");
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }

  return (
    <PostContext
      value={{
        posts,
        setPosts,
        loading,
        setLoading,
        error,
        setError,
        refreshPosts,
      }}
    >
      {children}
    </PostContext>
  );
}

export function usePostContext() {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePostContext must be used within PostProvider");
  }

  return context;
}
```

| 필드 | 타입 | 역할 |
| --- | --- | --- |
| `posts` | `Post[]` | 공유 목록 데이터 |
| `setPosts` | `Dispatch<SetStateAction<Post[]>>` | 목록 직접 갱신 |
| `loading` / `error` | `boolean`, `string | null` | 비동기 상태 표현 |
| `refreshPosts` | `() => Promise<void>` | 백엔드 재조회 |

`Dispatch<SetStateAction<T>>`는 `useState`가 반환하는 상태 변경 함수의 타입입니다. `useState<Post[]>(...)`를 쓰면 반환값이 `[Post[], Dispatch<SetStateAction<Post[]>>]`가 됩니다. `setState` 함수를 Context 바깥으로 공유할 때 이 타입을 그대로 적어 두어야, 사용하는 쪽에서 올바른 값을 전달하는지 TypeScript가 확인할 수 있습니다.

`React.ReactNode`는 `children` prop에 쓰는 타입입니다. JSX 요소, 문자열, 숫자, 배열, `null`까지 React가 화면에 그릴 수 있는 모든 값을 허용합니다. Provider처럼 자식 컴포넌트를 감싸는 컴포넌트는 대부분 `children: React.ReactNode`를 씁니다.

`PostContextValue` 인터페이스가 Context를 통해 컴포넌트 트리에 공개되는 상태와 함수의 타입을 결정합니다. 이 예제처럼 `PostContext.tsx` 안에 `PostContextValue`를 먼저 선언해 두면 어떤 상태와 함수가 외부에 공개되는지 명확하게 관리할 수 있습니다. 이 타입 정의가 다른 도메인 타입과 섞이지 않으므로, `Context` 구현을 읽을 때 필요한 정보가 한곳에 모여 코드를 이해하기도 더 쉬워집니다.

## **6-01.** #Quiz **Context 타입 적용**

### 문제 1

아래 `usePostContext`에서 null 체크를 제거하면 TypeScript가 어떤 오류를 내는가? 그리고 `if (!context) throw` 이후에는 `context`의 타입이 어떻게 바뀌는가?

```tsx
export const PostContext = createContext<PostContextValue | undefined>(undefined);

export function usePostContext() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within PostProvider");
  }
  return context;
  // ↑ 이 시점의 context 타입?
}
```

- 정답 및 해설
    
    `createContext<PostContextValue | undefined>(undefined)`로 선언하면 `useContext(PostContext)`의 반환 타입은 `PostContextValue | undefined`입니다. undefined 체크 없이 바로 `context.posts`처럼 접근하면 TypeScript가 “Object is possibly undefined” 오류를 냅니다. `if (!context) throw`는 타입 좁히기(type narrowing)를 일으킵니다. `throw`가 실행되면 그 이후 코드에는 도달할 수 없으므로, TypeScript는 `throw` 이후에서 `context`가 반드시 `PostContextValue`임을 압니다. `undefined`가 걸러진 것입니다. `return context`의 타입은 `PostContextValue`가 됩니다. `createContext`에 `undefined`를 초기값으로 쓰는 이유는, Provider 없이 호출됐을 때 조용히 실패하지 않고 명확한 오류를 던지도록 강제하기 위해서입니다.
    

### 문제 2

아래 `PostContext`의 `value` prop에서 `refreshPosts`를 빠뜨리면 TypeScript는 어떻게 반응하는가?

```tsx
interface PostContextValue {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
  refreshPosts: () => Promise<void>;
}

export const PostContext = createContext<PostContextValue | undefined>(undefined);

// Provider 사용
<PostContext
  value={{ posts, setPosts }}  // ← refreshPosts 누락
>
```

1. 오류 없음 — Context의 `value`는 `Partial`로 처리되어 일부 필드만 전달해도 된다
2. 런타임에만 오류가 난다 — TypeScript는 JSX의 `value` prop을 따로 검사하지 않는다
3. 오류 없음 — `PostContextValue`는 인터페이스이므로 일부 필드만 전달해도 TypeScript가 허용한다
4. TypeScript가 “Property ‘refreshPosts’ is missing in type ‘{ posts: Post[]; setPosts: … }’” 오류를 낸다. `createContext<PostContextValue | undefined>`에서 선언한 타입과 `value`가 불일치하기 때문이다
- 정답 및 해설
    
    **정답:** 4번
    
    **해설:** `createContext<PostContextValue | undefined>(undefined)`로 선언하면, `PostContext`의 `value` prop 타입은 `PostContextValue | undefined`가 됩니다. `value`에 `PostContextValue` 형태의 객체를 전달할 때 필수 필드가 빠지면 TypeScript가 타입 불일치 오류를 냅니다. JSX의 `value` prop도 일반 함수 인자와 동일하게 TypeScript가 타입 검사를 수행하기 때문입니다. 이 덕분에 Context를 제공하는 쪽과 소비하는 쪽(`usePostContext`) 모두 같은 `PostContextValue` 타입을 보장받아, 어느 한 쪽에서 필드가 누락되면 컴파일 단계에서 오류가 잡힙니다.
    

### 문제 3

`PostContextValue`에서 `refreshPosts: () => Promise<void>`의 반환 타입이 `Promise<void>`인 이유와, 이를 `Promise<Post[]>`로 바꾸면 어떤 문제가 생기는가?

1. `void`는 반환값을 무시한다는 뜻이므로 호출하는 쪽에서 결과를 받을 수 없어 더 제한적이다. `Promise<Post[]>`가 더 낫다
2. `refreshPosts`는 내부에서 `setPosts`로 상태를 업데이트하고 끝납니다. 호출하는 쪽이 게시글 배열을 직접 받을 필요가 없습니다. `Promise<Post[]>`로 바꾸면 함수가 두 가지 일(상태 업데이트 + 값 반환)을 하게 되어 책임이 불분명해집니다
3. `Promise<void>`는 TypeScript에서 비동기 함수의 기본 반환 타입이므로 의미가 없다
4. `Promise<Post[]>`로 바꾸면 `async/await`를 사용할 수 없어진다
- 정답 및 해설
    
    **정답:** 2번
    
    **해설:** `refreshPosts`의 목적은 서버에서 게시글을 가져와 `setPosts`로 Context 상태를 업데이트하는 것입니다. 이미 업데이트된 `posts`는 Context를 구독하는 컴포넌트에서 자동으로 받을 수 있습니다. 호출하는 쪽이 `const posts = await refreshPosts()`처럼 반환값을 별도로 받을 이유가 없습니다. `Promise<Post[]>`로 바꾸면 함수가 상태 업데이트와 데이터 반환이라는 두 가지 책임을 가지게 되어, 어떤 데이터가 “진짜” 소스인지(Context의 `posts`인지, 반환값인지) 모호해집니다. `void` 반환은 “이 함수의 유일한 효과는 사이드 이펙트(상태 업데이트)”임을 명시합니다.
    

# 제 7장: Tanstack Query 타입 적용하기

## **7-01. 요청 함수와 오류 모양 정리**

서버 데이터를 다시 읽고 보관하는 도구를 설명할 때 가장 자주 생기는 오해는 `useQuery`만 배우면 된다고 생각하는 것입니다. 그러나 실제로는 세 가지가 먼저 준비되어야 합니다. 브라우저가 어떤 주소로 요청을 보내는지, 실패하면 어떤 오류를 던지는지, 여러 페이지로 나눠 읽을 때 어떤 형태로 돌려주는지입니다. 이 기반이 정해진 다음에야 `useQuery`의 타입도 자연스럽게 읽힙니다.

이번 실습은 이 문제를 피하기 위해 `request<T>()` 함수를 바탕에 두고, 그 위에 `getPosts()`, `getPost()`, `createPost()`, `updatePost()`, `deletePost()`, `getPostPage()`를 쌓았습니다.

아래 코드는 공통 요청 함수와 게시글 API 함수를 연결한 실제 구현입니다. 이 단계에서 이미 `Post[]`, `Post`, `PostPage`, `HttpError`가 정리되어 있으므로, 뒤에서 `useQuery<Post[], HttpError>`와 같은 형태가 낯선 꺾쇠 문법이 아니라 자연스러운 타입 선언으로 읽히게 됩니다.

파일: `src/lib/api/request.ts`

```tsx
export class HttpError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

interface RequestOptions extends RequestInit {
  message?: string;
}

export async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { message = "API 요청에 실패했습니다.", headers, ...restOptions } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...restOptions,
  });

  if (!response.ok) {
    throw new HttpError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
```

파일: `src/lib/api/posts.ts`

```tsx
import type { Post, PostMutationInput, PostPage } from "@/domains/posts/types";
import { LOCAL_POSTS_PAGE_LIMIT } from "@/domains/posts/utils/constants";
import { request } from "@/lib/api/request";

interface PaginatedPostsResponse {
  data: Post[];
  next: number | null;
}

export async function getPosts() {
  return request<Post[]>("/posts", {
    message: "포스트 목록을 불러오지 못했습니다.",
  });
}

export async function getPost(postId: string) {
  return request<Post>(`/posts/${postId}`, {
    message: "포스트 상세 정보를 불러오지 못했습니다.",
  });
}

export async function createPost(input: PostMutationInput) {
  return request<Post>("/posts", {
    method: "POST",
    body: JSON.stringify(input),
    message: "포스트를 등록하지 못했습니다.",
  });
}

export async function updatePost(postId: string, input: PostMutationInput) {
  return request<Post>(`/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify({ id: postId, ...input }),
    message: "포스트를 수정하지 못했습니다.",
  });
}

export async function deletePost(postId: string) {
  return request<void>(`/posts/${postId}`, {
    method: "DELETE",
    message: "포스트를 삭제하지 못했습니다.",
  });
}

export async function getPostPage(
  page: number,
  limit = LOCAL_POSTS_PAGE_LIMIT,
): Promise<PostPage> {
  const safePage = Math.max(page, 1);
  const paginatedPosts = await request<PaginatedPostsResponse>(
    `/posts?page=${safePage}&limit=${limit}`,
    {
      message: "포스트 페이지를 불러오지 못했습니다.",
    },
  );

  return {
    items: paginatedPosts.data,
    nextPage: paginatedPosts.next,
  };
}
```

| 함수 | 반환 타입 | 실패 시 의미 |
| --- | --- | --- |
| `request<T>()` | `Promise<T>` | `HttpError` 발생 |
| `getPosts()` | `Promise<Post[]>` | 목록 조회 실패 |
| `getPost()` | `Promise<Post>` | 단일 조회 실패 |
| `getPostPage()` | `Promise<PostPage>` | 서버 페이지 결과를 무한 조회용 구조로 변환 |

여기서 `getPosts()`와 `getPostPage()`는 이름이 비슷해 보여도 역할이 다릅니다. `getPosts()`는 백엔드가 기본으로 적용하는 `id` 내림차순의 전체 목록을 읽는 함수이고, `getPostPage()`는 `page`, `limit` 계약으로 받은 서버 페이지 응답에서 `data`, `next`만 꺼내 교재 전반에서 쓰는 `PostPage` 구조로 다시 정리하는 함수입니다. 예를 들어 `useQuery`가 에러 메시지를 보여 줄 수 있는 것은 `request()`가 실패를 `HttpError`라는 일정한 형태의 오류로 던지기 때문이고, 여러 페이지를 이어 읽을 수 있는 것은 `getPostPage()`가 서버 응답을 `items`, `nextPage` 구조로 정리해 주기 때문입니다.

## **7-01.** #Quiz **요청 함수와 오류 모양 정리**

### 문제 1

`request<T>()` 안에 아래 분기가 필요한 가장 직접적인 이유는 무엇인가?

```tsx
if (response.status === 204) {
  return undefined as T;
}
```

1. `204 No Content`는 본문이 없어 `response.json()`을 호출하면 파싱 오류가 나므로, 이 분기에서 미리 `undefined`를 반환해 `request<void>()` 호출자와 타입을 맞추기 위해서다
2. `204` 응답도 실제로는 JSON 본문이 있으므로 `undefined`로 잠시 바꿔 두는 것이다
3. `fetch()`는 모든 성공 응답을 반드시 `string`으로 반환하므로 이를 `undefined`로 수동 변환해야 한다
4. TypeScript는 `Promise<void>`를 표현할 수 없으므로 우회가 필요하다
- 정답 및 해설
    
    **정답:** 1번
    
    **해설:** `204 No Content`는 이름 그대로 응답 본문이 없는 성공 응답입니다. 그런데 `request<T>()`는 항상 `Promise<T>` 형태로 결과를 돌려주는 공통 함수이므로, 본문이 비어 있는 경우를 별도로 처리해야 합니다. 이 분기가 있으면 `deletePost()`처럼 `request<void>()`를 사용하는 코드도 같은 공통 함수 위에서 읽을 수 있습니다. 핵심은 “성공했지만 본문이 없는 응답”을 공통 요청 함수 단계에서 먼저 정리하는 데 있습니다.
    

### 문제 2

`getPostPage()`가 `Post[]` 대신 `PostPage`를 반환하도록 설계한 이유를 설명하세요.

- 정답 및 해설
    
    `getPostPage()`의 목적은 단순히 목록 일부를 잘라 주는 데서 끝나지 않습니다. 여러 페이지를 이어 읽는 단계에서는 “현재 페이지 항목”과 함께 “다음 페이지가 있는가”라는 정보도 같이 필요합니다. 그래서 이 함수는 `items: Post[]`와 `nextPage: number | null`을 묶은 `PostPage`를 반환합니다. 이 구조 덕분에 뒤의 `useInfiniteQuery` 절에서 마지막 페이지의 `nextPage`를 읽어 다음 요청 여부를 판단할 수 있습니다.
    

### 문제 3

뒤에서 `useQuery<Post, HttpError>`나 `useMutation<..., HttpError, ...>`처럼 에러 타입을 `HttpError`로 읽을 수 있는 가장 직접적인 이유는 무엇인가?

1. `fetch()`가 실패하면 브라우저가 자동으로 `HttpError` 인스턴스를 던지기 때문이다
2. `Post` 타입 안에 `status` 필드가 들어 있어 조회 결과가 곧 오류 정보가 되기 때문이다
3. TanStack Query가 모든 `Error`를 자동으로 `HttpError`로 바꿔 주기 때문이다
4. 공통 요청 함수 `request()`가 `response.ok`가 아닌 경우 `HttpError`를 직접 던지도록 설계되어 있기 때문이다
- 정답 및 해설
    
    **정답:** 4번
    
    **해설:** 이 절에서 `HttpError`를 먼저 정의한 이유는 실패 응답의 모양을 일정하게 만들기 위해서입니다. `request()`는 `response.ok`가 `false`이면 `throw new HttpError(message, response.status)`를 실행합니다. 따라서 이후 `getPost()`나 `createPost()`를 사용하는 Query 계층은 실패를 모두 같은 오류 형태로 받게 됩니다. `useQuery`나 `useMutation`이 `HttpError`를 읽을 수 있는 이유는 라이브러리가 자동 변환하기 때문이 아니라, 요청 함수가 처음부터 그 모양으로 실패를 던지도록 설계되어 있기 때문입니다.
    

## **7-02. useQuery, useMutation 타입 적용**

서버 상태를 다룰 때 로컬 상태보다 어려운 점은 결과 타입과 입력 타입이 동시에 등장한다는 것입니다. 조회는 “무엇을 돌려주는가”가 핵심이지만, 변경은 “무엇을 받아서 무엇을 돌려주는가”까지 함께 읽어야 합니다. 그래서 `useMutation<Post, HttpError, PostMutationInput>` 같은 선언이 처음에는 길어 보입니다. TypeScript에서는 이런 꺾쇠 표기를 제네릭이라고 부르지만, 지금 단계에서는 이름보다 각 자리가 무슨 역할인지 파악하는 편이 더 중요합니다.

꺾쇠 안의 자리를 역할별로 나눠 보면 구조는 단순합니다.

| 자리 | 역할 | 이 실습에서 |
| --- | --- | --- |
| 1번 `TData` | 뮤테이션 함수의 반환 타입 | 생성/수정은 `Post`, 삭제는 `void` |
| 2번 `TError` | 실패 시 던질 오류 타입 | `HttpError` |
| 3번 `TVariables` | `mutate`에 넣는 입력 타입 | 생성은 `PostMutationInput`, 삭제는 `string` |

업데이트처럼 추가 정보가 더 필요한 경우에는 `UpdatePostVariables` 같은 별도 인터페이스를 두는 편이 흐름이 가장 명확해집니다. 반대로 삭제처럼 성공 응답 본문이 없는 요청은 `TData`를 `void`로 두는 편이 서버 의미와 잘 맞습니다.

| Hook | 성공 타입 | 에러 타입 | 입력 타입 |
| --- | --- | --- | --- |
| `useQuery<Post[], HttpError>` | `Post[]` | `HttpError` | 없음 |
| `useQuery<Post, HttpError>` | `Post` | `HttpError` | 없음 |
| `useMutation<Post, HttpError, PostMutationInput>` | `Post` | `HttpError` | 생성 입력 |
| `useMutation<Post, HttpError, UpdatePostVariables>` | `Post` | `HttpError` | 수정 대상 + 수정 입력 |
| `useMutation<void, HttpError, string>` | `void` | `HttpError` | 삭제 대상 ID |

아래 코드에서 위 표의 타입 자리들이 실제로 어떻게 채워지는지 확인할 수 있습니다. 조회 Hook은 `usePostQueries.ts`에, 변경 Hook은 `usePostMutations.ts`에 분리했습니다. 변경 요청이 끝난 뒤에는 `onSuccess`에서 관련 쿼리를 무효화하거나 제거해 서버 데이터와 캐시를 맞춥니다.

파일: `src/domains/posts/hooks/usePostQueries.ts`

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { getPost, getPosts } from "@/lib/api/posts";
import { HttpError } from "@/lib/api/request";
import { queryKeys } from "@/lib/query-keys";
import type { Post } from "@/domains/posts/types";

export function usePostsQuery(initialPosts?: Post[]) {
  return useQuery<Post[], HttpError>({
    queryKey: queryKeys.posts,
    queryFn: () => getPosts(),
    initialData: initialPosts,
  });
}

export function usePostQuery(postId: string | null) {
  return useQuery<Post, HttpError>({
    queryKey: queryKeys.post(postId ?? "empty"),
    queryFn: () => getPost(postId ?? ""),
    enabled: Boolean(postId),
  });
}
```

`usePostQuery`에서 `postId: string | null`을 받는 이유가 있습니다. 목록 화면에서 게시글이 아직 선택되지 않은 상태는 `null`로 표현됩니다. `postId`가 없을 때 Hook 호출을 건너뛰고 싶어도, React의 Hook 규칙상 `if (postId) { usePostQuery(postId) }` 같은 조건부 호출은 금지됩니다. `null`을 타입에 포함시키고 내부에서 `enabled: Boolean(postId)`로 처리하면, 컴포넌트는 항상 Hook을 호출하면서도 `postId`가 없을 때는 쿼리가 실행되지 않습니다.

파일: `src/domains/posts/hooks/usePostMutations.ts`

```tsx
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  deletePost,
  updatePost,
} from "@/lib/api/posts";
import { HttpError } from "@/lib/api/request";
import { queryKeys } from "@/lib/query-keys";
import type { Post, PostMutationInput } from "@/domains/posts/types";

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation<Post, HttpError, PostMutationInput>({
    mutationFn: createPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      await queryClient.invalidateQueries({ queryKey: queryKeys.infinitePosts });
    },
  });
}

interface UpdatePostVariables {
  postId: string;
  input: PostMutationInput;
}

export function useUpdatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation<Post, HttpError, UpdatePostVariables>({
    mutationFn: ({ postId, input }) => updatePost(postId, input),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      await queryClient.invalidateQueries({ queryKey: queryKeys.post(variables.postId) });
      await queryClient.invalidateQueries({ queryKey: queryKeys.infinitePosts });
    },
  });
}

export function useDeletePostMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, HttpError, string>({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: async (_, deletedPostId) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      queryClient.removeQueries({ queryKey: queryKeys.post(deletedPostId) });
      await queryClient.invalidateQueries({ queryKey: queryKeys.infinitePosts });
    },
  });
}
```

이 코드의 장점은 조회와 변경이 모두 같은 `Post` 도메인을 사용하지만, 입력과 결과를 혼동하지 않도록 타입 자리가 역할별로 고정되어 있다는 점입니다. 입력 타입을 빼 버리면 `mutate`를 호출하는 쪽에서 어떤 값을 넣어야 하는지 자동완성과 오류 검사의 도움을 거의 받을 수 없게 됩니다. 특히 삭제 예시는 `mutationFn: (postId: string) => deletePost(postId)`처럼 적어 두면, 세 번째 제네릭 `string`과 실제 입력값이 어떻게 연결되는지 코드만 보고도 바로 읽을 수 있습니다.

## **7-02.** #Quiz **useQuery, useMutation 타입 적용**

### 문제 1

아래 `useMutation<Post, HttpError, PostMutationInput>`의 세 제네릭 인자가 각각 무엇을 의미하는지 설명하고, 세 번째 인자 `PostMutationInput`을 빠뜨리면 어떤 문제가 생기는가?

```tsx
// Post = { id: string; title: string; content: string; authorId: string }
// PostMutationInput = Omit<Post, "id">
// HttpError: class HttpError extends Error { status: number }

return useMutation<Post, HttpError, PostMutationInput>({
  mutationFn: createPost,
  onSuccess: (data) => {
    // data의 타입?
  },
  onError: (error) => {
    // error의 타입?
  },
});

// 호출하는 쪽
mutation.mutate(input);
// input의 타입?
```

- 정답 및 해설
    
    `useMutation`의 세 제네릭 인자는 역할이 명확하게 나뉩니다. 첫 번째 `TData`(`Post`)는 `mutationFn`이 성공했을 때 반환하는 데이터 타입입니다. `onSuccess(data)`에서 `data`가 `Post`로 추론됩니다. 두 번째 `TError`(`HttpError`)는 실패했을 때의 에러 타입입니다. `onError(error)`에서 `error`가 `HttpError`로 추론되어 `error.status` 같은 커스텀 필드에 접근할 수 있습니다. 세 번째 `TVariables`(`PostMutationInput`)는 `mutation.mutate(input)`을 호출할 때 넘기는 인자 타입입니다. 이 인자가 그대로 `mutationFn`에 전달됩니다. 현재 실습 버전의 TanStack Query에서는 이 세 번째 타입 인자를 빼면 `TVariables` 기본값이 `void`로 남기 때문에, `createPost(input: PostMutationInput)` 같은 `mutationFn`과 타입이 바로 어긋납니다. 따라서 이 예제 구조에서는 세 번째 인자를 생략하면 타입 검사가 느슨해지는 것이 아니라, 입력 타입 연결 자체가 끊겨 `mutationFn`과 `mutate(input)` 모두에서 오류가 발생합니다.
    

### 문제 2

아래 `useDeletePostMutation`의 `onSuccess` 콜백에서 첫 번째 파라미터를 `_`로, 두 번째를 `deletedPostId`로 쓴 이유는 무엇인가?

```tsx
// deletePost는 204 No Content를 반환하므로 성공 본문은 없습니다.

export function useDeletePostMutation() {
  return useMutation<void, HttpError, string>({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: async (_, deletedPostId) => {
      //              ↑        ↑
      //           타입?    타입?
      queryClient.removeQueries({ queryKey: queryKeys.post(deletedPostId) });
    },
  });
}
```

1. `_`는 TypeScript에서 에러를 무시하는 특별 키워드이고, `deletedPostId`는 자동 생성되는 변수명이다
2. `onSuccess`의 첫 번째 파라미터 타입은 `unknown`이라 사용할 수 없어 `_`로 버린다. 두 번째 파라미터 타입도 `unknown`이다
3. `useMutation<void, HttpError, string>`에서 첫 번째 제네릭 `void`가 `onSuccess`의 첫 번째 파라미터 타입이고, 세 번째 제네릭 `string`이 두 번째 파라미터 타입이다. `_`는 “이 값을 사용하지 않겠다”는 관례적 표현이다
4. `onSuccess`는 파라미터가 두 개 이상이면 반드시 첫 번째를 `_`로 선언해야 한다는 TypeScript 규칙이 있다
- 정답 및 해설
    
    **정답:** 3번
    
    **해설:** TanStack Query의 `onSuccess` 콜백은 `(data: TData, variables: TVariables, context: TContext) => void` 형태입니다. `useMutation<void, HttpError, string>`에서 `TData`가 `void`이므로 첫 번째 파라미터는 `void` 타입입니다. `TVariables`가 `string`이므로 두 번째 파라미터는 `string` 타입입니다. 현재 삭제 API는 `204 No Content`를 반환하므로 성공 시 사용할 응답 본문이 없습니다. 그래서 첫 번째 파라미터는 `_`로 버리고, 실제로 필요한 `deletedPostId`만 두 번째 자리에서 받아 상세 캐시를 제거합니다. `deletedPostId`는 `mutate(postId)` 호출 때 넘긴 값이 그대로 전달되므로 `queryKeys.post(deletedPostId)` 호출도 타입 오류 없이 동작합니다.
    

### 문제 3

아래 두 `usePostQuery` 구현을 비교합니다. 어떤 차이가 있으며, 어느 쪽이 실무에서 더 일반적인 선택인가?

```tsx
// A: 교재 방식
export function usePostQuery(postId: string | null) {
  return useQuery<Post, HttpError>({
    queryKey: queryKeys.post(postId ?? "empty"),
    queryFn: () => getPost(postId ?? ""),
    enabled: Boolean(postId),
  });
}

// B: 대안 방식
export function usePostQuery(postId: string) {
  return useQuery<Post, HttpError>({
    queryKey: queryKeys.post(postId),
    queryFn: () => getPost(postId),
  });
}
```

1. B가 낫다. 타입이 단순하고 `enabled` 옵션이 없어 더 읽기 쉽다
2. B가 낫다. TypeScript에서 `null`을 인자 타입에 포함하면 항상 버그 위험이 높아진다
3. 둘 다 동일하다. `enabled` 옵션은 성능 최적화일 뿐이다
4. A가 더 일반적이다. 컴포넌트는 항상 Hook을 호출한 채 `enabled`로 실행만 막을 수 있기 때문이다. 다만 `postId`가 이미 보장된 하위 컴포넌트에서는 B도 유효하다
- 정답 및 해설
    
    **정답:** 4번
    
    **해설:** 이 문항에서 4번이 정답인 이유는, 현재 교재 흐름에서는 A가 더 일반적인 구성이라서입니다. `postId | null`을 받고 내부에서 `enabled: Boolean(postId)`로 처리하면, 컴포넌트는 항상 Hook을 호출하면서도 `postId`가 없을 때는 쿼리 실행만 막을 수 있습니다. 이 패턴이 Dependent Query(의존성 기반 쿼리)의 핵심입니다. 다만 B가 항상 잘못된 것은 아닙니다. 상위 컴포넌트가 `postId`를 먼저 보장한 뒤 하위 컴포넌트를 렌더링하거나, `postId`가 확정된 경계 아래에서만 이 Hook을 호출한다면 `postId: string` 시그니처도 충분히 유효합니다. 차이는 정답과 오답의 구분이라기보다, 어느 경계에서 책임을 나누느냐에 있습니다.
    

## **7-03. useInfiniteQuery 타입 적용**

무한 스크롤이나 “더 보기” 버튼은 화면 효과만 다를 뿐, 내부적으로는 페이지 결과를 계속 이어 붙이는 구조를 공유합니다. 따라서 `useInfiniteQuery`를 이해하려면 먼저 각 페이지가 무엇을 반환하는지, 다음 페이지 번호를 어떻게 계산하는지부터 파악해야 합니다.

이번 실습은 이 구조를 단순하게 보여 주기 위해 `queryKeys.infinitePosts`를 별도 키로 두고, `getPostPage(pageParam)`이 `PostPage`를 반환하도록 설계했습니다. 그 덕분에 `getNextPageParam`은 마지막 페이지의 `nextPage`만 읽으면 되고, 화면에서는 `pages.flatMap((page) => page.items)`처럼 여러 페이지의 목록을 한 줄로 이어 붙여 쓸 수 있습니다.

| 구성 요소 | 타입 | 역할 |
| --- | --- | --- |
| `queryKeys.infinitePosts` | 바뀌지 않는 `["posts", "infinite"]` 배열 | 무한 조회 전용 캐시 키 |
| `initialPageParam` | `1` | 첫 페이지 기준 |
| `queryFn` | `({ pageParam }: { pageParam: number }) => getPostPage(pageParam)` | 페이지 단위 조회 |
| `getNextPageParam` | `(lastPage: PostPage) => lastPage.nextPage` | 다음 페이지 판단 |

아래 코드는 무한 조회에 필요한 최소 구성을 담고 있습니다. 페이지 계산을 Hook 안에 숨기지 않고 API 계층과 Hook 계층으로 나눠 두었기 때문에, 타입을 따라가면 데이터 구조와 캐시 구조를 함께 이해할 수 있습니다.

파일: `src/lib/query-keys.ts`

```tsx
export const queryKeys = {
  posts: ["posts"] as const,
  post: (postId: string) => ["posts", postId] as const,
  infinitePosts: ["posts", "infinite"] as const,
};
```

`as const`를 붙이면 배열 리터럴의 타입이 `string[]` 대신 `readonly ["posts"]`처럼 요소가 리터럴 타입으로 고정된 읽기 전용 튜플이 됩니다. `as const` 없이는 `["posts"]`의 타입이 `string[]`이라 배열 요소가 `string`으로만 알려지고, 실수로 배열을 변경하는 코드도 TypeScript가 허용합니다. `as const`가 있으면 첫 번째 요소가 정확히 `"posts"` 리터럴임을 TypeScript가 알고, `.push()`처럼 배열을 변경하는 호출을 컴파일 타임에 막아 줍니다.

파일: `src/domains/posts/hooks/useInfinitePostsQuery.ts`

```tsx
"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import type { PostPage } from "@/domains/posts/types";
import { getPostPage } from "@/lib/api/posts";
import { queryKeys } from "@/lib/query-keys";

export function useInfinitePostsQuery() {
  return useInfiniteQuery({
    queryKey: queryKeys.infinitePosts,
    initialPageParam: 1,
    queryFn: ({ pageParam }: { pageParam: number }) => getPostPage(pageParam),
    getNextPageParam: (lastPage: PostPage) => lastPage.nextPage,
  });
}
```

여기서 코드에 직접 적히는 핵심 타입은 두 개입니다. `pageParam`은 `initialPageParam: 1`에서 시작하므로 `number`로 읽고, `lastPage`는 `getPostPage()`가 반환하는 한 페이지 결과이므로 `PostPage`로 읽습니다. 실제 프로젝트 코드에서는 추론에 맡길 수도 있지만, 학습 단계에서는 이 두 자리를 한 번 명시적으로 확인해 두는 편이 훨씬 이해하기 쉽습니다.

Hook을 정의했으면 화면에서 어떻게 소비하는지까지 확인해야 타입 흐름이 완성됩니다.

```tsx
// PostPage = { items: Post[]; nextPage: number | null }

const { data, fetchNextPage, hasNextPage } = useInfinitePostsQuery();

const posts = data?.pages.flatMap((page) => page.items) ?? [];
// posts: Post[]
```

`data.pages`의 타입은 `PostPage[]`입니다. 각 `PostPage` 안에 `items: Post[]`가 있으므로, `pages.map(p => p.items)`를 쓰면 `Post[][]`(배열의 배열)가 됩니다. `flatMap`은 중첩을 한 단계 펼쳐 `Post[]`로 만들어, 그대로 렌더링에 넘길 수 있습니다. `?? []`는 `data`가 아직 `undefined`일 때 빈 배열로 대체합니다. TypeScript는 이 식 전체의 타입을 `Post[]`로 추론합니다.

## **7-03.** #Quiz **useInfiniteQuery 타입 적용**

### 문제 1

`useInfiniteQuery`의 반환값 구조와 `useQuery<Post[]>`의 반환값 구조를 비교하여, 화면에서 `posts` 배열을 만들기 위해 `flatMap`이 필요한 이유를 TypeScript 타입 관점에서 설명하세요.

```tsx
// useQuery<Post[]>의 경우
const { data } = useQuery<Post[]>(...);
// data: Post[] | undefined

// useInfiniteQuery의 경우
const { data } = useInfiniteQuery(...);
// data: { pages: PostPage[], pageParams: number[] } | undefined

// 화면에서 사용
const posts = data?.pages.flatMap((page) => page.items) ?? [];
```

- 정답 및 해설
    
    `useQuery<Post[]>`의 `data`는 `Post[] | undefined`입니다. 바로 `data?.map(...)` 형태로 사용할 수 있습니다. `useInfiniteQuery`의 `data`는 구조가 다릅니다. TanStack Query는 각 페이지 응답을 `pages` 배열에 순서대로 쌓아 둡니다. `data.pages`의 타입은 `PostPage[]`이고, 각 `PostPage`에는 `items: Post[]`가 있습니다. `.map(p => p.items)`를 쓰면 각 페이지의 `items` 배열이 그대로 남아 반환 타입이 `Post[][]`(배열의 배열)가 됩니다. `flatMap`은 중첩 배열을 한 단계 펼쳐 `Post[]`로 만듭니다. TypeScript의 타입 추론에서도 `pages.map(p => p.items)`의 반환 타입은 `Post[][]`이고, `pages.flatMap(p => p.items)`의 반환 타입은 `Post[]`입니다. 따라서 이 예제처럼 화면에서 곧바로 `Post[]`가 필요하다면, 중첩 배열을 평탄화하는 단계가 반드시 필요합니다.
    

### 문제 2

아래 `useInfiniteQuery`에서 `queryFn`의 `pageParam` 타입이 `number`로 추론되는 이유는 무엇인가?

```tsx
// PostPage = { items: Post[]; nextPage: number | null }

export function useInfinitePostsQuery() {
  return useInfiniteQuery({
    queryKey: queryKeys.infinitePosts,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getPostPage(pageParam),
    //                ↑ pageParam의 타입?
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
```

1. `pageParam`의 타입은 `unknown`이다 — 런타임에 어떤 값이 들어올지 알 수 없기 때문이다
2. `initialPageParam: 1`에서 `1`의 타입이 `number`이므로, TanStack Query가 `pageParam`의 타입을 `number`로 추론한다
3. `getNextPageParam`의 반환 타입이 `number | null`이므로 `pageParam`도 그에 맞춰 추론된다
4. `getPostPage`의 파라미터 타입이 `number`이므로 TypeScript가 역방향으로 추론한다
- 정답 및 해설
    
    **정답:** 2번
    
    **해설:** TanStack Query v5는 `initialPageParam`의 타입에서 `TPageParam`을 추론합니다. `initialPageParam: 1`에서 `1`은 `number` 타입이므로, `TPageParam`이 `number`로 결정됩니다. 이후 `queryFn`의 `pageParam`도 `number`로 추론됩니다. `getNextPageParam`이 `number | null`을 반환해도 TypeScript는 `null`을 “더 이상 페이지가 없음” 신호로 처리합니다. `null`이 반환되면 TanStack Query는 `hasNextPage`를 `false`로 설정하고 `pageParam`으로는 전달하지 않습니다. 따라서 `queryFn`이 받는 `pageParam`은 항상 `number`입니다. `initialPageParam`의 타입이 전체 페이지 파라미터 타입을 결정한다는 점이 핵심입니다.
    

### 문제 3

아래 `queryKeys`에서 `as const`를 붙이는 것과 붙이지 않는 것의 TypeScript 타입 차이는?

```tsx
// as const 없음
const queryKeysA = {
  posts: ["posts"],
  post: (postId: string) => ["posts", postId],
};
// queryKeysA.posts의 타입: string[]

// as const 있음
export const queryKeys = {
  posts: ["posts"] as const,
  post: (postId: string) => ["posts", postId] as const,
};
// queryKeys.posts의 타입: ?
```

1. `as const`를 붙여도 타입은 동일하다 — TypeScript는 배열 리터럴을 항상 `string[]`으로 추론한다
2. `as const` 없이도 충분하다 — `string[]`도 queryKey로 쓰는 데 문제없다
3. `as const` 없으면 `["posts"]`의 타입이 `string[]`(변경 가능한 배열)이 되고, `as const`를 붙이면 `readonly ["posts"]`(읽기 전용 튜플)이 된다. 배열 요소가 `string` 대신 리터럴 타입 `"posts"`로 좁혀진다
4. `as const`는 런타임에서 배열을 변경하지 못하게 막는다. TypeScript 타입에는 영향이 없다
- 정답 및 해설
    
    **정답:** 3번
    
    **해설:** `as const`를 붙이지 않으면 `["posts"]`의 타입은 `string[]`입니다. 배열의 요소 타입이 `string`으로 넓어지고 배열 자체도 변경 가능합니다. `as const`를 붙이면 `readonly ["posts"]`처럼 요소가 리터럴 타입 `"posts"`로 고정된 읽기 전용 튜플이 됩니다. 함수 반환 `["posts", postId] as const`는 `readonly [string, string]`이 아니라 `readonly ["posts", string]`이 됩니다. 이 좁은 타입 덕분에 `queryKeys.posts`를 쓰는 쪽에서 TypeScript가 정확히 어떤 배열인지 알 수 있고, 실수로 `queryKeys.posts.push("extra")`처럼 queryKey를 오염시키는 코드를 컴파일 타임에 막을 수 있습니다.