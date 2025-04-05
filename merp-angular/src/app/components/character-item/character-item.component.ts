import { Component, input } from '@angular/core';
import { Item } from '../../types/models/Item';

@Component({
  selector: 'app-character-item',
  imports: [],
  templateUrl: './character-item.component.html',
  styleUrl: './character-item.component.css'
})
export class CharacterItemComponent {
  Item = input.required<Item>();
}
