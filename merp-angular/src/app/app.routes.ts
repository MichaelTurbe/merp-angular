import { Routes } from '@angular/router';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';

export const routes: Routes = [
  { path: 'character/:characterId', component: CharacterSheetComponent },
];
