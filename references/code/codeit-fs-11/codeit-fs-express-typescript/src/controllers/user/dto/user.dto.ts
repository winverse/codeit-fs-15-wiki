import { z } from 'zod';

export type UserResponse = {
  id: number;
  email: string;
  name: string | null;
};

export const createUserSchema = z.object({
  email: z.email('유효한 이메일 형식이 아닙니다.'),
  password: z
    .string({ error: '비밀번호는 필수입니다.' })
    .min(6, '비밀번호는 6자 이상이어야 합니다.'),
  name: z.string().min(2, '이름은 2자 이상이어야 합니다.').optional(),
});

export const updateUserSchema = z.object({
  email: z.email('유효한 이메일 형식이 아닙니다.').optional(),
  name: z.string().min(2, '이름은 2자 이상이어야 합니다.').optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
