import { Component, computed, effect, input, signal, Signal, WritableSignal } from '@angular/core';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { SystemDataService } from '../../types/services/system.data.service';
import { KeyValue } from '../../types/utilities/key-value';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Race } from '../../types/models/Race';

// import { SignalStore } from '../../types/services/signal-store';
// import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';
import { Profession } from '../../types/models/Profession';
import { CharacterSheetSharedSignalStore } from '../../types/services/character-sheet-shared-signal.store';
import { CharacterEpithetData } from '../../types/models/CharacterEpithetData';

@Component({
  selector: 'app-character-epithet',
  imports: [ReactiveFormsModule],
  templateUrl: './character-epithet.component.html',
  styleUrl: './character-epithet.component.css'
})
export class CharacterEpithetComponent {
  disabled = input.required<boolean>();
  nameControl = new FormControl('');
  raceTypeControl = new FormControl([]);
  raceControl = new FormControl([]);
  levelControl = new FormControl(0);
  professionControl = new FormControl([]);
  xpControl = new FormControl(0);
  weightControl = new FormControl('');
  heightControl = new FormControl('');
  hairControl = new FormControl('');
  eyesControl = new FormControl('');
  demeanorControl = new FormControl('');

  nameSignal: Signal<any>;
  characterNameSignal: Signal<any>;
  raceTypeSignal: Signal<any>;
  raceNameSignal: Signal<any>;
  raceSignal: Signal<any>;
  availableRacesSignal: Signal<any>;
  levelStringSignal: Signal<any>;
  professionNameSignal: Signal<any>;
  professionSignal: Signal<any>;
  xpSignal: Signal<any>;
  weightSignal: Signal<any>;
  heightSignal: Signal<any>;
  hairSignal: Signal<any>;
  eyesSignal: Signal<any>;
  demeanorSignal: Signal<any>;

  allRaceTypes: Array<KeyValue>;
  allProfessions: Array<Profession>;

  constructor(protected context: CharacterSheetStateService,
    protected systemDataService: SystemDataService
  ) {

    this.nameSignal = toSignal(this.nameControl.valueChanges);
    this.raceTypeSignal = toSignal(this.raceTypeControl.valueChanges);
    this.raceNameSignal = toSignal(this.raceControl.valueChanges);
    this.levelStringSignal = toSignal(this.levelControl.valueChanges);
    this.professionNameSignal = toSignal(this.professionControl.valueChanges);
    this.xpSignal = toSignal(this.xpControl.valueChanges);
    this.weightSignal = toSignal(this.weightControl.valueChanges);
    this.heightSignal = toSignal(this.heightControl.valueChanges);
    this.hairSignal = toSignal(this.hairControl.valueChanges);
    this.eyesSignal = toSignal(this.eyesControl.valueChanges);
    this.demeanorSignal = toSignal(this.demeanorControl.valueChanges);


    this.allRaceTypes = this.systemDataService.GetAllRaceTypes();
    this.allProfessions = this.systemDataService.GetAllProfessions();

    effect(() => {
      let xpString = this.xpSignal();
      let Xp: number = 0;
      if (this.systemDataService.isNumber(xpString)) {
        Xp = parseInt(xpString);
      }
      let weightString = this.weightSignal();
      let Weight = 0;
      if (this.systemDataService.isNumber(weightString)) {
        Weight = parseInt(weightString);
      }
      let Height = this.heightSignal();
      let Hair = this.hairSignal();
      let Eyes = this.eyesSignal();
      let Demeanor = this.demeanorSignal();
      this.context.SetCharacterEpithetData({ Xp, Weight, Height, Hair, Eyes, Demeanor } as CharacterEpithetData);
    });

    effect(() => {
      const levelString = this.levelStringSignal();
      if (this.systemDataService.isNumber(levelString)) {
        let levelNumber = parseInt(levelString);
        this.context.SetCharacterLevel(levelNumber);
      }

    });

    effect(() => {
      const name = this.nameSignal();
      this.context.SetCharacterName(name);
    });

    effect(() => {
      const profession = this.professionSignal();
      this.context.SetCharacterProfession(profession);
    });

    effect(() => {
      const race = this.raceSignal();
      this.context.SetCharacterRace(race);
    });

    effect(() => {
      let lock = this.disabled();
      if (lock) {
        this.nameControl.disable();
        this.raceTypeControl.disable();
        this.raceControl.disable();
        this.levelControl.disable();
        this.professionControl.disable();
      } else {
        this.nameControl.enable();
        this.raceTypeControl.enable();
        this.raceControl.enable();
        this.levelControl.enable();
        this.professionControl.enable();
      }
    });

  }

  ngOnInit() {
    this.setControlValues();
    this.availableRacesSignal = computed(() => {
      let raceType = this.raceTypeSignal();
      let someRaces = new Array<Race>();
      someRaces = this.systemDataService.GetRacesByType(raceType);
      return someRaces;
    });

    this.raceSignal = computed(() => {
      const raceName = this.raceNameSignal();
      if (raceName) {
        const race = this.systemDataService.GetRaceByName(raceName);
        // this.context.SetCharacterRace(race);
        return race;
      } else {
        return null;
      }
    });

    this.professionSignal = computed(() => {
      let professionName = this.professionNameSignal();
      let profession = this.systemDataService.GetProfessionByName(professionName);
      return profession;
    });
  }

  private setControlValues() {
    const characterName = this.context.GetCharacterName();
    if (characterName) {
      this.nameControl.setValue(characterName);
    }

    const race: Race = this.context.GetCharacterRace();
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

    const characterEpithetData = this.context.GetCharacterEpithetData();
    this.xpControl.setValue(characterEpithetData.Xp);
    this.weightControl.setValue(characterEpithetData.Weight.toString());
    this.heightControl.setValue(characterEpithetData.Height);
    this.hairControl.setValue(characterEpithetData.Hair);
    this.eyesControl.setValue(characterEpithetData.Eyes);
    this.demeanorControl.setValue(characterEpithetData.Demeanor);

  }



}
