import express from 'express';
import { userRouter } from './users.routes.js';

export const router = express.Router();

// /api/users 경로에 User 라우터 연결
router.use('/users', userRouter);
