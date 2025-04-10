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


@Component({
  selector: 'app-character-sheet',
  imports: [CommonModule, CharacterStatsComponent, CharacterSkillsComponent,
    CharacterEpithetComponent, ReactiveFormsModule, CharacterInventoryComponent],
  providers: [CharacterSheetStateService, CharacterSheetSignalStore],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent {
  disabled: WritableSignal<boolean> = signal<boolean>(false);
  public locked: WritableSignal<boolean> = signal(false);
  public epithetCardClass: WritableSignal<string> = signal('firstComponent');
  public statsCardClass: WritableSignal<string> = signal('secondComponent');
  public skillsCardClass: WritableSignal<string> = signal('fourthComponent');
  public inventoryCardClass: WritableSignal<string> = signal('thirdComponent');
  public componentOrderMap: Map<string, string> = new Map<CharacterSheetComponentType, string>();

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

    // this.characterSheetComponentOrder.push([CharacterSheetComponentTypes.Epithet, 'firstComponent'])
    // this.characterSheetComponentOrder.push([CharacterSheetComponentTypes.Stats, 'secondComponent'])
    this.componentOrderMap.set('epithet', 'firstComponent');
    this.componentOrderMap.set('stats', 'secondComponent');
    this.componentOrderMap.set('skills', 'thirdComponent');
    this.componentOrderMap.set('inventory', 'fourthComponent');


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
    // try to get a thing
    let order = this.getCurrentOrdinalForComponentType(componentType);
    if (order === 1) {
      //fuck it
    } else {
      // get the item at order -1
      let previousComponent = this.getComponentTypeAtOrdinal(order - 1);
      let currentSignal = this.getClassSignalForComponent(componentType);
      let upSignal = this.getClassSignalForComponent(previousComponent);
      //swap 'em:
      
    }

  }

  private getCurrentOrdinalForComponentType(componentType: string): number {
    let foundOrder = 1;
    let order = 1;
    for (const [id, name] of this.componentOrderMap.entries()) {
      if (id == componentType) {
        foundOrder = order;
      }
      order++;
    }
    console.log(`${componentType} is at position ${foundOrder}`);
    return foundOrder;
  }

  private getComponentTypeAtOrdinal(ordinal: number): string {
    let foundComponent = '';
    let order = 1;
    for (const [id, name] of this.componentOrderMap.entries()) {
      if (order === ordinal) {
        foundComponent = id;
      }
      order++;
    }
    console.log(`${foundComponent} is at position ${ordinal}`);
    return foundComponent;
  }

  private getClassSignalForComponent(component: string): WritableSignal<string> {
    if (component == CharacterSheetComponentTypes.Epithet) {
      return this.epithetCardClass;
    } else if (component == CharacterSheetComponentTypes.Stats) {
      return this.statsCardClass;
    } else if (component == CharacterSheetComponentTypes.Skills) {
      return this.skillsCardClass;
    } else if (component == CharacterSheetComponentTypes.Inventory) {
      return this.inventoryCardClass;
    } else {
      return null;
    }
  }

  public moveComponentDown(componentType: string) {
    let order = this.getCurrentOrdinalForComponentType(componentType);
  }


}
