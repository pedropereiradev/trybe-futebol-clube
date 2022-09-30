import { Request, Response } from 'express';
import TeamService from '../services/Team.service';

export default class TeamController {
  constructor(private teamService: TeamService) {}
  public async findAll(req: Request, res: Response): Promise<Response> {
    const { status, response } = await this.teamService.findAll();

    return res.status(status).json(response);
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { status, response } = await this.teamService.findOne(Number(id));

    return res.status(status).json(response);
  }
}
