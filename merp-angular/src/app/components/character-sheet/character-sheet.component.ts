import { Component, signal, WritableSignal } from '@angular/core';
import { CharacterStatsComponent } from '../character-stats/character-stats.component';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';
import { CharacterSkillsComponent } from '../character-skills/character-skills.component';
import { CharacterEpithetComponent } from '../character-epithet/character-epithet.component';

@Component({
  selector: 'app-character-sheet',
  imports: [CharacterStatsComponent, CharacterSkillsComponent, CharacterEpithetComponent],
  providers: [CharacterSheetStateService, CharacterSheetSignalStore],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent {
  public locked: WritableSignal<boolean> = signal(false);

  constructor(protected context: CharacterSheetStateService,
    private route: ActivatedRoute,
    private router: Router,
    protected characterSheetStateService: CharacterSheetStateService
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
    // console.log('the loaded character was:', this.context.character);
  }
  public navigateToMyCharacters() {
    console.log('navvvvv');
    this.router.navigate(["/"]);
  }

  public toggleLock() {
    let currentValue = this.locked();
    this.locked.set(!currentValue);
  }

  public SaveCharacter() {
    this.characterSheetStateService.SaveCharacter();
  }
}
