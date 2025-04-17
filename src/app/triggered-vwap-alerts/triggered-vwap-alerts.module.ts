import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatRippleModule } from '@angular/material/core';
import { TriggeredVwapAlertItemComponent } from './triggered-vwap-alert-item/triggered-vwap-alert-item.component';
import { TriggeredVwapAlertsFieldComponent } from './triggered-vwap-alerts-field/triggered-vwap-alerts-field.component';
import { TriggeredVwapAlertsComponent } from './triggered-vwap-alerts.component';
import { TriggeredVwapAlertsRoutingModule } from './triggered-vwap-alerts-routing.module';

@NgModule({
  declarations: [
    TriggeredVwapAlertsComponent,
    TriggeredVwapAlertItemComponent,
    TriggeredVwapAlertsFieldComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    TriggeredVwapAlertsRoutingModule,
  ],
  exports: [TriggeredVwapAlertsComponent],
})
export class TriggeredVwapAlertsModule {}
