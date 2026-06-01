import express from 'express';
import { prisma } from './db/prisma.js';
import { config } from '#config';
import { router as apiRouter } from './routes/index.js';
import cookieParser from 'cookie-parser';
import { corsMiddleware, errorHandler } from '#middlewares';
import { setupGracefulShutdown } from '#utils';

const app = express();

// JSON 파싱
app.use(express.json());

// CORS 허용 (프론트엔드 직접 호출)
app.use(corsMiddleware);

// 쿠키 파싱 (중요!)
app.use(cookieParser());

// API 라우터 등록
app.use('/api', apiRouter);

app.use(errorHandler);

const server = app.listen(config.PORT, () => {
  console.log(
    `[${config.NODE_ENV}] Server running at http://localhost:${config.PORT}`,
  );
});

// Setup graceful shutdown handlers
setupGracefulShutdown(server, prisma);
