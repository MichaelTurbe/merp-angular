import { Component, computed, input, Signal } from '@angular/core';
import { Skill } from '../../types/models/Skill';
import { FormControl, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SkillFieldType } from '../../types/models/SkillFieldType';
import { StatFieldType } from '../../types/models/StatFieldType';
import { SystemDataService } from '../../types/services/system.data.service';
import { Profession } from '../../types/models/Profession';
import { DiceService } from '../../types/services/dice.service';

@Component({
  selector: 'app-character-skill',
  imports: [ReactiveFormsModule],
  templateUrl: './character-skill.component.html',
  styleUrl: './character-skill.component.css'
})
export class CharacterSkillComponent {
  Skill = input.required<Skill>();
  fivePercentRankCheckboxes: FormArray = new FormArray<FormControl>([]);
  twoPercentRankCheckboxes: FormArray = new FormArray<FormControl>([]);
  showTwoPercentSkillRanks = true;
  statTotalBonusSignal: Signal<any>;
  skillTotalBonusSignal: Signal<any>;
  professionSignal: Signal<any>;
  professionBonusSignal: Signal<any>;
  levelSignal: Signal<any>;

  itemBonusControl = new FormControl('');
  itemBonusSignal!: Signal<any>;

  manualRankBonusControl = new FormControl('');

  specialBonusControl1 = new FormControl('');
  specialBonusSignal1: Signal<any>;
  specialBonusControl2 = new FormControl('');
  specialBonusSignal2: Signal<any>;

  fivePercentRankCheckbox1 = new FormControl(false);
  fivePercentRankCheckbox2 = new FormControl(false);
  fivePercentRankCheckbox3 = new FormControl(false);
  fivePercentRankCheckbox4 = new FormControl(false);
  fivePercentRankCheckbox5 = new FormControl(false);
  fivePercentRankCheckbox6 = new FormControl(false);
  fivePercentRankCheckbox7 = new FormControl(false);
  fivePercentRankCheckbox8 = new FormControl(false);
  fivePercentRankCheckbox9 = new FormControl(false);
  fivePercentRankCheckbox10 = new FormControl(false);
  fivePercentRankSignals = new Array<Signal<any>>();


  twoPercentRankCheckbox1 = new FormControl(false);
  twoPercentRankCheckbox2 = new FormControl(false);
  twoPercentRankCheckbox3 = new FormControl(false);
  twoPercentRankCheckbox4 = new FormControl(false);
  twoPercentRankCheckbox5 = new FormControl(false);
  twoPercentRankSignals = new Array<Signal<any>>();

  valueSignal: Signal<any>;
  rankBonusSignal: Signal<any>;
  manualRankBonusSignal: Signal<any>;

  constructor(protected signalStore: CharacterSheetSignalStore,
    protected context: CharacterSheetStateService,
    protected systemDataService: SystemDataService,
    protected diceServie: DiceService
  ) {
    this.gatherCheckBoxControls();
  
    this.fivePercentRankCheckboxes.controls.forEach(control => {
      let fivePercentRankCheckSignal = toSignal(
        control.valueChanges
      );
      this.fivePercentRankSignals.push(fivePercentRankCheckSignal);
    });

    this.twoPercentRankCheckboxes.controls.forEach(control => {
      let twoPercentRankCheckSignal = toSignal(
        control.valueChanges
      );
      this.twoPercentRankSignals.push(twoPercentRankCheckSignal);
    });

    let itemBonusSignal = toSignal(
      this.itemBonusControl.valueChanges
    );
    this.itemBonusSignal = itemBonusSignal;

    let specialBonusSignal1 = toSignal(
      this.specialBonusControl1.valueChanges
    );
    this.specialBonusSignal1 = specialBonusSignal1;

    let specialBonusSignal2 = toSignal(
      this.specialBonusControl2.valueChanges
    );
    this.specialBonusSignal2 = specialBonusSignal2;

    let manualRankBonusSignal = toSignal(
      this.manualRankBonusControl.valueChanges
    );
    this.manualRankBonusSignal = manualRankBonusSignal;

  }

  gatherCheckBoxControls() {
    this.fivePercentRankCheckboxes.controls.push(this.fivePercentRankCheckbox1);
    this.fivePercentRankCheckboxes.controls.push(this.fivePercentRankCheckbox2);
    this.fivePercentRankCheckboxes.controls.push(this.fivePercentRankCheckbox3);
    this.fivePercentRankCheckboxes.controls.push(this.fivePercentRankCheckbox4);
    this.fivePercentRankCheckboxes.controls.push(this.fivePercentRankCheckbox5);
    this.fivePercentRankCheckboxes.controls.push(this.fivePercentRankCheckbox6);
    this.fivePercentRankCheckboxes.controls.push(this.fivePercentRankCheckbox7);
    this.fivePercentRankCheckboxes.controls.push(this.fivePercentRankCheckbox8);
    this.fivePercentRankCheckboxes.controls.push(this.fivePercentRankCheckbox9);
    this.fivePercentRankCheckboxes.controls.push(this.fivePercentRankCheckbox10);

    this.twoPercentRankCheckboxes.push(this.twoPercentRankCheckbox1);
    this.twoPercentRankCheckboxes.push(this.twoPercentRankCheckbox2);
    this.twoPercentRankCheckboxes.push(this.twoPercentRankCheckbox3);
    this.twoPercentRankCheckboxes.push(this.twoPercentRankCheckbox4);
    this.twoPercentRankCheckboxes.push(this.twoPercentRankCheckbox5);
  }

  ngOnInit() {
    // set control values from character:
    const itemBonus = this.context.GetCharacterSkillBy(this.Skill()).ItemBonus;
    if (itemBonus != 0) {
      this.itemBonusControl.setValue(itemBonus.toString());
    }

    if (this.Skill().HasInherentSpecialBonus) {
      this.specialBonusControl2.setValue(this.Skill().InherentSpecialBonus.toString());
      this.specialBonusControl2.disable();
    }

    let numberOfFivePercentRanks = this.context.GetCharacterSkillBy(this.Skill()).FivePercentRanks;
    for (let y = 0; y < numberOfFivePercentRanks; y++) {
      this.fivePercentRankCheckboxes.controls[y].setValue(true);
    }
    let numberOfTwoPercentRanks = this.context.GetCharacterSkillBy(this.Skill()).TwoPercentRanks;
    for (let z = 0; z < numberOfTwoPercentRanks; z++) {
      this.twoPercentRankCheckboxes.controls[z].setValue(true);
    }
    if (this.Skill().HasStat) {
      this.statTotalBonusSignal = this.signalStore.GetStatSignal(this.Skill().Stat.Name, StatFieldType.TotalBonus);
    }

    this.professionSignal = this.signalStore.GetProfessionSignal();
    this.levelSignal = this.signalStore.GetLevelSignal();

    this.professionBonusSignal = computed(() => {
      const profession = this.professionSignal();
      const level = this.levelSignal();
      if (this.systemDataService.isNumber(level) && profession) {
        return this.getProfessionBonus(level, profession);
      }
      return 0;
    });

    if (this.Skill().HasManualRankBonus) {
      const manualBonus = this.context.GetCharacterSkillBy(this.Skill()).RankBonus;
      this.manualRankBonusControl.setValue(manualBonus.toString());
    }

    this.rankBonusSignal = computed(() => {
      // console.log(`in computed signal for rank bonus for skill ${this.Skill().Name}`);
      let rankBonus = 0;
      const fivePercentRankSignals = this.fivePercentRankSignals;
      let numberOfFivePercentRanks = 0;
      fivePercentRankSignals.forEach(rankSignal => {
        const checked = rankSignal();
        if (checked) {
          rankBonus = rankBonus + 5;
          numberOfFivePercentRanks++;
        }
      });

      const twoPercentRankSignals = this.twoPercentRankSignals;
      let numberOfTwoPercentRanks = 0;
      twoPercentRankSignals.forEach(rankSignal => {
        const checked = rankSignal();
        if (checked) {
          rankBonus = rankBonus + 5;
          numberOfTwoPercentRanks++;
        }
      });

      this.context.SetCharacterSkillField(this.Skill(), numberOfFivePercentRanks, SkillFieldType.FivePercentRanks);
      this.context.SetCharacterSkillField(this.Skill(), numberOfTwoPercentRanks, SkillFieldType.TwoPercentRanks);
      // console.log(`came up with a rank bonus of ${rankBonus}`);
      if (this.Skill().HasManualRankBonus) {
        let manualRankBonus = this.manualRankBonusSignal();
        return `+${manualRankBonus}`;
      } else {
        return `+${rankBonus}`;
      }
    });

    this.skillTotalBonusSignal = computed(() => {
      // console.log(`in computed signal for total bonus for skill ${this.Skill().Name}`);
      let rankBonus = 0;
      if (this.systemDataService.isNumber(this.rankBonusSignal())) {
        rankBonus = parseInt(this.rankBonusSignal());
      }
      // console.log(`Rank bonus is: ${rankBonus}`);

      let itemBonus = 0;
      if (this.systemDataService.isNumber(this.itemBonusSignal())) {
        itemBonus = parseInt(this.itemBonusSignal());
      }
      // console.log(`Item bonus is: ${itemBonus}`);

      let specialBonus2 = 0;
      if (this.Skill().HasInherentSpecialBonus) {
        specialBonus2 = this.Skill().InherentSpecialBonus;
      } else {
        if (this.systemDataService.isNumber(this.specialBonusSignal2())) {
          specialBonus2 = parseInt(this.specialBonusSignal2());
        }
      }

      let statBonus = 0;
      if (this.statTotalBonusSignal && this.systemDataService.isNumber(this.statTotalBonusSignal())) {
        statBonus = parseInt(this.statTotalBonusSignal());
      }

      let professionalBonus = 0;
      if (this.professionBonusSignal && this.systemDataService.isNumber(this.professionBonusSignal())) {
        professionalBonus = parseInt(this.professionBonusSignal());
      }

      const totalBonus = rankBonus + professionalBonus + itemBonus + statBonus + specialBonus2;
      //save values in state service, sine this computed signal will be called when basically any field values change
      this.context.SetCharacterSkillField(this.Skill(), totalBonus, SkillFieldType.TotalBonus);
      this.context.SetCharacterSkillField(this.Skill(), itemBonus, SkillFieldType.ItemBonus);
      this.context.SetCharacterSkillField(this.Skill(), rankBonus, SkillFieldType.RankBonus);
      return this.systemDataService.formatBonusPrefix(totalBonus);
    });
    // other spots will care about the total bonus of skills
    this.signalStore.AddSkillSignal(this.Skill(), SkillFieldType.TotalBonus, this.skillTotalBonusSignal);

    this.applySkillRankRestrictions();
  }

  applySkillRankRestrictions() {
    const skill = this.Skill();
    if (skill.HasMaximumNumberOfRanks) {
      this.showTwoPercentSkillRanks = false;
      // kill the checkboxes beyond those allowed
      for (let i: number = 0; i < 10; i++) {
        if (i + 1 > skill.MaximumNumberOfRanks) {
          this.fivePercentRankCheckboxes.controls[i].disable();
        }
      }
    }
  }

  getProfessionBonus(level: number, profession: Profession): number {
    let bonus = 0;
    if (profession && (level > 0)) {
      const skillCategory = this.Skill().SkillCategory;
      if (profession.SkillCategoryProfessionalBonuses) {
        profession.SkillCategoryProfessionalBonuses.forEach(skillCategoryProfessionalBonus => {
          if (skillCategoryProfessionalBonus.SkillCategory.Name == skillCategory.Name) {
            bonus = skillCategoryProfessionalBonus.BonusPerLevel * level;
          }
        });
      }

      if (profession.ParticularSkillProfessionalBonuses) {
        profession.ParticularSkillProfessionalBonuses.forEach(particularSkillProfessionalBonus => {
          if (particularSkillProfessionalBonus.Skill.Name == this.Skill().Name) {
            bonus = particularSkillProfessionalBonus.BonusPerLevel * level;
          }
        });
      }
    }
    console.log(`Professional bonus for ${this.Skill()} is ${bonus}`);
    return bonus;
  }

  executeRoll() {
    this.diceServie.executeRoll(this.context.GetCharacterName(), this.Skill().Name, this.Skill().SkillTypeAbbreviation, this.skillTotalBonusSignal())
  }
}
