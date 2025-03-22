import { Injectable } from "@angular/core";
import { Skill } from "../models/Skill";
import { SkillCategory } from "../models/SkillCategory";
import { Stat } from "../models/Stat";

@Injectable({ providedIn: 'root' })
export class SystemDataService {
  skillCategories: Array<SkillCategory> = new Array<SkillCategory>();
  skillCategoriesByName: Map<string, SkillCategory> = new Map<string, SkillCategory>()

  skills: Array<Skill> = new Array<Skill>();
  skillsByCategory: Map<number, Skill> = new Map<number, Skill>();

  stats: Array<Stat> = new Array<Stat>();
  statsByName: Map<string, Stat> = new Map<string, Stat>();

  constructor() {
    this.initializeStats();
    this.initializeSkills();
    this.initializeSkillCategories();
  }

  initializeSkillCategories() {
    this.skillCategories.push({ Name: "Movement And Maneuver", id: 1 } as SkillCategory);
    this.skillCategories.push({ Name: "Weapon Skills", id: 2 } as SkillCategory);
    this.skillCategories.push({ Name: "General Skills", id: 3 } as SkillCategory);
    this.skillCategories.push({ Name: "Subterfuge Skills", id: 4 } as SkillCategory);
    this.skillCategories.push({ Name: "Magical Skills", id: 5 } as SkillCategory);
    this.skillCategories.push({ Name: "Misc Skills And Bonuses", id: 6 } as SkillCategory);
    this.skillCategories.push({ Name: "Special", id: 7 } as SkillCategory);
    this.skillCategories.push({ Name: "SecondarySkills", id: 8 } as SkillCategory);

    this.skillCategories.forEach(skillCategory => {
      this.skillCategoriesByName.set(skillCategory.Name, skillCategory);
    })
  }

  initializeSkills() {
    const noArmor = {
      id: 1,
      Name: "No Armor",
      SkillCategory: this.GetSkillCategoryByName("Movement And Maneuver"),
      CanHaveRanks: true,
      HasStat: true,
      Stat: this.GetStatByName("Agility"),
      HasMaximumNumberOfRanks: true,
      MaximumNumberOfRanks: 2,
      CanHaveProfessionalBonus: false,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: true
    } as Skill;
    this.skills.push(noArmor)

  }

  initializeStats() {

    this.stats.push({ id: 1, Name: "Strength", Abbreviation: "ST" } as Stat);
    this.stats.push({ id: 2, Name: "Agility", Abbreviation: "AG" } as Stat);
    this.stats.push({ id: 3, Name: "Constitution", Abbreviation: "CO" } as Stat);
    this.stats.push({ id: 4, Name: "Intelligence", Abbreviation: "IG" } as Stat);
    this.stats.push({ id: 5, Name: "Intuition", Abbreviation: "IT" } as Stat);
    this.stats.push({ id: 6, Name: "Presence", Abbreviation: "PR" } as Stat);
    
    this.stats.forEach(stat => {
      this.statsByName.set(stat.Name, stat)
    })
  }


  GetAllStats(): Array<Stat> {
    return this.stats;
  }

  GetAllSkills(): Array<Skill> {
    return this.skills;
  }

  GetSkillCategoryByName(name: string): SkillCategory {
    let foundSkillCategory = this.skillCategoriesByName.get(name);
    if (foundSkillCategory) { return foundSkillCategory;  }
    else return this.skillCategories[0];
  }

  GetStatByName(name: string): Stat {
    let foundStat = this.statsByName.get(name);
    if (foundStat) { return foundStat; }
    else{ return this.stats[0]}
  }
}
