import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggeredLineAlertsComponent } from './triggered-line-alerts.component';

describe('TriggeredLineAlertsComponent', () => {
  let component: TriggeredLineAlertsComponent;
  let fixture: ComponentFixture<TriggeredLineAlertsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriggeredLineAlertsComponent]
    });
    fixture = TestBed.createComponent(TriggeredLineAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
