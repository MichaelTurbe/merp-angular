import { computed, Injectable, signal, Signal, WritableSignal } from "@angular/core";
import { Character } from "../models/Character";
import { CharacterStat } from "../models/CharacterStat";
import { LocalStorageRepository } from "./local-storage.repository";
import { SystemDataService } from "./system.data.service";
import { CharacterSkill } from "../models/CharacterSkill";
import { Item } from "../models/Item";
import { DiceRoll } from "../models/DiceRoll";

@Injectable({ providedIn: 'root' })
export class DiceRollDataService {
  private allDiceRollsSignal: WritableSignal<Array<DiceRoll>> = signal(new Array<DiceRoll>());

  constructor() {

  }

  public addDiceRoll(diceRoll: DiceRoll) {
    let newDiceRollsArray = this.allDiceRollsSignal();
    newDiceRollsArray.push(diceRoll);
    this.allDiceRollsSignal.set([...newDiceRollsArray]);
  }

  public GetAllDiceRolls(): WritableSignal<Array<DiceRoll>> {
    return this.allDiceRollsSignal;
  }


}
