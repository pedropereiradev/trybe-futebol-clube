import ILeaderboard from '../interfaces/Leaderboard.interface';
import LeaderboardService from './Leaderboard.service';
import LeaderboardAwayService from './LeaderboardAway.service';
import LeaderboardHomeService from './LeaderboardHome.service';

export default class LeaderboardCompleteService extends LeaderboardService {
  private _homeTeamLeaderboard: ILeaderboard[];
  private _awayTeamLeaderboard: ILeaderboard[];
  private _name: string;
  private _totalVictories: number;
  private _totalDraws: number;
  private _totalLosses: number;

  constructor(
    private leaderboardHomeService: LeaderboardHomeService,
    private leaderboardAwayService: LeaderboardAwayService,
  ) {
    super();
  }

  private async getLeaderboards() {
    const leaderboardHome = await this.leaderboardHomeService.leaderboard();
    const leaderboardAway = await this.leaderboardAwayService.leaderboard();

    this._homeTeamLeaderboard = leaderboardHome;
    this._awayTeamLeaderboard = leaderboardAway;
  }

  private clearData() {
    this._totalPoints = 0;
    this._totalGames = 0;
    this._totalVictories = 0;
    this._totalDraws = 0;
    this._totalLosses = 0;
    this._goalsFavor = 0;
    this._goalsOwn = 0;
    this._goalsBalance = 0;
  }

  private calcTotalValues(team: ILeaderboard) {
    this.clearData();

    const awayTeam = this._awayTeamLeaderboard.find((teamAway) => team.name === teamAway.name);

    this._name = team.name;
    this._totalPoints = team.totalPoints + (awayTeam?.totalPoints || 0);
    this._totalGames = team.totalGames + (awayTeam?.totalGames || 0);
    this._totalVictories = team.totalVictories + (awayTeam?.totalVictories || 0);
    this._totalDraws = team.totalDraws + (awayTeam?.totalDraws || 0);
    this._totalLosses = team.totalLosses + (awayTeam?.totalLosses || 0);
    this._goalsFavor = team.goalsFavor + (awayTeam?.goalsFavor || 0);
    this._goalsOwn = team.goalsOwn + (awayTeam?.goalsOwn || 0);
    this._goalsBalance = team.goalsBalance + (awayTeam?.goalsBalance || 0);
  }

  private getDataByTeam() {
    const leaderboard = this._homeTeamLeaderboard.map((team) => {
      this.calcTotalValues(team);

      return {
        name: this._name || '',
        totalPoints: this._totalPoints,
        totalGames: this._totalGames,
        totalVictories: this._totalVictories,
        totalDraws: this._totalDraws,
        totalLosses: this._totalLosses,
        goalsFavor: this._goalsFavor,
        goalsOwn: this._goalsOwn,
        goalsBalance: this._goalsBalance,
        efficiency: Number(((this._totalPoints / (this._totalGames * 3)) * 100).toFixed(2)),
      };
    });

    this._leaderboard = leaderboard;
  }

  public async leaderboard() {
    await this.getLeaderboards();
    this.getDataByTeam();

    this.orderLeaderboard();

    return this._leaderboard;
  }
}
