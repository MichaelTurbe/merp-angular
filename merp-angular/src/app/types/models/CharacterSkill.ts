import { Skill } from "./Skill";

export interface CharacterSkill {
  Skill: Skill,
  FivePercentRanks: number,
  TwoPercentRanks: number,
  RankBonus: number,
  StatBonus: number,
  ProfessionalBonus: number,
  ItemBonus: number,
  SpecialBonus1: number,
  SpecialBonus2: number,
  TotalBonus: number
}
