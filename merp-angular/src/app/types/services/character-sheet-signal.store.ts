import { Injectable, Signal } from "@angular/core";
import { SignalStore } from "./signal-store";
import { StatFieldType } from "../models/StatFieldType";
import { Skill } from "../models/Skill";
import { SkillFieldType } from "../models/SkillFieldType";

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
      console.log(`Error in GetStatSignal`);
      throw ('error');
    }
  }

  public AddSkillSignal(skill: Skill, skillFieldType: SkillFieldType, signal: Signal<any>) {
    const key = `${skill.Name}-${skillFieldType}`;
    this.add(key, signal);
  }

  public GetSkillSignal(skill: Skill, skillFieldType: SkillFieldType): Signal<any> {
    const key = `${skill.Name}-${skillFieldType}`;
    const skillSignal = this.get(key);
    if (skillSignal) {
      return skillSignal;
    } else {
      console.log(`Error in GetSkillSignal`);
      throw ('error');
    }
  }

  public AddFivePercentSkillRankSignal(skill: Skill, ordinal: number, signal: Signal<any>) {
    const key = `${skill.Name}-fivePercentSkillRank-${ordinal}`;
    this.add(key, signal);
  }

  public GetAllFivePercentSkillRankSignals(skill: Skill): Array<Signal<any>> {
    const signals = new Array<Signal<any>>();
    for (let i: number = 1; i < 11; i++) {
      const key = `${skill.Name}-fivePercentSkillRank-${i}`;
      const fivePercentSignal = this.get(key);
      if (fivePercentSignal) {
        signals.push(fivePercentSignal);
      } else {
        console.log(`Error in GetAllFivePercentSkillRankSignals`);
        throw ('error');
      }
    }
    return signals;
  }

  public AddSkillRankBonusSignal(skill: Skill, signal: Signal<any>) {
    const key = `${skill.Name}-skillRankBonus`;
    this.add(key, signal);
  }

  public GetSkillRankBonusSignal(skill: Skill): Signal<any> {
    const key = `${skill.Name}-skillRankBonus`;
    const skillRankBonusSignal = this.get(key);
    if (skillRankBonusSignal) {
      return skillRankBonusSignal;
    } else {
      console.log(`Error in GetSkillRankBonusSignal`);
      throw ('error');
    }
  }

}
