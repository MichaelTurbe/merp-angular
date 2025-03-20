import { computed, Injectable, Signal, WritableSignal } from "@angular/core";
import { Character } from "../models/Character";
import { StatName } from "../models/StatName";
import { Stat } from "../models/Stat";
import { LocalStorageRepository } from "./local-storage.repository";

@Injectable({ providedIn: 'root' })
export class CharacterDataService extends LocalStorageRepository<Character> {

  constructor() {
    super('character');

  }

  createNewCharacter(): Character {
    let newCharacter = this.getBlankCharacter();
    this.setItem(newCharacter);
    return newCharacter;
  }

  getNewCharacterId(): string {
    return this.getNextAvailableIdForType();
  }

  public getBlankCharacter(): Character {
    const character = {} as Character;
    character.id = this.getNewCharacterId();
    character.storageType = 'character';
    console.log(`creating new character with id: ${character.id}`);
    character.Strength = {
      StatName: StatName.Strength,
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as Stat;
    character.Agility = {
      StatName: StatName.Agility,
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as Stat;
    character.Constitution = {
      StatName: StatName.Constition,
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as Stat;
    character.Intelligence = {
      StatName: StatName.Intelligence,
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as Stat;
    character.Intuition = {
      StatName: StatName.Intuition,
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as Stat;
    character.Presence = {
      StatName: StatName.Presence,
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as Stat;
    return character;
  }
}
