import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  HabitPeriodicity, HabitsListComponent, HabitStatus } from './habits-list.component';
import { HabitsListService } from './habits-list.service';
import { TuiDialogService } from '@taiga-ui/core';
import { BehaviorSubject, of } from 'rxjs';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HabitsListComponent', () => {
  let component: HabitsListComponent;
  let fixture: ComponentFixture<HabitsListComponent>;
  let habitsListServiceSpy: jasmine.SpyObj<HabitsListService>;
  let tuiDialogService: jasmine.SpyObj<TuiDialogService>;

  beforeEach(async () => {
    habitsListServiceSpy = jasmine.createSpyObj('HabitsListService', ['loadHabits', 'deleteHabit', 'completeHabit']);
    const tuiDialogServiceSpy = jasmine.createSpyObj('TuiDialogService', ['open']);
    habitsListServiceSpy.habits$ = new BehaviorSubject([
      { id: '1', createDate: '', name: 'Сделать зарядку', goal: {id: '1', value: 20, unitType: 'мин', periodicity: HabitPeriodicity.daily as HabitPeriodicity}, status: HabitStatus.completed },
      { id: '2', createDate: '', name: 'Прочитать книгу', goal: {id: '1', value: 10, unitType: 'стр', periodicity: HabitPeriodicity.monthly as HabitPeriodicity}, status: HabitStatus.in_progress },
    ]);

    await TestBed.configureTestingModule({
      imports: [HabitsListComponent, BrowserAnimationsModule],
      providers: [
        { provide: HabitsListService, useValue: habitsListServiceSpy },
        { provide: TuiDialogService, useValue: tuiDialogServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HabitsListComponent);
    component = fixture.componentInstance;
    tuiDialogService = TestBed.inject(TuiDialogService) as jasmine.SpyObj<TuiDialogService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call tuiDialogService.open when addHabit is called', () => {
    tuiDialogService.open.and.returnValue(of(null));
    component.addHabit();
    expect(tuiDialogService.open).toHaveBeenCalledWith(
      jasmine.any(PolymorpheusComponent)
    );
  });

  // it('should call deleteHabit when deleteHabit is called', () => {
  //   const habitId = '123';
  //   component.deleteHabit(habitId);
  //   expect(habitsListService.deleteHabit).toHaveBeenCalledWith(habitId);
  // });

  // it('should call completeHabit when completeHabit is called', () => {
  //   const habitId = '123';
  //   component.completeHabit(habitId);
  //   expect(habitsListService.completeHabit).toHaveBeenCalledWith(habitId);
  // });

  it('should display a list of habits from the service', () => {
    const habitItems = fixture.debugElement.queryAll(By.css('tui-accordion-item'));
    expect(habitItems.length).toBe(2);
    expect(habitItems[0].nativeElement.textContent).toContain('Сделать зарядку');
    expect(habitItems[1].nativeElement.textContent).toContain('Прочитать книгу');
  });

  it('should hide the "Выполнить" button for completed habits', () => {
    const completeButtons = fixture.debugElement.queryAll(By.css('button#complete_btn'));
    expect(completeButtons.length).toBe(0);
  });

  // it('should call completeHabit when "Выполнить" is clicked', () => {
  //   spyOn(component, 'completeHabit');
  //   const completeButton = fixture.debugElement.query(By.css('button#complete_btn'));
  //   completeButton.triggerEventHandler('click', null);
  //   expect(component.completeHabit).toHaveBeenCalledWith('1');
  // });

  // it('should disable the "Выполнено" button for completed habits', () => {
  //   const disabledCompleteButton = fixture.debugElement.queryAll(By.css('button[disabled]'));
  //   expect(disabledCompleteButton.length).toBe(1); 
  // });

  // it('should call deleteHabit when "Удалить" button is clicked', () => {
  //   spyOn(component, 'deleteHabit');
  //   const deleteButton = fixture.debugElement.query(By.css('button#delete_btn'));
  //   deleteButton.triggerEventHandler('click', null);
  //   expect(component.deleteHabit).toHaveBeenCalledWith('1');
  // });

  // it('should open a dialog when "Добавить привычку" button is clicked', () => {
  //   spyOn(component, 'addHabit');
  //   const addButton = fixture.debugElement.query(By.css('#add_btn'));
  //   addButton.triggerEventHandler('click', null);
  //   expect(component.addHabit).toHaveBeenCalled();
  // });
});
