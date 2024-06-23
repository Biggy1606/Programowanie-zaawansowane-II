import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from '../menu/menu.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardComponent, MenuComponent],
      providers: [  
        AuthService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the menu after logging in', () => {
    authService.login('admin', 'admin');
    fixture.detectChanges();

    const menu = fixture.debugElement.nativeElement.querySelector('app-menu');
    expect(menu).toBeTruthy();
  });
  it('should hide the menu and redirect to login after logging out', () => {
    spyOn(authService, 'logout').and.callThrough();
    fixture.detectChanges();

    component.logout();
    fixture.detectChanges();

    const menu = fixture.debugElement.nativeElement.querySelector('app-menu');
    expect(menu).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
