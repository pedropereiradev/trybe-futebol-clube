import { INTEGER, Model, Optional, STRING } from 'sequelize';
import db from '.';

type TeamsAttributes = {
  id: number,
  teamName: string,
};

type TeamsCreationAttributes = Optional<TeamsAttributes, 'id'>;

export default class Teams extends Model<TeamsAttributes, TeamsCreationAttributes> {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});
