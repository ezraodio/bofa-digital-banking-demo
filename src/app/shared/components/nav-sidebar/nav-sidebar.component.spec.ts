import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavSidebarComponent } from './nav-sidebar.component';
import { UserProfile } from '../../models/account.model';

describe('NavSidebarComponent', () => {
  let component: NavSidebarComponent;
  let fixture: ComponentFixture<NavSidebarComponent>;

  const mockUser: UserProfile = {
    id: 'usr_001',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '555-0123',
    lastLogin: new Date(),
    mfaEnabled: true,
    preferredLanguage: 'en-US',
    notificationPreferences: {
      email: true,
      sms: true,
      push: true,
      fraudAlerts: true,
      balanceAlerts: true,
      transactionAlerts: false,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, NavSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavSidebarComponent);
    component = fixture.componentInstance;
    component.user = mockUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user initials', () => {
    expect(component.userInitials).toBe('JS');
  });

  it('should display user full name', () => {
    expect(component.userFullName).toBe('Jane Smith');
  });

  it('should display ? for guest initials', () => {
    component.user = null;
    expect(component.userInitials).toBe('?');
  });

  it('should have correct number of nav items', () => {
    expect(component.navItems.length).toBe(7);
  });

  it('should emit navigate event', () => {
    spyOn(component.navigate, 'emit');
    component.onNavigate('/dashboard');
    expect(component.navigate.emit).toHaveBeenCalledWith('/dashboard');
  });

  it('should emit logout event', () => {
    spyOn(component.logout, 'emit');
    component.onLogout();
    expect(component.logout.emit).toHaveBeenCalled();
  });

  it('should emit toggleCollapse event', () => {
    spyOn(component.toggleCollapse, 'emit');
    component.onToggleCollapse();
    expect(component.toggleCollapse.emit).toHaveBeenCalled();
  });
});
