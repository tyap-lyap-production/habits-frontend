import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { AuthenticationService } from '../shared/service/authentication.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['signUp']);

    await TestBed.configureTestingModule({
      imports: [RegistrationComponent],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the spy service', () => {
    expect(authServiceSpy).toBeTruthy(); // Проверка на существование
    expect(typeof authServiceSpy.signUp).toBe('function'); // Проверка наличия метода
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
      spyOn(component, 'signUp');
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
      expect(component.signUp).toHaveBeenCalled();
  });

  it('should call signUp on valid form submission', () => {
    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('ValidPassword123!');

    component.signUp();
  
    expect(authServiceSpy.signUp).toHaveBeenCalledTimes(1);

    expect(authServiceSpy.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'ValidPassword123!'
    });
  });

  it('should not call signUp on invalid form submission', () => {
      component.form.controls['email'].setValue('');
      component.form.controls['password'].setValue('');

      component.signUp();

      expect(authServiceSpy.signUp).not.toHaveBeenCalled();
      expect(component.form.valid).toBeFalse();
  });

  it('should mark all fields as touched on invalid submission', () => {
      component.form.controls['email'].setValue('');
      component.form.controls['password'].setValue('');

      component.signUp();

      expect(component.form.touched).toBeTrue();
  });
});
