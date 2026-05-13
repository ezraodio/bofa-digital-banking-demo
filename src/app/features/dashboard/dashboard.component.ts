import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { AccountCardComponent } from '../../shared/components/account-card/account-card.component';
import { TransactionListComponent } from '../../shared/components/transaction-list/transaction-list.component';
import { AlertBannerComponent } from '../../shared/components/alert-banner/alert-banner.component';
import { BalanceWidgetComponent } from '../../shared/components/balance-widget/balance-widget.component';
import { ChipFilterComponent, ChipFilter } from '../../shared/components/chip-filter/chip-filter.component';
import {
  Account,
  AccountType,
  AccountStatus,
  Alert,
  AlertType,
  UserProfile,
} from '../../shared/models/account.model';
import {
  Transaction,
  TransactionType,
  TransactionStatus,
} from '../../shared/models/transaction.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AccountCardComponent,
    TransactionListComponent,
    AlertBannerComponent,
    BalanceWidgetComponent,
    ChipFilterComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: UserProfile | null = null;
  accounts: Account[] = [];
  recentTransactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  alerts: Alert[] = [];
  transactionFilters: ChipFilter[] = [
    { label: 'All', value: 'all', active: true },
    { label: 'Credits', value: 'CREDIT', active: false },
    { label: 'Debits', value: 'DEBIT', active: false },
    { label: 'Transfers', value: 'TRANSFER', active: false },
    { label: 'Payments', value: 'PAYMENT', active: false },
  ];

  constructor(
    private authService: AuthService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.loadMockData();
    this.filteredTransactions = [...this.recentTransactions];
    this.analyticsService.trackPageView('/dashboard', 'Dashboard');
  }

  onAccountViewDetails(account: Account): void {
    this.analyticsService.trackUserAction('view_details', 'account_card', account.id);
  }

  onAccountQuickTransfer(account: Account): void {
    this.analyticsService.trackTransaction(
      `transfer_init_${Date.now()}`,
      0,
      'transfer_initiated'
    );
  }

  onTransactionSelected(transaction: Transaction): void {
    this.analyticsService.trackUserAction(
      'select_transaction',
      'transaction_list',
      transaction.id
    );
  }

  onAlertDismiss(alert: Alert): void {
    const index = this.alerts.findIndex((a) => a.id === alert.id);
    if (index >= 0) {
      this.alerts[index] = { ...alert, read: true };
      this.alerts = [...this.alerts];
    }
  }

  onFilterChange(filters: ChipFilter[]): void {
    const activeFilters = filters.filter((f) => f.active && f.value !== 'all');
    if (activeFilters.length === 0) {
      this.filteredTransactions = [...this.recentTransactions];
    } else {
      const types = activeFilters.map((f) => f.value);
      this.filteredTransactions = this.recentTransactions.filter((tx) =>
        types.includes(tx.type)
      );
    }
  }

  private loadMockData(): void {
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
      {
        id: 'acc_003',
        accountNumber: '5555444433',
        accountType: AccountType.CREDIT_CARD,
        name: 'Cash Rewards Visa',
        balance: -2341.56,
        availableBalance: 7658.44,
        currency: 'USD',
        lastUpdated: new Date(),
        status: AccountStatus.ACTIVE,
      },
    ];

    this.recentTransactions = [
      {
        id: 'txn_001',
        accountId: 'acc_001',
        date: new Date('2024-01-15'),
        description: 'Morning coffee',
        amount: 5.75,
        type: TransactionType.DEBIT,
        category: 'Dining',
        status: TransactionStatus.POSTED,
        merchantName: 'Starbucks',
        referenceNumber: 'REF001',
      },
      {
        id: 'txn_002',
        accountId: 'acc_001',
        date: new Date('2024-01-15'),
        description: 'Bi-weekly payroll',
        amount: 4250.0,
        type: TransactionType.CREDIT,
        category: 'Income',
        status: TransactionStatus.POSTED,
        merchantName: 'Employer Inc.',
      },
      {
        id: 'txn_003',
        accountId: 'acc_001',
        date: new Date('2024-01-14'),
        description: 'Grocery shopping',
        amount: 127.43,
        type: TransactionType.DEBIT,
        category: 'Groceries',
        status: TransactionStatus.POSTED,
        merchantName: 'Whole Foods Market',
      },
      {
        id: 'txn_004',
        accountId: 'acc_001',
        date: new Date('2024-01-14'),
        description: 'Online purchase',
        amount: 49.99,
        type: TransactionType.DEBIT,
        category: 'Shopping',
        status: TransactionStatus.PENDING,
        merchantName: 'Amazon.com',
      },
      {
        id: 'txn_005',
        accountId: 'acc_002',
        date: new Date('2024-01-13'),
        description: 'Transfer from checking',
        amount: 500.0,
        type: TransactionType.CREDIT,
        category: 'Transfer',
        status: TransactionStatus.POSTED,
        merchantName: 'Internal Transfer',
      },
    ];

    this.alerts = [
      {
        id: 'alert_001',
        type: AlertType.FRAUD,
        title: 'Suspicious Activity Detected',
        message:
          'Unusual login attempt from a new device in Dallas, TX. Please verify.',
        date: new Date(),
        read: false,
        actionUrl: '/security',
      },
      {
        id: 'alert_002',
        type: AlertType.WARNING,
        title: 'Low Balance Alert',
        message:
          'Your Primary Checking balance is below $500.',
        date: new Date(),
        read: false,
      },
      {
        id: 'alert_003',
        type: AlertType.PROMOTION,
        title: 'New Savings Rate',
        message:
          'Earn 4.5% APY with a new BofA High Yield Savings account.',
        date: new Date(),
        read: false,
        actionUrl: '/offers',
      },
    ];
  }
}
