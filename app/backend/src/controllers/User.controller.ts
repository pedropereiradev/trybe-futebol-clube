import { NextFunction, Request, Response } from 'express';
import IUserLogin from '../interfaces/User.interface';
import UserService from '../services/User.service';
import loginDTOValidation from './dto/loginDTO';

export default class UserController {
  constructor(private userService: UserService) {}

  public async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { error } = loginDTOValidation.validate(req.body as IUserLogin);

      if (error) {
        next(error);
      }

      const { status, message, token } = await this.userService.login(req.body);

      if (message) {
        return res.status(status).json({ message });
      }

      return res.status(status).json({ token });
    } catch (err) {
      next(err);
    }
  }

  public async getUserRole(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { authorization } = req.headers;

      const result = await this.userService.validateUser(authorization || '');

      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ role: result.role });
    } catch (err) {
      next(err);
    }
  }
}
