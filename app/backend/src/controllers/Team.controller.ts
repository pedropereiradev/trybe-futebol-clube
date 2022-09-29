import { Request, Response } from 'express';
import TeamService from '../services/Team.service';

export default class TeamController {
  public static async findAll(req: Request, res: Response): Promise<Response> {
    const { status, response } = await TeamService.findAll();

    return res.status(status).json(response);
  }

  public static async findOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { status, response } = await TeamService.findOne(Number(id));

    return res.status(status).json(response);
  }
}
