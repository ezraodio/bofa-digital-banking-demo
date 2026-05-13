import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TransferFormComponent } from './transfer-form.component';
import { Account, AccountType, AccountStatus } from '../../models/account.model';

describe('TransferFormComponent', () => {
  let component: TransferFormComponent;
  let fixture: ComponentFixture<TransferFormComponent>;

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
      imports: [TransferFormComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferFormComponent);
    component = fixture.componentInstance;
    component.accounts = mockAccounts;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.transferForm.valid).toBeFalse();
  });

  it('should require fromAccount', () => {
    const fromAccount = component.transferForm.controls['fromAccount'];
    expect(fromAccount.valid).toBeFalse();
    expect(fromAccount.errors?.['required']).toBeTrue();
  });

  it('should require toAccount', () => {
    const toAccount = component.transferForm.controls['toAccount'];
    expect(toAccount.valid).toBeFalse();
    expect(toAccount.errors?.['required']).toBeTrue();
  });

  it('should require amount greater than 0', () => {
    const amount = component.transferForm.controls['amount'];
    amount.setValue(0);
    expect(amount.valid).toBeFalse();
  });

  it('should have a valid form when all fields are filled', () => {
    component.transferForm.patchValue({
      fromAccount: 'acc_001',
      toAccount: '9876543210',
      amount: 100,
    });
    expect(component.transferForm.valid).toBeTrue();
  });

  it('should emit transferSubmit on valid submit', () => {
    spyOn(component.transferSubmit, 'emit');
    component.transferForm.patchValue({
      fromAccount: 'acc_001',
      toAccount: '9876543210',
      amount: 250,
    });
    component.onSubmit();
    expect(component.transferSubmit.emit).toHaveBeenCalled();
  });

  it('should not emit on invalid submit', () => {
    spyOn(component.transferSubmit, 'emit');
    component.onSubmit();
    expect(component.transferSubmit.emit).not.toHaveBeenCalled();
  });

  it('should disable submit button when form is invalid', () => {
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });
});
