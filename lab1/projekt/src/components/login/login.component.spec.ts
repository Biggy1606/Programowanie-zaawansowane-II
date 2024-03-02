import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
    }).compileComponents();
  });
  it('should create the login', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should render a form', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
  });
  it('should render a form with username and password fields', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('input[formControlName="username"]')
    ).toBeTruthy();
    expect(
      compiled.querySelector('input[formControlName="password"]')
    ).toBeTruthy();
  });
  it('should render a submit button', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
  });
  it('should render a reset button', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button[type="reset"]')).toBeTruthy();
  });
  it('should call the onSubmit method when the form is submitted', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'onSubmit');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('form')?.dispatchEvent(new Event('submit'));
    expect(app.onSubmit).toHaveBeenCalled();
  });
});
