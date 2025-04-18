import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSheetSettingsComponent } from './character-sheet-settings.component';

describe('CharacterSheetSettingsComponent', () => {
  let component: CharacterSheetSettingsComponent;
  let fixture: ComponentFixture<CharacterSheetSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSheetSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterSheetSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
