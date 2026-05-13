import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ChipFilterComponent, ChipFilter } from './chip-filter.component';

describe('ChipFilterComponent', () => {
  let component: ChipFilterComponent;
  let fixture: ComponentFixture<ChipFilterComponent>;

  const mockFilters: ChipFilter[] = [
    { label: 'All', value: 'all', active: true },
    { label: 'Credits', value: 'CREDIT', active: false },
    { label: 'Debits', value: 'DEBIT', active: false },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipFilterComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipFilterComponent);
    component = fixture.componentInstance;
    component.filters = mockFilters.map(f => ({ ...f }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle filter active state', () => {
    spyOn(component.filterChange, 'emit');
    component.toggleFilter(component.filters[1]);
    expect(component.filters[1].active).toBeTrue();
    expect(component.filterChange.emit).toHaveBeenCalled();
  });

  it('should remove filter (set to inactive)', () => {
    component.filters[0].active = true;
    spyOn(component.filterChange, 'emit');
    component.removeFilter(component.filters[0]);
    expect(component.filters[0].active).toBeFalse();
    expect(component.filterChange.emit).toHaveBeenCalled();
  });
});
