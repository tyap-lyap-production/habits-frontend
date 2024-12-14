import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [IndexComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
  });

  it('should navigate to "habits" if userId is in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('123');

    component.ngOnInit();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('habits');
  });

  it('should navigate to "start" if userId is not in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); 

    component.ngOnInit();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('start');
  });
});