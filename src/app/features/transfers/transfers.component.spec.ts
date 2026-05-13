import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';

import { TransfersComponent } from './transfers.component';

describe('TransfersComponent', () => {
  let component: TransfersComponent;
  let fixture: ComponentFixture<TransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransfersComponent],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load accounts on init', () => {
    expect(component.accounts.length).toBeGreaterThan(0);
  });

  it('should have a selected account', () => {
    expect(component.selectedAccount).toBeTruthy();
  });

  it('should set transferSuccess on submit', () => {
    component.onTransferSubmit({
      fromAccountId: 'acc_001',
      toAccount: '9876543210',
      amount: 100,
    });
    expect(component.transferSuccess).toBeTrue();
  });
});
