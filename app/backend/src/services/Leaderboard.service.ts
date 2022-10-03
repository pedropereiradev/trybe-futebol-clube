import IMatch from '../interfaces/Match.interface';
import Matches from '../database/models/Matches';
import MatchService from './Match.service';
import ITeams from '../interfaces/Team.interface';
import TeamService from './Team.service';
import Teams from '../database/models/Teams';
import ILeaderboard from '../interfaces/Leaderboard.interface';

export default class LeaderboardService {
  private _matchService: MatchService;
  private _teamService: TeamService;
  private _teams: IMatch[][];
  private _goalsFavor = 0;
  private _goalsOwn = 0;
  private _wins = 0;
  private _losses = 0;
  private _draws = 0;
  private _totalPoints: number;
  private _totalGames: number;
  private _goalsBalance: number;
  private _efficiency: number;
  private _leaderboard: ILeaderboard[];
  private readonly pointsPerWin = 3;
  private readonly pointsPerDraw = 1;

  constructor() {
    this._matchService = new MatchService(Matches);
    this._teamService = new TeamService(Teams);
  }

  private async getMatches(): Promise<IMatch[]> {
    return this._matchService.findByInProgress(false);
  }

  private async getTeamName(): Promise<ITeams[]> {
    const { response } = await this._teamService.findAll();

    return response as ITeams[];
  }

  private async groupByHomeOrAwayTeam() {
    const matches = await this.getMatches();
    const teams = await this.getTeamName();

    const filterByHomeTeamName = teams.map((team) => matches
      .filter((match) => team.id === match.homeTeam));

    this._teams = filterByHomeTeamName;
  }

  private goals(values: IMatch[]) {
    this._goalsFavor = 0;
    this._goalsOwn = 0;

    values.forEach((value) => {
      this._goalsFavor += value.homeTeamGoals;
      this._goalsOwn += value.awayTeamGoals;
    });
  }

  private winsDrawsLosses(values: IMatch[]) {
    this._wins = 0;
    this._losses = 0;
    this._draws = 0;

    values.forEach((value) => {
      if (value.homeTeamGoals > value.awayTeamGoals) {
        this._wins += 1;
      } else if (value.homeTeamGoals === value.awayTeamGoals) {
        this._draws += 1;
      } else {
        this._losses += 1;
      }
    });
  }

  private totalValues(values: IMatch[]) {
    this._totalGames = values.length;
    this._totalPoints = (this._wins * this.pointsPerWin) + (this._draws * this.pointsPerDraw);
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
    this._efficiency = Number(((this._totalPoints / (this._totalGames * 3)) * 100).toFixed(2));
  }

  public async getDataValuesByTeam() {
    const result = this._teams.map((team) => {
      this.goals(team);
      this.winsDrawsLosses(team);
      this.totalValues(team);

      return {
        name: team[0].teamHome?.teamName,
        totalPoints: this._totalPoints,
        totalGames: this._totalGames,
        totalVictories: this._wins,
        totalDraws: this._draws,
        totalLosses: this._losses,
        goalsFavor: this._goalsFavor,
        goalsOwn: this._goalsOwn,
        goalsBalance: this._goalsBalance,
        efficiency: this._efficiency,
      };
    });

    this._leaderboard = result;
  }

  private orderLeaderboard() {
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

  public async leaderboardHome() {
    await this.groupByHomeOrAwayTeam();
    await this.getDataValuesByTeam();

    this.orderLeaderboard();

    return this._leaderboard;
  }
}
