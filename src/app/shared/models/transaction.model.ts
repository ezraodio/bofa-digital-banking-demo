export interface Transaction {
  id: string;
  accountId: string;
  date: Date;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  status: TransactionStatus;
  merchantName?: string;
  referenceNumber?: string;
}

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
  TRANSFER = 'TRANSFER',
  PAYMENT = 'PAYMENT',
  FEE = 'FEE',
}

export enum TransactionStatus {
  POSTED = 'POSTED',
  PENDING = 'PENDING',
  DECLINED = 'DECLINED',
}
