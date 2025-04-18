import { Component, computed, effect, input, signal, Signal, WritableSignal } from '@angular/core';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { SystemDataService } from '../../types/services/system.data.service';
// import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ArmorType } from '../../types/models/ArmorType';
import { ArmorTypes } from '../../types/models/ArmorType';
import { SkillFieldType } from '../../types/models/SkillFieldType';
import { Skill } from '../../types/models/Skill';
import { toSignal } from '@angular/core/rxjs-interop';
import { CharacterSkill } from '../../types/models/CharacterSkill';
import { CharacterSheetSharedSignalStore } from '../../types/services/character-sheet-shared-signal.store';
import { AppSignalStore } from '../../types/services/app-signal.store';
import { DiceSet } from '../../types/models/DiceSet';
import { DiceService } from '../../types/services/dice.service';

@Component({
  selector: 'app-character-actions',
  imports: [ReactiveFormsModule],
  templateUrl: './character-actions.component.html',
  styleUrl: './character-actions.component.css'
})
export class CharacterActionsComponent {
  disabled = input.required<boolean>();
  bodyDevelopmentSignal: Signal<number>;
  mmSkills: Array<Skill>;
  mmSkillTotalBonusSignal: Signal<any>;
  mmSkillSignal: Signal<Skill>;
  armorTypeSignal: Signal<string>;
  movingManeuverSkillSignals: Array<Signal<any>> = new Array<Signal<any>>();
  currentDiceSetSignal: Signal<DiceSet>;
  universalRollModifierSignal: Signal<string>;

  armorTypeControl = new FormControl('');
  universalRollModifierControl = new FormControl('');



  allArmorTypes: Array<ArmorType>;

  constructor(protected context: CharacterSheetStateService,
    protected systemDataService: SystemDataService,
    protected appSignalStore: AppSignalStore,
    protected diceService: DiceService,
    protected characterSheetSignalStore: CharacterSheetSharedSignalStore
  ) {
    this.allArmorTypes = Object.values(ArmorTypes);
    this.mmSkills = this.systemDataService.GetSkillsByCategory("Movement And Maneuver");
    this.armorTypeSignal = toSignal(this.armorTypeControl.valueChanges);
    this.universalRollModifierSignal = toSignal(this.universalRollModifierControl.valueChanges);
    this.currentDiceSetSignal = this.appSignalStore.GetCurrentDiceSetSignal();
    this.bodyDevelopmentSignal = this.characterSheetSignalStore.GetTotalBonusSignalForSkill('Body Development');


    effect(() => {
      console.log('in effect to set the roll modifier');
      const bonusString = this.universalRollModifierSignal();
      if (this.systemDataService.isNumber(bonusString)) {
        let bonus = parseInt(bonusString);
        this.characterSheetSignalStore.GetUniversalRollModifierSignal().set(bonus);
      } else {
        this.characterSheetSignalStore.GetUniversalRollModifierSignal().set(0);
      }
    });
  }

  ngOnInit() {
    this.mmSkillTotalBonusSignal = computed(() => {
      let foundSkillSignal: WritableSignal<number>;
      let armorType = this.armorTypeSignal();
      this.mmSkills.forEach(skill => {
        if (this.armorTypeSignal() === skill.Name) {
          foundSkillSignal = this.characterSheetSignalStore.GetTotalBonusSignalForSkill(skill.Name);
        }
      });
      //  } else { return 0; }
      return this.systemDataService.formatBonusPrefix(foundSkillSignal());
    });

    this.armorTypeControl.setValue(ArmorTypes.NoArmor);
  }

  executeRoll() {
    console.log('do the fucking thing');
    this.diceService.executeRoll(this.context.GetCharacterName(), 'unmodified', 'd100', 0, this.characterSheetSignalStore.GetUniversalRollModifierSignal()());
  }

  clearBonus() {
    this.universalRollModifierControl.setValue('');
  }

}
