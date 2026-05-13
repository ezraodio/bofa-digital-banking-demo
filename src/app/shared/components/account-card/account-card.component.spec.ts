import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AccountCardComponent } from './account-card.component';
import {
  Account,
  AccountType,
  AccountStatus,
} from '../../models/account.model';

describe('AccountCardComponent', () => {
  let component: AccountCardComponent;
  let fixture: ComponentFixture<AccountCardComponent>;

  const mockAccount: Account = {
    id: 'acc_001',
    accountNumber: '1234567890',
    accountType: AccountType.CHECKING,
    name: 'Primary Checking',
    balance: 5432.1,
    availableBalance: 5400.0,
    currency: 'USD',
    lastUpdated: new Date('2024-01-15'),
    status: AccountStatus.ACTIVE,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountCardComponent],
      imports: [MatCardModule, MatIconModule, MatButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountCardComponent);
    component = fixture.componentInstance;
    component.account = mockAccount;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display account type label', () => {
    expect(component.accountTypeLabel).toBe('Checking');
  });

  it('should mask account number', () => {
    expect(component.maskedAccountNumber).toBe('••••7890');
  });

  it('should return correct icon for account type', () => {
    expect(component.accountIcon).toBe('account_balance');
  });

  it('should identify active accounts', () => {
    expect(component.isActive).toBeTrue();
  });

  it('should emit viewDetails event', () => {
    spyOn(component.viewDetails, 'emit');
    component.onViewDetails();
    expect(component.viewDetails.emit).toHaveBeenCalledWith(mockAccount);
  });

  it('should emit quickTransfer event', () => {
    spyOn(component.quickTransfer, 'emit');
    component.onQuickTransfer();
    expect(component.quickTransfer.emit).toHaveBeenCalledWith(mockAccount);
  });

  it('should show inactive status for frozen accounts', () => {
    component.account = {
      ...mockAccount,
      status: AccountStatus.FROZEN,
    };
    fixture.detectChanges();
    expect(component.isActive).toBeFalse();
  });
});
