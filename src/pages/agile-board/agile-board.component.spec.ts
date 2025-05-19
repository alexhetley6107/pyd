import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgileBoardComponent } from './agile-board.component';

describe('AgileBoardComponent', () => {
  let component: AgileBoardComponent;
  let fixture: ComponentFixture<AgileBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgileBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgileBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
