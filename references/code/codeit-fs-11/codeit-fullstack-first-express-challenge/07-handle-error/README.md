# 07-handle-error: Express 에러 처리 시스템 구축하기

Express에서 체계적인 에러 처리를 위한 커스텀 예외 클래스와 에러 핸들링 미들웨어를 구현해보겠습니다.

## 🎯 학습 목표
- 커스텀 예외 클래스 작성법 이해
- Express 에러 처리 미들웨어 구현
- try-catch와 next() 함수를 활용한 에러 전파
- 일관된 에러 응답 구조 설계

## 📋 실습 체크리스트

### 실습 1: 사전 준비
- [ ] 06-express-middleware 코드를 복사하여 07-handle-error 폴더에 붙여넣기
- [ ] `src/errors` 폴더 생성

### 실습 2: 기본 예외 클래스 생성

#### 단계 1: HttpException 기본 클래스
- [ ] `src/errors/httpException.js` 파일 생성:

```javascript
export class HttpException extends Error {
  statusCode;
  constructor(description, statusCode) {
    super(description);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}
```

### 실습 3: 구체적인 예외 클래스들 생성

#### 단계 1: BadRequestException (400)
- [ ] `src/errors/badRequestException.js` 파일 생성:

```javascript
import { HttpException } from './httpException.js';

export class BadRequestException extends HttpException {
  constructor(description = 'BAD_REQUEST') {
    super(description, 400);
  }
}
```

#### 단계 2: UnauthorizedException (401)
- [ ] `src/errors/unauthorizedException.js` 파일 생성:

```javascript
import { HttpException } from './httpException.js';

export class UnauthorizedException extends HttpException {
  constructor(description = 'Unauthorized') {
    super(description, 401);
  }
}
```

#### 단계 3: ForbiddenException (403)
- [ ] `src/errors/forbiddenException.js` 파일 생성:

```javascript
import { HttpException } from './httpException.js';

export class ForbiddenException extends HttpException {
  constructor(description = 'FORBIDDEN') {
    super(description, 403);
  }
}
```

#### 단계 4: NotFoundException (404)
- [ ] `src/errors/notFoundException.js` 파일 생성:

```javascript
import { HttpException } from './httpException.js';

export class NotFoundException extends HttpException {
  constructor(description = 'NOT_FOUND') {
    super(description, 404);
  }
}
```

#### 단계 5: ConflictException (409)
- [ ] `src/errors/conflictException.js` 파일 생성:

```javascript
import { HttpException } from './httpException.js';

export class ConflictException extends HttpException {
  constructor(description = 'CONFLICT') {
    super(description, 409);
  }
}
```

### 실습 4: 에러 핸들링 미들웨어 생성

#### 단계 1: 에러 핸들러 미들웨어
- [ ] `src/middlewares/errorHandler.js` 파일 생성:

```javascript
import { HttpException } from '../errors/httpException.js';

// next를 지우면 안됨! Express가 에러 미들웨어로 인식하려면 4개 인자 필수
export const errorHandler = (error, req, res, _next) => {
  console.error('error message', error);
  
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};
```

### 실습 5: ESLint 규칙 수정

#### 단계 1: .eslintrc.json 수정
- [ ] `.eslintrc.json` 파일에서 unused-vars 규칙 수정:

```json
{
  "rules": {
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
  }
}
```

### 실습 6: server.js에 에러 핸들러 적용

#### 단계 1: 에러 핸들러 등록
- [ ] `src/server.js`에서 에러 핸들러를 **가장 마지막**에 등록:

```javascript
import express from 'express';
import { router } from './routes/index.js';
import { cors } from './middlewares/cors.js';
import { logger } from './middlewares/logger.js';
import { requestTimer } from './middlewares/requestTimer.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = 

// 기본 미들웨어들
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors);
app.use(logger);
app.use(requestTimer);

// 모든 라우트 등록
app.use('/', router);

// 에러 핸들링, 반드시 마지막에!
app.use(errorHandler);

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

### 실습 7: 라우트에 에러 처리 적용

#### 단계 1: users.js에 예외 클래스 import
- [ ] `src/routes/users.js` 상단에 예외 클래스들 import:

```javascript
import express from 'express';
import { validateUser } from '../middlewares/validateUser.js';
import { BadRequestException } from '../errors/badRequestException.js';
import { NotFoundException } from '../errors/notFoundException.js';
import { ConflictException } from '../errors/conflictException.js';
```

#### 단계 2: GET /:id 라우트 수정
- [ ] 특정 사용자 조회 라우트에 try-catch 적용:

```javascript
// 특정 사용자 조회
userRouter.get('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다');
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});
```

#### 단계 3: POST / 라우트 수정
- [ ] 사용자 생성 라우트에 try-catch 적용:

```javascript
// 사용자 생성
userRouter.post('/', validateUser, (req, res, next) => {
  try {
    const { name, email } = req.body;

    // 이메일 중복 검사
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다');
    }

    const newUser = {
      id: nextId++,
      name,
      email,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      data: newUser,
      message: '사용자가 생성되었습니다',
    });
  } catch (error) {
    next(error);
  }
});
```

#### 단계 4: PATCH /:id 라우트 수정
- [ ] 사용자 수정 라우트에 try-catch 적용:

```javascript
// 사용자 정보 수정
userRouter.patch('/:id', validateUser, (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('사용자를 찾을 수 없습니다');
    }

    // 이메일 중복 검사 (본인 제외)
    if (email) {
      const existingUser = users.find(u => u.email === email && u.id !== id);
      if (existingUser) {
        throw new ConflictException('이미 존재하는 이메일입니다');
      }
    }

    // 제공된 필드만 업데이트
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    users[userIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      data: users[userIndex],
      message: '사용자 정보가 수정되었습니다',
    });
  } catch (error) {
    next(error);
  }
});
```

#### 단계 5: DELETE /:id 라우트 수정
- [ ] 사용자 삭제 라우트에 try-catch 적용:

```javascript
// 사용자 삭제
userRouter.delete('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('사용자를 찾을 수 없습니다');
    }

    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);

    res.json({
      success: true,
      data: deletedUser,
      message: '사용자가 삭제되었습니다',
    });
  } catch (error) {
    next(error);
  }
});
```

### 실습 8: 검증 미들웨어 수정

#### 단계 1: validateUser.js 수정
- [ ] `src/middlewares/validateUser.js`에서 예외 throw 방식으로 변경:

```javascript
import { BadRequestException } from '../errors/badRequestException.js';

export const validateUser = (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || name.trim().length < 2) {
      throw new BadRequestException('이름은 2글자 이상이어야 합니다');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new BadRequestException('유효한 이메일 형식이어야 합니다');
    }

    next();
  } catch (error) {
    next(error);
  }
};
```

### 실습 9: 테스트

#### 서버 실행 및 확인
- [ ] 서버 실행: `npm run dev`
- [ ] Postman으로 다음 에러 상황 테스트:
  - [ ] 존재하지 않는 사용자 조회 (404)
  - [ ] 잘못된 이름으로 사용자 생성 (400)
  - [ ] 잘못된 이메일로 사용자 생성 (400)
  - [ ] 중복 이메일로 사용자 생성 (409)
  - [ ] 존재하지 않는 사용자 수정 (404)
  - [ ] 존재하지 않는 사용자 삭제 (404)

## 📚 에러 처리 핵심 개념

### 🔥 Express 에러 미들웨어 규칙
- **4개 인자 필수**: `(error, req, res, next)`
- **등록 순서 중요**: 모든 라우트 **다음**에 등록
- **next(error)**: 에러를 에러 미들웨어로 전달

### ⚡ HTTP 상태 코드
| 코드 | 클래스 | 의미 |
|------|--------|------|
| 400 | BadRequestException | 잘못된 요청 |
| 401 | UnauthorizedException | 인증 필요 |
| 403 | ForbiddenException | 권한 없음 |
| 404 | NotFoundException | 리소스 없음 |
| 409 | ConflictException | 데이터 충돌 |
| 500 | - | 서버 내부 오류 |

## ✅ 완료 확인사항
- [ ] 모든 에러가 일관된 형태로 응답되는가?
- [ ] 적절한 HTTP 상태 코드가 반환되는가?
- [ ] 콘솔에 에러 로그가 출력되는가?
- [ ] try-catch로 모든 라우트가 감싸져 있는가?
- [ ] 미들웨어에서 예외가 올바르게 처리되는가?

## 💡 에러 처리 모범 사례
- **일관성**: 모든 에러를 동일한 구조로 응답
- **로깅**: 에러 발생 시 상세 정보 기록
- **보안**: 사용자에게 민감한 정보 노출 금지
- **복구**: 가능한 경우 자동 복구 로직 포함