import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
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
      name: 'Checking',
      balance: 1000,
      availableBalance: 900,
      currency: 'USD',
      lastUpdated: new Date(),
      status: AccountStatus.ACTIVE,
    },
    {
      id: 'acc_002',
      accountNumber: '7890123456',
      accountType: AccountType.SAVINGS,
      name: 'Savings',
      balance: 2000,
      availableBalance: 2000,
      currency: 'USD',
      lastUpdated: new Date(),
      status: AccountStatus.ACTIVE,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceWidgetComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceWidgetComponent);
    component = fixture.componentInstance;
    component.accounts = mockAccounts;
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total balance', () => {
    expect(component.totalBalance).toBe(3000);
  });

  it('should calculate total available', () => {
    expect(component.totalAvailable).toBe(2900);
  });
});
