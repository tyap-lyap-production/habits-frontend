import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class LoginGuard implements CanActivate {
  canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        return !window.localStorage.getItem('userId');
    }
}