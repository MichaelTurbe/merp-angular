import { computed, Injectable, Signal, WritableSignal } from "@angular/core";
import { Character } from "../models/Character";
import { StatName } from "../models/StatName";
import { Stat } from "../models/Stat";
import { CharacterDataService } from "./character.data.service";
import { findMatchingDirectivesAndPipes } from "@angular/compiler";

@Injectable()
export class CharacterSheetStateService {
  public character!: Character;
  public strengthValueSignal!: Signal<any>;
  public strengthNormalBonusSignal!: Signal<any>;
  public strengthTotalBonusSignal!: Signal<any>;

  constructor(private CharacterDataService: CharacterDataService) {
    console.log(`this is the ChraracterSheetStateService constructor!`);
  }

  public loadCharacter(characterId: string) {
    const findCharacterDataResult = this.CharacterDataService.getItem(characterId);
    if (findCharacterDataResult.success) {
      this.character = findCharacterDataResult.value;
    } else {
      console.log(`couldn't find that character!`);
    }
    this.initializeComputedSignals();
  }

  public createNewCharacter() {
    console.log('create new character');
    this.character = this.CharacterDataService.createNewCharacter();
  }

  public initializeComputedSignals() {
    // any signals that are constructed with toSignal()
    // to capture changes from a control's observable
    // will need to be initialized from the component

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


}
