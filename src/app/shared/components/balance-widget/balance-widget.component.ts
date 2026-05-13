import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-balance-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule],
  templateUrl: './balance-widget.component.html',
  styleUrls: ['./balance-widget.component.scss'],
})
export class BalanceWidgetComponent {
  @Input() accounts: Account[] = [];
  @Input() showBreakdown = true;

  get totalBalance(): number {
    return this.accounts.reduce((sum, a) => sum + a.balance, 0);
  }

  get totalAvailable(): number {
    return this.accounts.reduce((sum, a) => sum + a.availableBalance, 0);
  }
}
