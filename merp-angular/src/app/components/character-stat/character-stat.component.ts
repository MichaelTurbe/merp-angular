import { Component, input, Input, Signal } from '@angular/core';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { StatFieldType } from '../../types/models/StatFieldType';
import { Stat } from '../../types/models/Stat';
@Component({
  selector: 'app-character-stat',
  imports: [ReactiveFormsModule],
  templateUrl: './character-stat.component.html',
  styleUrl: './character-stat.component.css'
})
export class CharacterStatComponent {
  // this is the new way of doing things for inputs
  Stat = input.required<Stat>();
  valueControl = new FormControl('');
  bonusControl = new FormControl('');
  raceBonusControl = new FormControl('');
  valueSignal!: Signal<any>;
  raceBonusSignal!: Signal<any>;
  normalBonusSignal!: Signal<any>;
  totalBonusSignal!: Signal<any>;

  constructor(private context: CharacterSheetStateService,
    protected signalStore: CharacterSheetSignalStore
  ) {
    let valueSignal = toSignal(
      this.valueControl.valueChanges
    );
    this.valueSignal = valueSignal;
    

    let raceBonusSignal = toSignal(
      this.raceBonusControl.valueChanges
    );
    this.raceBonusSignal = raceBonusSignal;

  }

  ngOnInit() {
    this.normalBonusSignal = this.signalStore.GetStatSignal(this.Stat().Name, StatFieldType.NormalBonus);
    this.totalBonusSignal = this.signalStore.GetStatSignal(this.Stat().Name, StatFieldType.TotalBonus);

    this.signalStore.AddStatSignal(this.Stat().Name, StatFieldType.Value, this.valueSignal);
    this.signalStore.AddStatSignal(this.Stat().Name, StatFieldType.RaceBonus, this.raceBonusSignal);
    // now set the initial values into their controls to trigger the stuff
    this.valueControl.setValue(this.context.GetCharacterStatByName(this.Stat().Name).Value.toString());
    this.raceBonusControl.setValue(this.context.GetCharacterStatByName(this.Stat().Name).RaceBonus.toString());
  }
}
