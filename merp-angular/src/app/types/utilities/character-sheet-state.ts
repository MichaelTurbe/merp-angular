import { computed, Injectable, Signal, WritableSignal } from "@angular/core";

export interface CharacterSheetState {
  StrengthValue: Signal<any>;
  StrengthNormalBonus: Signal<any>;
  StrengthTotalBonus: Signal<any>;
}
