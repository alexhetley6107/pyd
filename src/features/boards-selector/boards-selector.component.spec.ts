import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsSelectorComponent } from './boards-selector.component';

describe('BoardsSelectorComponent', () => {
  let component: BoardsSelectorComponent;
  let fixture: ComponentFixture<BoardsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardsSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
