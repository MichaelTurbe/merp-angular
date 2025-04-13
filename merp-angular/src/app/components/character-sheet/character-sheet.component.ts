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
import { CommonModule, DOCUMENT } from '@angular/common';
import { ThreeDDice, IApiResponse, ITheme, IRoll, ThreeDDiceRollEvent, DiceEventCallback, RollEventCallback, IDiceRollOptions, IDiceRoll, DiceEvent } from 'dddice-js';
import { DiceService } from '../../types/services/dice.service';
import { ToastService } from '../../types/services/toast.service';
import { CharacterSheetComponentType, CharacterSheetComponentTypes } from '../../types/models/CharacterSheetComponentType';
import { CharacterActionsComponent } from '../character-actions/character-actions.component';
import { CharacterSheetSharedSignalStore } from '../../types/services/character-sheet-shared-signal.store';


@Component({
  selector: 'app-character-sheet',
  imports: [CommonModule, CharacterStatsComponent, CharacterSkillsComponent,
    CharacterEpithetComponent, ReactiveFormsModule, CharacterInventoryComponent, CharacterActionsComponent],
  providers: [CharacterSheetStateService, CharacterSheetSharedSignalStore],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent {
  disabled: WritableSignal<boolean> = signal<boolean>(false);
  public locked: WritableSignal<boolean> = signal(false);
  public epithetCardClass: WritableSignal<string> = signal('firstComponent');
  public statsCardClass: WritableSignal<string> = signal('secondComponent');
  public actionsCardClass: WritableSignal<string> = signal('thirdComponent');
  public skillsCardClass: WritableSignal<string> = signal('fourthComponent');
  public inventoryCardClass: WritableSignal<string> = signal('fifthComponent');

  public componentOrderArray: Array<[string, WritableSignal<string>, string]> = new Array<[string, WritableSignal<string>, string]>();

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

    this.componentOrderArray.push(['epithet', this.epithetCardClass, 'firstComponent']);
    this.componentOrderArray.push(['stats', this.statsCardClass, 'secondComponent']);
    this.componentOrderArray.push(['actions', this.actionsCardClass, 'thirdComponent']);
    this.componentOrderArray.push(['skills', this.skillsCardClass, 'fourthComponent']);
    this.componentOrderArray.push(['inventory', this.inventoryCardClass, 'fifthComponent']);

  }

  ngOnInit() {

  }

  public navigateToMyCharacters() {
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

  public moveComponentUp(componentType: string) {
    console.log(`move card up: ${componentType}`);
    let order = this.getCurrentOrdinalForComponentType(componentType);
    console.log(`this card is currently at spot ${order}`);
    if (order === 0) {
      //fuck it
    } else {
      let currentComponent = this.componentOrderArray[order][0];
      let currentSignal = this.componentOrderArray[order][1];
      let currentClass = this.componentOrderArray[order][2];

      let previousComponent = this.componentOrderArray[order - 1][0];
      let previousSignal = this.componentOrderArray[order - 1][1];
      let previousClass = this.componentOrderArray[order - 1][2];

      //previous becomes current
      this.componentOrderArray[order - 1][0] = currentComponent;
      this.componentOrderArray[order - 1][1] = currentSignal;
      currentSignal.set(previousClass);

      //current becomes previous
      this.componentOrderArray[order][0] = previousComponent;
      this.componentOrderArray[order][1] = previousSignal;
      previousSignal.set(currentClass);

      console.log(this.componentOrderArray);
    }

  }

  private getCurrentOrdinalForComponentType(componentType: string): number {
    let foundOrder = 1;
    for (let i = 0; i < this.componentOrderArray.length; i++) {
      if (this.componentOrderArray[i][0] == componentType) {
        foundOrder = i;
      }
    }
    return foundOrder;
  }

  public moveComponentDown(componentType: string) {
    console.log(`move card down: ${componentType}`);
    // console.log(this.componentOrderArray);
    let order = this.getCurrentOrdinalForComponentType(componentType);
    console.log(`this card is currently at spot ${order}`);
    if (order === this.componentOrderArray.length) {
      //fuck it
    } else {
      let currentComponent = this.componentOrderArray[order][0];
      let currentSignal = this.componentOrderArray[order][1];
      let currentClass = this.componentOrderArray[order][2];

      let nextComponent = this.componentOrderArray[order + 1][0];
      let nextSignal = this.componentOrderArray[order + 1][1];
      let nextClass = this.componentOrderArray[order + 1][2];

      //next becomes current
      this.componentOrderArray[order + 1][0] = currentComponent;
      this.componentOrderArray[order + 1][1] = currentSignal;
      currentSignal.set(nextClass);


      //current becomes next
      this.componentOrderArray[order][0] = nextComponent;
      this.componentOrderArray[order][1] = nextSignal;
      nextSignal.set(currentClass);
    }
    console.log(this.componentOrderArray);
  }


}
