import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogTasksComponent } from './backlog-tasks.component';

describe('BacklogTasksComponent', () => {
  let component: BacklogTasksComponent;
  let fixture: ComponentFixture<BacklogTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklogTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacklogTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
