import { Component, input, Signal } from '@angular/core';
import { Skill } from '../../types/models/Skill';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-character-skill',
  imports: [ReactiveFormsModule],
  templateUrl: './character-skill.component.html',
  styleUrl: './character-skill.component.css'
})
export class CharacterSkillComponent {
  Skill = input.required<Skill>();
  fivePercentRankCheckboxes: Array<FormControl> = new Array<FormControl>();
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

  valueSignal!: Signal<any>;

  constructor(protected signalStore: CharacterSheetSignalStore,
    protected context: CharacterSheetStateService
  ) {
    this.gatherCheckBoxControls();
    console.log(`there are ${this.fivePercentRankCheckboxes.length} 5% checkboxes`);

    this.fivePercentRankCheckboxes.forEach(control =>  {
      let fivePercentRankCheckSignal = toSignal(
        control.valueChanges
      );

      this.fivePercentRankSignals.push(fivePercentRankCheckSignal);
      console.log("adding fivePercentRank signal to array");
    });
  }

  gatherCheckBoxControls() {
    this.fivePercentRankCheckboxes.push(this.fivePercentRankCheckbox1);
    this.fivePercentRankCheckboxes.push(this.fivePercentRankCheckbox2);
    this.fivePercentRankCheckboxes.push(this.fivePercentRankCheckbox3);
    this.fivePercentRankCheckboxes.push(this.fivePercentRankCheckbox4);
    this.fivePercentRankCheckboxes.push(this.fivePercentRankCheckbox5);
    this.fivePercentRankCheckboxes.push(this.fivePercentRankCheckbox6);
    this.fivePercentRankCheckboxes.push(this.fivePercentRankCheckbox7);
    this.fivePercentRankCheckboxes.push(this.fivePercentRankCheckbox8);
    this.fivePercentRankCheckboxes.push(this.fivePercentRankCheckbox9);
    this.fivePercentRankCheckboxes.push(this.fivePercentRankCheckbox10);

    this.twoPercentRankCheckboxes.push(this.twoPercentRankCheckbox1);
    this.twoPercentRankCheckboxes.push(this.twoPercentRankCheckbox2);
    this.twoPercentRankCheckboxes.push(this.twoPercentRankCheckbox3);
    this.twoPercentRankCheckboxes.push(this.twoPercentRankCheckbox4);
    this.twoPercentRankCheckboxes.push(this.twoPercentRankCheckbox5);
  }

  ngOnInit() {
    for (let i: number = 0; i < this.fivePercentRankSignals.length; i++) {
      console.log(`Adding a signal for a 5% rank signal for the skill ${this.Skill().Name} to the store`);
      this.signalStore.AddFivePercentSkillRankSignal(this.Skill(), i, this.fivePercentRankSignals[i]);
    }
  }
}
