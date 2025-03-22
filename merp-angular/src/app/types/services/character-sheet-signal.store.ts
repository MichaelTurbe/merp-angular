import { Injectable, Signal } from "@angular/core";
import { SignalStore } from "./signal-store";
import { StatFieldType } from "../models/StatFieldType";

@Injectable()
export class CharacterSheetSignalStore extends SignalStore {
  constructor() {
    super();
  }

  public AddStatSignal(statName: string, statFieldType: StatFieldType, signal: Signal<any>) {
    const key = `${statName}-${statFieldType}`;
    this.add(key, signal);
  }

  public GetStatSignal(statName: string, statFieldType: StatFieldType): Signal<any> {
    const key = `${statName}-${statFieldType}`;
    const statSignal = this.get(key);
    if (statSignal) {
      return statSignal;
    } else {
      throw ('error');
    }
  }

}
