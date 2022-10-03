import IMatch from '../interfaces/Match.interface';
import Matches from '../database/models/Matches';
import MatchService from './Match.service';
import ITeams from '../interfaces/Team.interface';
import TeamService from './Team.service';
import Teams from '../database/models/Teams';
import ILeaderboard from '../interfaces/Leaderboard.interface';

export default class LeaderboardService {
  protected _matchService: MatchService;
  protected _teamService: TeamService;
  protected _teams: IMatch[][];
  protected _goalsFavor = 0;
  protected _goalsOwn = 0;
  protected _wins = 0;
  protected _losses = 0;
  protected _draws = 0;
  protected _totalPoints: number;
  protected _totalGames: number;
  protected _goalsBalance: number;
  protected _efficiency: number;
  protected _leaderboard: ILeaderboard[];
  protected readonly pointsPerWin = 3;
  protected readonly pointsPerDraw = 1;

  constructor() {
    this._matchService = new MatchService(Matches);
    this._teamService = new TeamService(Teams);
  }

  protected async getMatches(): Promise<IMatch[]> {
    return this._matchService.findByInProgress(false);
  }

  protected async getTeamName(): Promise<ITeams[]> {
    const { response } = await this._teamService.findAll();

    return response as ITeams[];
  }

  protected totalValues(values: IMatch[]) {
    this._totalGames = values.length;
    this._totalPoints = (this._wins * this.pointsPerWin) + (this._draws * this.pointsPerDraw);
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
    this._efficiency = Number(((this._totalPoints / (this._totalGames * 3)) * 100).toFixed(2));
  }

  protected orderLeaderboard() {
    this._leaderboard.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.goalsBalance === b.goalsBalance) {
          if (a.goalsFavor === b.goalsFavor) {
            return a.goalsOwn - b.goalsOwn;
          }
          return b.goalsFavor - a.goalsFavor;
        }
        return b.goalsBalance - a.goalsBalance;
      }

      return b.totalPoints > a.totalPoints ? 1 : -1;
    });
  }
}
