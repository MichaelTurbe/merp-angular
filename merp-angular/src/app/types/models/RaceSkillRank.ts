import { Race } from "./Race";
import { Skill } from "./Skill";

export interface RaceSkillRank{
  Race: Race;
  Skill: Skill;
  Ranks: number;
}
