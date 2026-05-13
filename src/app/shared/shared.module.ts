import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

// Components
import { AccountCardComponent } from './components/account-card/account-card.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { AlertBannerComponent } from './components/alert-banner/alert-banner.component';
import { BalanceWidgetComponent } from './components/balance-widget/balance-widget.component';
import { ChipFilterComponent } from './components/chip-filter/chip-filter.component';
import { TransferFormComponent } from './components/transfer-form/transfer-form.component';

const MATERIAL_MODULES = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatChipsModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSidenavModule,
  MatDividerModule,
  MatToolbarModule,
  MatDialogModule,
];

const SHARED_COMPONENTS = [
  AccountCardComponent,
  TransactionListComponent,
  AlertBannerComponent,
  BalanceWidgetComponent,
  ChipFilterComponent,
  TransferFormComponent,
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
})
export class SharedModule {}
