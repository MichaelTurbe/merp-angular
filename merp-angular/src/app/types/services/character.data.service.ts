import { computed, Injectable, Signal, WritableSignal } from "@angular/core";
import { Character } from "../models/Character";
import { CharacterStat } from "../models/CharacterStat";
import { LocalStorageRepository } from "./local-storage.repository";
import { SystemDataService } from "./system.data.service";
import { CharacterSkill } from "../models/CharacterSkill";
import { Item } from "../models/Item";

@Injectable({ providedIn: 'root' })
export class CharacterDataService extends LocalStorageRepository<Character> {

  constructor(private systemDataService: SystemDataService) {
    super('character');
  }

  createNewCharacter(randomCharacterName: string): Character {
    let newCharacter = this.getBlankCharacter(randomCharacterName);
    this.setItem(newCharacter);
    return newCharacter;
  }

  getNewCharacterId(): number {
    return this.getNextAvailableIdForType();
  }

  public getBlankCharacter(name: string): Character {
    const character = {} as Character;
    character.id = this.getNewCharacterId();
    character.Name = name;
    character.storageType = 'character';
    console.log(`creating new character with id: ${character.id}`);
    character.Strength = {
      StatName: "Strength",
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as CharacterStat;
    character.Agility = {
      StatName: "Agility",
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as CharacterStat;
    character.Constitution = {
      StatName: "Constitution",
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as CharacterStat;
    character.Intelligence = {
      StatName: "Intelligence",
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as CharacterStat;
    character.Intuition = {
      StatName: "Intuition",
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as CharacterStat;
    character.Presence = {
      StatName: "Presence",
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as CharacterStat;

    const allSkills = this.systemDataService.GetAllSkills();
    const characterSkills: Array<CharacterSkill> = new Array<CharacterSkill>();
    allSkills.forEach(skill => {
      const characterSkill = {} as CharacterSkill;
      characterSkill.Skill = skill;
      characterSkill.FivePercentRanks = 0;
      characterSkill.TwoPercentRanks = 0;
      characterSkill.RankBonus = 0;
      characterSkill.StatBonus = 0;
      characterSkill.ProfessionalBonus = 0;
      characterSkill.ItemBonus = 0;
      characterSkill.SpecialBonus1 = 0;
      characterSkill.SpecialBonus2 = 0;
      characterSkill.TotalBonus = 0;

      characterSkills.push(characterSkill);
    });

    character.Skills = characterSkills;

    character.Inventory = new Array<Item>();

    return character;
  }


}
