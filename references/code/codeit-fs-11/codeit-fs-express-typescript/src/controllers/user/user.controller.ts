import { type Router, type Request, type Response } from 'express';
import { HTTP_STATUS, idParamSchema } from '#common';
import { validate } from '#middlewares';
import { UserService } from '#services';
import { BaseController } from '../base.controller.js';
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserInput,
  type UpdateUserInput,
  type UserResponse,
} from './dto/user.dto.js';
import { injectable } from 'tsyringe';

@injectable()
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  public routes(): Router {
    this.router.get('/', (req, res) => this.getUsers(req, res));
    this.router.get('/:id', validate('params', idParamSchema), (req, res) =>
      this.getUser(req, res),
    );
    this.router.post('/', validate('body', createUserSchema), (req, res) =>
      this.createUser(req, res),
    );
    this.router.patch(
      '/:id',
      validate('params', idParamSchema),
      validate('body', updateUserSchema),
      (req, res) => this.updateUser(req, res),
    );
    this.router.delete('/:id', validate('params', idParamSchema), (req, res) =>
      this.deleteUser(req, res),
    );
    return this.router;
  }

  private async getUsers(_req: Request, res: Response<UserResponse[]>) {
    const users = await this.userService.listUsers();
    res.status(HTTP_STATUS.OK).json(users);
  }

  private async getUser(req: Request, res: Response<UserResponse>) {
    const userId = Number(req.params.id);
    const user = await this.userService.getUserDetail(userId);
    res.status(HTTP_STATUS.OK).json(user);
  }

  private async createUser(req: Request, res: Response<UserResponse>) {
    const body = req.body as CreateUserInput;
    const user = await this.userService.registerUser(body);
    res.status(HTTP_STATUS.CREATED).json(user);
  }

  private async updateUser(req: Request, res: Response<UserResponse>) {
    const userId = Number(req.params.id);
    const body = req.body as UpdateUserInput;
    const user = await this.userService.changeProfile(userId, body);
    res.status(HTTP_STATUS.OK).json(user);
  }

  private async deleteUser(req: Request, res: Response) {
    const userId = Number(req.params.id);
    await this.userService.deleteAccount(userId);
    res.sendStatus(HTTP_STATUS.NO_CONTENT);
  }
}
