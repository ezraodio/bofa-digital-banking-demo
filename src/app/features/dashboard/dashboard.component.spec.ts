import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, DashboardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load mock accounts', () => {
    expect(component.accounts.length).toBe(4);
  });

  it('should load mock transactions', () => {
    expect(component.recentTransactions.length).toBe(8);
  });

  it('should load mock alerts', () => {
    expect(component.alerts.length).toBe(3);
  });

  it('should toggle sidebar', () => {
    expect(component.sidebarCollapsed).toBeFalse();
    component.onToggleSidebar();
    expect(component.sidebarCollapsed).toBeTrue();
  });

  it('should dismiss alert by marking as read', () => {
    component.onAlertDismiss(component.alerts[0]);
    expect(component.alerts[0].read).toBeTrue();
  });
});
