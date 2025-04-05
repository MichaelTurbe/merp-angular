import { Injectable } from "@angular/core";
import { Skill } from "../models/Skill";
import { SkillCategory } from "../models/SkillCategory";
import { Stat } from "../models/Stat";
import { KeyValue } from "../utilities/key-value";
import { Race } from "../models/Race";
import { RaceSkillRank } from "../models/RaceSkillRank";
import { RaceStatBonus } from "../models/RaceStatBonus";
import { Profession } from "../models/Profession";
import { SkillCategoryProfessionalBonus } from "../models/SkillCategoryProfessionalBonus";
import { ParticularSkillProfessionalBonus } from "../models/ParticularSkillProfessionalBonus";
import { RaceResistanceRollBonus } from "../models/RaceResistanceRollBonus";

@Injectable({ providedIn: 'root' })
export class SystemDataService {
  skillCategories: Array<SkillCategory> = new Array<SkillCategory>();
  skillCategoriesByName: Map<string, SkillCategory> = new Map<string, SkillCategory>();

  skills: Array<Skill> = new Array<Skill>();
  skillsByCategory: Map<string, Array<Skill>> = new Map<string, Array<Skill>>();

  stats: Array<Stat> = new Array<Stat>();
  statsByName: Map<string, Stat> = new Map<string, Stat>();

  races: Array<Race> = new Array<Race>();

  professions: Array<Profession> = new Array<Profession>();

  constructor() {
    this.initializeStats();
    this.initializeSkillCategories();
    this.initializeSkills();
    this.initializeRaces();
    this.initializeProfessions();
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
    this.initializeGeneralSkills();
    this.initializeSubterfugeSkills();
    this.initializeMiscSkills();
    this.initializeMagicSkills();
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
      HasManualRankBonus: false,
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
      HasManualRankBonus: false,
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
      HasManualRankBonus: false,
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
      HasManualRankBonus: false,
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
    this.skills.push(missile);
    weaponSkills.push(missile);

    const poleArms = {
      id: 6,
      Name: "Pole arms",
      SkillCategory: this.GetSkillCategoryByName("Weapon Skills"),
      CanHaveRanks: true,
      HasManualRankBonus: false,
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
      HasManualRankBonus: false,
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
      HasManualRankBonus: false,
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
      HasManualRankBonus: false,
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
      HasManualRankBonus: false,
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
      HasManualRankBonus: false,
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

  initializeGeneralSkills() {
    const generalSkills = new Array<Skill>();

    const climb = {
      id: 1,
      Name: "Climb",
      SkillCategory: this.GetSkillCategoryByName("General Skills"),
      CanHaveRanks: true,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Agility"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "MM"
    } as Skill;
    this.skills.push(climb);
    generalSkills.push(climb);

    const ride = {
      id: 2,
      Name: "Ride",
      SkillCategory: this.GetSkillCategoryByName("General Skills"),
      CanHaveRanks: true,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Intuition"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "MM"
    } as Skill;
    this.skills.push(ride);
    generalSkills.push(ride);

    const swim = {
      id: 3,
      Name: "Swim",
      SkillCategory: this.GetSkillCategoryByName("General Skills"),
      CanHaveRanks: true,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Agility"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "MM"
    } as Skill;
    this.skills.push(swim);
    generalSkills.push(swim);

    const track = {
      id: 4,
      Name: "Track",
      SkillCategory: this.GetSkillCategoryByName("General Skills"),
      CanHaveRanks: true,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Intelligence"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "SM"
    } as Skill;
    this.skills.push(track);
    generalSkills.push(track);

    this.skillsByCategory.set("General Skills", generalSkills);
    console.log("generalSkills", this.skillsByCategory.get("General Skills"));

  }

  initializeSubterfugeSkills() {
    const subterfugeSkills = new Array<Skill>();

    const ambush = {
      id: 1,
      Name: "Ambush",
      SkillCategory: this.GetSkillCategoryByName("Subterfuge Skills"),
      CanHaveRanks: true,
      HasManualRankBonus: true,
      HasStat: false,
      // Stat: this.GetStatByName("Agility"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: false,
      CanHaveItemBonus: false,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "SP"
    } as Skill;
    this.skills.push(ambush);
    subterfugeSkills.push(ambush);

    const stalkAndHide = {
      id: 2,
      Name: "Stalk/Hide",
      SkillCategory: this.GetSkillCategoryByName("Subterfuge Skills"),
      CanHaveRanks: true,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Presence"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "SP"
    } as Skill;
    this.skills.push(stalkAndHide);
    subterfugeSkills.push(stalkAndHide);

    const pickLock = {
      id: 3,
      Name: "Pick Lock",
      SkillCategory: this.GetSkillCategoryByName("Subterfuge Skills"),
      CanHaveRanks: true,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Intelligence"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "SM"
    } as Skill;
    this.skills.push(pickLock);
    subterfugeSkills.push(pickLock);

    const disarmTrap = {
      id: 4,
      Name: "Disarm Trap",
      SkillCategory: this.GetSkillCategoryByName("Subterfuge Skills"),
      CanHaveRanks: true,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Intuition"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "SM"
    } as Skill;
    this.skills.push(disarmTrap);
    subterfugeSkills.push(disarmTrap);

    this.skillsByCategory.set("Subterfuge Skills", subterfugeSkills);
    // console.log("generalSkills", this.skillsByCategory.get("General Skills"));

  }

  initializeMiscSkills() {
    const miscSkills = new Array<Skill>();

    const perception = {
      id: 1,
      Name: "Perception",
      SkillCategory: this.GetSkillCategoryByName("Misc Skills And Bonuses"),
      CanHaveRanks: true,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Intuition"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "SM"
    } as Skill;
    this.skills.push(perception);
    miscSkills.push(perception);

    const bodyDevelopment = {
      id: 2,
      Name: "Body Development",
      SkillCategory: this.GetSkillCategoryByName("Misc Skills And Bonuses"),
      CanHaveRanks: true,
      HasManualRankBonus: true,
      HasStat: true,
      Stat: this.GetStatByName("Constitution"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 5,
      HasInherentSpecialBonus: true,
      SkillTypeAbbreviation: "HP"
    } as Skill;
    this.skills.push(bodyDevelopment);
    miscSkills.push(bodyDevelopment);

    const baseSpells = {
      id: 3,
      Name: "Base Spells",
      SkillCategory: this.GetSkillCategoryByName("Misc Skills And Bonuses"),
      CanHaveRanks: false,
      HasManualRankBonus: false,
      HasStat: false,

      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "OB"
    } as Skill;
    this.skills.push(baseSpells);
    miscSkills.push(baseSpells);

    const leadershipAndInfluence = {
      id: 3,
      Name: "Leadership & Influence",
      SkillCategory: this.GetSkillCategoryByName("Misc Skills And Bonuses"),
      CanHaveRanks: false,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Presence"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: false,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "SM"
    } as Skill;
    this.skills.push(leadershipAndInfluence);
    miscSkills.push(leadershipAndInfluence);

    const defensiveBonus = {
      id: 4,
      Name: "Defensive Bonus",
      SkillCategory: this.GetSkillCategoryByName("Misc Skills And Bonuses"),
      CanHaveRanks: false,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Agility"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: false,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "DB"
    } as Skill;
    this.skills.push(defensiveBonus);
    miscSkills.push(defensiveBonus);

    const essenceRR = {
      id: 5,
      Name: "Essence RR",
      SkillCategory: this.GetSkillCategoryByName("Misc Skills And Bonuses"),
      CanHaveRanks: false,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Intelligence"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: false,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "RR"
    } as Skill;
    this.skills.push(essenceRR);
    miscSkills.push(essenceRR);

    const channelingRR = {
      id: 6,
      Name: "Channeling RR",
      SkillCategory: this.GetSkillCategoryByName("Misc Skills And Bonuses"),
      CanHaveRanks: false,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Intuition"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: false,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "RR"
    } as Skill;
    this.skills.push(channelingRR);
    miscSkills.push(channelingRR);

    const poisonRR = {
      id: 7,
      Name: "Poison RR",
      SkillCategory: this.GetSkillCategoryByName("Misc Skills And Bonuses"),
      CanHaveRanks: false,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Constitution"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: false,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "RR"
    } as Skill;
    this.skills.push(poisonRR);
    miscSkills.push(poisonRR);

    const diseaseRR = {
      id: 8,
      Name: "Disease RR",
      SkillCategory: this.GetSkillCategoryByName("Misc Skills And Bonuses"),
      CanHaveRanks: false,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Constitution"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: false,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "RR"
    } as Skill;
    this.skills.push(diseaseRR);
    miscSkills.push(diseaseRR);

    this.skillsByCategory.set("Misc Skills And Bonuses", miscSkills);
    // "Misc Skills And Bonuses"
  }

  initializeMagicSkills() {
    const magicSkills = new Array<Skill>();

    const readRunes = {
      id: 1,
      Name: "Read Runes",
      SkillCategory: this.GetSkillCategoryByName("Magical Skills"),
      CanHaveRanks: true,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Intelligence"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "SM"
    } as Skill;
    this.skills.push(readRunes);
    magicSkills.push(readRunes);

    const useItems = {
      id: 2,
      Name: "Use Items",
      SkillCategory: this.GetSkillCategoryByName("Magical Skills"),
      CanHaveRanks: true,
      HasManualRankBonus: false,
      HasStat: true,
      Stat: this.GetStatByName("Intuition"),
      HasMaximumNumberOfRanks: false,
      MaximumNumberOfRanks: 0,
      CanHaveProfessionalBonus: true,
      CanHaveItemBonus: true,
      InherentSpecialBonus: 0,
      HasInherentSpecialBonus: false,
      SkillTypeAbbreviation: "AM"
    } as Skill;
    this.skills.push(useItems);
    magicSkills.push(useItems);

    const directedSpells = {
      id: 3,
      Name: "Directed Spells",
      SkillCategory: this.GetSkillCategoryByName("Magical Skills"),
      CanHaveRanks: true,
      HasManualRankBonus: false,
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
    this.skills.push(directedSpells);
    magicSkills.push(directedSpells);

    this.skillsByCategory.set("Magical Skills", magicSkills);
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
    let essenceRR = this.GetSkillByName("Essence RR");
    let channelingRR = this.GetSkillByName("Channeling RR");
    let poisonRR = this.GetSkillByName("Poison RR");
    let diseaseRR = this.GetSkillByName("Disease RR");

    let Dwarves = {
      id: 1,
      Name: "Dwarf",
      Human: false,
      StatBonuses: [
        { Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Agility"), Bonus: -5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Constitution"), Bonus: 15 } as RaceStatBonus,
        { Stat: this.GetStatByName("Intuition"), Bonus: -5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Presence"), Bonus: -5 } as RaceStatBonus,
      ],
      ResistanceRollBonuses: [
        { Skill: essenceRR, Bonus: 40 } as RaceResistanceRollBonus,
        { Skill: channelingRR, Bonus: 0 } as RaceResistanceRollBonus,
        { Skill: poisonRR, Bonus: 10 } as RaceResistanceRollBonus,
        { Skill: diseaseRR, Bonus: 10 } as RaceResistanceRollBonus,
      ]
    } as Race; this.races.push(Dwarves);

    let Umli = {
      id: 2, Name: "Umli", Human: false,
      StatBonuses: [
        { Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Constitution"), Bonus: 10 } as RaceStatBonus,
        { Stat: this.GetStatByName("Intuition"), Bonus: -5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Presence"), Bonus: -5 } as RaceStatBonus,
      ],
      ResistanceRollBonuses: [
        { Skill: essenceRR, Bonus: 20 } as RaceResistanceRollBonus,
        { Skill: channelingRR, Bonus: 0 } as RaceResistanceRollBonus,
        { Skill: poisonRR, Bonus: 5 } as RaceResistanceRollBonus,
        { Skill: diseaseRR, Bonus: 5 } as RaceResistanceRollBonus,
      ]
    } as Race; this.races.push(Umli);

    let Dunedain = {
      id: 18, Name: "Dunedain", Human: false,
      StatBonuses: [
        { Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Constitution"), Bonus: 10 } as RaceStatBonus,
        { Stat: this.GetStatByName("Presence"), Bonus: 5 } as RaceStatBonus,
      ],
      ResistanceRollBonuses: [
        { Skill: essenceRR, Bonus: 0 } as RaceResistanceRollBonus,
        { Skill: channelingRR, Bonus: 0 } as RaceResistanceRollBonus,
        { Skill: poisonRR, Bonus: 5 } as RaceResistanceRollBonus,
        { Skill: diseaseRR, Bonus: 5 } as RaceResistanceRollBonus,
      ]
    } as Race; this.races.push(Dunedain);

    let HalfElves = {
      id: 3, Name: "Half-elf", Human: false,
      StatBonuses: [
        { Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Agility"), Bonus: 5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Constitution"), Bonus: 5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Presence"), Bonus: 5 } as RaceStatBonus,
      ],
      ResistanceRollBonuses: [
        { Skill: essenceRR, Bonus: 0 } as RaceResistanceRollBonus,
        { Skill: channelingRR, Bonus: 0 } as RaceResistanceRollBonus,
        { Skill: poisonRR, Bonus: 5 } as RaceResistanceRollBonus,
        { Skill: diseaseRR, Bonus: 50 } as RaceResistanceRollBonus,
      ]
    } as Race; this.races.push(HalfElves);

    let NoldorElves = {
      id: 4, Name: "Noldor Elf", Human: false,
      StatBonuses: [
        { Stat: this.GetStatByName("Agility"), Bonus: 15 } as RaceStatBonus,
        { Stat: this.GetStatByName("Constitution"), Bonus: 10 } as RaceStatBonus,
        { Stat: this.GetStatByName("Intelligence"), Bonus: 5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Intuition"), Bonus: 5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Presence"), Bonus: 15 } as RaceStatBonus,
      ],
      ResistanceRollBonuses: [
        { Skill: essenceRR, Bonus: 0 } as RaceResistanceRollBonus,
        { Skill: channelingRR, Bonus: 0 } as RaceResistanceRollBonus,
        { Skill: poisonRR, Bonus: 10 } as RaceResistanceRollBonus,
        { Skill: diseaseRR, Bonus: 100 } as RaceResistanceRollBonus,
      ]
    } as Race; this.races.push(NoldorElves);

    let SindarElves = {
      id: 5, Name: "Sindar Elf", Human: false,
      StatBonuses: [
        { Stat: this.GetStatByName("Agility"), Bonus: 10 } as RaceStatBonus,
        { Stat: this.GetStatByName("Constitution"), Bonus: 5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Intuition"), Bonus: 5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Presence"), Bonus: 5 } as RaceStatBonus,
      ],
      ResistanceRollBonuses: [
        { Skill: essenceRR, Bonus: 0 } as RaceResistanceRollBonus,
        { Skill: channelingRR, Bonus: 0 } as RaceResistanceRollBonus,
        { Skill: poisonRR, Bonus: 10 } as RaceResistanceRollBonus,
        { Skill: diseaseRR, Bonus: 100 } as RaceResistanceRollBonus,
      ]
    } as Race; this.races.push(SindarElves);

    let SilvanElves = {
      id: 6, Name: "Silvan Elf", Human: false,
      StatBonuses: [
        { Stat: this.GetStatByName("Agility"), Bonus: 10 } as RaceStatBonus,
        { Stat: this.GetStatByName("Intuition"), Bonus: 5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Presence"), Bonus: 10 } as RaceStatBonus,
      ],
      ResistanceRollBonuses: [
        { Skill: essenceRR, Bonus: 0 } as RaceResistanceRollBonus,
        { Skill: channelingRR, Bonus: 0 } as RaceResistanceRollBonus,
        { Skill: poisonRR, Bonus: 10 } as RaceResistanceRollBonus,
        { Skill: diseaseRR, Bonus: 100 } as RaceResistanceRollBonus,
      ]
    } as Race; this.races.push(SilvanElves);

    let Hobbits = {
      id: 7, Name: "Hobbit", Human: false,
      StatBonuses: [
        { Stat: this.GetStatByName("Strength"), Bonus: -20 } as RaceStatBonus,
        { Stat: this.GetStatByName("Agility"), Bonus: 15 } as RaceStatBonus,
        { Stat: this.GetStatByName("Constitution"), Bonus: 15 } as RaceStatBonus,
        { Stat: this.GetStatByName("Intuition"), Bonus: -5 } as RaceStatBonus,
        { Stat: this.GetStatByName("Presence"), Bonus: -5 } as RaceStatBonus,
      ],
      ResistanceRollBonuses: [
        { Skill: essenceRR, Bonus: 50 } as RaceResistanceRollBonus,
        { Skill: channelingRR, Bonus: 20 } as RaceResistanceRollBonus,
        { Skill: poisonRR, Bonus: 30 } as RaceResistanceRollBonus,
        { Skill: diseaseRR, Bonus: 15 } as RaceResistanceRollBonus,
      ]
    } as Race; this.races.push(Hobbits);
    // let CommonOrcs = { id: 8, Name: "Common Orcs", Human: false } as Race; this.races.push(CommonOrcs);
    // let UrukHai = { id: 9, Name: "Uruk-hai", Human: false } as Race; this.races.push(UrukHai);
    // let HalfOrcs = { id: 10, Name: "Half-orcs", Human: false } as Race; this.races.push(HalfOrcs);
    // let NormalTrolls = { id: 11, Name: "Normal Trolls", Human: false } as Race; this.races.push(NormalTrolls);
    // let OlogHai = { id: 12, Name: "Olog-hai", Human: false } as Race; this.races.push(OlogHai);
    // let HalfTrolls = { id: 13, Name: "Half-trolls", Human: false } as Race; this.races.push(HalfTrolls);
    let humanResistanceRollBonuses = new Array<RaceResistanceRollBonus>();
    humanResistanceRollBonuses.push({ Skill: essenceRR, Bonus: 0 } as RaceResistanceRollBonus);
    humanResistanceRollBonuses.push({ Skill: channelingRR, Bonus: 0 } as RaceResistanceRollBonus);
    humanResistanceRollBonuses.push({ Skill: poisonRR, Bonus: 0 } as RaceResistanceRollBonus);
    humanResistanceRollBonuses.push({ Skill: diseaseRR, Bonus: 0 } as RaceResistanceRollBonus);

    let Beornings = { id: 14, Name: "Beorning", Human: true, StatBonuses: [{ Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus], ResistanceRollBonuses: humanResistanceRollBonuses } as Race; this.races.push(Beornings);
    let BlackNumenoreans = { id: 15, Name: "Black Numenorean", Human: true, StatBonuses: [{ Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus], ResistanceRollBonuses: humanResistanceRollBonuses } as Race; this.races.push(BlackNumenoreans);
    let Corsairs = { id: 16, Name: "Corsair", Human: true, StatBonuses: [{ Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus], ResistanceRollBonuses: humanResistanceRollBonuses } as Race; this.races.push(Corsairs);
    let Dorwinrim = { id: 17, Name: "Dorwinrim", Human: true, StatBonuses: [{ Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus], ResistanceRollBonuses: humanResistanceRollBonuses } as Race; this.races.push(Dorwinrim);

    let Dunlendings = { id: 19, Name: "Dunlending", Human: true, StatBonuses: [{ Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus], ResistanceRollBonuses: humanResistanceRollBonuses } as Race; this.races.push(Dunlendings);
    let Easterlings = { id: 20, Name: "Easterling", Human: true, StatBonuses: [{ Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus], ResistanceRollBonuses: humanResistanceRollBonuses } as Race; this.races.push(Easterlings);
    let Haradrim = { id: 21, Name: "Haradrim", Human: true, StatBonuses: [{ Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus], ResistanceRollBonuses: humanResistanceRollBonuses } as Race; this.races.push(Haradrim);
    let Lossoth = { id: 22, Name: "Lossoth", Human: true, StatBonuses: [{ Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus], ResistanceRollBonuses: humanResistanceRollBonuses } as Race; this.races.push(Lossoth);
    let Rohirrim = { id: 23, Name: "Rohirrim", Human: true, StatBonuses: [{ Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus], ResistanceRollBonuses: humanResistanceRollBonuses } as Race; this.races.push(Rohirrim);
    let RuralMen = { id: 24, Name: "Rural Man", Human: true, StatBonuses: [{ Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus], ResistanceRollBonuses: humanResistanceRollBonuses } as Race; this.races.push(RuralMen);
    let UrbanMen = { id: 25, Name: "Urban Man", Human: true, StatBonuses: [{ Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus], ResistanceRollBonuses: humanResistanceRollBonuses } as Race; this.races.push(UrbanMen);
    let Variags = { id: 26, Name: "Variag", Human: true, StatBonuses: [{ Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus], ResistanceRollBonuses: humanResistanceRollBonuses } as Race; this.races.push(Variags);
    let Woodmen = { id: 27, Name: "Woodman", Human: true, StatBonuses: [{ Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus], ResistanceRollBonuses: humanResistanceRollBonuses } as Race; this.races.push(Woodmen);
    let Woses = { id: 28, Name: "Wose", Human: true, StatBonuses: [{ Stat: this.GetStatByName("Strength"), Bonus: 5 } as RaceStatBonus], ResistanceRollBonuses: humanResistanceRollBonuses } as Race; this.races.push(Woses);
  }

  GetAllRaceTypes(): Array<KeyValue> {
    let keyValues = new Array<KeyValue>();
    keyValues.push({ id: 1, Name: "Human" } as KeyValue);
    keyValues.push({ id: 2, Name: "Nonhuman" } as KeyValue);
    return keyValues;
  }

  GetRacesByType(raceType: string): Array<Race> {
    console.log(`get races for type: ${raceType}`);
    let someRaces = new Array<Race>();
    let humanValue = true;
    if (raceType == "Nonhuman") {
      humanValue = false;
    }
    this.races.forEach(race => {
      if (race.Human === humanValue) { someRaces.push(race); }
    });
    console.log(`got races for type: ${raceType}`, someRaces);
    return someRaces;
  }

  GetRaceByName(raceName: string): Race {
    let foundRace = null;
    this.races.forEach(race => {
      if (race.Name == raceName) { foundRace = race; }
    });
    return foundRace;
  }

  GetRandomCharacterName(): string {
    const names = ["Steinar Mong",
      "Henrik Gill",
      "Reidar Skog",
      "Mats Solverson",
      "Amund Ringstad",
      "Svend Lageson",
      "Gjermund Eriksen",
      "Thorleif Flatten",
      "Stein Evensen",
      "Ingar Berget",
      "Lina Westby",
      "Klara Bjorge",
      "Anne Underdahl",
      "Maja Hunstad",
      "Ingebjørg Stoen",
      "Monica Fiske",
      "Oline Underberg",
      "Klara Skora",
      "Asta Gronlund",
      "Emma Wee",
      "Kasper Ohm",
      "Vetle Gjerde",
      "Kevin Stephensen",
      "Torfinn Westby",
      "Ketil Sollie",
      "Torstein Natvig",
      "Gard Sunde",
      "Gunnar Elden",
      "Agnar Nordhagen",
      "Yngvar Roed",
      "Alice Hestenes",
      "Helle Sether",
      "Asta Valstad",
      "Kjersti Nored",
      "Karin Magnus",
      "Elna Saugstad",
      "Line Jellum",
      "Evy Christoffersen",
      "Sylvia Rygg",
      "Yvonne Ottosen",
      "Khaleel el-Abdul",
      "Mushtaaq al-Abdulla",
      "Fahd al-Younan",
      "Abdul Wahaab el-Hamad",
      "Raakaan al-Rahmani",
      "Azhaar al-Dar",
      "Muneeb al-Faris",
      "Husaam al-Faris",
      "Uqbah el-Safar",
      "Siddeeqi al-Vohra",
      "Shahaada al-Darwish",
      "Kabeera el-Samra",
      "Fat'hiyaa el-Jamil",
      "Haamida al-Mansur",
      "Widdad el-Zaman",
      "Thamra el-Demian",
      "Umaira al-Minhas",
      "Muneera al-Noori",
      "Abeer el-Jafri",
      "Sabiyya al-Safar",
      "Tessema Etefu Kahsai",
      "Naomi Mekonnen Negasi",
      "Saida Melech Basliel",
      "Worqnesh Nazwari Meles",
      "Zenha Berta Tesfaye",
      "Derartu Meseret Biruh",
      "Derartu Markos Dejen",
      "Jeneve Belendia Ezera",
      "Etalemahu Oromo Yaee",
      "Yeneneshe Abenet Amsalu",
      "Chekolech Adugna Masresha",
      "Alberic Goold",
      "Berthefried Longfoot",
      "Gundolpho Butcher",
      "Nithard Brandybuck",
      "Wibert Proudfoot",
      "Meginhard Proudbody",
      "Audramnus Hogpen",
      "Odo Goodchild",
      "Wala Elvellon",
      "Crispus Silverstring",
      "Gabrielle Maggot",
      "Amber Hogpen",
      "Sabrina Boulderhill",
      "Adele Proudbody",
      "Blesinde Brockhouse",
      "Mirabella Banks",
      "Hamesindis Longbottom",
      "Hildeburg Finnagund",
      "Cassandra Banks",
      "Magnatrude Tinyfoot",
      "Werinbert Littlefoot",
      "Theodard Greenhand",
      "Theuderic Hornwood",
      "Thierry Longhole",
      "Hubert Silverstring",
      "Mallobaudes Bunce",
      "Bodo Burrowes",
      "Berengar Oldbuck",
      "Angegisis Sandheaver",
      "Hartmut Labingi",
      "Aubirge Noakes",
      "Berylla Took-Brandybuck",
      "Swanahilde Heathertoes",
      "Mantissa Bolger",
      "Alpais Fleetfoot",
      "Clotilde Puddlefoot",
      "Esmeralda Fairfoot",
      "Poppy Sackville",
      "Semolina Twofoot",
      "Devin Barrowes",
      "Gaeleath Ianrona",
      "Zeno Torwynn",
      "Malgath Liavaris",
      "Fenian Ulalynn",
      "Braern Keyleth",
      "Rennyn Bryzumin",
      "Eilauver Jonelis",
      "Toross Naelar",
      "Tarathiel Glynhorn",
      "Elred Naequinal",
      "Ahshala Ravalana",
      "Fayeth Sarharice",
      "Yunaesa Yllanala",
      "Naevys Philana",
      "Shaerra Trisdove",
      "Bonaluria Caizana",
      "Lymseia Brylee",
      "Elanil Magxisys",
      "Geminara Crastina",
      "Azariah Sylzana",
      "Bialaer Petsalor",
      "Khiiral Traven",
      "Elas Fasatra",
      "Aubron Ralofaren",
      "Azariah Faqirelle",
      "Narbeth Fenlynn",
      "Selanar Glynkrana",
      "Khiiral Ravadi",
      "Kelvhan Valwynn",
      "Nithenoel Wysamaer",
      "Gnorl",
      "Zonagh",
      "Shobob",
      "Zugorim",
      "Orpigig",
      "Pehrakgu",
      "Snakha",
      "Wapkagut",
      "Cukgilug",
      "Supgugh",
      "Gonk",
      "Durz",
      "Sharog",
      "Bulfim",
      "Ulumpha",
      "Bogdub",
      "Mogak",
      "Urzoth",
      "Ghob",
      "Agrob",
      "Bogakh",
      "Zabghat",
      "Hanz",
      "Gilaktug",
      "Margulg",
      "Knorgh",
      "Jolagh",
      "Woglug",
      "Nurbag",
      "Ig",
      "Wakefield 'The Drunk' Krome",
      "Almanzo 'Corsair' Inigo",
      "Dainard 'Pleasant' Remington",
      "Somers 'Voodoo' Derrington",
      "Ethelwin 'Daring' Shore",
      "Day 'Striker' Kirby",
      "Denham 'Liar' Kirby",
      "Breckinridge 'Shady' Thorpe",
      "Diamond 'Lionheart' Hartford",
      "Cadby 'Frenzied' Cheek",
      "Camille 'Whale-Eye' Riley",
      "Ralphina 'Mad Eyes' Eulisses",
      "Afton 'Golden Tooth' Karn",
      "Waverly 'The Drunk' Tidus",
      "Leonore 'The Coward' Crutchley",
      "Melissa 'Crusty' Zorander",
      "Susanna 'The Boar' Eldon",
      "Dulcie 'The Mermaid' Chatham",
      "Amie 'Weasel' Remington",
      "Hildur 'Fishy' Smither",
      "Wetherly 'The Fox' Sax",
      "Nelson 'The Coward' Garside",
      "Selwyn 'Crusty' Murray",
      "Rodman 'Foolish' Krome",
      "Esmond 'Crabby' Alvingham",
      "Harley 'Dead Eyes' Prysm",
      "Finn 'Frenzied' Wahl",
      "Faxon 'Scar Face' Nightwind",
      "Waldwick 'Silver-Eye' Law",
      "Harlow 'Whistle-Blower' Stafford",
      "Jerethath Qinberos",
      "Tristhorn Keatumal",
      "Quotaor Glynra",
      "Arodal Lorathyra",
      "Trarith Zylyra",
      "Pierreth Qibella",
      "Rilis Loraydark",
      "Galemorn Liamenor",
      "Yenlinar Raloberos",
      "Syllaern Inathyra",
      "Maudhere Hersalor",
      "Berrithe Enbella",
      "Gontala Jogella",
      "Maalphira Yesnala",
      "Jessirien Carris",
      "Vylnor Presjeon",
      "Gwenlone Helerora",
      "Ivetheris Norxisys",
      "Therzenya Petrie",
      "Gresatha Aenelis",
      "Tomanas Daexalim",
      "Ricstaer Brykian",
      "Audros Naeleth",
      "Lanceminar Hertoris",
      "Stephmon Quilee",
      "Traenas Fakalyn",
      "Rograch Ravaren",
      "Raynik Zinphine",
      "Crathorn Xyrberos",
      "Jerebyran Yelmys",
      "Quentin Scully",
      "Oswald Archer",
      "George Arrowsmith",
      "Caldwell Fuller",
      "Clement Tabor",
      "Benson Smith",
      "Roger Tillman",
      "Valentine Sexton",
      "Hamilton Hunter",
      "Wilson Sadler",
      "Forrest Shadowend",
      "Regan Brevil",
      "Lazar Geulimja",
      "Seth Gnash",
      "Beck Deamonne",
      "Douglas Fadington",
      "Chay Graves",
      "Erik Lestat",
      "Niam Barclay",
      "Fontayne Strain",
      "Conan Vigil",
      "Kaspar Shadowmend",
      "Gerard Wood",
      "Fontayne Tenebris",
      "Dashiel Jones",
      "Gaian Snow",
      "Thayer Void",
      "Thayer Norwood",
      "Ewart Talbot",
      "Goran Soulton",
      "Holly Black",
      "Franziska Geulimja",
      "Gwyneth Highmore",
      "Pepper Helion",
      "Aspen Howler",
      "Esmeralda Shadowwalker",
      "Glenda Razor",
      "Arabelle Christanti",
      "Fiona Natas",
      "Hermia Dupree",
      "Zarth",
      "urob",
      "Nozug",
      "Krereg",
      "urag",
      "Zeturek",
      "Grorezug",
      "Geuzog",
      "oxirog",
      "Tiak",
      "Vrokuhr",
      "Griruk",
      "Blegut",
      "Grareg",
      "Xukeg",
      "Dobireg",
      "Brabegrut",
      "Tritogark",
      "Kleikog",
      "Zakekurg",
      "Tusk",
      "Totem",
      "Coil",
      "Bulwark",
      "Blackjack",
      "Shank",
      "Scar",
      "Scar",
      "Dusk"];
    let number = this.GetRandomNumber(0, 299);
    return names[number];
  }

  GetRandomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  GetSkillByName(name: string): Skill {
    let foundSkill = null;
    this.GetAllSkills().forEach(skill => {
      if (skill.Name == name) {
        foundSkill = skill;
      }
    });
    return foundSkill;
  }

  initializeProfessions() {
    let movement = this.GetSkillCategoryByName("Movement And Maneuver");
    let weapon = this.GetSkillCategoryByName("Weapon Skills");
    let general = this.GetSkillCategoryByName("General Skills");
    let subterfuge = this.GetSkillCategoryByName("Subterfuge Skills");
    let magic = this.GetSkillCategoryByName("Magical Skills");

    let perception = this.GetSkillByName("Perception");
    let bodyDevelopment = this.GetSkillByName("Body Development");
    let useItems = this.GetSkillByName("Use Items");
    let baseSpells = this.GetSkillByName("Base Spells");
    let readRunes = this.GetSkillByName("Read Runes");
    let directedSpells = this.GetSkillByName("Directed Spells");
    let stalkAndHide = this.GetSkillByName("Stalk/Hide");

    let warrior = {
      id: 1,
      Name: "Warrior",
      SkillCategoryProfessionalBonuses: new Array<SkillCategoryProfessionalBonus>(),
      ParticularSkillProfessionalBonuses: new Array<ParticularSkillProfessionalBonus>()

    } as Profession;
    warrior.SkillCategoryProfessionalBonuses.push(
      { SkillCategory: general, BonusPerLevel: 1 } as SkillCategoryProfessionalBonus
    );
    warrior.SkillCategoryProfessionalBonuses.push(
      { SkillCategory: weapon, BonusPerLevel: 3 } as SkillCategoryProfessionalBonus
    );
    warrior.ParticularSkillProfessionalBonuses.push(
      { Skill: bodyDevelopment, BonusPerLevel: 2 } as ParticularSkillProfessionalBonus
    );
    this.professions.push(warrior);

    let scout = {
      id: 2,
      Name: "Scout",
      SkillCategoryProfessionalBonuses: new Array<SkillCategoryProfessionalBonus>(),
      ParticularSkillProfessionalBonuses: new Array<ParticularSkillProfessionalBonus>()

    } as Profession;
    scout.SkillCategoryProfessionalBonuses.push(
      { SkillCategory: general, BonusPerLevel: 1 } as SkillCategoryProfessionalBonus
    );
    scout.SkillCategoryProfessionalBonuses.push(
      { SkillCategory: weapon, BonusPerLevel: 1 } as SkillCategoryProfessionalBonus
    );
    scout.SkillCategoryProfessionalBonuses.push(
      { SkillCategory: subterfuge, BonusPerLevel: 2 } as SkillCategoryProfessionalBonus
    );
    scout.ParticularSkillProfessionalBonuses.push(
      { Skill: perception, BonusPerLevel: 3 } as ParticularSkillProfessionalBonus
    );
    this.professions.push(scout);

    let mage = {
      id: 3,
      Name: "Mage",
      SkillCategoryProfessionalBonuses: new Array<SkillCategoryProfessionalBonus>(),
      ParticularSkillProfessionalBonuses: new Array<ParticularSkillProfessionalBonus>()

    } as Profession;
    mage.ParticularSkillProfessionalBonuses.push(
      { Skill: readRunes, BonusPerLevel: 2 } as ParticularSkillProfessionalBonus
    );
    mage.ParticularSkillProfessionalBonuses.push(
      { Skill: useItems, BonusPerLevel: 2 } as ParticularSkillProfessionalBonus
    );
    mage.ParticularSkillProfessionalBonuses.push(
      { Skill: baseSpells, BonusPerLevel: 2 } as ParticularSkillProfessionalBonus
    );
    mage.ParticularSkillProfessionalBonuses.push(
      { Skill: readRunes, BonusPerLevel: 2 } as ParticularSkillProfessionalBonus
    );
    mage.ParticularSkillProfessionalBonuses.push(
      { Skill: directedSpells, BonusPerLevel: 3 } as ParticularSkillProfessionalBonus
    );
    this.professions.push(mage);

    let ranger = {
      id: 4,
      Name: "Ranger",
      SkillCategoryProfessionalBonuses: new Array<SkillCategoryProfessionalBonus>(),
      ParticularSkillProfessionalBonuses: new Array<ParticularSkillProfessionalBonus>()

    } as Profession;
    ranger.SkillCategoryProfessionalBonuses.push(
      { SkillCategory: general, BonusPerLevel: 3 } as SkillCategoryProfessionalBonus
    );
    ranger.SkillCategoryProfessionalBonuses.push(
      { SkillCategory: weapon, BonusPerLevel: 2 } as SkillCategoryProfessionalBonus
    );

    ranger.ParticularSkillProfessionalBonuses.push(
      { Skill: perception, BonusPerLevel: 2 } as ParticularSkillProfessionalBonus
    );
    ranger.ParticularSkillProfessionalBonuses.push(
      { Skill: stalkAndHide, BonusPerLevel: 2 } as ParticularSkillProfessionalBonus
    );
    this.professions.push(ranger);

    let bard = {
      id: 5,
      Name: "Bard",
      SkillCategoryProfessionalBonuses: new Array<SkillCategoryProfessionalBonus>(),
      ParticularSkillProfessionalBonuses: new Array<ParticularSkillProfessionalBonus>()

    } as Profession;
    bard.SkillCategoryProfessionalBonuses.push(
      { SkillCategory: weapon, BonusPerLevel: 1 } as SkillCategoryProfessionalBonus
    );
    bard.SkillCategoryProfessionalBonuses.push(
      { SkillCategory: general, BonusPerLevel: 1 } as SkillCategoryProfessionalBonus
    );
    bard.SkillCategoryProfessionalBonuses.push(
      { SkillCategory: subterfuge, BonusPerLevel: 1 } as SkillCategoryProfessionalBonus
    );
    bard.SkillCategoryProfessionalBonuses.push(
      { SkillCategory: magic, BonusPerLevel: 1 } as SkillCategoryProfessionalBonus
    );

    bard.ParticularSkillProfessionalBonuses.push(
      { Skill: perception, BonusPerLevel: 1 } as ParticularSkillProfessionalBonus
    );

    bard.ParticularSkillProfessionalBonuses.push(
      { Skill: baseSpells, BonusPerLevel: 1 } as ParticularSkillProfessionalBonus
    );
    this.professions.push(bard);

    let animist = {
      id: 6,
      Name: "Animist",
      SkillCategoryProfessionalBonuses: new Array<SkillCategoryProfessionalBonus>(),
      ParticularSkillProfessionalBonuses: new Array<ParticularSkillProfessionalBonus>()

    } as Profession;
    animist.SkillCategoryProfessionalBonuses.push(
      { SkillCategory: general, BonusPerLevel: 1 } as SkillCategoryProfessionalBonus
    );

    animist.ParticularSkillProfessionalBonuses.push(
      { Skill: readRunes, BonusPerLevel: 1 } as ParticularSkillProfessionalBonus
    );
    animist.ParticularSkillProfessionalBonuses.push(
      { Skill: useItems, BonusPerLevel: 1 } as ParticularSkillProfessionalBonus
    );
    animist.ParticularSkillProfessionalBonuses.push(
      { Skill: baseSpells, BonusPerLevel: 2 } as ParticularSkillProfessionalBonus
    );

    animist.ParticularSkillProfessionalBonuses.push(
      { Skill: directedSpells, BonusPerLevel: 2 } as ParticularSkillProfessionalBonus
    );
    animist.ParticularSkillProfessionalBonuses.push(
      { Skill: perception, BonusPerLevel: 1 } as ParticularSkillProfessionalBonus
    );

    this.professions.push(animist);
  }

  GetAllProfessions(): Array<Profession> {
    return this.professions;
  }

  GetProfessionByName(name: string): Profession {
    let foundProfession: Profession = null;
    this.professions.forEach(profession => {
      if (profession.Name == name) {
        foundProfession = profession;
      }
    });
    return foundProfession;
  }
}
