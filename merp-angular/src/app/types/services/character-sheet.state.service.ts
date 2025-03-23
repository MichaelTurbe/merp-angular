import { computed, effect, Injectable, Signal, WritableSignal } from "@angular/core";
import { Character } from "../models/Character";
import { CharacterStat } from "../models/CharacterStat";
import { CharacterDataService } from "./character.data.service";
import { SignalStore } from "./signal-store";
import { CharacterSheetSignalStore } from "./character-sheet-signal.store";
import { StatFieldType } from "../models/StatFieldType";
import { Stat } from "../models/Stat";
import { SystemDataService } from "./system.data.service";
import { Skill } from "../models/Skill";

@Injectable()
export class CharacterSheetStateService {
  public character!: Character;

  public StatNames = ["Strength",
    "Agility",
    "Constitution",
    "Intelligence",
    "Intuition",
    "Presence"];

  public AllStats!: Array<Stat>;
  MovingManeuverSkills: Array<Skill> = new Array<Skill>();

  constructor(private characterDataService: CharacterDataService,
    private characterSheetSignalStore: CharacterSheetSignalStore,
    private systemDataService: SystemDataService
  ) {
    console.log(`this is the ChraracterSheetStateService constructor!`);
    this.AllStats = systemDataService.GetAllStats();
    this.MovingManeuverSkills = systemDataService.GetSkillsByCategory("Movement And Maneuver");
    console.log(this.MovingManeuverSkills);
  }

  public loadCharacter(characterId: number) {
    const findCharacterDataResult = this.characterDataService.getItem(characterId);
    if (findCharacterDataResult.success) {
      this.character = findCharacterDataResult.value;
      console.log('loaded character', this.character);
    } else {
      console.log(`couldn't find that character!`);
    }
    this.initializeComputedSignals();
  }

  public createNewCharacter() {
    console.log('create new character');
    this.character = this.characterDataService.createNewCharacter();
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

  public initializeComputedSignals() {
    console.log('initializeComputedSignals');
    // any signals that are constructed with toSignal()
    // to capture changes from a control's observable
    // will need to be initialized from the component

    this.StatNames.forEach(stat => {
      const normalBonusSignal = computed(() => {
        if (this.characterSheetSignalStore.GetStatSignal(stat, StatFieldType.NormalBonus)) {
          const statValueSignal = this.characterSheetSignalStore.GetStatSignal(stat, StatFieldType.Value);
          this.GetCharacterStatByName(stat).Value = statValueSignal();
          const bonus = this.calculateNormalBonus(this.GetCharacterStatByName(stat).Value);
          this.GetCharacterStatByName(stat).NormalBonus = bonus;
          this.AutoSaveItem();
          return `+${bonus}`;
        } else {
          return '';
        }
      });
      this.characterSheetSignalStore.AddStatSignal(stat, StatFieldType.NormalBonus, normalBonusSignal);

      const totalBonusSignal = computed(() => {
        if (this.characterSheetSignalStore.GetStatSignal(stat, StatFieldType.RaceBonus)) {
          //this.character.Strength.Value = this.characterSheetState.StrengthValue();
          const valueSignal = this.characterSheetSignalStore.GetStatSignal(stat, StatFieldType.Value);
          const normalBonus = this.calculateNormalBonus(valueSignal());
          const raceBonusSignal = this.characterSheetSignalStore.GetStatSignal(stat, StatFieldType.RaceBonus);
          const raceBonus = parseInt(raceBonusSignal());
          const totalBonus = normalBonus + raceBonus;
          // console.log()
          this.GetCharacterStatByName(stat).RaceBonus = raceBonus;
          this.GetCharacterStatByName(stat).TotalBonus = totalBonus;
          this.AutoSaveItem();
          return `+${totalBonus}`;
        } else {
          return '';
        }
      });
      this.characterSheetSignalStore.AddStatSignal(stat, StatFieldType.TotalBonus, totalBonusSignal);
    });

  }

  private AutoSaveItem(): void {
    console.log(`trying to save character`);
    this.characterDataService.setItem(this.character);
  }

  public calculateNormalBonus(value: number): number {
    if (value == 1) { return -25; }
    if (value == 2) { return -20; }
    if (value <= 4) { return -15; }
    if (value <= 9) { return -10; }
    if (value <= 24) { return -5; }
    if (value <= 74) { return 0; }
    if (value <= 89) { return 5; }
    if (value <= 94) { return 10; }
    if (value <= 97) { return 15; }
    if (value <= 99) { return 20; }
    if (value == 100) { return 25; }
    if (value == 101) { return 30; }
    if (value == 102) { return 35; }
    return 0;
  }

}
