import { Injectable, signal, Signal, WritableSignal } from "@angular/core";
import { SignalStore } from "./signal-store";
import { DiceSet } from "../models/DiceSet";

@Injectable({ providedIn: 'root' })
export class AppSignalStore extends SignalStore {
  currentDiceSetKey: string = "currentDiceSet";
  allDiceKey: string = "allDiceSets";
  roll3dDiceKey: string = "roll3dDice";

  constructor() {
    super();
    // initialize the signals
    let currentDiceSetSignal: WritableSignal<DiceSet> = signal<DiceSet>(this.GetDefaultDiceSet());
    this.add(this.currentDiceSetKey, currentDiceSetSignal);

    let allDiceSetsSignal: WritableSignal<Array<DiceSet>> = signal<Array<DiceSet>>([]);
    this.add(this.allDiceKey, allDiceSetsSignal);

    let roll3dDiceSignal: WritableSignal<boolean> = signal(true);
    this.add(this.roll3dDiceKey, roll3dDiceSignal);
  }

  private GetDefaultDiceSet(): DiceSet {
    const bees: DiceSet = {
      id:	"dddice-bees",
      name: "Bees",
      d10:	"https://cdn.dddice.com/themes/dddice-bees/preview/d10-b759cee28523cfb12595a9e243f3c2a0.png",
      d10x: "https://cdn.dddice.com/themes/dddice-bees/preview/d10x-90611a973c245f68ab702c7320982391.png",
      preview:	"https://cdn.dddice.com/themes/dddice-bees/preview/preview-53a362c1fb2cc88727d15ce750105808.webp"
    }
    return bees;
  }

  public HasCurrentDiceSetSignal(): boolean {
    return this.has(this.currentDiceSetKey);
  }

  public GetCurrentDiceSetSignal(): WritableSignal<DiceSet> {
    return this.get(this.currentDiceSetKey) as WritableSignal<DiceSet>;
  }

  public SetCurrentDiceSetSignalValue(value: DiceSet) {
    let currentDiceSetSignal = this.get(this.currentDiceSetKey) as WritableSignal<DiceSet>;
    currentDiceSetSignal.set(value);
  }

  public HasAllDiceSetsSignal(): boolean {
    return this.has(this.allDiceKey);
  }

  public GetAllDiceSetsSignal(): WritableSignal<Array<DiceSet>> {
    return this.get(this.allDiceKey) as WritableSignal<Array<DiceSet>>;
  }

  public SetAllDiceSetsSignalValue(value: Array<DiceSet>) {
    let allDiceSetsSignal = this.get(this.allDiceKey) as WritableSignal<Array<DiceSet>>;
    allDiceSetsSignal.set(value);
  }

  public Has3dDiceSignal(): boolean {
    return this.has(this.roll3dDiceKey);
  }

  public Get3dDiceSignal(): WritableSignal<boolean> {
    return this.get(this.roll3dDiceKey) as WritableSignal<boolean>;
  }

  public Set3dDiceSignalValue(value: boolean) {
    let roll3dDiceSignal = this.get(this.roll3dDiceKey) as WritableSignal<boolean>;
    roll3dDiceSignal.set(value);
  }

}
