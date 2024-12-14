import { inject, Injectable } from "@angular/core";
import { Habit, HabitStatus } from "../../habits-list/habits-list.component";
import { map, Observable } from "rxjs";
import { AddHabitForm } from "../../habits-list/habits-list.service";
import { HttpClient } from "@angular/common/http";


interface HabitsDto {
  readonly id: string;
  readonly name: string;
  readonly createDate: string;
  readonly goal: {
    readonly id: string;
    readonly unitType: string;
    readonly periodicity: string;
    readonly value: number;
  };
  readonly status: HabitStatus;
}

interface HabitsDtoCreate {
  readonly name: string;
  readonly createDate: string;
  readonly goal: {
    readonly unitType: string;
    readonly periodicity: string;
    readonly value: number;
  };
  readonly status: number;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
  userId: string | null;
  private readonly httpClient = inject(HttpClient);
  private readonly api = 'http://127.0.0.1:8000'

  constructor() {
      this.userId = window.localStorage.getItem('userId');
  }

    loadHabits(): Observable<Habit[]> {
      return this.httpClient.get<HabitsDto[]>(`${this.api}/habits?user_id=${this.userId}`).pipe(
        map(habits => habits.map(habit => ({
          ...habit,
          status: habit.status ? HabitStatus.in_progress : HabitStatus.completed,
        } as Habit)))
      );
    }

    addHabit(data: AddHabitForm): Observable<{id: string}> {
      const currentDate = new Date();
  
      // Set the time to midnight (00:00:00) to ensure it's only the date without time
      currentDate.setHours(0, 0, 0, 0);

      // Format the date to an ISO string (it will be in the format "YYYY-MM-DDT00:00:00.000Z")
      const formattedDate = currentDate.toISOString().split('T')[0];  // "YYYY-MM-DD"
      const habitDtoCreate: HabitsDtoCreate = {
        name: data.name,
        createDate: formattedDate,  // Use current date and time in ISO format
        goal: {
          unitType: data.unitType,
          periodicity: data.periodicity.toString(),  // Ensure periodicity is in string format
          value: data.goalValue,
        },
        status: 0  // Default status, you can adjust this as needed
      };
      return this.httpClient.post<{id: string}>(`${this.api}/habits?user_id=${this.userId}`, habitDtoCreate);
    }

    deleteHabit(habitId: string): Observable<void> {
      return this.httpClient.delete<void>(`${this.api}/habits/${habitId}`);
    }

    signIn(data: any): Observable<string> {
      return this.httpClient.post<string>(`${this.api}/user/login`, data);
    }

    signUp(data: any): Observable<string> {
      return this.httpClient.post<string>(`${this.api}/user`, data);
    }

    completedHabit(habitId: string): Observable<any> {
      return this.httpClient.put<{id: string}>(`${this.api}/habits/${habitId}`, {
        status: HabitStatus.completed
      });
    }

}