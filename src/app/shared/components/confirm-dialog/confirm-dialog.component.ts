import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  type: 'warning' | 'danger' | 'info';
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>
      <mat-icon [class]="'dialog-icon dialog-icon-' + data.type">
        {{ getIcon() }}
      </mat-icon>
      {{ data.title }}
    </h2>

    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">
        {{ data.cancelText }}
      </button>
      <button
        mat-raised-button
        [color]="data.type === 'danger' ? 'warn' : 'primary'"
        (click)="onConfirm()"
      >
        {{ data.confirmText }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-icon {
      vertical-align: middle;
      margin-right: 8px;
    }
    .dialog-icon-warning { color: #ff9800; }
    .dialog-icon-danger { color: #c41230; }
    .dialog-icon-info { color: #012169; }

    mat-dialog-content p {
      font-size: 14px;
      line-height: 1.6;
      color: #555;
    }
  `],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  getIcon(): string {
    const icons: Record<string, string> = {
      warning: 'warning',
      danger: 'error',
      info: 'info',
    };
    return icons[this.data.type] || 'info';
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
