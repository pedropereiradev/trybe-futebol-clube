import { Request, Response } from 'express';
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
}
