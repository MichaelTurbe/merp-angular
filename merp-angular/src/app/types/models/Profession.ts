import { SkillCategoryProfessionalBonus } from "./SkillCategoryProfessionalBonus";
import { ParticularSkillProfessionalBonus } from "./ParticularSkillProfessionalBonus";
export interface Profession {

  id: number;
  Name: string;
  SkillCategoryProfessionalBonuses: Array<SkillCategoryProfessionalBonus>;
  ParticularSkillProfessionalBonuses: Array<ParticularSkillProfessionalBonus>;
}
