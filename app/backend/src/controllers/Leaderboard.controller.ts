import { Request, Response } from 'express';
import LeaderboardHomeService from '../services/LeaderboardHome.service';
import LeaderboardAwayService from '../services/LeaderboardAway.service';
import LeaderboardCompleteService from '../services/LeaderboardComplete.service';

export default class LeaderboardController {
  constructor(
    private leaderboardHomeService: LeaderboardHomeService,
    private leaderboardAwayService: LeaderboardAwayService,
    private leaderboardCompleteService: LeaderboardCompleteService,
  ) { }

  public async getHomeLeaderboard(req: Request, res: Response): Promise<Response> {
    const result = await this.leaderboardHomeService.leaderboard();

    return res.status(200).json(result);
  }

  public async getAwayLeaderboard(req: Request, res: Response): Promise<Response> {
    const result = await this.leaderboardAwayService.leaderboard();

    return res.status(200).json(result);
  }

  public async getCompleteLeaderboard(req: Request, res: Response): Promise<Response> {
    const result = await this.leaderboardCompleteService.leaderboard();

    return res.status(200).json(result);
  }
}
