import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInputComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear search on clearSearch', () => {
    component.searchControl.setValue('test query');
    component.clearSearch();
    expect(component.searchControl.value).toBe('');
  });
});
