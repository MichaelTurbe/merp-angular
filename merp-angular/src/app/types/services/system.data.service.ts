import { Injectable } from "@angular/core";
import { Skill } from "../models/Skill";
import { SkillCategory } from "../models/SkillCategory";
import { Stat } from "../models/Stat";
import { Race } from "../models/Race";
import { RaceSkillRank } from "../models/RaceSkillRank";
import { RaceStatBonus } from "../models/RaceStatBonus";

@Injectable({ providedIn: 'root' })
export class SystemDataService {
  skillCategories: Array<SkillCategory> = new Array<SkillCategory>();
  skillCategoriesByName: Map<string, SkillCategory> = new Map<string, SkillCategory>();

  skills: Array<Skill> = new Array<Skill>();
  skillsByCategory: Map<string, Array<Skill>> = new Map<string, Array<Skill>>();

  stats: Array<Stat> = new Array<Stat>();
  statsByName: Map<string, Stat> = new Map<string, Stat>();

  races: Array<Race> = new Array<Race>();

  constructor() {
    this.initializeStats();
    this.initializeSkillCategories();
    this.initializeSkills();
    this.initializeRaces();
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
      this.skillsByCategory.set(skillCategory.Name, new Array<Skill>());
    });
  }
  initializeSkills() {
    this.initializeMovementAndManeuverSkills();
    this.initializeWeaponSkills();
  }

  initializeWeaponSkills() {
    const weaponSkills = new Array<Skill>();

    const oneHandedEdged = {
      id: 1,
      Name: "1-H Edged",
      SkillCategory: this.GetSkillCategoryByName("Weapon Skills"),
      CanHaveRanks: true,
      HasStat: true,
      Stat: this.GetStatByName("Strength"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "OB"
    } as Skill;
    this.skills.push(oneHandedEdged);
    weaponSkills.push(oneHandedEdged);

    const oneHandedConcussion = {
      id: 2,
      Name: "1-H Concussion",
      SkillCategory: this.GetSkillCategoryByName("Weapon Skills"),
      CanHaveRanks: true,
      HasStat: true,
      Stat: this.GetStatByName("Strength"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "OB"
    } as Skill;
    this.skills.push(oneHandedConcussion);
    weaponSkills.push(oneHandedConcussion);

    const twoHanded = {
      id: 3,
      Name: "2-Handed",
      SkillCategory: this.GetSkillCategoryByName("Weapon Skills"),
      CanHaveRanks: true,
      HasStat: true,
      Stat: this.GetStatByName("Strength"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "OB"
    } as Skill;
    this.skills.push(twoHanded);
    weaponSkills.push(twoHanded);

    const thrown = {
      id: 4,
      Name: "Thrown",
      SkillCategory: this.GetSkillCategoryByName("Weapon Skills"),
      CanHaveRanks: true,
      HasStat: true,
      Stat: this.GetStatByName("Agility"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "OB"
    } as Skill;
    this.skills.push(thrown);
    weaponSkills.push(thrown);

    const missile = {
      id: 5,
      Name: "Missile",
      SkillCategory: this.GetSkillCategoryByName("Weapon Skills"),
      CanHaveRanks: true,
      HasStat: true,
      Stat: this.GetStatByName("Agility"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "OB"
    } as Skill;
    this.skills.push(thrown);
    weaponSkills.push(thrown);

    const poleArms = {
      id: 6,
      Name: "Pole arms",
      SkillCategory: this.GetSkillCategoryByName("WeaponSkills"),
      CanHaveRanks: true,
      HasStat: true,
      Stat: this.GetStatByName("Strength"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "OB"
    } as Skill;
    this.skills.push(poleArms);
    weaponSkills.push(poleArms);

    this.skillsByCategory.set("Weapon Skills", weaponSkills);
    console.log('weapon skills:', weaponSkills);
  }

  initializeMovementAndManeuverSkills() {
    const skillsForMovementAndManeuver = new Array<Skill>();

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
      HasInherentSpecialBonus: true,
      SkillTypeAbbreviation: "MM"
    } as Skill;
    this.skills.push(noArmor);
    skillsForMovementAndManeuver.push(noArmor);

    const softLeather = {
      id: 2,
      Name: "Soft Leather",
      SkillCategory: this.GetSkillCategoryByName("Movement And Maneuver"),
      CanHaveRanks: true,
      HasStat: true,
      Stat: this.GetStatByName("Agility"),
      HasMaximumNumberOfRanks: true,
      MaximumNumberOfRanks: 3,
      CanHaveProfessionalBonus: false,
      CanHaveItemBonus: true,
      InherentSpecialBonus: -15,
      HasInherentSpecialBonus: true,
      SkillTypeAbbreviation: "MM"
    } as Skill;
    this.skills.push(softLeather);
    skillsForMovementAndManeuver.push(softLeather);

    const rigidLeather = {
      id: 3,
      Name: "Rigid Leather",
      SkillCategory: this.GetSkillCategoryByName("Movement And Maneuver"),
      CanHaveRanks: true,
      HasStat: true,
      Stat: this.GetStatByName("Agility"),
      HasMaximumNumberOfRanks: true,
      MaximumNumberOfRanks: 5,
      CanHaveProfessionalBonus: false,
      CanHaveItemBonus: true,
      InherentSpecialBonus: -30,
      HasInherentSpecialBonus: true,
      SkillTypeAbbreviation: "MM"
    } as Skill;
    this.skills.push(rigidLeather);
    skillsForMovementAndManeuver.push(rigidLeather);

    const chain = {
      id: 4,
      Name: "Chain",
      SkillCategory: this.GetSkillCategoryByName("Movement And Maneuver"),
      CanHaveRanks: true,
      HasStat: true,
      Stat: this.GetStatByName("Strength"),
      HasMaximumNumberOfRanks: true,
      MaximumNumberOfRanks: 7,
      CanHaveProfessionalBonus: false,
      CanHaveItemBonus: true,
      InherentSpecialBonus: -45,
      HasInherentSpecialBonus: true,
      SkillTypeAbbreviation: "MM"
    } as Skill;
    this.skills.push(chain);
    skillsForMovementAndManeuver.push(chain);

    const plate = {
      id: 5,
      Name: "Plate",
      SkillCategory: this.GetSkillCategoryByName("Movement And Maneuver"),
      CanHaveRanks: true,
      HasStat: true,
      Stat: this.GetStatByName("Strength"),
      HasMaximumNumberOfRanks: true,
      MaximumNumberOfRanks: 9,
      CanHaveProfessionalBonus: false,
      CanHaveItemBonus: true,
      InherentSpecialBonus: -60,
      HasInherentSpecialBonus: true,
      SkillTypeAbbreviation: "MM"
    } as Skill;
    this.skills.push(plate);
    skillsForMovementAndManeuver.push(plate);

    this.skillsByCategory.set("Movement And Maneuver", skillsForMovementAndManeuver);
    console.log('skillsForMovementAndManeuver', skillsForMovementAndManeuver);
  }

  initializeStats() {

    this.stats.push({ id: 1, Name: "Strength", Abbreviation: "ST" } as Stat);
    this.stats.push({ id: 2, Name: "Agility", Abbreviation: "AG" } as Stat);
    this.stats.push({ id: 3, Name: "Constitution", Abbreviation: "CO" } as Stat);
    this.stats.push({ id: 4, Name: "Intelligence", Abbreviation: "IG" } as Stat);
    this.stats.push({ id: 5, Name: "Intuition", Abbreviation: "IT" } as Stat);
    this.stats.push({ id: 6, Name: "Presence", Abbreviation: "PR" } as Stat);

    this.stats.forEach(stat => {
      this.statsByName.set(stat.Name, stat);
    });
  }


  GetAllStats(): Array<Stat> {
    return this.stats;
  }

  GetAllSkills(): Array<Skill> {
    return this.skills;
  }

  GetSkillsByCategory(name: string): Array<Skill> {
    let skillsByCategory = this.skillsByCategory.get(name);
    if (skillsByCategory) { return skillsByCategory; }
    else {
      return new Array<Skill>();
    }
  }

  GetSkillCategoryByName(name: string): SkillCategory {
    let foundSkillCategory = this.skillCategoriesByName.get(name);
    if (foundSkillCategory) { return foundSkillCategory; }
    else return this.skillCategories[0];
  }

  GetStatByName(name: string): Stat {
    let foundStat = this.statsByName.get(name);
    if (foundStat) { return foundStat; }
    else { return this.stats[0]; }
  }

  CalculateNormalBonus(value: number): number {
    if (value == 1) { return -25; }
    if (value == 2) { return -20; }
    if (value <= 4) { return -15; }
    if (value <= 9) { return -10; }
    if (value <= 24) { return -5; }
    if (value <= 74) { return 0; }
    if (value <= 89) { return 5; }
    if (value <= 94) { return 10; }
    if (value <= 97) { return 15; }
    if (value <= 99) { return 20; }
    if (value == 100) { return 25; }
    if (value == 101) { return 30; }
    if (value == 102) { return 35; }
    return 0;
  }

  isNumber(value?: string | number): boolean {
    return ((value != null) &&
      (value !== '') &&
      !isNaN(Number(value.toString())));
  }

  formatBonusPrefix(bonus: number) {
    if (bonus < 0) { return `${bonus}`; }
    else { return `+${bonus}`; }
  }

  initializeRaces() {
    let Dwarves = {
      id: 1,
      Name: "Dwarves",
      IsMannish: false,
      StatBonuses: [
        { Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Agility"), Bonus: 5 } as RaceStatBonus
      ]
    } as Race; this.races.push(Dwarves);

    let Umli = { id: 2, Name: "Umli", IsMannish: false } as Race; this.races.push(Umli);
    let HalfElves = { id: 3, Name: "Half-elves", IsMannish: false } as Race; this.races.push(HalfElves);
    let NoldorElves = { id: 4, Name: "Noldor Elves", IsMannish: false } as Race; this.races.push(NoldorElves);
    let SindarElves = { id: 5, Name: "Sindar Elves", IsMannish: false } as Race; this.races.push(SindarElves);
    let SilvanElves = { id: 6, Name: "Silvan Elves", IsMannish: false } as Race; this.races.push(SilvanElves);
    let Hobbits = { id: 7, Name: "Hobbits", IsMannish: false } as Race; this.races.push(Hobbits);
    let CommonOrcs = { id: 8, Name: "Common Orcs", IsMannish: false } as Race; this.races.push(CommonOrcs);
    let UrukHai = { id: 9, Name: "Uruk-hai", IsMannish: false } as Race; this.races.push(UrukHai);
    let HalfOrcs = { id: 10, Name: "Half-orcs", IsMannish: false } as Race; this.races.push(HalfOrcs);
    let NormalTrolls = { id: 11, Name: "Normal Trolls", IsMannish: false } as Race; this.races.push(NormalTrolls);
    let OlogHai = { id: 12, Name: "Olog-hai", IsMannish: false } as Race; this.races.push(OlogHai);
    let HalfTrolls = { id: 13, Name: "Half-trolls", IsMannish: false } as Race; this.races.push(HalfTrolls);
    let Beornings = { id: 14, Name: "Beornings", IsMannish: true } as Race; this.races.push(Beornings);
    let BlackNumenoreans = { id: 15, Name: "Black Numenoreans", IsMannish: true } as Race; this.races.push(BlackNumenoreans);
    let Corsairs = { id: 16, Name: "Corsairs", IsMannish: true } as Race; this.races.push(Corsairs);
    let Dorwinrim = { id: 17, Name: "Dorwinrim", IsMannish: true } as Race; this.races.push(Dorwinrim);
    let Dunedain = { id: 18, Name: "Dunedain", IsMannish: true } as Race; this.races.push(Dunedain);
    let Dunlendings = { id: 19, Name: "Dunlendings", IsMannish: true } as Race; this.races.push(Dunlendings);
    let Easterlings = { id: 20, Name: "Easterlings", IsMannish: true } as Race; this.races.push(Easterlings);
    let Haradrim = { id: 21, Name: "Haradrim", IsMannish: true } as Race; this.races.push(Haradrim);
    let Lossoth = { id: 22, Name: "Lossoth", IsMannish: true } as Race; this.races.push(Lossoth);
    let Rohirrim = { id: 23, Name: "Rohirrim", IsMannish: true } as Race; this.races.push(Rohirrim);
    let RuralMen = { id: 24, Name: "Rural Men", IsMannish: true } as Race; this.races.push(RuralMen);
    let UrbanMen = { id: 25, Name: "Urban Men", IsMannish: true } as Race; this.races.push(UrbanMen);
    let Variags = { id: 26, Name: "Variags", IsMannish: true } as Race; this.races.push(Variags);
    let Woodmen = { id: 27, Name: "Woodmen", IsMannish: true } as Race; this.races.push(Woodmen);
    let Woses = { id: 28, Name: "Woses", IsMannish: true } as Race; this.races.push(Woses);
  }
}
