import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default class Token {
  public static generate(email: string): string {
    return jwt.sign(email, JWT_SECRET);
  }

  public static validate(token: string) {
    try {
      const data = jwt.verify(token, JWT_SECRET);

      return data;
    } catch (err) {
      return null;
    }
  }
}
