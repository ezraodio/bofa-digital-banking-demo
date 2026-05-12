import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

// Components
import { AccountCardComponent } from './components/account-card/account-card.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { NavSidebarComponent } from './components/nav-sidebar/nav-sidebar.component';
import { AlertBannerComponent } from './components/alert-banner/alert-banner.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { BalanceDisplayComponent } from './components/balance-display/balance-display.component';
import { NotificationBellComponent } from './components/notification-bell/notification-bell.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

const MATERIAL_MODULES = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatChipsModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatMenuModule,
  MatBadgeModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDialogModule,
  MatSelectModule,
  MatTooltipModule,
  MatTabsModule,
];

const SHARED_COMPONENTS = [
  AccountCardComponent,
  TransactionTableComponent,
  NavSidebarComponent,
  AlertBannerComponent,
  SearchInputComponent,
  BalanceDisplayComponent,
  NotificationBellComponent,
  QuickActionsComponent,
  ConfirmDialogComponent,
];

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_MODULES],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
    ...SHARED_COMPONENTS,
  ],
  // Legacy entryComponents — required for dynamic dialog components in pre-Ivy ViewEngine.
  // Angular 13+ with Ivy no longer requires this, but many enterprise codebases retain it.
  entryComponents: [ConfirmDialogComponent],
})
export class SharedModule {}
