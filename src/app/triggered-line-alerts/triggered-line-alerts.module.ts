import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TriggeredLineAlertsRoutingModule } from './triggered-line-alerts-routing.module';
import { TriggeredLineAlertsComponent } from './triggered-line-alerts.component';
import { TriggeredLineAlertItemComponent } from './triggered-line-alert-item/triggered-line-alert-item.component';
import { TriggeredLineAlertsFieldComponent } from './triggered-line-alerts-field/triggered-line-alerts-field.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    TriggeredLineAlertsComponent,
    TriggeredLineAlertItemComponent,
    TriggeredLineAlertsFieldComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    TriggeredLineAlertsRoutingModule,
  ],
  exports: [TriggeredLineAlertsComponent],
})
export class TriggeredLineAlertsModule {}
