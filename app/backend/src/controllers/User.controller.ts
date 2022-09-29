import { NextFunction, Request, Response } from 'express';
import IUserLogin from '../interfaces/User.interface';
import UserService from '../services/User.service';
import loginDTOValidation from './dto/loginDTO';

export default class UserController {
  static async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { error } = loginDTOValidation.validate(req.body as IUserLogin);

      if (error) {
        next(error);
      }

      const { status, message, token } = await UserService.login(req.body);

      if (message) {
        return res.status(status).json({ message });
      }

      return res.status(status).json({ token });
    } catch (err) {
      next(err);
    }
  }

  static async getUserRole(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { authorization } = req.headers;

      const role = await UserService.validateUser(authorization || '');

      return res.status(200).json({ role });
    } catch (err) {
      next(err);
    }
  }
}
