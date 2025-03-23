import { Component } from '@angular/core';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
import { CharacterSkillComponent } from '../character-skill/character-skill.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Skill } from '../../types/models/Skill';
import { SystemDataService } from '../../types/services/system.data.service';

@Component({
  selector: 'app-character-skills',
  imports: [CharacterSkillComponent, ReactiveFormsModule],
  templateUrl: './character-skills.component.html',
  styleUrl: './character-skills.component.css'
})

export class CharacterSkillsComponent {
  constructor(protected context: CharacterSheetStateService,
    protected systemDataService: SystemDataService
  ) {
    
  }
}
