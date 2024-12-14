import { inject, Injectable } from "@angular/core";
import { Habit, HabitStatus } from "../../habits-list/habits-list.component";
import { Observable } from "rxjs";
import { AddHabitForm } from "../../habits-list/habits-list.service";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class ApiService {
  userId: string | null;
  private readonly httpClient = inject(HttpClient);
  private readonly api = 'http://127.0.0.1'

  constructor() {
      this.userId = window.localStorage.getItem('userId');
  }

    loadHabits(): Observable<Habit[]> {
      return this.httpClient.get<Habit[]>(`${this.api}/habits?user_id=${this.userId}`);
    }

    addHabit(data: AddHabitForm): Observable<{id: string}> {
      return this.httpClient.post<{id: string}>(`${this.api}/habits`, data);
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