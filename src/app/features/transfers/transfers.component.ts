import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../core/services/auth.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { TransferRequest } from '../../shared/components/transfer-form/transfer-form.component';
import { AccountCardComponent } from '../../shared/components/account-card/account-card.component';
import { TransferFormComponent } from '../../shared/components/transfer-form/transfer-form.component';
import {
  Account,
  AccountType,
  AccountStatus,
} from '../../shared/models/account.model';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    AccountCardComponent,
    TransferFormComponent,
  ],
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
})
export class TransfersComponent implements OnInit {
  accounts: Account[] = [];
  selectedAccount: Account | null = null;
  transferSuccess = false;

  constructor(
    private authService: AuthService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.analyticsService.trackPageView('/transfers', 'Transfers');
    this.loadAccounts();
  }

  onTransferSubmit(transfer: TransferRequest): void {
    this.analyticsService.trackTransaction(
      `transfer_${Date.now()}`,
      transfer.amount,
      'transfer'
    );
    this.transferSuccess = true;
    setTimeout(() => (this.transferSuccess = false), 3000);
  }

  selectAccount(account: Account): void {
    this.selectedAccount = account;
  }

  private loadAccounts(): void {
    this.accounts = [
      {
        id: 'acc_001',
        accountNumber: '4521783690',
        accountType: AccountType.CHECKING,
        name: 'Primary Checking',
        balance: 12543.87,
        availableBalance: 12500.0,
        currency: 'USD',
        lastUpdated: new Date(),
        status: AccountStatus.ACTIVE,
      },
      {
        id: 'acc_002',
        accountNumber: '7890123456',
        accountType: AccountType.SAVINGS,
        name: 'Emergency Fund',
        balance: 45000.0,
        availableBalance: 45000.0,
        currency: 'USD',
        lastUpdated: new Date(),
        status: AccountStatus.ACTIVE,
      },
    ];
    this.selectedAccount = this.accounts[0];
  }
}
