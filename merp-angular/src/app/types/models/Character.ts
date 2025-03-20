import { Stat } from "./Stat";
import { StorageEntity } from "../utilities/storage-entity";

export interface Character extends StorageEntity{
  id: string,
  storageType: string,
  CharacterName: string,
  Strength: Stat,
  Agility: Stat,
  Constitution: Stat,
  Intelligence: Stat,
  Intuition: Stat,
  Presence: Stat
}
