import { Component, Input } from '@angular/core';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-balance-widget',
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
