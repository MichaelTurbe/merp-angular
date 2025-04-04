import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { CharacterStatsComponent } from '../character-stats/character-stats.component';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';
import { CharacterSkillsComponent } from '../character-skills/character-skills.component';
import { CharacterEpithetComponent } from '../character-epithet/character-epithet.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-character-sheet',
  imports: [CharacterStatsComponent, CharacterSkillsComponent,
    CharacterEpithetComponent, ReactiveFormsModule],
  providers: [CharacterSheetStateService, CharacterSheetSignalStore],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent {
  public locked: WritableSignal<boolean> = signal(false);
  public toggleEpithetSignal: Signal<boolean>;
  public showEpithetSignal: Signal<boolean>;
  public showStats: WritableSignal<boolean> = signal(true);
  public showFullSkills: WritableSignal<boolean> = signal(true);
  public showEpithetControl = new FormControl(true);

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

    this.toggleEpithetSignal = toSignal(
      this.showEpithetControl.valueChanges
    );
  }

  ngOnInit() {
    this.showEpithetControl.setValue(true);
    this.showEpithetSignal = computed(() => {
      const show = this.toggleEpithetSignal();
      return show;
    });
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
