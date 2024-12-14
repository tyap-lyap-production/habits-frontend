import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;

  beforeEach(() => {
    guard = new LoginGuard();
  });

  it('should deny access if userId is in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('some-user-id');

    const result = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);
    expect(result).toBe(false);
  });

  it('should allow access if userId is not in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);
    expect(result).toBe(true);
  });
});