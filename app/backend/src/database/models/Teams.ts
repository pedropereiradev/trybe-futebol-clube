import { INTEGER, Model, Optional, STRING } from 'sequelize';
import db from '.';

type TeamsAttributes = {
  id: number,
  team_name: string,
}

type TeamsCreationAttributes = Optional<TeamsAttributes, 'id'>

export default class Teams extends Model<TeamsAttributes, TeamsCreationAttributes> {
  declare id: number;
  declare team_name: string;
}

Teams.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team_name: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});
