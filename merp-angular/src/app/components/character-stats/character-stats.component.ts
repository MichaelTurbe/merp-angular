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
    public context: CharacterSheetStateService,
    private route: ActivatedRoute) {

    //TODO - note that these things will have to happen in 
    // a guard for anything to work
    const characterId = this.route.snapshot.params['characterId'];
    if (characterId) {
      console.log(`CharacterId: ${characterId}`);
      if (characterId == '0') {
        this.context.createNewCharacter();
      } else {
        this.context.loadCharacter(characterId);
      }
    }


    this.context.state.StrengthValue = toSignal(
      this.strengthValueControl.valueChanges
    );
  }

  ngOnInit() {
    // now set the initial values into their controls to trigger the stuff
    console.log(`REVISIT THIS`);
    this.strengthValueControl.setValue(this.context.character.Strength.Value.toString());


  }
}
