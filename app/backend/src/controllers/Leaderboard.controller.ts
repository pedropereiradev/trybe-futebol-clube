import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) { }

  public async getHomeLeaderboard(req: Request, res: Response): Promise<Response> {
    const result = await this.leaderboardService.leaderboardHome();

    return res.status(200).json(result);
  }
}
