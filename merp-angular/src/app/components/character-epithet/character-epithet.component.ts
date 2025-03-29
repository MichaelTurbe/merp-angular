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
  characterNameSignal: Signal<any>;
  raceTypeSignal: Signal<any>;
  raceNameSignal: Signal<any>;
  raceSignal: Signal<any>;
  availableRacesSignal: Signal<any>;
  allRaceTypes: Array<KeyValue>;
  count = 1;

  constructor(protected context: CharacterSheetStateService,
    protected systemDataService: SystemDataService,
    protected characterSheetSignalStore: CharacterSheetSignalStore,
    protected characterSheetStateService: CharacterSheetStateService
  ) {

    this.nameSignal = toSignal(this.nameControl.valueChanges);
    this.raceTypeSignal = toSignal(this.raceTypeControl.valueChanges);
    this.raceNameSignal = toSignal(this.raceControl.valueChanges);
    this.allRaceTypes = this.systemDataService.GetAllRaceTypes();

  }

  ngOnInit() {
    const characterName = this.context.GetCharacterName();
    if (characterName) {
      this.nameControl.setValue(characterName);
    }


    // get the character's race and set it on the sheet if 
    // it exists:
    const race: Race = this.context.GetCharacterRace();
    console.log('trying to load race:', race);
    if (race) {
      if (race.Human) {
        this.raceTypeControl.setValue(["Human"]);
      } else {
        this.raceTypeControl.setValue(["Nonhuman"]);
      }

      this.raceControl.setValue([race.Name]);
    }

    this.availableRacesSignal = computed(() => {
      let raceType = this.raceTypeSignal();
      console.log(`looking for ${raceType}`);
      let someRaces = new Array<Race>();
      someRaces = this.systemDataService.GetRacesByType(raceType);
      console.log('someRaces', someRaces);
      return someRaces;
    });

    //console.log(this.availableRacesSignal());

    this.raceSignal = computed(() => {
      const raceName = this.raceNameSignal();
      console.log(`race name changed to ${raceName}`);
      if (raceName) {
        const race = this.systemDataService.GetRaceByName(raceName);
        this.context.SetCharacterRace(race);
        return race;
      } else {
        return null;
      }
    });

    this.characterNameSignal = computed(() => {
      console.log('CHANGE THE NAME');
      const name = this.nameSignal();
      console.log(`name changed to ${name}`);

      this.characterSheetStateService.SetCharacterName(name);
      if (name) {
        return name;
      } else {
        return '';
      }
    });

    // this.characterSheetSignalStore.AddNameSignal(this.characterNameSignal);
    this.characterSheetSignalStore.AddRaceSignal(this.raceSignal);


  }

  public SaveCharacter() {
    this.characterSheetStateService.SaveCharacter();
  }

}
