import express from 'express';
import { router } from './routes/index.js';
import { logger } from './middlewares/logger.js';
import { requestTimer } from './middlewares/requestTImer.js';
import { cors } from './middlewares/cors.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { config, isDevelopment } from './config/config.js';
import { connectDB, disconnectDB } from './db/index.js';

const app = express();
await connectDB();

// JSON 파싱 미들웨어
app.use(express.json());
// URL 인코딩 파싱
app.use(express.urlencoded({ extended: true }));
// cors 미들웨어
app.use(cors);

// 범용 미들웨어
if (isDevelopment) {
  app.use(logger);
  app.use(requestTimer);
}

// 정적 파일 제공
app.use(express.static('public'));

// 모든 라우트 등록
app.use('/', router);

// 에러 핸들링
app.use(errorHandler);

// 서버 시작
const server = app.listen(config.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${config.PORT}`);
});

// Graceful Shutdown 핸들링
const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    console.log('HTTP server closed.');
    await disconnectDB();
  });
};

// 3. SIGINT, SIGTERM 신호를 감지하여 shutdown 함수를 실행합니다.
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
