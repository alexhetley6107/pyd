import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogFiltersComponent } from './backlog-filters.component';

describe('BacklogFiltersComponent', () => {
  let component: BacklogFiltersComponent;
  let fixture: ComponentFixture<BacklogFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklogFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacklogFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
