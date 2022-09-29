import Teams from '../database/models/Teams';
import ITeams from '../interfaces/Team.interface';

export default class TeamsModel {
  static async findAll(): Promise<ITeams[]> {
    return Teams.findAll();
  }

  static async findOne(id: number): Promise<ITeams | null> {
    return Teams.findOne({
      where: {
        id,
      } });
  }
}
