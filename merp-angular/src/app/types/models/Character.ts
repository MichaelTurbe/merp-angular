import { CharacterStat } from "./CharacterStat";
import { StorageEntity } from "../utilities/storage-entity";
import { CharacterSkill } from "./CharacterSkill";
import { Race } from "./Race";
import { Profession } from "./Profession";

export interface Character extends StorageEntity {
  // id: string,
  // storageType: 'string',
  Name: string,
  Level: number,
  Strength: CharacterStat,
  Agility: CharacterStat,
  Constitution: CharacterStat,
  Intelligence: CharacterStat,
  Intuition: CharacterStat,
  Presence: CharacterStat;
  Skills: Array<CharacterSkill>;
  Race: Race;
  Profession?: Profession;
}
