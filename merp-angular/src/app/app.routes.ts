import { Routes } from '@angular/router';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { characterSheetGuard } from './guards/character-sheet.guard';
import { CharacterManagerComponent } from './components/character-manager/character-manager.component';
export const routes: Routes = [
  {
    path: 'character/:characterId',
    component: CharacterSheetComponent,
    canActivate: [characterSheetGuard],
  },
  {
    path: '',
    component: CharacterManagerComponent,
    canActivate: [characterSheetGuard],
  },
];
