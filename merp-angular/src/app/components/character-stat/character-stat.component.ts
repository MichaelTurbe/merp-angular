import { Component, computed, input, Input, Signal } from '@angular/core';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { StatFieldType } from '../../types/models/StatFieldType';
import { Stat } from '../../types/models/Stat';
import { SystemDataService } from '../../types/services/system.data.service';
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

  valueSignal: Signal<any>;
  raceBonusSignal: Signal<any>;
  normalBonusSignal: Signal<any>;
  totalBonusSignal: Signal<any>;

  constructor(protected context: CharacterSheetStateService,
    protected signalStore: CharacterSheetSignalStore,
    protected systemDataService: SystemDataService
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
    this.signalStore.AddStatSignal(this.Stat().Name, StatFieldType.Value, this.valueSignal);
    this.signalStore.AddStatSignal(this.Stat().Name, StatFieldType.RaceBonus, this.raceBonusSignal);
    // now set the initial values into their controls to trigger the stuff
    this.valueControl.setValue(this.context.GetCharacterStatByName(this.Stat().Name).Value.toString());
    if (this.context.GetCharacterStatByName(this.Stat().Name).RaceBonus > 0) {
      this.raceBonusControl.setValue(this.context.GetCharacterStatByName(this.Stat().Name).RaceBonus.toString());
    }

    this.normalBonusSignal = computed(() => {
      const value = this.valueSignal();
      let bonus = 0;
      if (this.systemDataService.isNumber(value)) {
        bonus = this.systemDataService.CalculateNormalBonus(this.valueSignal());
      }
      // TODO - do this with setters in the state service
      // this.context.GetCharacterStatByName(this.Stat().Name).NormalBonus = bonus;
      this.context.SetCharacterStatField(this.Stat(), bonus, StatFieldType.NormalBonus);
      // this.context.AutoSaveItem();
      return this.systemDataService.formatBonusPrefix(bonus);
    });
    this.signalStore.AddStatSignal(this.Stat().Name, StatFieldType.NormalBonus, this.normalBonusSignal);

    this.totalBonusSignal = computed(() => {
      //const valueSignal = this.characterSheetSignalStore.GetStatSignal(stat, StatFieldType.Value);
      let normalBonus = 0;
      if (this.systemDataService.isNumber(this.normalBonusSignal())) {
        normalBonus = parseInt(this.normalBonusSignal());
      }

      let raceBonus = 0;
      if (this.systemDataService.isNumber(this.raceBonusSignal())) {
        raceBonus = parseInt(this.raceBonusSignal());
      }

      const totalBonus = normalBonus + raceBonus;
      this.context.SetCharacterStatField(this.Stat(), raceBonus, StatFieldType.RaceBonus);
      this.context.SetCharacterStatField(this.Stat(), totalBonus, StatFieldType.TotalBonus);
      return this.systemDataService.formatBonusPrefix(totalBonus);
    });

    this.signalStore.AddStatSignal(this.Stat().Name, StatFieldType.TotalBonus, this.totalBonusSignal);
  }
}
