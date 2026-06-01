import type { Request, RequestHandler } from 'express';
import { flattenError, type ZodType } from 'zod';
import { BadRequestException, ERROR_MESSAGE } from '#common';

type ValidationTarget = 'body' | 'params' | 'query';

export function validate(
  target: ValidationTarget,
  schema: ZodType,
): RequestHandler {
  return (req, _res, next) => {
    try {
      const result = schema.safeParse(req[target]);

      if (!result.success) {
        const { fieldErrors } = flattenError(result.error);
        throw new BadRequestException(
          ERROR_MESSAGE.VALIDATION_FAILED,
          fieldErrors,
        );
      }

      Object.assign(req[target] as Request[ValidationTarget], result.data);
      next();
    } catch (error) {
      next(error);
    }
  };
}
