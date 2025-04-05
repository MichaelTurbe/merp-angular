import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterInventoryComponent } from './character-inventory.component';

describe('CharacterInventoryComponent', () => {
  let component: CharacterInventoryComponent;
  let fixture: ComponentFixture<CharacterInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
