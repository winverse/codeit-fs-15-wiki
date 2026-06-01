import express from 'express';
import {
  generateTokens,
  setAuthCookies,
  clearAuthCookies,
  hashPassword,
  comparePassword,
} from '#utils';
import { authMiddleware, validate } from '#middlewares';
import { HTTP_STATUS, ERROR_MESSAGE } from '#constants';
import { signUpSchema, loginSchema } from './auth.schemas.js';
import { usersRepository } from '#repository';
import { ConflictException, UnauthorizedException } from '#exceptions';

export const authRouter = express.Router();

authRouter.get('/me', authMiddleware, async (req, res, next) => {
  try {
    const user = await usersRepository.findUserById(req.user.id);

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGE.USER_NOT_FOUND_FROM_TOKEN);
    }

    const { password: _, ...userWithoutPassword } = user;
    res.status(HTTP_STATUS.OK).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
});

authRouter.post(
  '/signup',
  validate('body', signUpSchema),
  async (req, res, next) => {
    try {
      const { email, password, name } = req.body;

      const existingUser = await usersRepository.findUserByEmail(email);
      if (existingUser) {
        throw new ConflictException(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS, {
          code: 'EMAIL_ALREADY_EXISTS',
          field: 'email',
        });
      }

      const hashedPassword = await hashPassword(password);

      const user = await usersRepository.createUser({
        email,
        password: hashedPassword,
        name,
      });

      const tokens = generateTokens(user);
      setAuthCookies(res, tokens);

      const { password: _, ...userWithoutPassword } = user;
      res.status(HTTP_STATUS.CREATED).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  },
);

authRouter.post('/logout', async (_req, res, next) => {
  try {
    clearAuthCookies(res);
    res.sendStatus(HTTP_STATUS.NO_CONTENT);
  } catch (error) {
    next(error);
  }
});

authRouter.post(
  '/login',
  validate('body', loginSchema),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await usersRepository.findUserByEmail(email);

      if (!user) {
        throw new UnauthorizedException(ERROR_MESSAGE.INVALID_CREDENTIALS);
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(ERROR_MESSAGE.INVALID_CREDENTIALS);
      }

      const tokens = generateTokens(user);
      setAuthCookies(res, tokens);

      const { password: _, ...userWithoutPassword } = user;
      res.status(HTTP_STATUS.OK).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  },
);
