import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
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
      availableBalance: 12500.0,
      currency: 'USD',
      lastUpdated: new Date(),
      status: AccountStatus.ACTIVE,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferFormComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferFormComponent);
    component = fixture.componentInstance;
    component.accounts = mockAccounts;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.transferForm).toBeTruthy();
    expect(component.transferForm.get('fromAccount')).toBeTruthy();
    expect(component.transferForm.get('toAccount')).toBeTruthy();
    expect(component.transferForm.get('amount')).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    expect(component.transferForm.valid).toBeFalse();
  });

  it('should emit on valid submit', () => {
    spyOn(component.transferSubmit, 'emit');
    component.transferForm.patchValue({
      fromAccount: 'acc_001',
      toAccount: '9876543210',
      amount: 100,
    });
    component.onSubmit();
    expect(component.transferSubmit.emit).toHaveBeenCalled();
  });

  it('should not emit on invalid submit', () => {
    spyOn(component.transferSubmit, 'emit');
    component.onSubmit();
    expect(component.transferSubmit.emit).not.toHaveBeenCalled();
  });
});
