import IMatch from '../interfaces/Match.interface';
import LeaderboardService from './Leaderboard.service';

export default class LeaderboardHomeService extends LeaderboardService {
  protected async groupByTeam() {
    const matches = await this.getMatches();
    const teams = await this.getTeamName();

    const filterByHomeTeamName = teams.map((team) => matches
      .filter((match) => team.id === match.homeTeam));

    this._teams = filterByHomeTeamName;
  }

  protected goals(values: IMatch[]) {
    this._goalsFavor = 0;
    this._goalsOwn = 0;

    values.forEach((value) => {
      this._goalsFavor += value.homeTeamGoals;
      this._goalsOwn += value.awayTeamGoals;
    });
  }

  protected winsDrawsLosses(values: IMatch[]) {
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

  protected async getDataValuesByTeam() {
    const result = this._teams.map((team) => {
      this.goals(team);
      this.winsDrawsLosses(team);
      this.totalValues(team);

      return {
        name: team[0].teamHome?.teamName || '',
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

  public async leaderboard() {
    await this.groupByTeam();
    await this.getDataValuesByTeam();

    this.orderLeaderboard();

    return this._leaderboard;
  }
}
