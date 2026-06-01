import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive({
    message: 'ID는 양수여야 합니다.',
  }),
});

export type IdParams = z.infer<typeof idParamSchema>;
