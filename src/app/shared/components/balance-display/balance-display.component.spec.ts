import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceDisplayComponent } from './balance-display.component';
import { Account, AccountType, AccountStatus } from '../../models/account.model';

describe('BalanceDisplayComponent', () => {
  let component: BalanceDisplayComponent;
  let fixture: ComponentFixture<BalanceDisplayComponent>;

  const mockAccounts: Account[] = [
    {
      id: '1',
      accountNumber: '1234',
      accountType: AccountType.CHECKING,
      name: 'Checking',
      balance: 5000,
      availableBalance: 4800,
      currency: 'USD',
      lastUpdated: new Date(),
      status: AccountStatus.ACTIVE,
    },
    {
      id: '2',
      accountNumber: '5678',
      accountType: AccountType.SAVINGS,
      name: 'Savings',
      balance: 15000,
      availableBalance: 15000,
      currency: 'USD',
      lastUpdated: new Date(),
      status: AccountStatus.ACTIVE,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceDisplayComponent);
    component = fixture.componentInstance;
    component.accounts = mockAccounts;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total balance', () => {
    expect(component.totalBalance).toBe(19800);
  });

  it('should generate balance breakdown', () => {
    const breakdown = component.balanceBreakdown;
    expect(breakdown.length).toBe(2);
    expect(breakdown[0].label).toBe('Checking');
    expect(breakdown[0].amount).toBe(4800);
  });
});
