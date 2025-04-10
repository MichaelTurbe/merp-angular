import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterActionsComponent } from './character-actions.component';

describe('CharacterActionsComponent', () => {
  let component: CharacterActionsComponent;
  let fixture: ComponentFixture<CharacterActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
