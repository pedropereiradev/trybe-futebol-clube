import * as bcrypt from 'bcryptjs';

export default class Bcrypt {
  public static compare(encrypted: string, value: string): boolean {
    return bcrypt.compareSync(value, encrypted);
  }
}
