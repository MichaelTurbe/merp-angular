import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSkillsCondensedComponent } from './character-skills-condensed.component';

describe('CharacterSkillsCondensedComponent', () => {
  let component: CharacterSkillsCondensedComponent;
  let fixture: ComponentFixture<CharacterSkillsCondensedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSkillsCondensedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterSkillsCondensedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
