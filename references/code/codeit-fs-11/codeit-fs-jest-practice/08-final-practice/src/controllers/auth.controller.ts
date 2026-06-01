import { type Request, type Response, type Router } from 'express';
import type { AuthService } from '#src/services/auth.service.js';
import { BaseController } from '#src/controllers/base.controller.js';

interface LoginBody {
  email?: string;
  password?: string;
}

export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  public routes(): Router {
    this.router.post('/auth/login', (req, res) => this.login(req, res));
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

    return res.status(200).json({
      message:
        'Controller는 HTTP 입출력을 다루고, Service는 인증 규칙을 처리합니다.',
      user,
    });
  }
}
