import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoinsComponent } from './coins/coins.component';
import {
  TRIGGERED_LINE_ALERTS,
  TRIGGERED_VWAP_ALERTS,
} from 'src/consts/url-consts';
import { TriggeredLineAlertsComponent } from './triggered-line-alerts/triggered-line-alerts.component';
import { TriggeredVwapAlertsComponent } from './triggered-vwap-alerts/triggered-vwap-alerts.component';
// Import your route constants

const routes: Routes = [
  { path: '', component: TriggeredLineAlertsComponent },
  {
    path: TRIGGERED_LINE_ALERTS,
    component: TriggeredLineAlertsComponent,
  },
  {
    path: TRIGGERED_VWAP_ALERTS,
    component: TriggeredVwapAlertsComponent,
  },
  {
    path: 'coins',
    component: CoinsComponent,
  },
  { path: '**', redirectTo: '' }, // Your existing routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
