import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../../models/account.model';

export interface TransferRequest {
  fromAccountId: string;
  toAccount: string;
  amount: number;
}

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})
export class TransferFormComponent implements OnInit {
  @Input() accounts: Account[] = [];
  @Output() transferSubmit = new EventEmitter<TransferRequest>();

  transferForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  onSubmit(): void {
    if (this.transferForm.valid) {
      this.transferSubmit.emit(this.transferForm.value);
    }
  }
}
