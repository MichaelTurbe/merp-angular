import { computed, Injectable, Signal, WritableSignal } from "@angular/core";
import { Character } from "../models/Character";
import { StatName } from "../models/StatName";
import { Stat } from "../models/Stat";
import { CharacterDataService } from "./character.data.service";
import { CharacterSheetState } from "../utilities/character-sheet-state";

@Injectable()
export class CharacterSheetStateService {
  public character!: Character;
  public state: CharacterSheetState = {} as CharacterSheetState;

  constructor(private characterDataService: CharacterDataService) {
    console.log(`this is the ChraracterSheetStateService constructor!`);
  }

  public loadCharacter(characterId: string) {
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
  }

  public initializeComputedSignals() {
    // any signals that are constructed with toSignal()
    // to capture changes from a control's observable
    // will need to be initialized from the component

    this.state.StrengthNormalBonus = computed(() => {
      if (this.state.StrengthValue) {
        this.character.Strength.Value = this.state.StrengthValue();
        const bonus = this.calculateNormalBonus(this.character.Strength.Value);
        this.character.Strength.NormalBonus = bonus;
        this.AutoSaveItem();
        return `+${bonus}`;
      } else {
        return '';
      }
    });

    this.state.StrengthTotalBonus = computed(() => {
      if (this.state.StrengthValue && this.state.StrengthRaceBonus) {
        //this.character.Strength.Value = this.characterSheetState.StrengthValue();
        const normalBonus = this.calculateNormalBonus(this.state.StrengthValue());
        const raceBonus = parseInt(this.state.StrengthRaceBonus());
        const totalBonus = normalBonus + raceBonus;
        // console.log()
        this.character.Strength.RaceBonus = raceBonus;
        this.character.Strength.TotalBonus = totalBonus;
        this.AutoSaveItem();
        return `+${totalBonus}`;
      } else {
        return '';
      }
    });


    this.state.AgilityNormalBonus = computed(() => {
      if (this.state.AgilityValue) {
        this.character.Agility.Value = this.state.AgilityValue();
        const bonus = this.calculateNormalBonus(this.character.Agility.Value);
        this.character.Agility.NormalBonus = bonus;
        this.AutoSaveItem();
        return `+${bonus}`;
      } else {
        return '';
      }
    });

    this.state.AgilityTotalBonus = computed(() => {
      if (this.state.AgilityValue && this.state.AgilityRaceBonus) {
        //this.character.Agility.Value = this.characterSheetState.AgilityValue();
        const normalBonus = this.calculateNormalBonus(this.state.AgilityValue());
        const raceBonus = parseInt(this.state.AgilityRaceBonus());
        const totalBonus = normalBonus + raceBonus;
        // console.log()
        this.character.Agility.RaceBonus = raceBonus;
        this.character.Agility.TotalBonus = totalBonus;
        this.AutoSaveItem();
        return `+${totalBonus}`;
      } else {
        return '';
      }
    });

    this.state.ConstitutionNormalBonus = computed(() => {
      if (this.state.ConstitutionValue) {
        this.character.Constitution.Value = this.state.ConstitutionValue();
        const bonus = this.calculateNormalBonus(this.character.Constitution.Value);
        this.character.Constitution.NormalBonus = bonus;
        this.AutoSaveItem();
        return `+${bonus}`;
      } else {
        return '';
      }
    });

    this.state.ConstitutionTotalBonus = computed(() => {
      if (this.state.ConstitutionValue && this.state.ConstitutionRaceBonus) {
        //this.character.Constitution.Value = this.characterSheetState.ConstitutionValue();
        const normalBonus = this.calculateNormalBonus(this.state.ConstitutionValue());
        const raceBonus = parseInt(this.state.ConstitutionRaceBonus());
        const totalBonus = normalBonus + raceBonus;
        // console.log()
        this.character.Constitution.RaceBonus = raceBonus;
        this.character.Constitution.TotalBonus = totalBonus;
        this.AutoSaveItem();
        return `+${totalBonus}`;
      } else {
        return '';
      }
    });

    this.state.IntelligenceNormalBonus = computed(() => {
      if (this.state.IntelligenceValue) {
        this.character.Intelligence.Value = this.state.IntelligenceValue();
        const bonus = this.calculateNormalBonus(this.character.Intelligence.Value);
        this.character.Intelligence.NormalBonus = bonus;
        this.AutoSaveItem();
        return `+${bonus}`;
      } else {
        return '';
      }
    });

    this.state.IntelligenceTotalBonus = computed(() => {
      if (this.state.IntelligenceValue && this.state.IntelligenceRaceBonus) {
        //this.character.Intelligence.Value = this.characterSheetState.IntelligenceValue();
        const normalBonus = this.calculateNormalBonus(this.state.IntelligenceValue());
        const raceBonus = parseInt(this.state.IntelligenceRaceBonus());
        const totalBonus = normalBonus + raceBonus;
        // console.log()
        this.character.Intelligence.RaceBonus = raceBonus;
        this.character.Intelligence.TotalBonus = totalBonus;
        this.AutoSaveItem();
        return `+${totalBonus}`;
      } else {
        return '';
      }
    });

    this.state.IntuitionNormalBonus = computed(() => {
      if (this.state.IntuitionValue) {
        this.character.Intuition.Value = this.state.IntuitionValue();
        const bonus = this.calculateNormalBonus(this.character.Intuition.Value);
        this.character.Intuition.NormalBonus = bonus;
        this.AutoSaveItem();
        return `+${bonus}`;
      } else {
        return '';
      }
    });

    this.state.IntuitionTotalBonus = computed(() => {
      if (this.state.IntuitionValue && this.state.IntuitionRaceBonus) {
        //this.character.Intuition.Value = this.characterSheetState.IntuitionValue();
        const normalBonus = this.calculateNormalBonus(this.state.IntuitionValue());
        const raceBonus = parseInt(this.state.IntuitionRaceBonus());
        const totalBonus = normalBonus + raceBonus;
        // console.log()
        this.character.Intuition.RaceBonus = raceBonus;
        this.character.Intuition.TotalBonus = totalBonus;
        this.AutoSaveItem();
        return `+${totalBonus}`;
      } else {
        return '';
      }
    });

    this.state.PresenceNormalBonus = computed(() => {
      if (this.state.PresenceValue) {
        this.character.Presence.Value = this.state.PresenceValue();
        const bonus = this.calculateNormalBonus(this.character.Presence.Value);
        this.character.Presence.NormalBonus = bonus;
        this.AutoSaveItem();
        return `+${bonus}`;
      } else {
        return '';
      }
    });

    this.state.PresenceTotalBonus = computed(() => {
      if (this.state.PresenceValue && this.state.PresenceRaceBonus) {
        //this.character.Presence.Value = this.characterSheetState.PresenceValue();
        const normalBonus = this.calculateNormalBonus(this.state.PresenceValue());
        const raceBonus = parseInt(this.state.PresenceRaceBonus());
        const totalBonus = normalBonus + raceBonus;
        // console.log()
        this.character.Presence.RaceBonus = raceBonus;
        this.character.Presence.TotalBonus = totalBonus;
        this.AutoSaveItem();
        return `+${totalBonus}`;
      } else {
        return '';
      }
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

  // getBlankCharacterSheetState(): CharacterSheetState {
  //   const blankCharacterSheetState = {} as CharacterSheetState;
  //   blankCharacterSheetState.StrengthValue = null;
  // public strengthNormalBonusSignal!: Signal<any>;
  // public strengthTotalBonusSignal!: Signal<any>;
  //   return blankCharacterSheetState;
  // }


}
