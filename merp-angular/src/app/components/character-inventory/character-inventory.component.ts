import { Component, input, signal, WritableSignal } from '@angular/core';
import { Item } from '../../types/models/Item';
import { SystemDataService } from '../../types/services/system.data.service';
import { CharacterDataService } from '../../types/services/character.data.service';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { CharacterItemComponent } from '../character-item/character-item.component';
import { CharacterSheetSharedSignalStore } from '../../types/services/character-sheet-shared-signal.store';

@Component({
  selector: 'app-character-inventory',
  imports: [CharacterItemComponent],
  providers: [],
  templateUrl: './character-inventory.component.html',
  styleUrl: './character-inventory.component.css'
})
export class CharacterInventoryComponent {
  disabled = input.required<boolean>();
  inventorySignal: WritableSignal<Array<Item>>;
  inventory: Array<Item> = new Array<Item>();

  constructor(private systemDataService: SystemDataService,
    private signalStore: CharacterSheetSharedSignalStore,
    private characterDataService: CharacterDataService,
    private characterSheetStateService: CharacterSheetStateService) {
    this.inventorySignal = signal([]);

  }

  addItem() {
    let newItem = this.characterSheetStateService.AddNewItem();
    this.inventory.push(newItem);
    this.inventorySignal.set(this.inventory);
  }
}
