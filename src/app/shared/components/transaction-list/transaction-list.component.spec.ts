import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TransactionListComponent } from './transaction-list.component';
import { Transaction, TransactionType, TransactionStatus } from '../../models/transaction.model';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;

  const mockTransactions: Transaction[] = [
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
    },
    {
      id: 'txn_002',
      accountId: 'acc_001',
      date: new Date('2024-01-15'),
      description: 'Payroll deposit',
      amount: 4250.0,
      type: TransactionType.CREDIT,
      category: 'Income',
      status: TransactionStatus.POSTED,
      merchantName: 'Employer Inc.',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionListComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    component.transactions = mockTransactions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display transactions', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Morning coffee');
    expect(compiled.textContent).toContain('Payroll deposit');
  });

  it('should emit transactionSelected on click', () => {
    spyOn(component.transactionSelected, 'emit');
    component.onSelect(mockTransactions[0]);
    expect(component.transactionSelected.emit).toHaveBeenCalledWith(mockTransactions[0]);
  });
});
