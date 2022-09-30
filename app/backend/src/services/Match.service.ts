import IMatch, { IMatchGoals } from '../interfaces/Match.interface';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import Token from './utils/Token.service';
import TeamService from './Team.service';

const includeTeamNameParams = {
  include: [
    {
      model: Teams,
      as: 'teamHome',
      attributes: { exclude: ['id'] },
    },
    {
      model: Teams,
      as: 'teamAway',
      attributes: { exclude: ['id'] },
    },
  ],
};

type response = {
  status: number
  message?: string
  id?: number
};

export default class MatchService {
  private _teamService: TeamService;

  constructor(private matchModel: typeof Matches) {
    this._teamService = new TeamService(Teams);
  }

  public async findAll(): Promise<IMatch[]> {
    const result = await this.matchModel.findAll({
      ...includeTeamNameParams,
    });

    return result as IMatch[];
  }

  public async findByInProgress(inProgress: boolean): Promise<IMatch[]> {
    const result = await this.matchModel.findAll({
      where: { inProgress },
      ...includeTeamNameParams,
    });

    return result as IMatch[];
  }

  public async create(params: IMatch, token: string): Promise<response> {
    const validateData = await this.validations(params, token);

    if (validateData) return validateData;

    const result = await this.matchModel.create(params);

    return { status: 201, id: result.getDataValue('id') };
  }

  public async updateInProgress(id: number) {
    return this.matchModel.update({ inProgress: false }, { where: { id } });
  }

  public async updateGoals(id: number, params: IMatchGoals) {
    console.log({ params, id });

    return this.matchModel.update(
      { homeTeamGoals: params.homeTeamGoals, awayTeamGoals: params.awayTeamGoals },
      { where: { id } },
    );
  }

  private async validations(params: IMatch, token: string) {
    if (!token || !Token.validate(token)) {
      return { status: 401, message: 'Token must be a valid token' };
    }

    if (params.awayTeam === params.homeTeam) {
      return { status: 401, message: 'It is not possible to create a match with two equal teams' };
    }

    const isTeamHomeExists = await this._teamService.findOne(params.homeTeam);
    const isTeamAwayExists = await this._teamService.findOne(params.awayTeam);

    if (!Object.keys(isTeamHomeExists.response).length
      || !Object.keys(isTeamAwayExists.response).length) {
      return { status: 404, message: 'There is no team with such id!' };
    }

    return null;
  }
}
