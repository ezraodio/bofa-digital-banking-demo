import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TrackEvent } from '../../decorators/track-event.decorator';

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="quick-actions">
      <h3>Quick Actions</h3>
      <div class="actions-grid">
        @for (action of actions; track action.id) {
          <button
            mat-raised-button
            [color]="action.color"
            (click)="onAction(action)"
            class="action-button"
          >
            <mat-icon>{{ action.icon }}</mat-icon>
            <span>{{ action.label }}</span>
          </button>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .quick-actions h3 {
        margin-bottom: 16px;
        color: #1a1a2e;
      }
      .actions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 12px;
      }
      .action-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 16px;
        min-height: 80px;
        border-radius: 12px !important;
      }
      .action-button mat-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
      }
    `,
  ],
})
export class QuickActionsComponent {
  @Output() actionSelected = new EventEmitter<QuickAction>();

  actions: QuickAction[] = [
    { id: 'transfer', label: 'Transfer', icon: 'swap_horiz', color: 'primary' },
    { id: 'pay-bill', label: 'Pay Bill', icon: 'receipt', color: 'primary' },
    { id: 'deposit', label: 'Deposit', icon: 'add_circle', color: 'accent' },
    { id: 'send-money', label: 'Send Money', icon: 'send', color: 'primary' },
    { id: 'atm-finder', label: 'Find ATM', icon: 'location_on', color: '' },
    { id: 'support', label: 'Support', icon: 'headset_mic', color: '' },
  ];

  @TrackEvent('quick_action_click', 'user_interaction')
  onAction(action: QuickAction): void {
    this.actionSelected.emit(action);
  }
}
