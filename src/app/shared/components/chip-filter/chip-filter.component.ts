import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

export interface ChipFilter {
  label: string;
  value: string;
  active: boolean;
}

@Component({
  selector: 'app-chip-filter',
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
