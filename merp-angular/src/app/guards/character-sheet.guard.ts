import { CanActivateFn } from '@angular/router';

export const characterSheetGuard: CanActivateFn = (route, state) => {
  return true;

};
