import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alert } from '../../models/account.model';

@Component({
  selector: 'app-notification-bell',
  template: `
    <button
      mat-icon-button
      [matMenuTriggerFor]="notificationMenu"
      [matBadge]="unreadCount"
      [matBadgeHidden]="unreadCount === 0"
      matBadgeColor="warn"
      matBadgeSize="small"
    >
      <mat-icon>notifications</mat-icon>
    </button>

    <mat-menu #notificationMenu="matMenu" class="notification-menu">
      <div class="notification-header" (click)="$event.stopPropagation()">
        <span>Notifications</span>
        <button mat-button color="primary" *ngIf="unreadCount > 0" (click)="onMarkAllRead()">
          Mark all read
        </button>
      </div>
      <mat-divider></mat-divider>
      <button
        mat-menu-item
        *ngFor="let notification of notifications"
        [class.unread]="!notification.read"
        (click)="onNotificationClick(notification)"
      >
        <mat-icon>{{ notification.read ? 'notifications_none' : 'notifications_active' }}</mat-icon>
        <div class="notification-content">
          <span class="notification-title">{{ notification.title }}</span>
          <span class="notification-time">{{ notification.timestamp | date: 'short' }}</span>
        </div>
      </button>
      <div *ngIf="notifications.length === 0" class="empty-state">
        <mat-icon>notifications_off</mat-icon>
        <span>No notifications</span>
      </div>
    </mat-menu>
  `,
  styles: [
    `
      .notification-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px;
        font-weight: 600;
      }
      .notification-content {
        display: flex;
        flex-direction: column;
        margin-left: 8px;
      }
      .notification-title {
        font-size: 14px;
      }
      .notification-time {
        font-size: 11px;
        color: #999;
      }
      .unread {
        background: #f3f4f6;
      }
      .empty-state {
        padding: 24px;
        text-align: center;
        color: #999;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
    `,
  ],
})
export class NotificationBellComponent {
  @Input() notifications: Alert[] = [];

  @Output() notificationClick = new EventEmitter<Alert>();
  @Output() markAllRead = new EventEmitter<void>();

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  onNotificationClick(notification: Alert): void {
    this.notificationClick.emit(notification);
  }

  onMarkAllRead(): void {
    this.markAllRead.emit();
  }
}
