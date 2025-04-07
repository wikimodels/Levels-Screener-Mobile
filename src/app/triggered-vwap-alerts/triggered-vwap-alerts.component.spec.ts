import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggeredVwapAlertsComponent } from './triggered-vwap-alerts.component';

describe('TriggeredVwapAlertsComponent', () => {
  let component: TriggeredVwapAlertsComponent;
  let fixture: ComponentFixture<TriggeredVwapAlertsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriggeredVwapAlertsComponent]
    });
    fixture = TestBed.createComponent(TriggeredVwapAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
