import { Component, computed, input, Signal } from '@angular/core';
import { Item } from '../../types/models/Item';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SystemDataService } from '../../types/services/system.data.service';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { ItemType } from '../../types/models/ItemType';
import { ItemTypes } from '../../types/models/ItemType';
import { toSignal } from '@angular/core/rxjs-interop';
import { CharacterSheetSharedSignalStore } from '../../types/services/character-sheet-shared-signal.store';

@Component({
  selector: 'app-character-item',
  imports: [ReactiveFormsModule],
  templateUrl: './character-item.component.html',
  styleUrl: './character-item.component.css'
})
export class CharacterItemComponent {
  Item = input.required<Item>();
  disabled = input.required<boolean>();
  itemTypes: Array<ItemType>;

  nameControl = new FormControl('');
  itemTypeControl = new FormControl([]);
  itemTypeSignal: Signal<any>;
  isWeaponSignal: Signal<boolean>;

  constructor(protected context: CharacterSheetStateService,
      protected systemDataService: SystemDataService,
      protected characterSheetSignalStore: CharacterSheetSharedSignalStore) {
    this.itemTypes = Object.values(ItemTypes);
    this.itemTypeSignal = toSignal(this.itemTypeControl.valueChanges);
  }

  ngOnInit() {
    this.isWeaponSignal = computed(() => {
      let itemType = this.itemTypeSignal();
      if (itemType == ItemTypes.Weapon) {
        return true;
      } else {
        return false;
      }
    });
  }
}
