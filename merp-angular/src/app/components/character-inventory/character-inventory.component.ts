import { Component, input, signal, WritableSignal } from '@angular/core';
import { Item } from '../../types/models/Item';
import { SystemDataService } from '../../types/services/system.data.service';
import { CharacterDataService } from '../../types/services/character.data.service';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { CharacterSheetSignalStore } from '../../types/services/character-sheet-signal.store';
import { CharacterItemComponent } from '../character-item/character-item.component';

@Component({
  selector: 'app-character-inventory',
  imports: [CharacterItemComponent],
  templateUrl: './character-inventory.component.html',
  styleUrl: './character-inventory.component.css'
})
export class CharacterInventoryComponent {
  disabled = input.required<boolean>();
  inventorySignal: WritableSignal<Array<Item>>;
  inventory: Array<Item> = new Array<Item>();

  constructor(private systemDataService: SystemDataService,
    private signalStore: CharacterSheetSignalStore,
    private characterDataService: CharacterDataService,
  private characterSheetStateServie: CharacterSheetStateService) {
    this.inventorySignal = signal([]);

  }

  addItem() {
    let newItem = this.characterSheetStateServie.AddNewItem();
    this.inventory.push(newItem);
    this.inventorySignal.set(this.inventory);
  }
}
