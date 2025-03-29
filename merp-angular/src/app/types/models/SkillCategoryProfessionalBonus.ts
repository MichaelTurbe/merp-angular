import { Profession } from "./Profession";
import { SkillCategory } from "./SkillCategory";

export interface SkillCategoryProfessionalBonus{
  SkillCategory: SkillCategory;
  BonusPerLevel: number;
}
