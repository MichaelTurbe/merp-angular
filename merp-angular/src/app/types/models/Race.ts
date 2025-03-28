import { RaceSkillRank } from "./RaceSkillRank";
import { RaceStatBonus } from "./RaceStatBonus";

export interface Race {
  id: number;
  Name: string;
  Human: boolean;
  StatBonuses: Array<RaceStatBonus>;
  AdolescentSkillRanks: Array<RaceSkillRank>;
}
