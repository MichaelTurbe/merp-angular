import { DOCUMENT } from '@angular/common';
import { Component, Inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CharacterSheetStateService } from '../../types/services/character-sheet.state.service';
@Component({
  selector: 'app-character-stats',
  imports: [ReactiveFormsModule],
  templateUrl: './character-stats.component.html',
  styleUrl: './character-stats.component.css'
})
export class CharacterStatsComponent {

  strengthValueControl = new FormControl('');
  strengthNormalBonusControl = new FormControl('');


  constructor(@Inject(DOCUMENT) private document: Document,
    public characterSheetStateService: CharacterSheetStateService,
    private route: ActivatedRoute) {

    //TODO - note that these things will have to happen in 
    // a guard for anything to work
    const characterId = this.route.snapshot.params['characterId'];
    if (characterId) {
      console.log(`CharacterId: ${characterId}`);
      if (characterId == '0') {
        this.characterSheetStateService.createNewCharacter();
      } else {
        this.characterSheetStateService.loadCharacter(characterId);
      }
    }


    this.characterSheetStateService.strengthValueSignal = toSignal(
      this.strengthValueControl.valueChanges
    );


  }

  ngOnInit() {
    // now set the initial values into their controls to trigger the stuff
    this.strengthValueControl.setValue(this.characterSheetStateService.character.Strength.Value.toString());


  }
}
