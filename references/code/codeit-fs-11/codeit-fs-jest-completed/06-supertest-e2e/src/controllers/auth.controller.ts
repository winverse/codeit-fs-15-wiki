import { type Request, type Response, type Router } from 'express';
import type { AuthService } from '#src/services/auth.service.js';
import { BaseController } from '#src/controllers/base.controller.js';
import type { AuthenticatedRequest } from '#src/middlewares/require-auth.middleware.js';
import type { RequireAuthMiddleware } from '#src/middlewares/require-auth.middleware.js';

interface LoginBody {
  email?: string;
  password?: string;
}

export class AuthController extends BaseController {
  constructor(
    private readonly authService: AuthService,
    private readonly requireAuthMiddleware?: RequireAuthMiddleware,
  ) {
    super();
  }

  public routes(): Router {
    this.router.post('/auth/login', (req, res) => this.login(req, res));
    const requireAuthMiddleware = this.requireAuthMiddleware;
    if (requireAuthMiddleware) {
      this.router.get(
        '/auth/me',
        requireAuthMiddleware.handle,
        (req, res) => this.me(req as AuthenticatedRequest, res),
      );
    }
    return this.router;
  }

  private async login(
    req: Request<unknown, unknown, LoginBody>,
    res: Response,
  ) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'email과 password를 모두 전달해야 합니다.' });
    }

    const user = await this.authService.login(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ message: '로그인 정보가 올바르지 않습니다.' });
    }

    res.cookie('uid', String(user.id), {
      httpOnly: true,
      sameSite: 'lax',
    });
    res.setHeader('x-auth-step', 'login');
    return res.status(200).json({ user });
  }

  private async me(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return res.status(500).json({
        message: '인증 미들웨어가 사용자 정보를 준비하지 못했습니다.',
      });
    }

    return res.status(200).json({ user: req.user });
  }
}
