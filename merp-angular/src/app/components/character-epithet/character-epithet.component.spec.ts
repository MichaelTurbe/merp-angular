import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterEpithetComponent } from './character-epithet.component';

describe('CharacterEpithetComponent', () => {
  let component: CharacterEpithetComponent;
  let fixture: ComponentFixture<CharacterEpithetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterEpithetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterEpithetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
