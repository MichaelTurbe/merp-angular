import { Component, Input, Signal } from '@angular/core';
import { StatName } from '../../types/models/StatName';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { FormControl } from '@angular/forms';
import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { StatFieldType } from '../../types/models/StatFieldType';
@Component({
  selector: 'app-character-stat',
  imports: [],
  templateUrl: './character-stat.component.html',
  styleUrl: './character-stat.component.css'
})
export class CharacterStatComponent {
  @Input() StatName: StatName = StatName.Strength;
  valueControl = new FormControl('');
  bonusControl = new FormControl('');
  raceBonusControl = new FormControl('');
  valueSignal!: Signal<any>;
  raceBonusSignal!: Signal<any>;
  normalBonusSignal!: Signal<any>;
  totalBonusSignal!: Signal<any>

  constructor(private context: CharacterSheetStateService,
    protected signalStore: CharacterSheetSignalStore
  ) {
    console.log(this.StatName);

    this.normalBonusSignal = this.signalStore.GetStatSignal(this.StatName, StatFieldType.NormalBonus);
    this.totalBonusSignal = this.signalStore.GetStatSignal(this.StatName, StatFieldType.TotalBonus);

    let valueSignal = toSignal(
      this.valueControl.valueChanges
    );
    this.valueSignal = valueSignal;
    this.signalStore.AddStatSignal(this.StatName, StatFieldType.Value, valueSignal);

    let raceBonusSignal = toSignal(
      this.raceBonusControl.valueChanges
    );
    this.raceBonusSignal = raceBonusSignal;
    this.signalStore.AddStatSignal(this.StatName, StatFieldType.RaceBonus, raceBonusSignal);
  }

  ngOnInit() {
    // now set the initial values into their controls to trigger the stuff
    this.valueControl.setValue(this.context.character[this.StatName].Value.toString());
    this.raceBonusControl.setValue(this.context.character[this.StatName].RaceBonus.toString());
  }
}
