export interface IMatchGoals {
  homeTeamGoals: number
  awayTeamGoals: number
}

export default interface IMatch extends IMatchGoals {
  id?: number
  homeTeam: number
  awayTeam: number
  inProgress: boolean
}
