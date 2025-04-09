import { Component, effect, signal, Signal, WritableSignal } from '@angular/core';
import { SystemDataService } from '../../types/services/system.data.service';
import { CharacterDataService } from '../../types/services/character.data.service';
import { Character } from '../../types/models/Character';
import { RouterModule } from '@angular/router';
import { DiceService } from '../../types/services/dice.service';
import { DiceSet } from '../../types/models/DiceSet';
import { PreferenceDataService } from '../../types/services/preference.data.service';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { AppSignalStore } from '../../types/services/app-signal.store';

@Component({
  selector: 'app-character-manager',
  imports: [RouterModule],
  providers: [CharacterSheetStateService],
  templateUrl: './character-manager.component.html',
  styleUrl: './character-manager.component.css'
})
export class CharacterManagerComponent {
  characterListSignal: WritableSignal<Array<Character>>;
  currentDiceSetSignal: WritableSignal<DiceSet>;
  allCharacters: Array<Character> = new Array<Character>();
  allDiceSetsSignal: Signal<Array<DiceSet>>;

  constructor(private systemDataService: SystemDataService,
    private characterDataService: CharacterDataService,
    public diceService: DiceService,
    private appSignalStore: AppSignalStore,
    private preferenceDataService: PreferenceDataService
  ) {
    this.characterListSignal = signal([]);
    this.allDiceSetsSignal = this.appSignalStore.GetAllDiceSetsSignal();
    this.currentDiceSetSignal = this.appSignalStore.GetCurrentDiceSetSignal();
    console.log('sets:', this.allDiceSetsSignal());

    effect(() => {
      let sets = this.allDiceSetsSignal();
      console.log('sets there:', sets);
    });
  }

  ngOnInit() {
    console.log('sets here:', this.allDiceSetsSignal());
    this.allCharacters = this.characterDataService.getAllItems();
    this.characterListSignal.set(this.allCharacters);
  }

  public createNewCharacter() {
    let randomCharacterName = this.systemDataService.GetRandomCharacterName();
    let newCharacter = this.characterDataService.createNewCharacter(randomCharacterName);
    this.allCharacters.push(newCharacter);
    this.characterListSignal.set(this.allCharacters);

  }

  public setCurrentDiceSet(diceSet: DiceSet) {
    this.currentDiceSetSignal.set(diceSet);
    this.preferenceDataService.SetCurrentDiceSet(diceSet);
  }
}
