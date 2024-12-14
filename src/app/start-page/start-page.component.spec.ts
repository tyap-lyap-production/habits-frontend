import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StartPageComponent } from './start-page.component';
import { Router } from '@angular/router';

describe('StartPageComponent', () => {
  let component: StartPageComponent;
  let fixture: ComponentFixture<StartPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartPageComponent, RouterTestingModule.withRoutes([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a sign-in button', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.btn__enter');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Войти');
  });

  it('should contain a sign-up button', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.btn__regist');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Зарегистрироваться');
  });

  it('shoul redirect on /sign-in when click sign-in button', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.btn__enter');
    spyOn(router, 'navigate')

    button.click();

    expect(router.navigate).toHaveBeenCalledWith(['/sign-in']);
  });

  it('shoul redirect on /sign-up when click sign-up button', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.btn__regist');
    spyOn(router, 'navigate')

    button.click();

    expect(router.navigate).toHaveBeenCalledWith(['/sign-up']);
  });
});
