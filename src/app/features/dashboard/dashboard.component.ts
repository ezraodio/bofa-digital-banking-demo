import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../core/auth/auth.service';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import {
  Account,
  AccountType,
  AccountStatus,
  Transaction,
  TransactionType,
  TransactionStatus,
  Alert,
  AlertType,
  UserProfile,
} from '../../shared/models/account.model';
import { NavSidebarComponent } from '../../shared/components/nav-sidebar/nav-sidebar.component';
import { NotificationBellComponent } from '../../shared/components/notification-bell/notification-bell.component';
import { AlertBannerComponent } from '../../shared/components/alert-banner/alert-banner.component';
import { BalanceDisplayComponent } from '../../shared/components/balance-display/balance-display.component';
import { QuickActionsComponent } from '../../shared/components/quick-actions/quick-actions.component';
import { AccountCardComponent } from '../../shared/components/account-card/account-card.component';
import { TransactionTableComponent } from '../../shared/components/transaction-table/transaction-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    NavSidebarComponent,
    NotificationBellComponent,
    AlertBannerComponent,
    BalanceDisplayComponent,
    QuickActionsComponent,
    AccountCardComponent,
    TransactionTableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: UserProfile | null = null;
  accounts: Account[] = [];
  recentTransactions: Transaction[] = [];
  alerts: Alert[] = [];
  sidebarCollapsed = false;

  constructor(
    private authService: AuthService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.loadMockData();
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
      'transaction_table',
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

  onToggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  onNavigate(route: string): void {
    this.analyticsService.trackUserAction('navigate', 'sidebar', route);
  }

  onLogout(): void {
    this.authService.logout();
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
      {
        id: 'acc_004',
        accountNumber: '9876543210',
        accountType: AccountType.INVESTMENT,
        name: 'Merrill Edge Portfolio',
        balance: 128750.32,
        availableBalance: 128750.32,
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
        accountId: 'acc_001',
        date: new Date('2024-01-13'),
        description: 'Automatic bill payment',
        amount: 150.0,
        type: TransactionType.PAYMENT,
        category: 'Utilities',
        status: TransactionStatus.POSTED,
        merchantName: 'Duke Energy',
      },
      {
        id: 'txn_006',
        accountId: 'acc_002',
        date: new Date('2024-01-12'),
        description: 'Transfer from checking',
        amount: 500.0,
        type: TransactionType.CREDIT,
        category: 'Transfer',
        status: TransactionStatus.POSTED,
      },
      {
        id: 'txn_007',
        accountId: 'acc_003',
        date: new Date('2024-01-11'),
        description: 'Restaurant dinner',
        amount: 86.5,
        type: TransactionType.DEBIT,
        category: 'Dining',
        status: TransactionStatus.POSTED,
        merchantName: 'The Capital Grille',
      },
      {
        id: 'txn_008',
        accountId: 'acc_001',
        date: new Date('2024-01-10'),
        description: 'Monthly service fee',
        amount: 12.0,
        type: TransactionType.FEE,
        category: 'Fees',
        status: TransactionStatus.POSTED,
      },
    ];

    this.alerts = [
      {
        id: 'alert_001',
        type: AlertType.FRAUD,
        title: 'Suspicious Activity Detected',
        message:
          'An unusual transaction of $892.00 was attempted on your Cash Rewards Visa.',
        timestamp: new Date(),
        read: false,
        actionUrl: '/alerts/alert_001',
      },
      {
        id: 'alert_002',
        type: AlertType.WARNING,
        title: 'Payment Due Soon',
        message:
          'Your Cash Rewards Visa minimum payment of $65.00 is due on Jan 25.',
        timestamp: new Date(),
        read: false,
        actionUrl: '/bill-pay',
      },
      {
        id: 'alert_003',
        type: AlertType.INFO,
        title: 'January Statement Available',
        message: 'Your Primary Checking statement is ready to view.',
        timestamp: new Date(),
        read: false,
      },
    ];
  }
}
