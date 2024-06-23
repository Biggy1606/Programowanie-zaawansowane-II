import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from '../menu/menu.component';
import { AuthService } from '../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, MenuComponent],
      providers: [AuthService],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    authService.login(); // Zasymuluj zalogowanie
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the menu after logging in', () => {
    const menu = fixture.debugElement.nativeElement.querySelector('app-menu');
    expect(menu).toBeTruthy();
  });
  it('should hide the menu after logging out', () => {
    authService.logout(); // Zasymuluj wylogowanie
    fixture.detectChanges(); // Zaktualizuj widok
    const menu = fixture.debugElement.nativeElement.querySelector('app-menu');
    expect(menu).toBeFalsy();
  });
});
