import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationBellComponent } from './notification-bell.component';
import { Alert, AlertType } from '../../models/account.model';

describe('NotificationBellComponent', () => {
  let component: NotificationBellComponent;
  let fixture: ComponentFixture<NotificationBellComponent>;

  const mockNotifications: Alert[] = [
    {
      id: '1',
      type: AlertType.FRAUD,
      title: 'Suspicious Activity',
      message: 'Check your account',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      type: AlertType.INFO,
      title: 'Statement Ready',
      message: 'View your statement',
      timestamp: new Date(),
      read: true,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, NotificationBellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationBellComponent);
    component = fixture.componentInstance;
    component.notifications = mockNotifications;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should count unread notifications', () => {
    expect(component.unreadCount).toBe(1);
  });

  it('should emit notificationClick event', () => {
    spyOn(component.notificationClick, 'emit');
    component.onNotificationClick(mockNotifications[0]);
    expect(component.notificationClick.emit).toHaveBeenCalledWith(
      mockNotifications[0]
    );
  });

  it('should emit markAllRead event', () => {
    spyOn(component.markAllRead, 'emit');
    component.onMarkAllRead();
    expect(component.markAllRead.emit).toHaveBeenCalled();
  });
});
