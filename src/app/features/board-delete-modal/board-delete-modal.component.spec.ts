import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDeleteModalComponent } from './board-delete-modal.component';

describe('BoardDeleteModalComponent', () => {
  let component: BoardDeleteModalComponent;
  let fixture: ComponentFixture<BoardDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
