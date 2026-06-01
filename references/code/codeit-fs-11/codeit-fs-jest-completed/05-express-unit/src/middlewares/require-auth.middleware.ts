import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { UserRepository } from '#src/repositories/user.repository.js';

export interface AuthenticatedUser {
  id: number;
  email: string;
  name: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export class RequireAuthMiddleware {
  public readonly handle: RequestHandler;

  constructor(private readonly userRepository: UserRepository) {
    this.handle = (req, res, next) => this.execute(req, res, next);
  }

  private async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const request = req as AuthenticatedRequest;
    const userId = Number.parseInt(request.cookies?.uid ?? '', 10);
    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    request.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return next();
  }
}
