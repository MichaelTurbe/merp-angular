import { ItemType } from "./ItemType";
import { Skill } from "./Skill";

export interface Item{
  id: number,
  Name: string,
  ItemType: ItemType;
  AppliesToSkill: boolean,
  SkillForBonus: Skill,
  Bonus: number,
  Weight: number,
  Worn: boolean,
  ShowInActions: boolean
}
