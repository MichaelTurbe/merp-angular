import { SkillCategory } from "./SkillCategory";
import { Stat } from "./Stat";

export interface Skill {

  id: number;
  Name: string;
  SkillCategory: SkillCategory;
  CanHaveRanks: boolean;
  HasStat: boolean;
  Stat: Stat;
  HasMaximumNumberOfRanks: boolean;
  MaximumNumberOfRanks: number;
  CanHaveProfessionalBonus: boolean;
  CanHaveItemBonus: boolean;
  InherentSpecialBonus: number;
  HasInherentSpecialBonus: boolean;
}
