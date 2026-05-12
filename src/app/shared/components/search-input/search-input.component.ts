import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <mat-form-field appearance="outline" class="search-field">
      <mat-label>{{ placeholder }}</mat-label>
      <input matInput [formControl]="searchControl" [placeholder]="placeholder">
      <mat-icon matPrefix>search</mat-icon>
      @if (searchControl.value) {
        <button
          mat-icon-button
          matSuffix
          (click)="clearSearch()"
        >
          <mat-icon>clear</mat-icon>
        </button>
      }
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
export class SearchInputComponent implements OnInit {
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
