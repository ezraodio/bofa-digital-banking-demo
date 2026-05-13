import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

export interface ChipFilter {
  label: string;
  value: string;
  active: boolean;
}

@Component({
  selector: 'app-chip-filter',
  standalone: true,
  imports: [MatChipsModule, MatIconModule],
  templateUrl: './chip-filter.component.html',
  styleUrls: ['./chip-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipFilterComponent {
  @Input() filters: ChipFilter[] = [];
  @Output() filterChange = new EventEmitter<ChipFilter[]>();

  toggleFilter(filter: ChipFilter): void {
    filter.active = !filter.active;
    this.filterChange.emit(this.filters);
  }

  removeFilter(filter: ChipFilter): void {
    filter.active = false;
    this.filterChange.emit(this.filters);
  }
}
