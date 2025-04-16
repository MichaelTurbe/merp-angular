import { Component, effect, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, GridOptions } from 'ag-grid-community'; // Column Definition Type Interface
import { DiceRollDataService } from '../../types/services/dice-roll.data.service';
import { DiceRoll } from '../../types/models/DiceRoll';
import { colorSchemeLightWarm } from 'ag-grid-community';
import { themeBalham } from 'ag-grid-community';

@Component({
  selector: 'app-roll-history',
  imports: [AgGridAngular],
  templateUrl: './roll-history.component.html',
  styleUrl: './roll-history.component.css'
})
export class RollHistoryComponent {
  public allDiceRollsSignal: WritableSignal<Array<DiceRoll>>;
  public colDefs: ColDef[];
  public gridOptions: GridOptions;
  public theme = themeBalham.withPart(colorSchemeLightWarm);

  constructor(protected diceRollDataService: DiceRollDataService,
    private router: Router
  ) {
    ModuleRegistry.registerModules([AllCommunityModule]);
    this.allDiceRollsSignal = this.diceRollDataService.GetAllDiceRolls();
    this.colDefs = this.initializeColumns();
    this.gridOptions = {
      immutableData: true,
      getRowNodeId: (data: DiceRoll) => data.uuid
    } as GridOptions;
  }

  private initializeColumns(): ColDef[] {
    return [
      { field: "uuid" },
      { field: "label" },
      { field: "result" },
      { field: "time" },
      { field: "equation" },
      { field: "tensNumber" },
      { field: "onesNumber" }

    ];

  }

  public navigateToMyCharacters() {
    this.router.navigate(["/"]);
  }

  public navigateToRollHistory() {
    this.router.navigate(["/rollHistory"]);
  }

}
