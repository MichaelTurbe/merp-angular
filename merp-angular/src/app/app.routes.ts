import { Routes } from '@angular/router';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { characterSheetGuard } from './guards/character-sheet.guard';
import { CharacterManagerComponent } from './components/character-manager/character-manager.component';
import { RollHistoryComponent } from './components/roll-history/roll-history.component';
export const routes: Routes = [
  {
    path: 'character/:characterId',
    component: CharacterSheetComponent,
    canActivate: [characterSheetGuard],
  },
  {
    path: 'rollHistory',
    component: RollHistoryComponent,
    canActivate: [],
  },
  {
    path: '',
    component: CharacterManagerComponent,
    canActivate: [characterSheetGuard],
  },
];
