import { StatName } from "./StatName";

export interface Stat {
  StatName: StatName
  Value: number
  NormalBonus: number
  RaceBonus: number
  TotalBonus: number;
}
