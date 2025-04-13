import { Component, computed, input, Signal } from '@angular/core';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { SystemDataService } from '../../types/services/system.data.service';
import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ArmorType } from '../../types/models/ArmorType';
import { ArmorTypes } from '../../types/models/ArmorType';
import { SkillFieldType } from '../../types/models/SkillFieldType';
import { Skill } from '../../types/models/Skill';
import { toSignal } from '@angular/core/rxjs-interop';
import { CharacterSkill } from '../../types/models/CharacterSkill';

@Component({
  selector: 'app-character-actions',
  imports: [ReactiveFormsModule],
  templateUrl: './character-actions.component.html',
  styleUrl: './character-actions.component.css'
})
export class CharacterActionsComponent {
  disabled = input.required<boolean>();
  mmSkills: Array<Skill>;
  mmSkillTotalBonusSignal: Signal<any>;
  mmSkillSignal: Signal<Skill>;
  armorTypeSignal: Signal<any>;
  movingManeuverSkillSignals: Array<Signal<any>> = new Array<Signal<any>>();

  armorTypeControl = new FormControl([]);



  allArmorTypes: Array<ArmorType>;

  constructor(protected context: CharacterSheetStateService,
    protected systemDataService: SystemDataService,
    protected characterSheetSignalStore: CharacterSheetSignalStore
  ) {
    this.allArmorTypes = Object.values(ArmorTypes);
    console.log('all armor types is:', this.allArmorTypes);
    this.mmSkills = this.systemDataService.GetSkillsByCategory("Movement And Maneuver");
    console.log('mmSkills is:', this.mmSkills);
    this.armorTypeSignal = toSignal(this.armorTypeControl.valueChanges);


  }

  ngOnInit() {
    // this.mmSkillTotalBonusSignal = computed(() => {
    //   let foundSkillSignal: Signal<CharacterSkill>;
    //   let armorType = this.armorTypeSignal() as Array<string>;
    //   if (armorType.length > 0) {
    //     console.log(`selected armor type is:`, armorType[0]);
    //     this.mmSkills.forEach(skill => {
    //       if (this.armorTypeSignal() === skill.Name) {
    //         console.log('Skill is:', skill);
    //         foundSkillSignal = this.characterSheetSignalStore.GetSkillSignal(skill, SkillFieldType.TotalBonus);
    //       }
    //     });
    //   }
    //   return foundSkillSignal().TotalBonus;
    // });

    // this.mmSkillSignal = computed(() => {
    //   let foundSkill: Skill = null;
    //   this.mmSkills.forEach(skill => {
    //     console.log('Skill is:', skill);
    //     let armorType = this.armorTypeSignal();
    //     console.log('armor type is:', armorType);
    //     if (armorType === skill.Name) {
    //       foundSkill = skill;
    //     }
    //   });
    //   return foundSkill;
    // });

    this.armorTypeControl.setValue([ArmorTypes.NoArmor]);


  }

}
