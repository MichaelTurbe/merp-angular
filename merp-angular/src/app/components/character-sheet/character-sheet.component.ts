import { Component, computed, Inject, Signal, signal, WritableSignal } from '@angular/core';
import { CharacterStatsComponent } from '../character-stats/character-stats.component';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';
import { CharacterSkillsComponent } from '../character-skills/character-skills.component';
import { CharacterEpithetComponent } from '../character-epithet/character-epithet.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { CharacterInventoryComponent } from '../character-inventory/character-inventory.component';
import { DOCUMENT } from '@angular/common';
import { ThreeDDice, IApiResponse, ITheme, IRoll, ThreeDDiceRollEvent, DiceEventCallback, RollEventCallback, IDiceRollOptions, IDiceRoll, DiceEvent } from 'dddice-js';
import { DiceService } from '../../types/services/dice.service';
import { ToastService } from '../../types/services/toast.service';


@Component({
  selector: 'app-character-sheet',
  imports: [CharacterStatsComponent, CharacterSkillsComponent,
    CharacterEpithetComponent, ReactiveFormsModule, CharacterInventoryComponent],
  providers: [CharacterSheetStateService, CharacterSheetSignalStore],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent {
  disabled: WritableSignal<boolean> = signal<boolean>(false);

  public locked: WritableSignal<boolean> = signal(false);


  constructor(@Inject(DOCUMENT) private document: Document,
    protected context: CharacterSheetStateService,
    protected diceService: DiceService,
    private route: ActivatedRoute,
    private router: Router,
    protected characterSheetStateService: CharacterSheetStateService,
    protected toastService: ToastService
  ) {
    this.disabled.set(false);

    const characterId = this.route.snapshot.params['characterId'];
    if (characterId) {
      console.log(`CharacterId: ${characterId}`);
      if (characterId == '0') {
        this.context.createNewCharacter();
      } else {
        this.context.loadCharacter(characterId);
      }
    }


  }

  ngOnInit() {

  }

  public navigateToMyCharacters() {
    console.log('navvvvv');
    this.router.navigate(["/"]);
  }

  public toggleLock() {
    let currentValue = this.locked();
    this.locked.set(!currentValue);
    let currentlyDisabled = this.disabled();
    this.disabled.set(!currentlyDisabled);
  }

  public SaveCharacter() {
    this.characterSheetStateService.SaveCharacter();
    this.toastService.showToast('Character Saved!', 'success', 3000, 'bottom-right');
  }
}
