import { CharacterStat } from "./CharacterStat";
import { StorageEntity } from "../utilities/storage-entity";
import { CharacterSkill } from "./CharacterSkill";

export interface Character extends StorageEntity {
  // id: string,
  // storageType: 'string',
  Name: string,
  Strength: CharacterStat,
  Agility: CharacterStat,
  Constitution: CharacterStat,
  Intelligence: CharacterStat,
  Intuition: CharacterStat,
  Presence: CharacterStat;
  Skills: Array<CharacterSkill>;
}
