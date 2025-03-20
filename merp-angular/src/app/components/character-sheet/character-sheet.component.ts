import { Component } from '@angular/core';
import { CharacterStatsComponent } from '../character-stats/character-stats.component';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';

@Component({
  selector: 'app-character-sheet',
  imports: [CharacterStatsComponent],
  providers: [CharacterSheetStateService],
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css'
})
export class CharacterSheetComponent {

}
