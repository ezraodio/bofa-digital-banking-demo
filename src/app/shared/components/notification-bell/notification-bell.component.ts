import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { Alert } from '../../models/account.model';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
  ],
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
        @if (unreadCount > 0) {
          <button mat-button color="primary" (click)="onMarkAllRead()">
            Mark all read
          </button>
        }
      </div>
      <mat-divider></mat-divider>
      @for (notification of notifications; track notification.id) {
        <button
          mat-menu-item
          [class.unread]="!notification.read"
          (click)="onNotificationClick(notification)"
        >
          <mat-icon>{{ notification.read ? 'notifications_none' : 'notifications_active' }}</mat-icon>
          <div class="notification-content">
            <span class="notification-title">{{ notification.title }}</span>
            <span class="notification-time">{{ notification.timestamp | date: 'short' }}</span>
          </div>
        </button>
      }
      @if (notifications.length === 0) {
        <div class="empty-state">
          <mat-icon>notifications_off</mat-icon>
          <span>No notifications</span>
        </div>
      }
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
