# 06-express-middleware: Express 미들웨어 활용하기

Express 미들웨어를 만들어 로깅, 검증, CORS 등의 기능을 구현해보겠습니다.

## 🎯 학습 목표
- 커스텀 미들웨어 작성법 이해
- 미들웨어 실행 순서와 next() 함수 활용
- 실무에서 자주 사용하는 미들웨어 패턴 학습

## 📋 실습 체크리스트

### 실습 1: 사전 준비
- [ ] 05-express-crud 코드를 복사하여 06-express-middleware 폴더에 붙여넣기
- [ ] `src/middlewares` 폴더 생성
- [ ] `public` 폴더 생성 (정적 파일용)

### 실습 2: Express 기본 미들웨어 설정

#### 단계 1: server.js 미들웨어 설정
- [ ] `src/server.js`에서 기본 미들웨어들 추가:

```javascript
import express from 'express';
import { router } from './routes/index.js';

const app = express();
const PORT = 

// JSON 파싱
app.use(express.json());

// URL 인코딩 파싱 for req.body 인식
app.use(express.urlencoded({ extended: true })); // qs 사용

// 정적 파일 제공
app.use(express.static('public'));

// 모든 라우트 등록
app.use('/', router);

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

#### 단계 2: 정적 파일 테스트
- [ ] `public/test.html` 파일 생성:

```html
<!DOCTYPE html>
<html>
<head>
    <title>정적 파일 테스트</title>
</head>
<body>
    <h1>Express 정적 파일 서비스</h1>
    <p>이 파일은 public 폴더에서 제공됩니다.</p>
</body>
</html>
```

### 실습 3: 로깅 미들웨어

#### 단계 1: 로깅 미들웨어 생성
- [ ] `src/middlewares/logger.js` 파일 생성:

```javascript
// 로깅 미들웨어
export const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};
```

#### 단계 2: server.js에 적용
- [ ] `src/server.js`에서 로깅 미들웨어 import 및 적용:

```javascript
import { logger } from './middlewares/logger.js';

// 기본 미들웨어들 다음에 추가
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
```

### 실습 4: 요청 시간 측정 미들웨어

#### 단계 1: 타이머 미들웨어 생성
- [ ] `src/middlewares/requestTimer.js` 파일 생성:

```javascript
// 요청 처리 시간 측정
export const requestTimer = (req, res, next) => {
  req.startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - req.startTime;
    console.log(`요청 처리 시간: ${duration}ms`);
  });
  
  next();
};
```

#### 단계 2: server.js에 적용
- [ ] `src/server.js`에 타이머 미들웨어 추가:

```javascript
import { requestTimer } from './middlewares/requestTimer.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(requestTimer);
```

### 실습 5: 사용자 검증 미들웨어

#### 단계 1: 검증 미들웨어 생성
- [ ] `src/middlewares/validateUser.js` 파일 생성:

```javascript
// 사용자 데이터 검증 미들웨어
export const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  
  if (!name || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: '이름은 2글자 이상이어야 합니다'
    });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: '올바른 이메일 형식이 아닙니다'
    });
  }
  
  next();
};
```

#### 단계 2: 특정 라우트에 적용
- [ ] `src/routes/users.js`에서 POST, PATCH 라우트에 검증 미들웨어 적용:

```javascript
import { validateUser } from '../middlewares/validateUser.js';

// 사용자 생성 - validateUser 미들웨어 추가
userRouter.post('/', validateUser, (req, res) => {
  // 기존 코드 유지 (유효성 검증 부분 제거 가능)
});

// 사용자 수정 - validateUser 미들웨어 추가
userRouter.patch('/:id', validateUser, (req, res) => {
  // 기존 코드 유지 (유효성 검증 부분 제거 가능)
});
```

### 실습 6: CORS 미들웨어

#### 단계 1: CORS 미들웨어 생성
- [ ] `src/middlewares/cors.js` 파일 생성:

```javascript
// CORS 미들웨어
export const cors = (req, res, next) => {
  const origin = req.headers.origin || req.headers.host || "";
  const isDev = process.env.NODE_ENV !== "production";
  const whiteList = [
    // Add something
  ];
  const isAllowed = isDev || whiteList.includes(origin);

  if (isAllowed) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header("Access-Control-Allow-Credentials", "true");
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
};
```

#### 단계 2: server.js에 적용
- [ ] `src/server.js`에 CORS 미들웨어 추가:

```javascript
import { cors } from './middlewares/cors.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors);
app.use(logger);
app.use(requestTimer);
```

### 실습 7: 테스트

#### 서버 실행 및 확인
- [ ] 서버 실행: `npm run dev`
- [ ] 브라우저에서 `http://localhost:5001/test.html` 접속하여 정적 파일 서비스 확인
- [ ] 콘솔에서 로깅 및 타이머 출력 확인
- [ ] Postman으로 다음 테스트:
  - [ ] 올바른 데이터로 사용자 생성
  - [ ] 잘못된 이름으로 사용자 생성 (1글자)
  - [ ] 잘못된 이메일로 사용자 생성
  - [ ] CORS 헤더가 응답에 포함되는지 확인

## 📚 미들웨어 실행 순서

```
요청 → JSON 파싱 → URL 인코딩 → 정적파일 → CORS → 로깅 → 타이머 → 라우트 → 응답
```

## ✅ 완료 확인사항
- [ ] 정적 파일(test.html)이 브라우저에서 정상 표시되는가?
- [ ] 모든 요청이 콘솔에 로깅되는가?
- [ ] 요청 처리 시간이 출력되는가?
- [ ] 유효성 검증이 미들웨어에서 처리되는가?
- [ ] CORS 헤더가 응답에 포함되는가?

## 💡 미들웨어 핵심 개념
- **next()**: 다음 미들웨어로 제어권 전달
- **순서 중요**: 미들웨어는 등록 순서대로 실행
- **재사용성**: 한 번 작성하면 여러 라우트에서 활용 가능