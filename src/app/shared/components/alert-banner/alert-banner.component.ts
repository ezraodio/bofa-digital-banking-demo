import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Alert, AlertType } from '../../models/account.model';

@Component({
  selector: 'app-alert-banner',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './alert-banner.component.html',
  styleUrls: ['./alert-banner.component.scss'],
})
export class AlertBannerComponent {
  @Input() alerts: Alert[] = [];
  @Input() maxVisible = 3;

  @Output() dismiss = new EventEmitter<Alert>();
  @Output() action = new EventEmitter<Alert>();

  get visibleAlerts(): Alert[] {
    return this.alerts
      .filter((a) => !a.read)
      .slice(0, this.maxVisible);
  }

  get unreadCount(): number {
    return this.alerts.filter((a) => !a.read).length;
  }

  getAlertIcon(type: AlertType): string {
    const icons: Record<AlertType, string> = {
      [AlertType.INFO]: 'info',
      [AlertType.WARNING]: 'warning',
      [AlertType.ERROR]: 'error',
      [AlertType.FRAUD]: 'shield',
      [AlertType.PROMOTION]: 'local_offer',
    };
    return icons[type] || 'info';
  }

  getAlertColor(type: AlertType): string {
    const colors: Record<AlertType, string> = {
      [AlertType.INFO]: 'primary',
      [AlertType.WARNING]: 'accent',
      [AlertType.ERROR]: 'warn',
      [AlertType.FRAUD]: 'warn',
      [AlertType.PROMOTION]: 'primary',
    };
    return colors[type] || 'primary';
  }

  onDismiss(alert: Alert): void {
    this.dismiss.emit(alert);
  }

  onAction(alert: Alert): void {
    this.action.emit(alert);
  }
}
