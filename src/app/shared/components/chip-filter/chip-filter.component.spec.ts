import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChipFilterComponent, ChipFilter } from './chip-filter.component';

describe('ChipFilterComponent', () => {
  let component: ChipFilterComponent;
  let fixture: ComponentFixture<ChipFilterComponent>;

  const mockFilters: ChipFilter[] = [
    { label: 'All', value: 'all', active: true },
    { label: 'Credits', value: 'credit', active: false },
    { label: 'Debits', value: 'debit', active: false },
    { label: 'Transfers', value: 'transfer', active: false },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChipFilterComponent],
      imports: [MatChipsModule, MatIconModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipFilterComponent);
    component = fixture.componentInstance;
    component.filters = mockFilters.map(f => ({ ...f }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all filter chips', () => {
    const chips = fixture.nativeElement.querySelectorAll('mat-chip');
    expect(chips.length).toBe(4);
  });

  it('should toggle filter on selection', () => {
    spyOn(component.filterChange, 'emit');
    component.toggleFilter(component.filters[1]);
    expect(component.filters[1].active).toBeTrue();
    expect(component.filterChange.emit).toHaveBeenCalled();
  });

  it('should remove filter', () => {
    component.filters[0].active = true;
    spyOn(component.filterChange, 'emit');
    component.removeFilter(component.filters[0]);
    expect(component.filters[0].active).toBeFalse();
    expect(component.filterChange.emit).toHaveBeenCalled();
  });

  it('should display filter labels', () => {
    const chipTexts = fixture.nativeElement.querySelectorAll('mat-chip');
    expect(chipTexts[0].textContent).toContain('All');
    expect(chipTexts[1].textContent).toContain('Credits');
  });
});
