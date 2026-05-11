import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Account, AccountType, AccountStatus } from '../../models/account.model';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent {
  @Input() account!: Account;
  @Input() showActions = true;
  @Input() compact = false;

  @Output() viewDetails = new EventEmitter<Account>();
  @Output() quickTransfer = new EventEmitter<Account>();

  get accountTypeLabel(): string {
    const labels: Record<AccountType, string> = {
      [AccountType.CHECKING]: 'Checking',
      [AccountType.SAVINGS]: 'Savings',
      [AccountType.CREDIT_CARD]: 'Credit Card',
      [AccountType.INVESTMENT]: 'Investment',
      [AccountType.RETIREMENT]: 'Retirement',
    };
    return labels[this.account.accountType] || 'Account';
  }

  get accountIcon(): string {
    const icons: Record<AccountType, string> = {
      [AccountType.CHECKING]: 'account_balance',
      [AccountType.SAVINGS]: 'savings',
      [AccountType.CREDIT_CARD]: 'credit_card',
      [AccountType.INVESTMENT]: 'trending_up',
      [AccountType.RETIREMENT]: 'beach_access',
    };
    return icons[this.account.accountType] || 'account_balance';
  }

  get isActive(): boolean {
    return this.account.status === AccountStatus.ACTIVE;
  }

  get maskedAccountNumber(): string {
    const num = this.account.accountNumber;
    return `••••${num.substring(num.length - 4)}`;
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.account);
  }

  onQuickTransfer(): void {
    this.quickTransfer.emit(this.account);
  }
}
