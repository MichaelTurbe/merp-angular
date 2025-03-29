import { Component, computed, input, Input, Signal } from '@angular/core';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { StatFieldType } from '../../types/models/StatFieldType';
import { Stat } from '../../types/models/Stat';
import { SystemDataService } from '../../types/services/system.data.service';
import { Race } from '../../types/models/Race';
import { CharacterStat } from '../../types/models/CharacterStat';
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
  // raceBonusControl = new FormControl('');
  // this will be an actual reference to the stat on the character
  characterStat: CharacterStat;

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

    // this.raceBonusSignal = this.signalStore.GetRaceSignal();
    // let raceBonusSignal = toSignal(
    //   this.raceBonusControl.valueChanges
    // );
    // this.raceBonusSignal = raceBonusSignal;

  }

  ngOnInit() {
    this.signalStore.AddStatSignal(this.Stat().Name, StatFieldType.Value, this.valueSignal);
    this.signalStore.AddStatSignal(this.Stat().Name, StatFieldType.RaceBonus, this.raceBonusSignal);
    // now set the initial values into their controls to trigger the stuff
    this.characterStat = this.context.GetCharacterStatByName(this.Stat().Name);
    // .log('got the stat for this character:', this.characterStat)
    this.valueControl.setValue(this.characterStat.Value.toString());
    // console.log(`setting the value of stat on load to:`, this.characterStat.Value)
    // if (this.context.GetCharacterStatByName(this.Stat().Name).RaceBonus > 0) {
    //   this.raceBonusControl.setValue(this.context.GetCharacterStatByName(this.Stat().Name).RaceBonus.toString());
    // }

    this.normalBonusSignal = computed(() => {
      const value = this.valueSignal();
      let bonus = 0;
      if (this.systemDataService.isNumber(value)) {
        this.characterStat.Value = value;
        bonus = this.systemDataService.CalculateNormalBonus(this.valueSignal());
      }
      // TODO - do this with setters in the state service
      // this.context.GetCharacterStatByName(this.Stat().Name).NormalBonus = bonus;
      // this.context.SetCharacterStatField(this.Stat(), bonus, StatFieldType.NormalBonus);

      // this.context.AutoSaveItem();
      return this.systemDataService.formatBonusPrefix(bonus);
    });
    this.signalStore.AddStatSignal(this.Stat().Name, StatFieldType.NormalBonus, this.normalBonusSignal);

    this.raceBonusSignal = computed(() => {
      const raceSignal = this.signalStore.GetRaceSignal();
      const race: Race = raceSignal();
      // console.log('race selected elsewhere:', race);
      if (race) {
        let raceBonus = this.getRaceBonusForThisStat(race);
        this.characterStat.RaceBonus = raceBonus;
        return this.systemDataService.formatBonusPrefix(raceBonus);
      } else {
        return 0;
      }
    });

    this.totalBonusSignal = computed(() => {
      let normalBonus = 0;
      if (this.systemDataService.isNumber(this.normalBonusSignal())) {
        normalBonus = parseInt(this.normalBonusSignal());
      }

      let raceBonus = 0;
      if (this.systemDataService.isNumber(this.raceBonusSignal())) {
        raceBonus = parseInt(this.raceBonusSignal());
      }

      const totalBonus = normalBonus + raceBonus;
      // this.context.SetCharacterStatField(this.Stat(), raceBonus, StatFieldType.RaceBonus);
      // this.context.SetCharacterStatField(this.Stat(), totalBonus, StatFieldType.TotalBonus);
      this.characterStat.TotalBonus = totalBonus;
      return this.systemDataService.formatBonusPrefix(totalBonus);
    });

    this.signalStore.AddStatSignal(this.Stat().Name, StatFieldType.TotalBonus, this.totalBonusSignal);
  }

  getRaceBonusForThisStat(race: Race) {
    let bonus = 0;
    console.log('found race:', race);
    if (race) {
      let statBonuses = race.StatBonuses;
      statBonuses.forEach(statBonus => {
        if (this.Stat().Name === statBonus.Stat.Name) {
          bonus = statBonus.Bonus;
        }
      });
    }
    return bonus;
  }
}
