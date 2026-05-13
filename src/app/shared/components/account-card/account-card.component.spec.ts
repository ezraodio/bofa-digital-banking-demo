import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AccountCardComponent } from './account-card.component';
import { Account, AccountType, AccountStatus } from '../../models/account.model';

describe('AccountCardComponent', () => {
  let component: AccountCardComponent;
  let fixture: ComponentFixture<AccountCardComponent>;

  const mockAccount: Account = {
    id: 'acc_001',
    accountNumber: '4521783690',
    accountType: AccountType.CHECKING,
    name: 'Primary Checking',
    balance: 12543.87,
    availableBalance: 12500.0,
    currency: 'USD',
    lastUpdated: new Date(),
    status: AccountStatus.ACTIVE,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCardComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountCardComponent);
    component = fixture.componentInstance;
    component.account = mockAccount;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display account name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Primary Checking');
  });

  it('should show correct account type label', () => {
    expect(component.accountTypeLabel).toBe('Checking');
  });

  it('should show correct account icon', () => {
    expect(component.accountIcon).toBe('account_balance');
  });

  it('should mask account number', () => {
    expect(component.maskedAccountNumber).toBe('••••3690');
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
});
