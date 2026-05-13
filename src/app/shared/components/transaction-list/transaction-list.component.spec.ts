import { ComponentFixture, TestBed } from '@angular/core/testing';

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
      description: 'Bi-weekly payroll',
      amount: 4250.00,
      type: TransactionType.CREDIT,
      category: 'Income',
      status: TransactionStatus.POSTED,
      merchantName: 'Employer Inc.',
    },
    {
      id: 'txn_003',
      accountId: 'acc_001',
      date: new Date('2024-01-14'),
      description: 'Online purchase',
      amount: 49.99,
      type: TransactionType.TRANSFER,
      category: 'Shopping',
      status: TransactionStatus.PENDING,
      merchantName: 'Amazon.com',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render empty list', () => {
    component.transactions = [];
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('mat-list-item');
    expect(items.length).toBe(0);
  });

  it('should render single transaction', () => {
    component.transactions = [mockTransactions[0]];
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('mat-list-item');
    expect(items.length).toBe(1);
  });

  it('should render multiple transactions', () => {
    component.transactions = mockTransactions;
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('mat-list-item');
    expect(items.length).toBe(3);
  });

  it('should display transaction description', () => {
    component.transactions = [mockTransactions[0]];
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Morning coffee');
  });

  it('should emit transactionSelected on click', () => {
    component.transactions = mockTransactions;
    fixture.detectChanges();
    spyOn(component.transactionSelected, 'emit');
    component.onSelect(mockTransactions[0]);
    expect(component.transactionSelected.emit).toHaveBeenCalledWith(mockTransactions[0]);
  });
});
