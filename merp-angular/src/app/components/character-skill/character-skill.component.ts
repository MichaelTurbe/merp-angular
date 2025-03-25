import { Component, computed, input, Signal } from '@angular/core';
import { Skill } from '../../types/models/Skill';
import { FormControl, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SkillFieldType } from '../../types/models/SkillFieldType';
import { StatFieldType } from '../../types/models/StatFieldType';
import { SystemDataService } from '../../types/services/system.data.service';

@Component({
  selector: 'app-character-skill',
  imports: [ReactiveFormsModule],
  templateUrl: './character-skill.component.html',
  styleUrl: './character-skill.component.css'
})
export class CharacterSkillComponent {
  Skill = input.required<Skill>();
  fivePercentRankCheckboxes: FormArray = new FormArray<FormControl>([]);
  showTwoPercentSkillRanks = true;
  statTotalBonusSignal: Signal<any>;
  skillTotalBonusSignal: Signal<any>;

  itemBonusControl = new FormControl('');
  itemBonusSignal!: Signal<any>;

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

  twoPercentRankCheckboxes: Array<FormControl> = new Array<FormControl>();
  twoPercentRankCheckbox1 = new FormControl(false);
  twoPercentRankCheckbox2 = new FormControl(false);
  twoPercentRankCheckbox3 = new FormControl(false);
  twoPercentRankCheckbox4 = new FormControl(false);
  twoPercentRankCheckbox5 = new FormControl(false);

  valueSignal: Signal<any>;
  rankBonusSignal: Signal<any>;

  constructor(protected signalStore: CharacterSheetSignalStore,
    protected context: CharacterSheetStateService,
    protected systemDataService: SystemDataService
  ) {
    this.gatherCheckBoxControls();
    console.log(`there are ${this.fivePercentRankCheckboxes.length} 5% checkboxes`);

    this.fivePercentRankCheckboxes.controls.forEach(control => {
      console.log('yo should be 10 of these');
      let fivePercentRankCheckSignal = toSignal(
        control.valueChanges
      );

      this.fivePercentRankSignals.push(fivePercentRankCheckSignal);
      console.log("adding fivePercentRank signal to array");
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
    this.statTotalBonusSignal = this.signalStore.GetStatSignal(this.Skill().Stat.Name, StatFieldType.TotalBonus);
    console.log("the stat total bonus:", this.statTotalBonusSignal());

    this.rankBonusSignal = computed(() => {
      console.log(`in computed signal for rank bonus for skill ${this.Skill().Name}`);
      let rankBonus = 0;
      const rankSignals = this.fivePercentRankSignals;
      console.log(`Found ${rankSignals.length} rank signals for ${this.Skill().Name}`);
      rankSignals.forEach(rankSignal => {
        const checked = rankSignal();
        if (checked) {
          rankBonus = rankBonus + 5;
        }
        console.log('value of checked signal:', checked);
      });

      // TODO save the value in the state service?
      console.log(`came up with a rank bonus of ${rankBonus}`);
      return `+${rankBonus}`;
    });

    this.skillTotalBonusSignal = computed(() => {
      let rankBonus = 0;
      if (this.systemDataService.isNumber(this.rankBonusSignal())) {
        rankBonus = parseInt(this.rankBonusSignal());
      }
      console.log(`Rank bonus is: ${rankBonus}`);
      let itemBonus = 0;
      if (this.systemDataService.isNumber(this.itemBonusSignal())) {
        itemBonus = parseInt(this.itemBonusSignal());
      }
      console.log(`Item bonus is: ${itemBonus}`);

      let specialBonus2 = 0;
      if (this.Skill().HasInherentSpecialBonus) {
        specialBonus2 = this.Skill().InherentSpecialBonus;
      } else {
        if (this.systemDataService.isNumber(this.specialBonusSignal2())) {
          specialBonus2 = parseInt(this.specialBonusSignal2());
        }
      }

      let statBonus = 0;
      if (this.systemDataService.isNumber(this.statTotalBonusSignal())) {
        statBonus = parseInt(this.statTotalBonusSignal());
      }
      console.log(`Stat bonus is: ${statBonus}`);

      const totalBonus = rankBonus + itemBonus + statBonus + specialBonus2;
      return this.systemDataService.formatBonusPrefix(totalBonus);
    });
    this.signalStore.AddSkillSignal(this.Skill(), SkillFieldType.TotalBonus, this.skillTotalBonusSignal);

    this.applySkillRestrictions();

    if (this.Skill().HasInherentSpecialBonus) {
      this.specialBonusControl2.setValue(this.Skill().InherentSpecialBonus.toString());
      this.specialBonusControl2.disable();
    }
  }

  applySkillRestrictions() {
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
}
