import { Component } from '@angular/core';
import { CharacterStatsComponent } from '../character-stats/character-stats.component';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-sheet',
  imports: [CharacterStatsComponent],
  providers: [CharacterSheetStateService],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent {
  constructor(protected context: CharacterSheetStateService,
    private route: ActivatedRoute
  ) {
    //TODO - note that these things will have to happen in 
    // a guard for anything to work
    const characterId = this.route.snapshot.params['characterId'];
    if (characterId) {
      console.log(`CharacterId: ${characterId}`);
      if (characterId == '0') {
        this.context.createNewCharacter();
      } else {
        this.context.loadCharacter(characterId);
      }
    }
    console.log('the loaded character was:', this.context.character);
  }
}
