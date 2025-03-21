import { computed, effect, Injectable, Signal, WritableSignal } from "@angular/core";
import { Character } from "../models/Character";
import { StatName } from "../models/StatName";
import { Stat } from "../models/Stat";
import { CharacterDataService } from "./character.data.service";
import { CharacterSheetState } from "../utilities/character-sheet-state";
import { SignalStore } from "./signal-store";
import { CharacterSheetSignalStore } from "./character-sheet-signal.store";
import { StatFieldType } from "../models/StatFieldType";

@Injectable()
export class CharacterSheetStateService {
  public character!: Character;
  public state: CharacterSheetState = {} as CharacterSheetState;

  constructor(private characterDataService: CharacterDataService,
    private characterSheetSignalStore: CharacterSheetSignalStore
  ) {
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
    this.initializeComputedSignals();
  }

  public initializeComputedSignals() {
    console.log('initializeComputedSignals');
    // any signals that are constructed with toSignal()
    // to capture changes from a control's observable
    // will need to be initialized from the component
    const stats = [StatName.Strength, StatName.Agility, StatName.Constition, StatName.Intelligence, StatName.Intuition, StatName.Presence];
    stats.forEach(stat => {

      const normalBonusSignal = computed(() => {
        if (this.characterSheetSignalStore.GetStatSignal(stat, StatFieldType.NormalBonus)) {
          const statValueSignal = this.characterSheetSignalStore.GetStatSignal(stat, StatFieldType.Value);
          this.character[stat].Value = statValueSignal();
          const bonus = this.calculateNormalBonus(this.character[stat].Value);
          this.character[stat].NormalBonus = bonus;
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
          this.character[stat].RaceBonus = raceBonus;
          this.character[stat].TotalBonus = totalBonus;
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
