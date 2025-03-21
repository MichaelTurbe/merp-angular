import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { characterSheetGuard } from './character-sheet.guard';

describe('characterSheetGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => characterSheetGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
