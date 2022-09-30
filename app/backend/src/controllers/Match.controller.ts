import { Request, Response } from 'express';
import IMatch from '../interfaces/Match.interface';
import MatchService from '../services/Match.service';

export default class MatchController {
  constructor(private matchService: MatchService) { }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    if (inProgress) {
      const result = await this.matchService.findByInProgress(inProgress === 'true');

      return res.status(200).json(result);
    }

    const result = await this.matchService.findAll();

    return res.status(200).json(result);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;

    const data = req.body as IMatch;

    const result = await this.matchService.create(data, authorization || '');

    if (result.message) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(result.status).json({ id: result.id, ...data });
  }

  public async updateInProgress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.matchService.updateInProgress(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }

  public async updateGoals(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.matchService.updateGoals(Number(id), req.body);

    return res.status(200).json(req.body);
  }
}
