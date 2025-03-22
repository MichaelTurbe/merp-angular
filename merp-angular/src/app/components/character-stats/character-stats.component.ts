import { DOCUMENT } from '@angular/common';
import { Component, Inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { CharacterStatComponent } from '../character-stat/character-stat.component';
@Component({
  selector: 'app-character-stats',
  imports: [ReactiveFormsModule, CharacterStatComponent],
  templateUrl: './character-stats.component.html',
  styleUrl: './character-stats.component.css'
})
export class CharacterStatsComponent {

  constructor(@Inject(DOCUMENT) private document: Document,
    protected context: CharacterSheetStateService) {
    
  }

  ngOnInit() {
    
  }
}
