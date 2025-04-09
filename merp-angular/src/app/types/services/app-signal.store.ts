import { Injectable, signal, Signal, WritableSignal } from "@angular/core";
import { SignalStore } from "./signal-store";
import { DiceSet } from "../models/DiceSet";

@Injectable({ providedIn: 'root' })
export class AppSignalStore extends SignalStore {
  currentDiceSetKey: string = "currentDiceSet";
  allDiceKey: string = "allDiceSets";

  constructor() {
    super();
    // initialize the signals
    let currentDiceSetSignal: WritableSignal<DiceSet> = signal<DiceSet>(null);
    this.add(this.currentDiceSetKey, currentDiceSetSignal);

    let allDiceSetsSignal: WritableSignal<Array<DiceSet>> = signal<Array<DiceSet>>([]);
    this.add(this.allDiceKey, allDiceSetsSignal);
  }

  public HasCurrentDiceSetSignal(): boolean {
    return this.has(this.currentDiceSetKey);
  }

  public GetCurrentDiceSetSignal(): WritableSignal<DiceSet> {
    return this.get(this.currentDiceSetKey) as WritableSignal<DiceSet>;
  }

  public SetCurrentDiceSetSignalValue(value: DiceSet) {
    let currentDiceSetSignal = this.get(this.currentDiceSetKey) as WritableSignal<DiceSet>;
    console.log("Current CurrentDiceSet signal value:", currentDiceSetSignal());
    currentDiceSetSignal.set(value);
    console.log("New CurrentDiceSet signal value:", currentDiceSetSignal());
  }

  public HasAllDiceSetsSignal(): boolean {
    return this.has(this.allDiceKey);
  }

  public GetAllDiceSetsSignal(): WritableSignal<Array<DiceSet>> {
    return this.get(this.allDiceKey) as WritableSignal<Array<DiceSet>>;
  }

  public SetAllDiceSetsSignalValue(value: Array<DiceSet>) {
    let allDiceSetsSignal = this.get(this.allDiceKey) as WritableSignal<Array<DiceSet>>;
    console.log("Current AllDiceSets signal value:", allDiceSetsSignal());
    allDiceSetsSignal.set(value);
    console.log("New AllDiceSets signal value:", allDiceSetsSignal());
  }

}
