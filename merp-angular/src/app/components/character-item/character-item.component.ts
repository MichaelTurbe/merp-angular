import { Component, computed, input, Signal } from '@angular/core';
import { Item } from '../../types/models/Item';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SystemDataService } from '../../types/services/system.data.service';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { ItemType } from '../../types/models/ItemType';
import { ItemTypes } from '../../types/models/ItemType';
import { toSignal } from '@angular/core/rxjs-interop';
import { CharacterSheetSharedSignalStore } from '../../types/services/character-sheet-shared-signal.store';
import { Skill } from '../../types/models/Skill';

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
  skills: Array<Skill>;

  nameControl = new FormControl('');
  itemTypeControl = new FormControl([]);
  skillsControl = new FormControl([]);
  appliesToSkillControl = new FormControl(false);
  itemTypeSignal: Signal<any>;
  isWeaponSignal: Signal<boolean>;
  appliesToSkillSignal: Signal<boolean>;

  constructor(protected context: CharacterSheetStateService,
    protected systemDataService: SystemDataService,
    protected characterSheetSignalStore: CharacterSheetSharedSignalStore) {
    this.skills = this.systemDataService.GetAllSkills();
    this.itemTypes = Object.values(ItemTypes);
    this.itemTypeSignal = toSignal(this.itemTypeControl.valueChanges);
    this.appliesToSkillSignal = toSignal(this.appliesToSkillControl.valueChanges);
  }

  ngOnInit() {
    this.itemTypeControl.setValue([this.Item().ItemType]);
    this.appliesToSkillControl.setValue(this.Item().AppliesToSkill);
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
