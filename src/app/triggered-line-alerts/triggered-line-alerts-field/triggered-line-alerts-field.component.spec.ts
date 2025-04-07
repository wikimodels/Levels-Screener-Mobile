import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggeredLineAlertsFieldComponent } from './triggered-line-alerts-field.component';

describe('TriggeredLineAlertsFieldComponent', () => {
  let component: TriggeredLineAlertsFieldComponent;
  let fixture: ComponentFixture<TriggeredLineAlertsFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriggeredLineAlertsFieldComponent]
    });
    fixture = TestBed.createComponent(TriggeredLineAlertsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
