export default interface IUserLogin {
  email: string
  password: string
}

export interface IUser extends IUserLogin {
  role: string
  username: string
}
