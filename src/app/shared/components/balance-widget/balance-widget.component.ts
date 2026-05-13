import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-balance-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule],
  templateUrl: './balance-widget.component.html',
  styleUrls: ['./balance-widget.component.scss'],
})
export class BalanceWidgetComponent implements OnChanges {
  @Input() accounts: Account[] = [];
  @Input() showBreakdown = false;

  totalBalance = 0;
  totalAvailable = 0;

  ngOnChanges(): void {
    this.totalBalance = this.accounts.reduce((sum, a) => sum + a.balance, 0);
    this.totalAvailable = this.accounts.reduce(
      (sum, a) => sum + a.availableBalance,
      0
    );
  }
}
