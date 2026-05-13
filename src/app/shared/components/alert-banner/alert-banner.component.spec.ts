import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertBannerComponent } from './alert-banner.component';
import { Alert, AlertType } from '../../models/account.model';

describe('AlertBannerComponent', () => {
  let component: AlertBannerComponent;
  let fixture: ComponentFixture<AlertBannerComponent>;

  const mockAlerts: Alert[] = [
    {
      id: 'alert_001',
      type: AlertType.FRAUD,
      title: 'Suspicious Activity Detected',
      message: 'Unusual transaction on your checking account',
      timestamp: new Date(),
      read: false,
      actionUrl: '/alerts/alert_001',
    },
    {
      id: 'alert_002',
      type: AlertType.INFO,
      title: 'Statement Ready',
      message: 'Your January statement is available',
      timestamp: new Date(),
      read: false,
    },
    {
      id: 'alert_003',
      type: AlertType.WARNING,
      title: 'Low Balance',
      message: 'Your savings account balance is below $100',
      timestamp: new Date(),
      read: true,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertBannerComponent);
    component = fixture.componentInstance;
    component.alerts = mockAlerts;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter unread alerts', () => {
    expect(component.visibleAlerts.length).toBe(2);
  });

  it('should count unread alerts', () => {
    expect(component.unreadCount).toBe(2);
  });

  it('should return correct icon for alert type', () => {
    expect(component.getAlertIcon(AlertType.FRAUD)).toBe('shield');
    expect(component.getAlertIcon(AlertType.INFO)).toBe('info');
  });

  it('should emit dismiss event', () => {
    spyOn(component.dismiss, 'emit');
    component.onDismiss(mockAlerts[0]);
    expect(component.dismiss.emit).toHaveBeenCalledWith(mockAlerts[0]);
  });

  it('should emit action event', () => {
    spyOn(component.action, 'emit');
    component.onAction(mockAlerts[0]);
    expect(component.action.emit).toHaveBeenCalledWith(mockAlerts[0]);
  });
});
