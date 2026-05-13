import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
  @Output() transactionSelected = new EventEmitter<Transaction>();

  onSelect(transaction: Transaction): void {
    this.transactionSelected.emit(transaction);
  }
}
