import Users from '../database/models/Users';
import IUserLogin from '../interfaces/User.interface';
import Bcrypt from './utils/Bcrypt.service';
import Token from './utils/Token.service';

type response = {
  status: number
  message?: string
  token?: string
};

export default class UserService {
  constructor(private userModel: typeof Users) {}

  public async login(params: IUserLogin): Promise<response> {
    const result = await this.userModel.findOne({
      where: {
        email: params.email,
      } });

    if (!result || !Bcrypt.compare(result.password, params.password)) {
      return { status: 401, message: 'Incorrect email or password' };
    }

    const token = Token.generate(params.email);

    console.log({
      result, token,
    });

    return { status: 200, token };
  }

  public async validateUser(token: string) {
    const email = Token.validate(token);

    const result = await this.userModel.findOne({
      where: {
        email,
      },
    });

    return result;
  }
}
