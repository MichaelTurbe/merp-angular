import { Routes } from '@angular/router';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { characterSheetGuard } from './guards/character-sheet.guard';
export const routes: Routes = [
  {
    path: 'character/:characterId',
    component: CharacterSheetComponent,
    canActivate: [characterSheetGuard],
  },
];
