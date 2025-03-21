import { computed, Injectable, Signal, WritableSignal } from "@angular/core";

export interface CharacterSheetState {
  StrengthValue: Signal<any>;
  StrengthNormalBonus: Signal<any>;
  StrengthRaceBonus: Signal<any>;
  StrengthTotalBonus: Signal<any>;

  AgilityValue: Signal<any>;
  AgilityNormalBonus: Signal<any>;
  AgilityRaceBonus: Signal<any>;
  AgilityTotalBonus: Signal<any>;

  ConstitutionValue: Signal<any>;
  ConstitutionNormalBonus: Signal<any>;
  ConstitutionRaceBonus: Signal<any>;
  ConstitutionTotalBonus: Signal<any>;

  IntelligenceValue: Signal<any>;
  IntelligenceNormalBonus: Signal<any>;
  IntelligenceRaceBonus: Signal<any>;
  IntelligenceTotalBonus: Signal<any>;

  IntuitionValue: Signal<any>;
  IntuitionNormalBonus: Signal<any>;
  IntuitionRaceBonus: Signal<any>;
  IntuitionTotalBonus: Signal<any>;

  PresenceValue: Signal<any>;
  PresenceNormalBonus: Signal<any>;
  PresenceRaceBonus: Signal<any>;
  PresenceTotalBonus: Signal<any>;
}
