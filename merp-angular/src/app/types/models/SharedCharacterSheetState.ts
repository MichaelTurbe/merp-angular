import { Signal, WritableSignal } from "@angular/core";
import { Race } from "./Race";
import { Item } from "./Item";
import { Profession } from "./Profession";

// aspects of a character that interact with eachother,
// and are shared across components
export interface SharedCharacterSheetState{
  skillTotalBonusSignals: Map<string, WritableSignal<number>>;
  statTotalBonusSignals: Map<string, WritableSignal<number>>;
  raceSignal: WritableSignal<Race>;
  levelSignal: WritableSignal<number>;
  inventorySignal: WritableSignal<Array<Item>>;
  professionSignal: WritableSignal<Profession>;
  universalRollModifier: WritableSignal<number>;
  // all must be initialized
  initializeAllSignals(): void;

  GetTotalBonusSignalForStat(statName: string): WritableSignal<number>;
  GetTotalBonusSignalForSkill(skillName: string): WritableSignal<number>;
  GetRaceSignal(): WritableSignal<Race>;
  GetLevelSignal(): WritableSignal<number>;
  GetInventorySignal(): WritableSignal<Array<Item>>;
  GetProfessionSignal(): WritableSignal<Profession>;
  GetUniversalRollModifierSignal(): WritableSignal<number>;
}
