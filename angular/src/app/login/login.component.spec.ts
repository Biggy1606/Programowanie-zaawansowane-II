import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
  it('should display success message when login is successful', () => {
    component.loginForm.setValue({
      username: 'admin',
      password: 'password',
    });
    component.onSubmit();
    fixture.detectChanges(); // Ensure the DOM is updated
    expect(component.loginSuccess).toBe(true); // Add this line
    const successMessage = fixture.debugElement.query(By.css('.success'));
    expect(successMessage).toBeTruthy();
    expect(successMessage.nativeElement.textContent).toContain(
      'You are logged in'
    );
  });
  it('should display error message when login fails', () => {
    component.loginForm.setValue({
      username: 'admin',
      password: 'wrongpassword',
    });
    component.onSubmit();
    fixture.detectChanges(); // Ensure the DOM is updated
    const errorMessage = fixture.debugElement.query(By.css('.error'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain(
      'Invalid credentials'
    );
  });
});
