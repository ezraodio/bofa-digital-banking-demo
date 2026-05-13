import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

import { BalanceWidgetComponent } from './balance-widget.component';
import { Account, AccountType, AccountStatus } from '../../models/account.model';

describe('BalanceWidgetComponent', () => {
  let component: BalanceWidgetComponent;
  let fixture: ComponentFixture<BalanceWidgetComponent>;

  const mockAccounts: Account[] = [
    {
      id: 'acc_001',
      accountNumber: '4521783690',
      accountType: AccountType.CHECKING,
      name: 'Primary Checking',
      balance: 12543.87,
      availableBalance: 12500.00,
      currency: 'USD',
      lastUpdated: new Date(),
      status: AccountStatus.ACTIVE,
    },
    {
      id: 'acc_002',
      accountNumber: '7890123456',
      accountType: AccountType.SAVINGS,
      name: 'Emergency Fund',
      balance: 45000.00,
      availableBalance: 45000.00,
      currency: 'USD',
      lastUpdated: new Date(),
      status: AccountStatus.ACTIVE,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BalanceWidgetComponent],
      imports: [MatCardModule, MatDividerModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceWidgetComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total balance', () => {
    component.accounts = mockAccounts;
    expect(component.totalBalance).toBe(57543.87);
  });

  it('should calculate total available', () => {
    component.accounts = mockAccounts;
    expect(component.totalAvailable).toBe(57500.00);
  });

  it('should display account breakdown when showBreakdown is true', () => {
    component.accounts = mockAccounts;
    component.showBreakdown = true;
    fixture.detectChanges();
    const breakdownItems = fixture.nativeElement.querySelectorAll('.breakdown-item');
    expect(breakdownItems.length).toBe(2);
  });

  it('should hide breakdown when showBreakdown is false', () => {
    component.accounts = mockAccounts;
    component.showBreakdown = false;
    fixture.detectChanges();
    const breakdown = fixture.nativeElement.querySelector('.breakdown');
    expect(breakdown).toBeFalsy();
  });

  it('should handle empty accounts', () => {
    component.accounts = [];
    expect(component.totalBalance).toBe(0);
    expect(component.totalAvailable).toBe(0);
  });
});
