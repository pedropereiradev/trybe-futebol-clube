import userModel from '../database/models/Users';
import { IUser } from '../interfaces/User.interface';

export default class UserModel {
  static async findOne(email: string): Promise<IUser> {
    const result = await userModel.findOne({
      where: {
        email,
      },
    });

    return result as IUser;
  }
}
