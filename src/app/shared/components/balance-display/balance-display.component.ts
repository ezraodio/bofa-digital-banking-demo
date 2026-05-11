import { Component, Input } from '@angular/core';
import { Account, AccountType } from '../../models/account.model';

@Component({
  selector: 'app-balance-display',
  template: `
    <div class="balance-overview">
      <mat-card class="total-card">
        <mat-card-header>
          <mat-icon mat-card-avatar>account_balance_wallet</mat-icon>
          <mat-card-title>Total Balance</mat-card-title>
          <mat-card-subtitle>Across all accounts</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="total-amount">{{ totalBalance | currency }}</div>
          <div class="breakdown" *ngIf="showBreakdown">
            <div class="breakdown-item" *ngFor="let item of balanceBreakdown">
              <span class="breakdown-label">{{ item.label }}</span>
              <span class="breakdown-value">{{ item.amount | currency }}</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .total-card {
        border-radius: 12px;
        background: linear-gradient(135deg, #1a1a2e, #16213e);
        color: #fff;
      }
      .total-card mat-card-title,
      .total-card mat-card-subtitle {
        color: #fff !important;
      }
      .total-card mat-card-subtitle {
        opacity: 0.7;
      }
      .total-amount {
        font-size: 36px;
        font-weight: 800;
        margin: 16px 0;
      }
      .breakdown {
        display: flex;
        gap: 24px;
        flex-wrap: wrap;
        margin-top: 8px;
      }
      .breakdown-item {
        display: flex;
        flex-direction: column;
      }
      .breakdown-label {
        font-size: 12px;
        opacity: 0.7;
      }
      .breakdown-value {
        font-size: 18px;
        font-weight: 600;
      }
    `,
  ],
})
export class BalanceDisplayComponent {
  @Input() accounts: Account[] = [];
  @Input() showBreakdown = true;

  get totalBalance(): number {
    return this.accounts.reduce((sum, acc) => sum + acc.availableBalance, 0);
  }

  get balanceBreakdown(): { label: string; amount: number }[] {
    const groups = new Map<AccountType, number>();

    for (const account of this.accounts) {
      const current = groups.get(account.accountType) || 0;
      groups.set(account.accountType, current + account.availableBalance);
    }

    const labels: Record<AccountType, string> = {
      [AccountType.CHECKING]: 'Checking',
      [AccountType.SAVINGS]: 'Savings',
      [AccountType.CREDIT_CARD]: 'Credit',
      [AccountType.INVESTMENT]: 'Investment',
      [AccountType.RETIREMENT]: 'Retirement',
    };

    return Array.from(groups.entries()).map(([type, amount]) => ({
      label: labels[type] || type,
      amount,
    }));
  }
}
