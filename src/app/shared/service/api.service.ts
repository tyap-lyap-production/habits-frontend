import { Injectable } from "@angular/core";
import { Habit, HabitPeriodicity, HabitStatus } from "../../habits-list/habits-list.component";
import { Observable, of } from "rxjs";
import { AddHabitForm } from "../../habits-list/habits-list.service";

function habitsMock(): Habit[] {
    return [
        {
          id: '123',
          name: '1',
          createDate: '11-11-1111',
          goal: {
            id: '123',
            periodicity: HabitPeriodicity.daily,
            value: 10,
            unitType: 'min'
          },
          status: HabitStatus.in_progress,
        },
        {
          id: '1234',
          name: '2',
          createDate: '11-11-1111',
          goal: {
            id: '123',
            periodicity: HabitPeriodicity.daily,
            value: 11,
            unitType: 'km'
          },
          status: HabitStatus.completed,
        },
        {
          id: '12334',
          name: '3',
          createDate: '11-11-1000',
          goal: {
            id: '123',
            periodicity: HabitPeriodicity.weekly,
            value: 11,
            unitType: 'sec'
          },
          status: HabitStatus.in_progress,
    
        },
        {
          id: '12355',
          name: '4',
          createDate: '11-11-1111',
          goal: {
            id: '123',
            periodicity: HabitPeriodicity.monthly,
            value: 10,
            unitType: 'km'
          },
          status: HabitStatus.completed,
        },
      ];
} 


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    loadHabits(): Observable<Habit[]> {
        return of(habitsMock());
    }

    addHabit(data: AddHabitForm): Observable<boolean> {
        return of(true);
    }

    deleteHabit(habitId: string): Observable<boolean> {
        return of(true);
    }

    signIn(data: any): Observable<string> {
        return of('123');

    }

    signUp(data: any): Observable<string> {
        return of('123');
    }

}