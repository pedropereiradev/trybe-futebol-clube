import { BOOLEAN, INTEGER, Model, Optional } from 'sequelize';
import db from '.';
import Teams from './Teams';

type MatchesAttributes = {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
};

type MatchesCreationAttributes = Optional<MatchesAttributes, 'id'>;

export default class Matches extends Model<MatchesAttributes, MatchesCreationAttributes> {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

Teams.belongsTo(Matches, { foreignKey: 'id', targetKey: 'home_team', as: 'teamHome' });
Teams.belongsTo(Matches, { foreignKey: 'id', targetKey: 'away_team', as: 'teamAway' });

Matches.hasMany(Teams, { foreignKey: 'home_team', sourceKey: 'id' });
Matches.hasMany(Teams, { foreignKey: 'away_team', sourceKey: 'id' });
