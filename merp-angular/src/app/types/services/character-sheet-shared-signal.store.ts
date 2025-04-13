import { Injectable, signal, WritableSignal } from "@angular/core";
import { SharedCharacterSheetState } from "../models/SharedCharacterSheetState";
import { Item } from "../models/Item";
import { Race } from "../models/Race";
import { SystemDataService } from "./system.data.service";
import { Profession } from "../models/Profession";

@Injectable()
export class CharacterSheetSharedSignalStore implements SharedCharacterSheetState {
  skillTotalBonusSignals: Map<string, WritableSignal<number>> = new Map<string, WritableSignal<number>>();
  statTotalBonusSignals: Map<string, WritableSignal<number>> = new Map<string, WritableSignal<number>>();
  raceSignal: WritableSignal<Race>;
  levelSignal: WritableSignal<number>;
  inventorySignal: WritableSignal<Item[]>;
  professionSignal: WritableSignal<Profession>;
  systemDataService: SystemDataService;

  constructor(systemDataService: SystemDataService) {
    this.systemDataService = systemDataService;
  }


  GetProfessionSignal(): WritableSignal<Profession> {
    return this.professionSignal;
  }

  initializeAllSignals(): void {
    let allSkills = this.systemDataService.GetAllSkills(); {
      allSkills.forEach(skill => {
        this.skillTotalBonusSignals.set(skill.Name, signal(0));
      });
    }

    let allStats = this.systemDataService.GetAllStats();
    allStats.forEach(stat => {
      this.statTotalBonusSignals.set(stat.Name, signal(0));
    });

    let humans = this.systemDataService.GetRacesByType('Human');
    this.raceSignal = signal(humans[0]);

    this.levelSignal = signal(0);
    this.inventorySignal = signal(new Array<Item>);
    let allProfessions = this.systemDataService.GetAllProfessions();
    this.professionSignal = signal(allProfessions[0]);
  }
  GetTotalBonusSignalForStat(statName: string): WritableSignal<number> {
    return this.statTotalBonusSignals.get(statName);
  }
  GetTotalBonusSignalForSkill(skillName: string): WritableSignal<number> {
    return this.skillTotalBonusSignals.get(skillName);
  }
  GetRaceSignal(): WritableSignal<Race> {
    return this.raceSignal;
  }
  GetLevelSignal(): WritableSignal<number> {
    return this.levelSignal;
  }
  GetInventorySignal(): WritableSignal<Array<Item>> {
    return this.inventorySignal;
  }

}
