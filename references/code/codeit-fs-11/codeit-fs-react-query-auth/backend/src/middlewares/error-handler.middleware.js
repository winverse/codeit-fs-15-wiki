import { Prisma } from '#generated/prisma/client.ts';
import { ERROR_MESSAGE, HTTP_STATUS, PRISMA_ERROR } from '#constants';
import { HttpException } from '#exceptions';

export const errorHandler = (err, req, res, _next) => {
  console.error(err.stack);

  if (err instanceof HttpException) {
    const details =
      err.details && typeof err.details === 'object' && !Array.isArray(err.details)
        ? err.details
        : null;

    const code = details?.code;
    const field = details?.field;
    const responseDetails =
      details && (code || field)
        ? Object.fromEntries(
            Object.entries(details).filter(
              ([key]) => key !== 'code' && key !== 'field',
            ),
          )
        : err.details;

    return res.status(err.statusCode).json({
      success: false,
      ...(code && { code }),
      ...(field && { field }),
      message: err.message,
      ...(responseDetails &&
        typeof responseDetails === 'object' &&
        Object.keys(responseDetails).length > 0 && { details: responseDetails }),
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === PRISMA_ERROR.UNIQUE_CONSTRAINT) {
      const target = err.meta?.target;
      const fieldFromMeta = Array.isArray(target) ? target[0] : undefined;

      // Prisma v7 + adapter-pg: meta.target is undefined; fields are nested under driverAdapterError.
      const constraintFields = err.meta?.driverAdapterError?.cause?.constraint
        ?.fields;
      const fieldFromConstraint = Array.isArray(constraintFields)
        ? constraintFields[0]
        : undefined;

      const field = fieldFromMeta ?? fieldFromConstraint;

      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        code: 'UNIQUE_CONSTRAINT',
        ...(field && { field }),
        message: ERROR_MESSAGE.RESOURCE_CONFLICT,
      });
    }

    // P2025: Record not found
    if (err.code === PRISMA_ERROR.RECORD_NOT_FOUND) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGE.RESOURCE_NOT_FOUND,
      });
    }
  }

  // 처리되지 않은 모든 에러
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
  });
};
