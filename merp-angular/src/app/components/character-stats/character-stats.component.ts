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

  // declare and instantiate all the form controls
  strengthValueControl = new FormControl('');
  strengthNormalBonusControl = new FormControl('');
  strengthRaceBonusControl = new FormControl('');

  agilityValueControl = new FormControl('');
  agilityNormalBonusControl = new FormControl('');
  agilityRaceBonusControl = new FormControl('');

  constitutionValueControl = new FormControl('');
  constitutionNormalBonusControl = new FormControl('');
  constitutionRaceBonusControl = new FormControl('');

  intelligenceValueControl = new FormControl('');
  intelligenceNormalBonusControl = new FormControl('');
  intelligenceRaceBonusControl = new FormControl('');

  intuitionValueControl = new FormControl('');
  intuitionNormalBonusControl = new FormControl('');
  intuitionRaceBonusControl = new FormControl('');

  presenceValueControl = new FormControl('');
  presenceNormalBonusControl = new FormControl('');
  presenceRaceBonusControl = new FormControl('');


  constructor(@Inject(DOCUMENT) private document: Document,
    protected context: CharacterSheetStateService) {
    // initialize all the signals that are dependent on
    // control observables.  Needs to happen here
    // because toSignal must be called in a place where
    // there is an injection context
    this.context.state.StrengthValue = toSignal(
      this.strengthValueControl.valueChanges
    );
    this.context.state.StrengthRaceBonus = toSignal(
      this.strengthRaceBonusControl.valueChanges
    );

    this.context.state.AgilityValue = toSignal(
      this.agilityValueControl.valueChanges
    );
    this.context.state.AgilityRaceBonus = toSignal(
      this.agilityRaceBonusControl.valueChanges
    );

    this.context.state.ConstitutionValue = toSignal(
      this.constitutionValueControl.valueChanges
    );
    this.context.state.ConstitutionRaceBonus = toSignal(
      this.constitutionRaceBonusControl.valueChanges
    );

    this.context.state.IntelligenceValue = toSignal(
      this.intelligenceValueControl.valueChanges
    );
    this.context.state.IntelligenceRaceBonus = toSignal(
      this.intelligenceRaceBonusControl.valueChanges
    );

    this.context.state.IntuitionValue = toSignal(
      this.intuitionValueControl.valueChanges
    );
    this.context.state.IntuitionRaceBonus = toSignal(
      this.intuitionRaceBonusControl.valueChanges
    );

    this.context.state.PresenceValue = toSignal(
      this.presenceValueControl.valueChanges
    );
    this.context.state.PresenceRaceBonus = toSignal(
      this.presenceRaceBonusControl.valueChanges
    );



  }

  ngOnInit() {
    // now set the initial values into their controls to trigger the stuff
    console.log(`REVISIT THIS`);
    this.strengthValueControl.setValue(this.context.character.Strength.Value.toString());
    this.strengthRaceBonusControl.setValue(this.context.character.Strength.RaceBonus.toString());

    this.agilityValueControl.setValue(this.context.character.Agility.Value.toString());
    this.agilityRaceBonusControl.setValue(this.context.character.Agility.RaceBonus.toString());

    this.constitutionValueControl.setValue(this.context.character.Constitution.Value.toString());
    this.constitutionRaceBonusControl.setValue(this.context.character.Constitution.RaceBonus.toString());

    this.intelligenceValueControl.setValue(this.context.character.Intelligence.Value.toString());
    this.intelligenceRaceBonusControl.setValue(this.context.character.Intelligence.RaceBonus.toString());

    this.intuitionValueControl.setValue(this.context.character.Intuition.Value.toString());
    this.intuitionRaceBonusControl.setValue(this.context.character.Intuition.RaceBonus.toString());

    this.presenceValueControl.setValue(this.context.character.Presence.Value.toString());
    this.presenceRaceBonusControl.setValue(this.context.character.Presence.RaceBonus.toString());

  }
}
