import { computed, Injectable, Signal, WritableSignal } from "@angular/core";
import { Character } from "../models/Character";
import { CharacterStat } from "../models/CharacterStat";
import { LocalStorageRepository } from "./local-storage.repository";
import { SystemDataService } from "./system.data.service";
import { CharacterSkill } from "../models/CharacterSkill";
import { Item } from "../models/Item";
import { LocalStorageService } from "./local-storage.service";
import { DataResult } from "../utilities/data-result";
import { DiceSet } from "../models/DiceSet";

@Injectable({ providedIn: 'root' })
export class PreferenceDataService extends LocalStorageService {
  private currentDiceSetKey: string = "currentDiceSetName";

  constructor() {
    super();
  }

  public GetCurrentDiceSet(): DataResult<DiceSet> {
    let newDataResult = { success: false } as DataResult<DiceSet>;
    let dataResult = this.getItem(this.currentDiceSetKey);
    if (dataResult.success) {
      let currentDiceSet: DiceSet = dataResult.value as DiceSet;
      newDataResult = { success: true, value: currentDiceSet } as DataResult<DiceSet>;
    } 
    return newDataResult;
  }

  public SetCurrentDiceSet(diceSet: DiceSet) {
    this.setItem(this.currentDiceSetKey, diceSet);
  }
}
