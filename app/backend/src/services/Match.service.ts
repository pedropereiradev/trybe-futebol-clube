import IMatch from '../interfaces/Match.interface';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

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

export default class MatchService {
  constructor(private matchModel: typeof Matches) { }

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
}
