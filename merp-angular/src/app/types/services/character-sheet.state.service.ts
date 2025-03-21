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
  // public strengthValueSignal!: Signal<any>;
  // public strengthNormalBonusSignal!: Signal<any>;
  // public strengthTotalBonusSignal!: Signal<any>;

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
      if (this.state.StrengthValue){
        this.character.Strength.Value = this.state.StrengthValue();
        const bonus = this.calculateNormalBonus(this.character.Strength.Value);
        this.character.Strength.NormalBonus = bonus;
        this.AutoSaveItem();
        return `+${bonus}`;
      } else {
        return ''
      }
    });

    this.state.StrengthTotalBonus = computed(() => {
      if (this.state.StrengthValue) {
        //this.character.Strength.Value = this.characterSheetState.StrengthValue();
        const bonus = this.calculateNormalBonus(this.state.StrengthValue()).toString();
        return `+${bonus}`;
      } else {
        return ''
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
