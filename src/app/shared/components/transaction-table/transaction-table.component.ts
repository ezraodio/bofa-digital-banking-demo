import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Transaction, TransactionType } from '../../models/account.model';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
})
export class TransactionTableComponent implements OnInit {
  @Input() transactions: Transaction[] = [];
  @Input() showPaginator = true;
  @Input() pageSize = 10;

  @Output() transactionSelected = new EventEmitter<Transaction>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'date',
    'description',
    'category',
    'amount',
    'status',
  ];

  dataSource = new MatTableDataSource<Transaction>();
  filterValue = '';

  ngOnInit(): void {
    this.dataSource.data = this.transactions;
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filterValue = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAmountClass(transaction: Transaction): string {
    if (transaction.type === TransactionType.CREDIT) {
      return 'amount-credit';
    }
    if (transaction.type === TransactionType.FEE) {
      return 'amount-fee';
    }
    return 'amount-debit';
  }

  getAmountPrefix(transaction: Transaction): string {
    return transaction.type === TransactionType.CREDIT ? '+' : '-';
  }

  onRowClick(transaction: Transaction): void {
    this.transactionSelected.emit(transaction);
  }
}
