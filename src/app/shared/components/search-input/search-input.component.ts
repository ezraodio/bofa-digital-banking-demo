import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  template: `
    <mat-form-field appearance="outline" class="search-field">
      <mat-label>{{ placeholder }}</mat-label>
      <input matInput [formControl]="searchControl" [placeholder]="placeholder">
      <mat-icon matPrefix>search</mat-icon>
      <button
        mat-icon-button
        matSuffix
        *ngIf="searchControl.value"
        (click)="clearSearch()"
      >
        <mat-icon>clear</mat-icon>
      </button>
    </mat-form-field>
  `,
  styles: [
    `
      .search-field {
        width: 100%;
      }
    `,
  ],
})
export class SearchInputComponent {
  @Input() placeholder = 'Search...';
  @Input() debounceMs = 300;

  @Output() searchChange = new EventEmitter<string>();

  searchControl = new FormControl('');

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(this.debounceMs), distinctUntilChanged())
      .subscribe((value) => {
        this.searchChange.emit(value || '');
      });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }
}
