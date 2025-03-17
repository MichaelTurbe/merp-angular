import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSkillComponent } from './character-skill.component';

describe('CharacterSkillComponent', () => {
  let component: CharacterSkillComponent;
  let fixture: ComponentFixture<CharacterSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSkillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
