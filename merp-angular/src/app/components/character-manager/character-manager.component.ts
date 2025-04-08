import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { SystemDataService } from '../../types/services/system.data.service';
import { CharacterDataService } from '../../types/services/character.data.service';
import { Character } from '../../types/models/Character';
import { RouterModule } from '@angular/router';
import { DiceService } from '../../types/services/dice.service';

@Component({
  selector: 'app-character-manager',
  imports: [RouterModule],
  templateUrl: './character-manager.component.html',
  styleUrl: './character-manager.component.css'
})
export class CharacterManagerComponent {
  characterListSignal: WritableSignal<Array<Character>>;
  allCharacters: Array<Character> = new Array<Character>();

  constructor(private systemDataService: SystemDataService,
    private characterDataService: CharacterDataService,
    public diceService: DiceService
  ) {
    this.characterListSignal = signal([]);
  }

  ngOnInit() {
    this.allCharacters = this.characterDataService.getAllItems();
    this.characterListSignal.set(this.allCharacters);
  }

  public createNewCharacter() {
    let randomCharacterName = this.systemDataService.GetRandomCharacterName();
    let newCharacter = this.characterDataService.createNewCharacter(randomCharacterName);
    this.allCharacters.push(newCharacter);
    this.characterListSignal.set(this.allCharacters);

  }
}
