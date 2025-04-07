import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggeredLineAlertItemComponent } from './triggered-line-alert-item.component';

describe('TriggeredLineAlertItemComponent', () => {
  let component: TriggeredLineAlertItemComponent;
  let fixture: ComponentFixture<TriggeredLineAlertItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriggeredLineAlertItemComponent]
    });
    fixture = TestBed.createComponent(TriggeredLineAlertItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
