import { computed, Injectable, Signal, WritableSignal } from "@angular/core";
import { Character } from "../models/Character";
import { StatName } from "../models/StatName";
import { Stat } from "../models/Stat";
import { SelectMultipleControlValueAccessor } from "@angular/forms";

@Injectable()
export class CharacterSheetStateService {
  public character!: Character;
  public strengthValueSignal!: Signal<any>;
  public strengthNormalBonusSignal!: Signal<any>;
  public strengthTotalBonusSignal!: Signal<any>;

  constructor() {
    console.log(`this is the ChraracterSheetStateService constructor!`);
  }

  public loadCharacter(characterId: number) {
    this.character = this.getMockCharacterAsIfFromDB(characterId);
    this.populateSignals();
  }

  public populateSignals() {
    // this will need to be initialized from the component
    this.strengthNormalBonusSignal = computed(() => {
      return this.calculateNormalBonus(this.strengthValueSignal());
    });

    this.strengthTotalBonusSignal = computed(() => {
      const bonus = this.calculateNormalBonus(this.strengthValueSignal()).toString();
      return `+${bonus}`;
    });
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

  public getMockCharacterAsIfFromDB(characterId: number): Character {
    const loadedCharacter = {} as Character;
    loadedCharacter.Strength = {
      StatName: StatName.Strength,
      Value: 100,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as Stat;
    loadedCharacter.Agility = {
      StatName: StatName.Agility,
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as Stat;
    loadedCharacter.Constitution = {
      StatName: StatName.Constition,
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as Stat;
    loadedCharacter.Intelligence = {
      StatName: StatName.Intelligence,
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as Stat;
    loadedCharacter.Intuition = {
      StatName: StatName.Intuition,
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as Stat;
    loadedCharacter.Presence = {
      StatName: StatName.Presence,
      Value: 1,
      NormalBonus: -25,
      RaceBonus: 0,
      TotalBonus: -25
    } as Stat;
    return loadedCharacter;
  }
}
