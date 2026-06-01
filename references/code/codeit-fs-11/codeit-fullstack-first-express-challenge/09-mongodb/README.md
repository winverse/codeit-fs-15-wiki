# 09-mongodb: Express와 MongoDB 연동하기

Express 서버에 MongoDB를 연동하여 실제 데이터베이스를 사용해보겠습니다.

## 📋 실습 체크리스트

### 0단계: Mongoose 설치
- [ ] `npm install mongoose`

### 1단계: 환경변수 설정
- [ ] `.env.development` 파일에 MongoDB URI 추가:
```
NODE_ENV=
PORT=
MONGO_URI=
`

- [ ] `.env.example` 파일도 동일하게 수정
- [ ] `src/config/config.js`에 MONGO_URI 검증 추가:

```javascript
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().min(1000).max(65535).default(5001),
  MONGO_URI: z.string().startsWith('mongodb+srv://'),
});

const parseEnvironment = () => {
  try {
    return envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      MONGO_URI: process.env.MONGO_URI,
    });
  } catch (error) {
    // ... 기존 에러 처리
  }
};
```

### 2단계: 데이터베이스 연결 설정
- [ ] `src/db/index.js` 파일 생성:

```javascript
import mongoose from 'mongoose';
import { config } from '../config/config.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('✅ MongoDB connected successfully.');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
};
```

- [ ] `src/server.js`에 DB 연결 및 Graceful Shutdown 추가:

```javascript
import { connectDB, disconnectDB } from './db/index.js';

const app = express();
connectDB(); // DB 연결

// ... 기존 미들웨어 설정 ...

const server = app.listen(config.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${config.PORT}`);
});

// Graceful Shutdown
const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed.');
    disconnectDB();
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
```

### 3단계: User 모델 정의
- [ ] `src/models/user.model.js` 파일 생성:

```javascript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

export const User = mongoose.model('User', userSchema);
```

### 4단계: Routes를 MongoDB로 변경
- [ ] `src/routes/users.js`에서 기존 메모리 배열 제거
- [ ] User 모델 import 및 MongoDB CRUD 로직으로 교체:

```javascript
import { User } from '../models/user.model.js';
import { ConflictException } from '../errors/conflictException.js';

// 기존 users 배열, nextId 삭제

// GET /users - 모든 사용자 조회
userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users, count: users.length });
  } catch (error) {
    next(error);
  }
});

// GET /users/:id - 특정 사용자 조회  
userRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

// POST /users - 새 사용자 생성
userRouter.post('/', validateUser, async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictException('중복된 이메일입니다.');
    }

    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json({
      success: true,
      data: newUser,
      message: '사용자가 생성되었습니다',
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /users/:id - 사용자 정보 업데이트
userRouter.patch('/:id', validateUser, async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const { id: userId } = req.params;

    const existingUser = await User.findOne({ email, _id: { $ne: userId } });
    if (existingUser) {
      throw new ConflictException('중복된 이메일입니다.');
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    res.json({
      success: true,
      data: updatedUser,
      message: '사용자가 수정되었습니다',
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /users/:id - 사용자 삭제
userRouter.delete('/:id', async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    res.json({ success: true, message: '사용자가 삭제되었습니다' });
  } catch (error) {
    next(error);
  }
});
```

### 5단계: 테스트
- [ ] 서버 실행: `npm run dev`
- [ ] Postman으로 API 테스트:
  - [ ] POST `/users` - 사용자 생성
  - [ ] GET `/users` - 전체 조회
  - [ ] GET `/users/:id` - 단일 조회
  - [ ] PATCH `/users/:id` - 수정
  - [ ] DELETE `/users/:id` - 삭제

## 💡 핵심 포인트
- **Mongoose로 MongoDB 연동**
- **환경변수로 DB URI 관리**
- **Graceful Shutdown으로 안전한 종료**
- **스키마 검증과 에러 처리**
- **중복 이메일 검사**