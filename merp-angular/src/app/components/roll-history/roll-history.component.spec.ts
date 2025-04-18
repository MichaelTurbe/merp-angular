import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollHistoryComponent } from './roll-history.component';

describe('RollHistoryComponent', () => {
  let component: RollHistoryComponent;
  let fixture: ComponentFixture<RollHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
