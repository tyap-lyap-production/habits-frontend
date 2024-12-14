import { ComponentFixture, TestBed } from '@angular/core/testing';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

import { NewHabitDialogComponent } from './new-habit-dialog.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NewHabitDialogComponent', () => {
  let component: NewHabitDialogComponent;
  let fixture: ComponentFixture<NewHabitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHabitDialogComponent, HttpClientTestingModule],
      providers: [
        {
            provide: POLYMORPHEUS_CONTEXT,
            useValue: {}
        },
    ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHabitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with empty values', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('goalValue')?.value).toBe(0);
    expect(component.form.get('unitType')?.value).toBe('');
    expect(component.form.get('periodicity')?.value).toBe('');
  });

  it('should make the form invalid if fields are empty', () => {
    component.form.get('name')?.setValue('');
    component.form.get('goalValue')?.setValue(0);
    component.form.get('unitType')?.setValue('');
    component.form.get('periodicity')?.setValue('');
    fixture.detectChanges();

    expect(component.form.invalid).toBeTrue();
  });

  it('should trigger ok() when the "Создать" button is clicked', () => {
    spyOn(component, 'ok');
    const okButton = fixture.debugElement.query(By.css('button[appearance="primary"]')).nativeElement;
    okButton.click();
    expect(component.ok).toHaveBeenCalled();
  });

  it('should trigger cancel() when the "Отмена" button is clicked', () => {
    spyOn(component, 'cancel');
    const cancelButton = fixture.debugElement.query(By.css('button[appearance="secondary"]')).nativeElement;
    cancelButton.click();
    expect(component.cancel).toHaveBeenCalled();
  });

  it('should display error for the name field if it is empty', () => {
    component.form.get('name')?.setValue('');
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('tui-error[formControlName="name"]'));
    expect(errorMessage).toBeTruthy();
  });

  it('should allow setting values for the fields and submit', () => {
    const nameInput = fixture.debugElement.query(By.css('tui-input[formControlName="name"] input')).nativeElement;
    const goalValueInput = fixture.debugElement.query(By.css('tui-input-number[formControlName="goalValue"] input')).nativeElement;
    const unitTypeInput = fixture.debugElement.query(By.css('tui-input[formControlName="unitType"] input')).nativeElement;

    nameInput.value = 'New Habit';
    goalValueInput.value = 10;
    unitTypeInput.value = 'kg';

    nameInput.dispatchEvent(new Event('input'));
    goalValueInput.dispatchEvent(new Event('input'));
    unitTypeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.form.get('name')?.value).toBe('New Habit');
    expect(component.form.get('goalValue')?.value).toBe(10);
    expect(component.form.get('unitType')?.value).toBe('kg');
  });
});
