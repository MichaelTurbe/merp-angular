import { computed, effect, Injectable, Signal, WritableSignal } from "@angular/core";
import { Character } from "../models/Character";
import { CharacterStat } from "../models/CharacterStat";
import { CharacterDataService } from "./character.data.service";
import { CharacterSheetSignalStore } from "./character-sheet-signal.store";
import { StatFieldType } from "../models/StatFieldType";
import { Stat } from "../models/Stat";
import { SystemDataService } from "./system.data.service";
import { Skill } from "../models/Skill";
import { SkillFieldType } from "../models/SkillFieldType";
import { CharacterSkill } from "../models/CharacterSkill";
import { Race } from "../models/Race";
import { Profession } from "../models/Profession";

@Injectable()
export class CharacterSheetStateService {
  private character: Character;

  public StatNames = ["Strength",
    "Agility",
    "Constitution",
    "Intelligence",
    "Intuition",
    "Presence"];

  public AllStats!: Array<Stat>;
  public MovingManeuverSkills: Array<Skill> = new Array<Skill>();
  public WeaponSkills: Array<Skill> = new Array<Skill>();
  public GeneralSkills: Array<Skill> = new Array<Skill>();
  public SubterfugeSkills: Array<Skill> = new Array<Skill>();
  public MagicSkills: Array<Skill> = new Array<Skill>();
  public MiscSkills: Array<Skill> = new Array<Skill>();

  constructor(private characterDataService: CharacterDataService,
    private characterSheetSignalStore: CharacterSheetSignalStore,
    private systemDataService: SystemDataService
  ) {
    console.log(`this is the ChraracterSheetStateService constructor!`);
    this.AllStats = systemDataService.GetAllStats();
    this.MovingManeuverSkills = systemDataService.GetSkillsByCategory("Movement And Maneuver");
    this.WeaponSkills = systemDataService.GetSkillsByCategory("Weapon Skills");
    this.GeneralSkills = systemDataService.GetSkillsByCategory("General Skills");
    this.SubterfugeSkills = systemDataService.GetSkillsByCategory("Subterfuge Skills");
    this.MiscSkills = systemDataService.GetSkillsByCategory("Misc Skills And Bonuses");
    this.MagicSkills = systemDataService.GetSkillsByCategory("Magical Skills");
  }

  public getCurrentCharacter(): Character {
    return this.character;
  }

  public loadCharacter(characterId: number) {
    const findCharacterDataResult = this.characterDataService.getItem(characterId);
    if (findCharacterDataResult.success) {
      this.character = findCharacterDataResult.value;
      console.log('loaded character: ', this.character);
    } else {
      console.log(`couldn't find that character!`);
    }
    this.initializeComputedSignals();
  }

  public createNewCharacter() {
    console.log('create new character');
    let randomCharacterName = this.systemDataService.GetRandomCharacterName();
    this.character = this.characterDataService.createNewCharacter(randomCharacterName);
    this.initializeComputedSignals();
  }

  GetCharacterStatByName(statName: string): CharacterStat {
    switch (statName) {
      case "Strength":
        return this.character.Strength;
      case "Agility":
        return this.character.Agility;
      case "Constitution":
        return this.character.Constitution;
      case "Intelligence":
        return this.character.Intelligence;
      case "Intuition":
        return this.character.Intuition;
      case "Presence":
        return this.character.Presence;
      default:
        return this.character.Strength;
    }
  }

  GetCharacterSkillByName(skillName: string): CharacterSkill {
    const characterSkills = this.character.Skills;
    let foundCharacterSkill: CharacterSkill = null;
    characterSkills.forEach(characterSkill => {
      if (characterSkill.Skill.Name === skillName) {
        foundCharacterSkill = characterSkill;
      }
    });
    return foundCharacterSkill;
  }

  GetCharacterSkillBy(skill: Skill): CharacterSkill {
    const characterSkills = this.character.Skills;
    let foundCharacterSkill: CharacterSkill = null;
    characterSkills.forEach(characterSkill => {
      if (characterSkill.Skill.Name === skill.Name) {
        foundCharacterSkill = characterSkill;
      }
    });
    return foundCharacterSkill;
  }

  public initializeComputedSignals() {
    console.log('initializeComputedSignals');
  }

  public SetCharacterStatField(stat: Stat, value: number, fieldType: StatFieldType): void {
    const characterStat = this.GetCharacterStatByName(stat.Name);
    switch (fieldType) {
      case StatFieldType.Value:
        characterStat.Value = value;
        break;
      case StatFieldType.NormalBonus:
        characterStat.NormalBonus = value;
        break;
      case StatFieldType.RaceBonus:
        characterStat.RaceBonus = value;
        break;
      case StatFieldType.TotalBonus:
        characterStat.TotalBonus = value;
        break;
    }
  }

  public SetCharacterSkillField(skill: Skill, value: number, fieldType: SkillFieldType): void {
    const characterSkill = this.GetCharacterSkillByName(skill.Name);
    switch (fieldType) {
      case SkillFieldType.RankBonus:
        characterSkill.RankBonus = value;
        break;
      case SkillFieldType.ItemBonus:
        characterSkill.ItemBonus = value;
        break;
      case SkillFieldType.StatBonus:
        characterSkill.StatBonus = value;
        break;
      case SkillFieldType.ProfessionalBonus:
        characterSkill.ProfessionalBonus = value;
        break;
      case SkillFieldType.SpecialBonus1:
        characterSkill.SpecialBonus1 = value;
        break;
      case SkillFieldType.SpecialBonus2:
        characterSkill.SpecialBonus2 = value;
        break;
      case SkillFieldType.FivePercentRanks:
        characterSkill.FivePercentRanks = value;
        break;
      case SkillFieldType.TwoPercentRanks:
        characterSkill.TwoPercentRanks = value;
        break;
    }
  }

  SetCharacterName(name: string) {
    console.log(`set character name: ${name}`);
    this.character.Name = name;
    console.log(this.character);
  }

  GetCharacterName() {
    return this.character.Name;
  }

  GetCharacterRace() {
    return this.character.Race;
  }

  SetCharacterRace(race: Race) {
    this.character.Race = race;
  }

  GetCharacterProfession() {
    return this.character.Profession;
  }

  SetCharacterProfession(profession: Profession) {
    this.character.Profession = profession;
  }

  GetCharacterLevel() {
    return this.character.Level;
  }

  SetCharacterLevel(level: number) {
    this.character.Level = level;
  }

  SaveCharacter() {
    this.characterDataService.setItem(this.character);
  }

}
