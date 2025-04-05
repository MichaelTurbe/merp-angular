import { Skill } from "./Skill";

export interface Item{
  id: number,
  Name: string,
  IsMagic: boolean,
  AppliesToSkill: boolean,
  SkillForBonus: Skill,
  Bonus: number,
  Weight: number,
  Carried: boolean
}
