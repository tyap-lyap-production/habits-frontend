import { CommonModule } from '@angular/common';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { TuiAccordionModule, TuiBadgeModule } from '@taiga-ui/kit';
import { HabitPeriodicityPipe } from '../shared/pipes/habits-periodicity.pipe';
import { TuiButtonModule, TuiDialogService, TuiSvgModule } from '@taiga-ui/core';
import { NewHabitDialogComponent } from './new-habit-dialog/new-habit-dialog.component';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import { HabitsListService } from './habits-list.service';

export enum HabitPeriodicity {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly'
}

export enum HabitStatus {
  in_progress = 'in_progress',
  completed = 'completed'
}

export interface Habit {
  readonly id: string;
  readonly name: string;
  readonly createDate: string;
  readonly goal: {
    readonly id: string;
    readonly unitType: string;
    readonly periodicity: HabitPeriodicity;
    readonly value: number;
  };
  readonly status: HabitStatus;
}

@Component({
  selector: 'app-habits-list',
  imports: [
    CommonModule,
    TuiAccordionModule,
    TuiBadgeModule,
    TuiButtonModule,
    HabitPeriodicityPipe,
    TuiSvgModule,
  ],
  templateUrl: './habits-list.component.html',
  styleUrl: './habits-list.component.less',
  standalone: true,
})
export class HabitsListComponent implements OnInit{
  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    readonly service: HabitsListService
  ) {}

  ngOnInit(): void {
      this.service.loadHabits();
  }
  
  addHabit() {
    this.dialogs.open(
      new PolymorpheusComponent(NewHabitDialogComponent, this.injector),
    ).subscribe()
  }

  deleteHabit(habitId: string) {
    this.service.deleteHabit(habitId);
  }

  completeHabit(habitId: string){
    this.service.completeHabit(habitId);
  }
}
