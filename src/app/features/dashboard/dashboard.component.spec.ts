import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, RouterTestingModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load mock accounts', () => {
    expect(component.accounts.length).toBe(3);
  });

  it('should load mock transactions', () => {
    expect(component.recentTransactions.length).toBeGreaterThan(0);
  });

  it('should load alerts', () => {
    expect(component.alerts.length).toBe(3);
  });

  it('should initialize filtered transactions', () => {
    expect(component.filteredTransactions.length).toBe(component.recentTransactions.length);
  });

  it('should filter transactions by type', () => {
    const filters = component.transactionFilters.map(f => ({
      ...f,
      active: f.value === 'CREDIT',
    }));
    component.onFilterChange(filters);
    expect(component.filteredTransactions.every(tx => tx.type === 'CREDIT')).toBeTrue();
  });

  it('should show all transactions when no filter is active', () => {
    const filters = component.transactionFilters.map(f => ({
      ...f,
      active: false,
    }));
    component.onFilterChange(filters);
    expect(component.filteredTransactions.length).toBe(component.recentTransactions.length);
  });

  it('should dismiss alert', () => {
    const alert = component.alerts[0];
    component.onAlertDismiss(alert);
    expect(component.alerts[0].read).toBeTrue();
  });

  it('should have transaction filters initialized', () => {
    expect(component.transactionFilters.length).toBe(5);
    expect(component.transactionFilters[0].label).toBe('All');
  });
});
