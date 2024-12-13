import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, EMPTY, take } from "rxjs";
import { Habit, HabitPeriodicity} from "./habits-list.component";
import { ApiService } from "../shared/service/api.service";
import { EMPTY_ARRAY } from "@taiga-ui/cdk";

export interface AddHabitForm {
    readonly name: string;
    readonly goalValue: number;
    readonly unitType: string;
    readonly periodicity: HabitPeriodicity;
  }
  

@Injectable()
export class HabitsListService {
    readonly habits$ = new BehaviorSubject<Habit[]>([]);
    readonly apiService = inject(ApiService);

    loadHabits() {
        this.apiService.loadHabits().pipe(
            take(1),
            catchError(
                _ => EMPTY_ARRAY
            )
        ).subscribe(
            habits => this.habits$.next(habits)
        )
    }

    addHabit(data: any) {
        this.apiService.addHabit(data).pipe(
            take(1),
            catchError(
                _ => EMPTY
            )
        ).subscribe()
    }

    deleteHabit(habitId: string) {
        this.apiService.deleteHabit(habitId).pipe(
            take(1),
            catchError(
                _ => EMPTY
            )
        ).subscribe(
            () => 
                this.habits$.next(
                [...this.habits$.value.filter(
                    habit => habit.id !== habitId
                )]
            )
        )
    }
}