export interface Account {
  id: string;
  accountNumber: string;
  accountType: AccountType;
  name: string;
  balance: number;
  availableBalance: number;
  currency: string;
  lastUpdated: Date;
  status: AccountStatus;
}

export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  CREDIT_CARD = 'CREDIT_CARD',
  INVESTMENT = 'INVESTMENT',
  RETIREMENT = 'RETIREMENT',
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  FROZEN = 'FROZEN',
  CLOSED = 'CLOSED',
  PENDING = 'PENDING',
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  lastLogin: Date;
  mfaEnabled: boolean;
  preferredLanguage: string;
  notificationPreferences: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  fraudAlerts: boolean;
  balanceAlerts: boolean;
  transactionAlerts: boolean;
}

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export enum AlertType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  FRAUD = 'FRAUD',
  PROMOTION = 'PROMOTION',
}
