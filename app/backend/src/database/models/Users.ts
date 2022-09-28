import { Model, INTEGER, STRING, Optional } from 'sequelize';
import db from '.';

type UserAttributes = {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

export default class Users extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
})