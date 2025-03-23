import { Component, input } from '@angular/core';
import { Skill } from '../../types/models/Skill';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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

  twoPercentRankCheckboxes: Array<FormControl> = new Array<FormControl>();
  twoPercentRankCheckbox1 = new FormControl(false);
  twoPercentRankCheckbox2 = new FormControl(false);
  twoPercentRankCheckbox3 = new FormControl(false);
  twoPercentRankCheckbox4 = new FormControl(false);
  twoPercentRankCheckbox5 = new FormControl(false);

  constructor() {
    this.gatherCheckBoxControls();
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
}
