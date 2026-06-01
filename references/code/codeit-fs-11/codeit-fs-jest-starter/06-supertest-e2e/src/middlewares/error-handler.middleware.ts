import type { NextFunction, Request, Response } from 'express';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error('[Unhandled Error]', err);

  return res.status(500).json({
    message: '서버 내부 오류가 발생했습니다.',
  });
}
