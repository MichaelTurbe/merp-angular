import { Component, computed, effect, Signal } from '@angular/core';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { SystemDataService } from '../../types/services/system.data.service';
import { KeyValue } from '../../types/utilities/key-value';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Race } from '../../types/models/Race';

import { SignalStore } from '../../types/services/signal-store';
import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';
import { Profession } from '../../types/models/Profession';

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
  levelControl = new FormControl(0);
  nameSignal: Signal<any>;
  characterNameSignal: Signal<any>;
  raceTypeSignal: Signal<any>;
  raceNameSignal: Signal<any>;
  raceSignal: Signal<any>;
  availableRacesSignal: Signal<any>;
  levelSignal: Signal<number>;
  professionNameSignal: Signal<any>;
  professionSignal: Signal<any>;
  professionControl = new FormControl([]);

  allRaceTypes: Array<KeyValue>;
  allProfessions: Array<Profession>;

  constructor(protected context: CharacterSheetStateService,
    protected systemDataService: SystemDataService,
    protected characterSheetSignalStore: CharacterSheetSignalStore,
    protected characterSheetStateService: CharacterSheetStateService
  ) {

    this.nameSignal = toSignal(this.nameControl.valueChanges);
    this.raceTypeSignal = toSignal(this.raceTypeControl.valueChanges);
    this.raceNameSignal = toSignal(this.raceControl.valueChanges);
    this.levelSignal = toSignal(this.levelControl.valueChanges);
    this.professionNameSignal = toSignal(this.professionControl.valueChanges);

    this.allRaceTypes = this.systemDataService.GetAllRaceTypes();
    this.allProfessions = this.systemDataService.GetAllProfessions();



    effect(() => {
      console.log(`in the set level effect`);
      const level = this.levelSignal();
      console.log(`the level is ${level}`)
      this.characterSheetStateService.SetCharacterLevel(level);
    });



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

    const profession: Profession = this.context.GetCharacterProfession();
    if (profession) {
      this.professionControl.setValue([profession.Name]);
    }

    const level = this.context.GetCharacterLevel();
    if (level) {
      this.levelControl.setValue(level);
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

    this.professionSignal = computed(() => {
      let professionName = this.professionNameSignal();
      let profession = this.systemDataService.GetProfessionByName(professionName);
      if (profession) {
        this.context.SetCharacterProfession(profession);
      }
      return profession;
    });

    this.characterSheetSignalStore.AddLevelSignal(this.levelSignal);
    this.characterSheetSignalStore.AddNameSignal(this.characterNameSignal);
    this.characterSheetSignalStore.AddRaceSignal(this.raceSignal);
    this.characterSheetSignalStore.AddProfessionSignal(this.professionSignal);
  }

  public SaveCharacter() {
    this.characterSheetStateService.SaveCharacter();
  }

}
