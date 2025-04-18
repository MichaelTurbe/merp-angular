import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppSignalStore } from '../../types/services/app-signal.store';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-character-sheet-settings',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './character-sheet-settings.component.html',
  styleUrl: './character-sheet-settings.component.css'
})
export class CharacterSheetSettingsComponent {
  roll3dDiceControl = new FormControl(false);
  roll3dDiceSignal = toSignal(this.roll3dDiceControl.valueChanges);

  constructor(private appSignalStore: AppSignalStore) {

    effect(() => {
      let roll3dDice = this.roll3dDiceSignal();
      console.log('in effect to go set the roll3d in the signal store', roll3dDice);
      appSignalStore.Set3dDiceSignalValue(roll3dDice);
    });
  }

  ngOnInit() {
    this.roll3dDiceControl.setValue(this.appSignalStore.Get3dDiceSignal()());
  }
}
