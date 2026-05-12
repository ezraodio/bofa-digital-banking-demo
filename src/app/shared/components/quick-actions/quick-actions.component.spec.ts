import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickActionsComponent } from './quick-actions.component';

describe('QuickActionsComponent', () => {
  let component: QuickActionsComponent;
  let fixture: ComponentFixture<QuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 quick actions', () => {
    expect(component.actions.length).toBe(6);
  });

  it('should emit actionSelected event', () => {
    spyOn(component.actionSelected, 'emit');
    component.onAction(component.actions[0]);
    expect(component.actionSelected.emit).toHaveBeenCalledWith(
      component.actions[0]
    );
  });
});
