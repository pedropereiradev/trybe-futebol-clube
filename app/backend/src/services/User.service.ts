import UserModel from '../models/User.model';
import IUserLogin from '../interfaces/User.interface';
import Bcrypt from './utils/Bcrypt.service';
import Token from './utils/Token.service';

type response = {
  status: number
  message?: string
  token?: string
};

export default class UserService {
  public model = UserModel;

  static async login(params: IUserLogin): Promise<response> {
    const result = await UserModel.findOne(params.email);

    if (!result || !Bcrypt.compare(result.password, params.password)) {
      return { status: 401, message: 'Incorrect email or password' };
    }

    const token = Token.generate(params.email);

    return { status: 200, token };
  }

  static async validateUser(token: string) {
    const data = Token.validate(token);

    const { role } = await UserModel.findOne(data as string);

    return role;
  }
}
