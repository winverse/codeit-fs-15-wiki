import type { NextFunction, Request, Response } from 'express';
import { Prisma } from '#generated/prisma/client.js';
import { ERROR_MESSAGE, HTTP_STATUS, HttpException } from '#common';

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
    if (err.code === 'P2025') {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGE.RESOURCE_NOT_FOUND,
      });
    }

    if (err.code === 'P2002') {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: ERROR_MESSAGE.USER_EMAIL_ALREADY_EXISTS,
      });
    }

    console.error(`[Prisma Error] code=${err.code}`, err.message);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }

  if (err instanceof Error) {
    console.error('[Unhandled Error]', err);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
  });
}
