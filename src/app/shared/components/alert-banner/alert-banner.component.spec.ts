import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AlertBannerComponent } from './alert-banner.component';
import { Alert, AlertType } from '../../models/account.model';

describe('AlertBannerComponent', () => {
  let component: AlertBannerComponent;
  let fixture: ComponentFixture<AlertBannerComponent>;

  const mockAlerts: Alert[] = [
    {
      id: 'alert_001',
      type: AlertType.FRAUD,
      title: 'Suspicious Activity',
      message: 'Test alert',
      timestamp: new Date(),
      read: false,
    },
    {
      id: 'alert_002',
      type: AlertType.WARNING,
      title: 'Low Balance',
      message: 'Balance is low',
      timestamp: new Date(),
      read: false,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertBannerComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertBannerComponent);
    component = fixture.componentInstance;
    component.alerts = [...mockAlerts];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display unread alerts', () => {
    expect(component.visibleAlerts.length).toBe(2);
  });

  it('should return correct alert icon', () => {
    expect(component.getAlertIcon(AlertType.FRAUD)).toBe('shield');
    expect(component.getAlertIcon(AlertType.WARNING)).toBe('warning');
  });

  it('should emit dismiss event', () => {
    spyOn(component.dismiss, 'emit');
    component.onDismiss(mockAlerts[0]);
    expect(component.dismiss.emit).toHaveBeenCalledWith(mockAlerts[0]);
  });

  it('should count unread alerts', () => {
    expect(component.unreadCount).toBe(2);
  });
});
