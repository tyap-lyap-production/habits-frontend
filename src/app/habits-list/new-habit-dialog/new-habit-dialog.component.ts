import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule, TuiDialogContext, TuiErrorModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiInputModule, TuiInputNumberModule, TuiSelectModule } from '@taiga-ui/kit';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { HabitPeriodicity } from '../habits-list.component';
import { HabitPeriodicityPipe } from '../../shared/pipes/habits-periodicity.pipe';
import { HabitsListService } from '../habits-list.service';

@Component({
  selector: 'app-new-habit-dialog',
  imports: [
    TuiSelectModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    ReactiveFormsModule,
    CommonModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    HabitPeriodicityPipe,
    TuiButtonModule
  ],
  templateUrl: './new-habit-dialog.component.html',
  styleUrl: './new-habit-dialog.component.less',
  standalone: true
})
export class NewHabitDialogComponent {
  readonly form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    goalValue: new FormControl(null, [Validators.required]),
    unitType: new FormControl(null, [Validators.required]),
    periodicity: new FormControl(null, [Validators.required]),
  });

  readonly periodicityArr: HabitPeriodicity[] = [
    HabitPeriodicity.daily,
    HabitPeriodicity.monthly,
    HabitPeriodicity.weekly
  ]

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean>,
    readonly service: HabitsListService
  ) {}
 
  ok() {
    if(this.form.valid){
      this.service.addHabit(this.form.value)
      this.context.completeWith(true);
    }
    else {
      this.form.markAllAsTouched();
    }
  }
  
  cancel() {
    this.context.completeWith(false);
  }
}
