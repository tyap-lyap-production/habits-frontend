import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationComponent } from './authentication.component';
import { AuthenticationService } from '../shared/service/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['signIn']);

    await TestBed.configureTestingModule({
      imports: [AuthenticationComponent, HttpClientTestingModule],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the spy service', () => {
    expect(authServiceSpy).toBeTruthy();
    expect(typeof authServiceSpy.signIn).toBe('function');
  });
  
  it('should initialize the form with empty values', () => {
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('password')?.value).toBe('');
  });

  it('should make the "email" control required', () => {
      let control = component.form.get('email');
      control?.setValue(null);
      expect(control?.valid).toBeFalsy();
  });

  it('should make the "password" control required', () => {
      let control = component.form.get('password');
      control?.setValue(null);
      expect(control?.valid).toBeFalsy();
  });

  it('should call signUp method on button click', () => {
      spyOn(component, 'signIn');
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      expect(component.signIn).toHaveBeenCalled();
  });

  it('should call signIn on valid form submission', () => {
    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('ValidPassword123!');

    component.signIn();
  
    expect(authServiceSpy.signIn).toHaveBeenCalledTimes(1);

    expect(authServiceSpy.signIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'ValidPassword123!'
    });
  });

  it('should not call signIn on invalid form submission', () => {
      component.form.controls['email'].setValue('');
      component.form.controls['password'].setValue('');
      component.signIn();

      expect(authServiceSpy.signIn).not.toHaveBeenCalled();
      expect(component.form.valid).toBeFalse();
  });

  it('should mark all fields as touched on invalid submission', () => {
      component.form.controls['email'].setValue('');
      component.form.controls['password'].setValue('');

      component.signIn();

      expect(component.form.touched).toBeTrue();
  });
});
