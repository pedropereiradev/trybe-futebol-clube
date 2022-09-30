import ITeams from '../interfaces/Team.interface';
import Teams from '../database/models/Teams';

type response = {
  status: number
  response: ITeams | ITeams[] | object
};

export default class TeamService {
  constructor(private teamModel: typeof Teams) {}

  public async findAll(): Promise<response> {
    const result = await this.teamModel.findAll();

    return { status: 200, response: result };
  }

  public async findOne(id: number): Promise<response> {
    const result = await this.teamModel.findByPk(id);

    return { status: 200, response: result || {} };
  }
}
