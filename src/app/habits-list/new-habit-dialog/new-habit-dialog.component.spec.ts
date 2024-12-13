import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHabitDialogComponent } from './new-habit-dialog.component';

describe('NewHabitDialogComponent', () => {
  let component: NewHabitDialogComponent;
  let fixture: ComponentFixture<NewHabitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHabitDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHabitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
