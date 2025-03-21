import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterStatComponent } from './character-stat.component';

describe('CharacterStatComponent', () => {
  let component: CharacterStatComponent;
  let fixture: ComponentFixture<CharacterStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
