import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionTableComponent } from './transaction-table.component';
import {
  Transaction,
  TransactionType,
  TransactionStatus,
} from '../../models/account.model';

describe('TransactionTableComponent', () => {
  let component: TransactionTableComponent;
  let fixture: ComponentFixture<TransactionTableComponent>;

  const mockTransactions: Transaction[] = [
    {
      id: 'txn_001',
      accountId: 'acc_001',
      date: new Date('2024-01-15'),
      description: 'Coffee Shop Purchase',
      amount: 5.75,
      type: TransactionType.DEBIT,
      category: 'Dining',
      status: TransactionStatus.POSTED,
      merchantName: 'Starbucks',
    },
    {
      id: 'txn_002',
      accountId: 'acc_001',
      date: new Date('2024-01-14'),
      description: 'Direct Deposit',
      amount: 3500.0,
      type: TransactionType.CREDIT,
      category: 'Income',
      status: TransactionStatus.POSTED,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, TransactionTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionTableComponent);
    component = fixture.componentInstance;
    component.transactions = mockTransactions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data source with transactions', () => {
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should return correct amount class for credits', () => {
    expect(component.getAmountClass(mockTransactions[1])).toBe('amount-credit');
  });

  it('should return correct amount class for debits', () => {
    expect(component.getAmountClass(mockTransactions[0])).toBe('amount-debit');
  });

  it('should return + prefix for credits', () => {
    expect(component.getAmountPrefix(mockTransactions[1])).toBe('+');
  });

  it('should return - prefix for debits', () => {
    expect(component.getAmountPrefix(mockTransactions[0])).toBe('-');
  });

  it('should emit transactionSelected on row click', () => {
    spyOn(component.transactionSelected, 'emit');
    component.onRowClick(mockTransactions[0]);
    expect(component.transactionSelected.emit).toHaveBeenCalledWith(
      mockTransactions[0]
    );
  });
});
