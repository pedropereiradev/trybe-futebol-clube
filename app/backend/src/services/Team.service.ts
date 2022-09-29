import TeamsModel from '../models/Teams.model';
import ITeams from '../interfaces/Team.interface';

type response = {
  status: number
  response: ITeams | ITeams[] | object
};

export default class TeamService {
  public static async findAll(): Promise<response> {
    const result = await TeamsModel.findAll();

    return { status: 200, response: result };
  }

  public static async findOne(id: number): Promise<response> {
    const result = await TeamsModel.findOne(id);

    return { status: 200, response: result || {} };
  }
}
