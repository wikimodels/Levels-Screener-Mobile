import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggeredVwapAlertItemComponent } from './triggered-vwap-alert-item.component';

describe('TriggeredVwapAlertItemComponent', () => {
  let component: TriggeredVwapAlertItemComponent;
  let fixture: ComponentFixture<TriggeredVwapAlertItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriggeredVwapAlertItemComponent]
    });
    fixture = TestBed.createComponent(TriggeredVwapAlertItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
