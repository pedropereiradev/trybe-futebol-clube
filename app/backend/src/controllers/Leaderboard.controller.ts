import { Request, Response } from 'express';
import LeaderboardHomeService from '../services/LeaderboardHome.service';
import LeaderboardService from '../services/Leaderboard.service';
import LeaderboardAwayService from '../services/LeaderboardAway.service';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService,
    private leaderboardHomeService: LeaderboardHomeService,
    private leaderboardAwayService: LeaderboardAwayService,
  ) { }

  public async getHomeLeaderboard(req: Request, res: Response): Promise<Response> {
    const result = await this.leaderboardHomeService.leaderboard();

    return res.status(200).json(result);
  }

  public async getAwayLeaderboard(req: Request, res: Response): Promise<Response> {
    const result = await this.leaderboardAwayService.leaderboard();

    return res.status(200).json(result);
  }
}
