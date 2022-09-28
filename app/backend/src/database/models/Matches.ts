import { BOOLEAN, INTEGER, Model, Optional } from 'sequelize';
import db from '.';
import Teams from './Teams';

type MatchesAttributes = {
  id: number,
  home_team: number,
  home_team_goals: number,
  away_team: number,
  away_team_goals: number,
  in_progress: boolean,
}

type MatchesCreationAttributes = Optional<MatchesAttributes, 'id'>

export default class Matches extends Model<MatchesAttributes, MatchesCreationAttributes> {
  declare id: number;
  declare home_team: number;
  declare home_team_goals: number;
  declare away_team: number;
  declare away_team_goals: number;
  declare in_progress: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  home_team: {
    type: INTEGER,
    allowNull: false,
  },
  home_team_goals: {
    type: INTEGER,
    allowNull: false,
  },
  away_team: {
    type: INTEGER,
    allowNull: false,
  },
  away_team_goals: {
    type: INTEGER,
    allowNull: false,
  },
  in_progress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
})

Teams.belongsTo(Matches, { foreignKey: 'id', targetKey: 'home_team', as: 'teamHome' });
Teams.belongsTo(Matches, { foreignKey: 'id', targetKey: 'away_team',  as: 'teamAway' });

Matches.hasMany(Teams, { foreignKey: 'home_team', sourceKey: 'id' });
Matches.hasMany(Teams, { foreignKey: 'away_team', sourceKey: 'id' });
