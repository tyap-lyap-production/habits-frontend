import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    guard = new AuthGuard();
  });

  it('should allow access if userId is in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('some-user-id');

    const result = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);
    expect(result).toBe(true);
  });

  it('should deny access if userId is not in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);
    expect(result).toBe(false);
  });
});