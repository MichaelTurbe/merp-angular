import { Component, computed, Signal } from '@angular/core';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { SystemDataService } from '../../types/services/system.data.service';
import { KeyValue } from '../../types/utilities/key-value';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Race } from '../../types/models/Race';
import { SignalStore } from '../../types/services/signal-store';
import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';

@Component({
  selector: 'app-character-epithet',
  imports: [ReactiveFormsModule],
  templateUrl: './character-epithet.component.html',
  styleUrl: './character-epithet.component.css'
})
export class CharacterEpithetComponent {
  nameControl = new FormControl('');
  raceTypeControl = new FormControl([]);
  raceControl = new FormControl([]);
  nameSignal: Signal<any>;
  raceTypeSignal: Signal<any>;
  raceSignal: Signal<any>;
  availableRacesSignal: Signal<any>;
  allRaceTypes: Array<KeyValue>;
  count = 1;

  constructor(protected context: CharacterSheetStateService,
    protected systemDataService: SystemDataService,
    protected characterSheetSignalStore: CharacterSheetSignalStore
  ) {

    this.nameSignal = toSignal(this.nameControl.valueChanges);
    this.raceTypeSignal = toSignal(this.raceTypeControl.valueChanges);
    this.raceSignal = toSignal(this.raceControl.valueChanges);
    this.characterSheetSignalStore.AddRaceSignal(this.raceSignal);
    this.allRaceTypes = this.systemDataService.GetAllRaceTypes();

  }

  ngOnInit() {

    this.availableRacesSignal = computed(() => {
      let raceType = this.raceTypeSignal();
      console.log(`looking for ${raceType}`);
      let someRaces = new Array<Race>();
      someRaces = this.systemDataService.GetRacesByType(raceType);
      console.log('someRaces', someRaces);
      return someRaces;
    });

    //console.log(this.availableRacesSignal());



  }

}
