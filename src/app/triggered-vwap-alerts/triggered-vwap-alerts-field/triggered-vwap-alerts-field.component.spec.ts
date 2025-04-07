import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggeredVwapAlertsFieldComponent } from './triggered-vwap-alerts-field.component';

describe('TriggeredVwapAlertsFieldComponent', () => {
  let component: TriggeredVwapAlertsFieldComponent;
  let fixture: ComponentFixture<TriggeredVwapAlertsFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriggeredVwapAlertsFieldComponent]
    });
    fixture = TestBed.createComponent(TriggeredVwapAlertsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
