# 23. Vanilla-extract 사용하기

## 1-01. 완성된 코드 보기

```bash
https://github.com/winverse/codeit-fs-vanilla-extract.git
```

- 라이트 모드
    
    ![스크린샷 2026-01-18 17.26.45.png](23%20Vanilla-extract%20%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2026-01-18_17.26.45.png)
    
- 다크 모드
    
    ![스크린샷 2026-01-18 17.27.16.png](23%20Vanilla-extract%20%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2026-01-18_17.27.16.png)
    

## 1-02. 시작하기

### 학습 목표

- vanilla-extract가 필요한 이유를 이해합니다.
- `style`과 `globalStyle`의 역할을 구분합니다.

### vanilla-extract란?

CSS를 작성할 때 자주 겪는 문제가 있습니다:

1. **클래스 이름 충돌**: 다른 파일에서 같은 이름을 쓰면 스타일이 덮어씌워집니다.
2. **스타일 파편화**: 스타일이 여러 곳에 흩어져 관리가 어렵습니다.
3. SSR/SSG 같은 서버 렌더링 환경에서도 자연스럽게 동작합니다.
    - 자세한 설명
        
        <aside>
        💡
        
        SSR/SSG는 “어디서 렌더링하느냐”의 문제이고, vanilla-extract는 “스타일을 언제 생성하느냐”의 문제입니다. vanilla-extract는 스타일을 **빌드 타임(npm run build)에 순수 CSS로 생성**하므로, 렌더링이 서버에서 일어나든(SSR/SSG) 클라이언트에서 일어나든 **동일한 CSS 파일을 로드**하는 구조가 됩니다. 그래서 서버 렌더링 환경에서도 별도의 런타임 스타일 생성/주입 로직 없이 일관되게 동작합니다.
        
        반대로 런타임 CSS-in-JS(styled-components, emotion.js …)는 스타일을 렌더링 과정에서 **런타임에 생성하고 주입**하는 특성이 있어, App Router처럼 **Server Components가 기본인 구조와는 철학이 다릅니다.** 
        
        결국 스타일을 안정적으로 처리하려면 레지스트리/주입 같은 파이프라인을 얹고, 많은 경우 해당 영역을 **Client Component로 감싸는 방식**으로 해결하게 됩니다.
        
        이 과정은 “설정으로 해결”이라기보다, **React Server Component (RSC)가 주는 장점(클라이언트 번들 최소화, 서버 중심 렌더링)을 일부 포기하고 우회하는 선택**에 가깝습니다. 
        
        따라서 새 프로젝트에서 Nextjs App Router의 이점을 최대한 살리려면, 런타임 CSS-in-JS보다 **빌드 타임 스타일링(CSS Modules, vanilla-extract 등)**이 구조적으로 더 자연스럽습니다.
        
        </aside>
        

vanilla-extract는 이러한 문제를 해결합니다.

**핵심 특징:**

- **클래스 이름 자동 생성**: 빌드 시 고유한 이름이 만들어져 충돌이 없습니다.
- **컴포넌트별 스타일 분리**: 각 컴포넌트마다 스타일 파일을 관리할 수 있습니다.
- **빌드 타임 CSS 생성**: JS로 작성하지만, 빌드 결과물은 순수 CSS 파일입니다.

**동작 흐름:**

```
JS로 스타일 작성 → 빌드 → CSS 파일 생성 → 브라우저 로드
```

### 프로젝트 생성

Vite로 React 프로젝트를 생성합니다:

```bash
npm create vite@latest vanilla-extract-start
```

vite 선택된 옵션:

- **Select a Framework**: React
- **Select a Variant**: JavaScript + React Compiler
- **Use rolldown-vite (Experimental)?:** No
- **Install with npm and start now?:** No

프로젝트 폴더로 이동하여 패키지를 설치합니다:

```bash
cd vanilla-extract-start
npm install
```

### vanilla-extract 설치

```bash
npm install @vanilla-extract/css
npm install -D @vanilla-extract/vite-plugin
```

**파일: `vite.config.js`**

```jsx
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    vanillaExtractPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve('src')
    },
  },
});
```

**팁: `@` alias**

`resolve.alias`에 `@`를 설정하면 import 경로가 짧아집니다:

```jsx
// 변경 전
import { vars } from '../../../styles/theme.css.js';

// 변경 후
import { vars } from '@/styles/theme.css.js';
```

**파일: `jsconfig.json`**

```jsx
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

개발 서버 실행:

```bash
npm run dev
```

**파일: `.prettierrc`** 

```json
{
  "printWidth": 80,
  "bracketSpacing": true,
  "trailingComma": "all",
  "semi": true,
  "singleQuote": true
}
```

**파일: `package.json`**

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "format": "npx prettier --write ." // 추가
  },
```

```json
npm run format
```

### 전역 스타일 설정

모든 페이지에 공통으로 적용할 스타일은 `globalStyle`로 정의합니다.

**파일: `src/styles/global.css.js`**

```jsx
import { globalStyle } from '@vanilla-extract/css';

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
});

globalStyle('#root', {
  minHeight: '100vh',
});

globalStyle('button, input, textarea', {
  fontFamily: 'inherit',
});
```

파일 `index.css`, `App.css` 삭제

**파일: `App.js`**

```jsx
function App() {
  return <>App</>;
}

export default App;
```

⚠️ **중요:** 전역 스타일 파일은 앱 진입점에서 반드시 import해야 적용됩니다.

**파일: `src/main.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@/styles/global.css.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 정리

| 개념 | 설명 |
| --- | --- |
| vanilla-extract | 빌드 타임에 CSS를 생성하는 라이브러리 |
| `globalStyle` | 전역 규칙(body, reset 등)을 정의 |
| `style` | 컴포넌트별 클래스를 정의 (다음 강의) |

## 1-03. 테마와 토큰 (내부에 실습 있음)

### 학습 목표

- `createTheme`으로 테마를 만드는 방법을 익힙니다.
- 색상, 간격을 한 곳에서 관리하는 방법을 배웁니다.

### 토큰이 필요한 이유

`padding: '16px'`처럼 직접 값을 입력하면 처음에는 빠르게 작업할 수 있습니다. 하지만 프로젝트가 커지면 문제가 생깁니다:

### 1. 결정 피로 감소 (Decision Fatigue)

개발 중 "여백을 15px로 할까? 16px? 20px?"라는 고민이 반복됩니다.

토큰으로 미리 정해두면:

- 좁은 간격 → `sm`
- 보통 간격 → `md`
- 넓은 간격 → `lg`

고민 없이 선택할 수 있어 개발 속도가 빨라집니다.

### 2. 디자인 통일성 (Consistency)

여러 페이지를 만들다 보면:

- 페이지 A: `border-radius: 4px`
- 페이지 B: `border-radius: 5px`
- 페이지 C: `border-radius: 6px`

미세한 차이가 쌓이면 웹사이트가 조잡해 보입니다.

토큰으로 "둥글기는 `md(12px)` 또는 `lg(16px)`만 사용한다"라고 규칙을 정하면 일관성이 유지됩니다.

### 3. 유지보수 용이성 (Scalability)

디자이너가 "전체 여백을 넓혀달라"고 요청했다면:

**하드코딩 방식:**

- 파일 100개를 열어 `16px`를 찾아 수정해야 합니다.
- 실수로 다른 16px까지 수정할 수 있습니다.

**토큰 방식:**

- `tokens.css.js` 파일에서 `md: '16px'`를 `md: '20px'`로 변경합니다.
- 모든 곳에 즉시 반영됩니다.

### 실습! 테마 토큰 만들기

색상처럼 라이트/다크 모드에 따라 바뀌는 값은 `createThemeContract`와 `createTheme`으로 정의합니다.

**파일: `src/styles/theme.css.js`**

```jsx
import { createTheme, createThemeContract } from '@vanilla-extract/css';

// 1단계: 토큰 구조 정의 (어떤 값이 필요한지)
export const vars = createThemeContract({
  color: {
    primary: null,
    primaryHover: null,
    surface: null,
    background: null,
    border: null,
    text: null,
    muted: null,
  },
});

// 2단계: 라이트 테마 값 채우기
export const lightTheme = createTheme(vars, {
  color: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    surface: '#ffffff',
    background: '#f8fafc',
    border: '#e5e7eb',
    text: '#111827',
    muted: '#6b7280',
  },
});

// 3단계: 다크 테마 값 채우기
export const darkTheme = createTheme(vars, {
  color: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    surface: '#111827',
    background: '#0b1120',
    border: '#334155',
    text: '#f8fafc',
    muted: '#94a3b8',
  },
});
```

**`createThemeContract` 사용 이유:**

"틀(contract)"을 먼저 정의하면, 새로운 테마 추가 시 빠뜨리는 값 없이 모든 색상을 채워야 하므로 실수를 방지할 수 있습니다.

### 고정 토큰 만들기

테마와 무관하게 항상 같은 값을 사용하는 토큰(간격, 둥글기, 그림자)은 `createGlobalTheme`으로 정의합니다.

**파일: `src/styles/tokens.css.js`**

```jsx
import { createGlobalTheme } from '@vanilla-extract/css';

export const tokens = createGlobalTheme(':root', {
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    md: '12px',
    lg: '16px',
  },
  shadow: {
    sm: '0 8px 20px rgba(15, 23, 42, 0.08)',
  },
});

// ⚠️ 중요: breakpoint는 별도의 일반 상수로 정의
// CSS 미디어 쿼리에서는 var()를 사용할 수 없습니다
export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
};
```

**breakpoint를 분리하는 이유:**

CSS 미디어 쿼리에서는 CSS 변수(`var(--xxx)`)를 사용할 수 없습니다:

```css
/* ❌ 작동하지 않음 */
@media (min-width: var(--breakpoint-md)) { ... }

/* ✅ 직접 값을 넣어야 함 */
@media (min-width: 768px) { ... }
```

따라서 `breakpoints`는 CSS 변수가 아닌 일반 JavaScript 상수로 정의합니다.

### 테마 적용

**파일: `src/app.css.js`**

```jsx
import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';
import { tokens, breakpoints } from '@/styles/tokens.css.js';

export const page = style({
  minHeight: '100vh',
  padding: tokens.space.xl,
  backgroundColor: vars.color.background,
  color: vars.color.text,
  transition: 'background-color 0.3s ease, color 0.3s ease',
});

export const container = style({
  maxWidth: '960px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.lg,
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.sm,
});

export const grid = style({
  display: 'grid',
  gap: tokens.space.md,
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const card = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: tokens.radius.lg,
  padding: tokens.space.lg,
  boxShadow: tokens.shadow.sm,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.sm,
});

export const buttonRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: tokens.space.sm,
});

export const formRow = style({
  display: 'grid',
  gap: tokens.space.sm,
});

```

**파일: `src/App.jsx`**

```jsx
import { useState } from 'react';
// TODO: 완성 후 아래 주석을 해제하세요
// import { Button } from './components/Button';
// import { Input } from './components/Input';
// import { Modal } from './components/Modal';
import { darkTheme, lightTheme } from '@/styles/theme.css.js';
import {
  buttonRow,
  card,
  container,
  formRow,
  grid,
  header,
  page,
} from './app.css.js';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const activeTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <div className={`${activeTheme} ${page}`}>
      <div className={container}>
        <header className={header}>
          <h1>vanilla-extract 스타일 연습</h1>
          <p>
            공용 컴포넌트와 토큰을 먼저 만들어두면 화면 작업 속도가
            빨라집니다.
          </p>
          {/* TODO: Button 컴포넌트를 완성한 후 아래 주석을 해제하세요 */}
          {/* 
          <Button
            variant="secondary"
            onClick={() => setIsDarkMode((prev) => !prev)}
          >
            {isDarkMode ? '라이트 모드' : '다크 모드'}
          </Button>
          */}
          <button onClick={() => setIsDarkMode((prev) => !prev)}>
            {isDarkMode ? '라이트 모드' : '다크 모드'}
          </button>
        </header>

        <section className={card}>
          <h2>Button Variants</h2>
          <div className={buttonRow}>
            {/* TODO: Button 컴포넌트를 완성한 후 여기에 버튼들을 추가하세요 */}
            {/* 
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
            */}
            <p style={{ color: '#6b7280' }}>Button 컴포넌트를 완성해주세요!</p>
          </div>
        </section>

        <section className={card}>
          <h2>Input</h2>
          <div className={formRow}>
            {/* TODO: Input 컴포넌트를 완성한 후 여기에 인풋들을 추가하세요 */}
            {/* 
            <Input placeholder="검색어를 입력하세요" />
            <Input placeholder="비활성화 상태" disabled />
            */}
            <p style={{ color: '#6b7280' }}>Input 컴포넌트를 완성해주세요!</p>
          </div>
        </section>

        <section className={grid}>
          <article className={card}>
            <h3>Modal Preview</h3>
            <p>필요한 순간에만 모달을 열어 사용자 흐름을 방해하지 않습니다.</p>
            {/* TODO: Modal 컴포넌트를 완성한 후 아래 주석을 해제하세요 */}
            {/* <Button onClick={() => setIsModalOpen(true)}>모달 열기</Button> */}
            <button onClick={() => setIsModalOpen(true)}>모달 열기</button>
          </article>
          <article className={card}>
            <h3>Design Tokens</h3>
            <p>
              색상과 간격을 토큰으로 관리하면 전체 톤을 쉽게 통일할 수
              있습니다.
            </p>
          </article>
          <article className={card}>
            <h3>Responsive</h3>
            <p>이 카드 그리드는 768px 이상에서 3열로 변합니다.</p>
          </article>
        </section>
      </div>

      {/* TODO: Modal 컴포넌트를 완성한 후 아래 주석을 해제하세요 */}
      {/* 
      {isModalOpen ? (
        <Modal title="알림" onClose={() => setIsModalOpen(false)}>
          공용 모달은 메시지를 바꿔가며 재사용할 수 있습니다.
        </Modal>
      ) : null}
      */}
    </div>
  );
}

```

`activeTheme` 클래스를 최상위 요소에 적용하면, 그 안에서 `vars.color.xxx`를 사용할 수 있습니다.

### 정리

| 개념 | 용도 |
| --- | --- |
| `createThemeContract` | 테마 토큰 구조 정의 |
| `createTheme` | 각 테마별 값 채우기 |
| `createGlobalTheme` | 고정 토큰 정의 (space, radius) |
| `breakpoints` (상수) | 미디어 쿼리용 값 (CSS 변수 불가) |

## 1-04. 공용 컴포넌트 만들기 (내부에 실습 있음)

### 학습 목표

- Button, Input을 공용 컴포넌트로 분리하는 방법을 배웁니다.
- variant/size 패턴을 익힙니다.

### 공용 컴포넌트의 필요성

버튼 스타일을 매번 인라인으로 작성하면:

```jsx
// 페이지 A
<button style={{ background: 'blue', padding: '10px' }}>확인</button>

// 페이지 B
<button style={{ background: '#2563eb', padding: '12px' }}>저장</button>

```

같은 "Primary 버튼"인데 스타일이 미묘하게 다릅니다.

공용 컴포넌트를 만들면:

```jsx
<Button variant="primary">확인</Button>
<Button variant="primary">저장</Button>
```

일관된 디자인과 유지보수 편의성을 얻을 수 있습니다.

### 폴더 구조

```
src/
└── components/
    └── Button/
        ├── Button.jsx
        ├── Button.css.js
        └── index.js
```

### clsx 설치

여러 클래스를 조합할 때 사용하는 유틸리티입니다:

```bash
npm install clsx
```

### 실습: Button 컴포넌트

### 스타일 파일

**파일: `src/components/Button/Button.css.js`**

```jsx
import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';
import { tokens } from '@/styles/tokens.css.js';

export const buttonBase = style({
  border: '1px solid transparent',
  borderRadius: tokens.radius.md,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.space.xs,
  fontWeight: 600,
  transition: 'all 0.2s ease',
  ':focus': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: '2px',
  },
  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
});

export const buttonVariants = styleVariants({
  primary: {
    backgroundColor: vars.color.primary,
    color: '#ffffff',
    ':hover': {
      backgroundColor: vars.color.primaryHover,
    },
  },
  secondary: {
    backgroundColor: vars.color.surface,
    color: vars.color.text,
    borderColor: vars.color.border,
    ':hover': {
      borderColor: vars.color.primary,
      color: vars.color.primary,
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: vars.color.text,
    ':hover': {
      backgroundColor: 'rgba(37, 99, 235, 0.08)',
      color: vars.color.primary,
    },
  },
});

export const buttonSizes = styleVariants({
  sm: {
    padding: `${tokens.space.xs} ${tokens.space.sm}`,
    fontSize: '14px',
  },
  md: {
    padding: `${tokens.space.sm} ${tokens.space.md}`,
    fontSize: '15px',
  },
  lg: {
    padding: `${tokens.space.md} ${tokens.space.lg}`,
    fontSize: '16px',
  },
});
```

**`styleVariants` 설명:**

비슷한 스타일의 변형들을 한 번에 정의할 수 있습니다. `buttonVariants.primary`, `buttonVariants.secondary`로 접근합니다.

### 컴포넌트 파일

**파일: `src/components/Button/Button.jsx`**

```jsx
import clsx from 'clsx';
import { buttonBase, buttonSizes, buttonVariants } from './Button.css.js';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}) {
  const safeVariant = buttonVariants[variant] ?? buttonVariants.primary;
  const safeSize = buttonSizes[size] ?? buttonSizes.md;

  return (
    <button
      className={clsx(buttonBase, safeVariant, safeSize)}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
```

### export 파일

**파일: `src/components/Button/index.js`**

```jsx
export { default as Button } from './Button.jsx';
```

### Button 사용 예시

```jsx
// TODO: 완성 후 아래 주석을 해제하세요
import { Button } from './components/Button'; // 주석 해제

function App() {
  return (
	  // 기존 코드
    <Button
      variant="secondary"
      onClick={() => setIsDarkMode((prev) => !prev)}
    >
      {isDarkMode ? '라이트 모드' : '다크 모드'}
    </Button>
		
		// ----  삭제 ----
    <button onClick={() => setIsDarkMode((prev) => !prev)}>
      {isDarkMode ? '라이트 모드' : '다크 모드'}
    </button>
    // ----  삭제 ----
    
	  // 기존 코드
		<div className={buttonRow}>
	    {/* TODO: Button 컴포넌트를 완성한 후 여기에 버튼들을 추가하세요 */}
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button disabled>Disabled</Button>
      <p style={{ color: '#6b7280' }}>Button 컴포넌트를 완성해주세요!</p>
    </div>
  );
}
```

### 실습: Input 컴포넌트

**파일: `src/components/Input/Input.css.js`**

```jsx
import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';
import { tokens } from '@/styles/tokens.css.js';

export const inputBase = style({
  width: '100%',
  padding: `${tokens.space.sm} ${tokens.space.md}`,
  borderRadius: tokens.radius.md,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  fontSize: '15px',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  ':focus': {
    borderColor: vars.color.primary,
  },
  ':disabled': {
    backgroundColor: vars.color.surface,
    color: vars.color.muted,
  },
});
```

**파일: `src/components/Input/Input.jsx`**

```jsx
import { inputBase } from './Input.css.js';

export default function Input(props) {
  return <input className={inputBase} {...props} />;
}
```

**파일: `src/components/Input/index.js`**

```jsx
export { default as Input } from './Input.jsx';
```

**파일: `src/App.js`** 

```jsx
// TODO: 완성 후 아래 주석을 해제하세요
import { Button } from './components/Button';
import { Input } from './components/Input';

export default function App() {
  return (
    <div className={`${activeTheme} ${page}`}>
      <div className={container}>
		    // 기존 코드...

        <section className={card}>
          <h2>Input</h2>
          <div className={formRow}>
            {/* TODO: Input 컴포넌트를 완성한 후 여기에 인풋들을 추가하세요 */}
     
            <Input placeholder="검색어를 입력하세요" />
            <Input placeholder="비활성화 상태" disabled />
            
            <p style={{ color: '#6b7280' }}>Input 컴포넌트를 완성해주세요!</p>
          </div>
        </section>

        // 기존 코드...
        </section>
      </div>
      
      // 기존 코드...
    </div>
  );
}
```

- 다크모드에서도 확인 해보세요

### 실습: Modal 구현하기(수업 종료 후)

Button과 Input을 구현한 것처럼 Modal을 직접 구현해 봅니다.

**요구사항:**

- 오버레이가 화면 전체를 덮습니다.
- 가운데에 카드 형태의 콘텐츠 박스가 있습니다.
- 닫기 버튼을 누르면 `onClose`가 실행됩니다.
- 오버레이 클릭 시 닫힙니다.
- 모달 내부 클릭 시에는 닫히지 않습니다.

**힌트:**

- `event.stopPropagation()`을 활용합니다.
- 접근성을 위해 `role="dialog"`, `aria-modal="true"` 속성을 추가합니다.
- **잠깐! 왜그럴까요?**
    - **버블링 방지**: HTML 요소는 겹쳐 있을 때 자식의 이벤트가 부모에게 전달됩니다. 모달 안쪽을 클릭했는데 창이 닫히는 황당한 경험을 막으려면 `stopPropagation()`은 필수입니다.
    - **모두를 위한 웹**: 우리가 `role`이나 `aria-` 속성을 넣는 이유는 스크린 리더 사용자가 현재 화면에서 무엇이 일어났는지(모달이 떴는지) 정확히 알 수 있게 하기 위해서입니다. 작지만 친절한 배려가 좋은 서비스를 만듭니다.

### 정답 예시

**파일: `src/components/Modal/Modal.css.js`**

```jsx
import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';
import { tokens } from '@/styles/tokens.css.js';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(15, 23, 42, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: tokens.space.lg,
  zIndex: 20,
});

export const modal = style({
  width: '100%',
  maxWidth: '420px',
  backgroundColor: vars.color.surface,
  borderRadius: tokens.radius.lg,
  padding: tokens.space.lg,
  boxShadow: tokens.shadow.sm,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.md,
});

export const modalTitle = style({
  fontSize: '18px',
  fontWeight: 700,
});

export const modalBody = style({
  color: vars.color.muted,
  lineHeight: 1.5,
});

export const modalActions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: tokens.space.sm,
});
```

**파일: `src/components/Modal/Modal.jsx`**

```jsx
import { Button } from '../Button';
import {
  modal,
  modalActions,
  modalBody,
  modalTitle,
  overlay,
} from './Modal.css.js';

export default function Modal({ title, children, onClose }) {
  const handleClick = (event) => {
    event.stopPropagation();
  };

  const handleClose = () => {
    if (!onClose) return;
    onClose();
  };

  return (
    <div className={overlay} onClick={handleClose}>
      <section
        className={modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={handleClick}
      >
        <h2 className={modalTitle} id="modal-title">
          {title}
        </h2>
        <div className={modalBody}>{children}</div>
        <div className={modalActions}>
          <Button variant="ghost" onClick={handleClose}>
            닫기
          </Button>
        </div>
      </section>
    </div>
  );
}
```

**파일: `src/components/Modal/index.js`** 

```jsx
export { default as Modal } from './Modal.jsx';
```

**파일: `src/App.jsx`** 

```jsx
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Modal } from './components/Modal'; // 주석 해제 

// 기존 코드

export default function App() {
  
  return (
    <div className={`${activeTheme} ${page}`}>
      <div className={container}>
	      
	      {/* 기존 코드... */}
	      
        <section className={grid}>
          <article className={card}>
            <h3>Modal Preview</h3>
            <p>필요한 순간에만 모달을 열어 사용자 흐름을 방해하지 않습니다.</p>
            {/* TODO: Modal 컴포넌트를 완성한 후 아래 주석을 해제하세요 */}
            <Button onClick={() => setIsModalOpen(true)}>모달 열기</Button>
          </article>
          <article className={card}>
            <h3>Design Tokens</h3>
            <p>
              색상과 간격을 토큰으로 관리하면 전체 톤을 쉽게 통일할 수
              있습니다.
            </p>
          </article>
          <article className={card}>
            <h3>Responsive</h3>
            <p>이 카드 그리드는 768px 이상에서 3열로 변합니다.</p>
          </article>
        </section>
      </div>
	
      {/* TODO: Modal 컴포넌트를 완성한 후 아래 주석을 해제하세요 */}
      {isModalOpen ? (
        <Modal title="알림" onClose={() => setIsModalOpen(false)}>
          공용 모달은 메시지를 바꿔가며 재사용할 수 있습니다.
        </Modal>
      ) : null}
    </div>
  );
}
```

### 정리

| 패턴 | 설명 |
| --- | --- |
| variant | 컴포넌트 종류 구분 (primary, secondary, ghost) |
| size | 컴포넌트 크기 구분 (sm, md, lg) |
| `styleVariants` | 비슷한 스타일 변형을 한 번에 정의 |

## 1-05. #실습  반응형과 미디어 쿼리

### 학습 목표

- vanilla-extract에서 `@media`를 사용하는 방법을 익힙니다.
- 모바일 우선(Mobile First) 접근법을 이해합니다.

### 미디어 쿼리 작성

스타일 객체 안에 `'@media'` 키를 사용합니다.

**파일: `src/styles/app.css.js`** 

```jsx
import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';
import { tokens, breakpoints } from '@/styles/tokens.css.js';

export const page = style({
  minHeight: '100vh',
  padding: tokens.space.xl,
  backgroundColor: vars.color.background,
  color: vars.color.text,
});

export const grid = style({
  display: 'grid',
  gap: tokens.space.md,
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  // 이 부분
  '@media': {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const card = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: tokens.radius.lg,
  padding: tokens.space.lg,
  boxShadow: tokens.shadow.sm,
});
```

⚠️ **주의:** 미디어 쿼리에서 `tokens.breakpoint.md` 같은 CSS 변수는 사용할 수 없습니다. 반드시 일반 상수인 `breakpoints.md`를 사용합니다.

```jsx
// ❌ 작동하지 않음
[`screen and (min-width: ${tokens.breakpoint.md})`]

// ✅ 정상 작동
[`screen and (min-width: ${breakpoints.md})`]
```

**변수 값 확인하기**

- VSCode에서 컨트롤(맥 cmd) 누르고 변수에 마우스 Hover 하면 값이 보입니다.

![스크린샷 2026-01-18 17.08.21.png](23%20Vanilla-extract%20%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2026-01-18_17.08.21.png)

### 모바일 우선 접근법

모바일 기본값을 먼저 작성하고, 큰 화면에서 덮어씁니다:

```jsx
export const container = style({
  padding: '16px',
  fontSize: '14px',
  '@media': {
    [`screen and (min-width: ${breakpoints.sm})`]: { // 480px 이상에서 적용
      padding: '20px',
      fontSize: '15px',
    },
    [`screen and (min-width: ${breakpoints.md})`]: { // 768px 이상에서 적용
      padding: '24px',
      fontSize: '16px',
    },
    [`screen and (min-width: ${breakpoints.lg})`]: { // 1024px 이상에서 적용
      padding: '32px',
      fontSize: '18px',
    },
  },
});
```

**모바일 우선의 장점:**

- 모바일 환경이 더 제한적이므로 기본값으로 적합합니다.
- 화면이 커질수록 "추가"하는 방식이라 로직이 단순합니다.

### 정리

| 개념 | 설명 |
| --- | --- |
| `@media` | 반응형 스타일 정의 |
| `breakpoints` | 일반 상수로 정의 (CSS 변수 불가) |
| Mobile First | 모바일 기본값 → 큰 화면에서 덮어쓰기 |

## 1-06. #실습 Recipes로 복잡한 스타일 관리하기

### 학습 목표

- `@vanilla-extract/recipes`로 스타일 조합을 깔끔하게 관리하는 방법을 배웁니다.
- `styleVariants`와 `recipes`의 차이점을 이해합니다.

### styleVariants vs recipes

앞에서 Button을 만들 때 `styleVariants`를 사용했습니다. 잘 작동하지만 코드가 약간 복잡합니다:

```jsx
// styleVariants 방식: 여러 클래스를 조합
<button className={clsx(buttonBase, buttonVariants[variant], buttonSizes[size])}>
```

`recipes`를 사용하면 간단해집니다:

```jsx
// recipes 방식: 함수 호출 한 번으로 완료
<span className={badge({ color, size, rounded })}>
```

**recipes를 사용하면 좋은 경우:**

- variant 조합이 3개 이상일 때
- 특정 조합에만 적용되는 스타일이 있을 때 (compoundVariants)
- 더 깔끔한 API를 원할 때

### recipes 설치

```bash
npm install @vanilla-extract/recipes
```

### Badge 컴포넌트 만들기

Badge는 상태나 카테고리를 표시하는 작은 라벨입니다. color, size, rounded 세 가지 variant를 recipes로 관리합니다.

**파일: `src/components/Badge/Badge.css.js`**

```jsx
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/styles/theme.css.js';
import { tokens } from '@/styles/tokens.css.js';

export const badge = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    borderRadius: tokens.radius.md,
    transition: 'all 0.2s ease',
  },

  variants: {
    color: {
      primary: {
        backgroundColor: vars.color.primary,
        color: '#ffffff',
      },
      secondary: {
        backgroundColor: vars.color.surface,
        color: vars.color.text,
        border: `1px solid ${vars.color.border}`,
      },
      success: {
        backgroundColor: '#10b981',
        color: '#ffffff',
      },
      warning: {
        backgroundColor: '#f59e0b',
        color: '#ffffff',
      },
      danger: {
        backgroundColor: '#ef4444',
        color: '#ffffff',
      },
    },

    size: {
      sm: {
        padding: `${tokens.space.xs} ${tokens.space.sm}`,
        fontSize: '12px',
      },
      md: {
        padding: `${tokens.space.xs} ${tokens.space.md}`,
        fontSize: '14px',
      },
      lg: {
        padding: `${tokens.space.sm} ${tokens.space.lg}`,
        fontSize: '16px',
      },
    },

    rounded: {
      false: {},
      true: {
        borderRadius: '9999px',
      },
    },
  },

  compoundVariants: [
    {
      variants: {
        color: 'secondary',
        size: 'lg',
      },
      style: {
        fontWeight: 700,
      },
    },
  ],

  defaultVariants: {
    color: 'primary',
    size: 'md',
    rounded: false,
  },
});
```

**`compoundVariants` 설명:**

특정 variant 조합일 때만 추가 스타일을 적용합니다. 위 예시에서는 `color: secondary` + `size: lg`일 때만 `fontWeight: 700`이 적용됩니다.

**파일: `src/components/Badge/Badge.jsx`**

```jsx
import { badge } from './Badge.css.js';

export default function Badge({
  children,
  color = 'primary',
  size = 'md',
  rounded = false,
  ...props
}) {
  return (
    <span className={badge({ color, size, rounded })} {...props}>
      {children}
    </span>
  );
}
```

`clsx`가 필요 없고, 함수 호출 한 번으로 완료됩니다.

**파일: `src/components/Badge/index.js`**

```jsx
export { default as Badge } from './Badge.jsx';
```

### Badge 사용 예시

**파일: `src/App.js`**

```jsx
import { Badge } from './components/Badge'; // import

function App() {
  return (
	  {/* 기존 코드 ... */}
	  
    <section className={card}>
      <h2>Input</h2>
      <div className={formRow}>
        <Input placeholder="검색어를 입력하세요" />
        <Input placeholder="비활성화 상태" disabled />
        <p style={{ color: '#6b7280' }}>Input 컴포넌트를 완성해주세요!</p>
      </div>
    </section>
    
    {/* Input Section 아래에 추가 ... */}
    <section className={card}>
      <h2>Badge (Recipes)</h2>
      <div className={buttonRow}>
        <Badge color="primary">Primary</Badge>
        <Badge color="secondary">Secondary</Badge>
        <Badge color="success">Success</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="danger">Danger</Badge>
        <Badge color="primary" rounded>
          Rounded
        </Badge>
        <Badge color="success" size="lg">
          Large
        </Badge>
      </div>
    </section>
    
	  {/* 기존 코드 ... */}
  );
}
```

### styleVariants vs recipes 비교

| 기능 | styleVariants | recipes |
| --- | --- | --- |
| 기본 사용법 | 여러 클래스 조합 필요 | 함수 호출 한 번 |
| clsx 필요 | ✅ 필요 | ❌ 불필요 |
| compoundVariants | ❌ 직접 구현 | ✅ 내장 |
| defaultVariants | ❌ JS에서 처리 | ✅ 내장 |
| 타입 안전성 | 보통 | 매우 좋음 |
| 적합한 상황 | 단순한 variant | 복잡한 variant 조합 |

### 정리

| 개념 | 설명 |
| --- | --- |
| `recipe` | 복잡한 variant 조합을 깔끔하게 관리 |
| `compoundVariants` | 특정 조합에만 스타일 적용 |
| `defaultVariants` | CSS 레벨에서 기본값 설정 |

**권장 사항:** 간단한 컴포넌트는 `styleVariants`, 복잡한 컴포넌트는 `recipes`를 사용합니다.

**생각해보기: 앞서 만든 Button 컴포넌트를 clsx가 아닌 recipes로 구현 할 수 있을까요?**

## 1-07. 프로덕션 빌드

### 학습 목표

- `npm run build`로 배포용 파일을 생성하는 방법을 배웁니다.
- 빌드 결과물의 구조를 이해합니다.

### 빌드 실행

```bash
npm run build
```

빌드가 완료되면 `dist/` 폴더가 생성됩니다:

```
dist/
├── index.html
└── assets/
    ├── index-xxxxx.js
    └── index-xxxxx.css
```

vanilla-extract로 작성한 스타일이 실제 CSS 파일로 변환됩니다.

### 빌드 결과 미리보기

```bash
npm run preview
```

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 (HMR 포함) |
| `npm run preview` | 빌드된 `dist/` 서빙 (배포 환경 시뮬레이션) |

### 배포

정적 호스팅 서비스(Vercel, Netlify, GitHub Pages 등)에 `dist/` 폴더를 업로드합니다.

**GitHub Pages 등 서브경로 배포 시:**

`vite.config.js`에 `base` 옵션을 설정합니다:

```jsx
export default defineConfig({
  base: '/my-repo-name/',
  // ...
});
```

`base` 옵션은 **“이 프로젝트가 배포될 URL의 기준 경로”**를 Vite에게 알려주는 설정입니다.

즉, 빌드 결과물에서 생성되는 JS/CSS 경로 앞에 **공통으로 붙는 접두사(prefix)** 역할을 합니다.

**1) 도메인 루트(`/`)에 배포하는 경우**

예를 들어 아래처럼 서비스되는 경우입니다.

- `https://example.com/`

이때는 기본값이 `/`이므로 보통 `base` 설정이 없어도 문제가 없습니다.

Vite는 빌드 시 정적 파일 경로를 다음처럼 생성합니다.

- `/assets/index-xxxxx.js`
- `/assets/index-xxxxx.css`

**2) 서브 경로에 배포하는 경우 (GitHub Pages에서 자주 발생)**

GitHub Pages는 보통 레포 이름 경로 아래로 배포됩니다.

- `https://username.github.io/my-repo-name/`

하지만 `base`를 설정하지 않으면, Vite는 여전히 정적 파일을 `/assets/...`로 참조하게 됩니다.

그러면 브라우저는 아래 경로를 찾게 됩니다.

- `https://username.github.io/assets/index-xxxxx.js`

이 경로는 실제 배포 위치와 다르므로 **404가 발생하고 화면이 정상적으로 렌더링되지 않을 수 있습니다.**

그래서 `base`를 아래처럼 설정합니다.

```jsx
export default defineConfig({
  base: '/my-repo-name/',
});
```

이렇게 하면 빌드 시 경로가 다음처럼 생성됩니다.

- `/my-repo-name/assets/index-xxxxx.js`
- `/my-repo-name/assets/index-xxxxx.css`

### 정리

| 명령어 | 결과 |
| --- | --- |
| `npm run build` | `dist/` 폴더에 배포용 파일 생성 |
| `npm run preview` | 빌드 결과물 로컬 테스트 |

**핵심:** vanilla-extract 스타일은 빌드 시 실제 CSS 파일로 변환됩니다.

**참고 자료:**

- [vanilla-extract 공식 문서](https://vanilla-extract.style/)