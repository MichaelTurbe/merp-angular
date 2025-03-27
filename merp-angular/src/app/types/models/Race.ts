import { RaceSkillRank } from "./RaceSkillRank";
import { RaceStatBonus } from "./RaceStatBonus";

export interface Race {
  id: number;
  Name: string;
  IsMannish: boolean;
  StatBonuses: Array<RaceStatBonus>;
  AdolescentSkillRanks: Array<RaceSkillRank>;
}
