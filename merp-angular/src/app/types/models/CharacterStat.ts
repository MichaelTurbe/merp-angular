import { Stat } from "./Stat";

export interface CharacterStat {
  StatName: string,
  Value: number
  NormalBonus: number
  RaceBonus: number
  TotalBonus: number;
}
