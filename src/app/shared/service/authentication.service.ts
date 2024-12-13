import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { catchError, EMPTY, take } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationService {
    readonly apiService = inject(ApiService);
    readonly router = inject(Router);

    signIn(data: any) {
        this.apiService.signIn(data).pipe(
            take(1),
            catchError(_ => EMPTY)
        ).subscribe(
            res => {
                window.localStorage.setItem('userId', res);
                this.router.navigateByUrl('/habits')
            }
        )
    }

    signUp(data: any) {
        this.apiService.signUp(data).pipe(
            take(1),
            catchError(_ => EMPTY)
        ).subscribe(
            res => {
                window.localStorage.setItem('userId', res);
                this.router.navigateByUrl('/habits')
            }
        )
    }
}