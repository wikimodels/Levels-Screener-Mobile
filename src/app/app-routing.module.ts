import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VWAP_TRIGGERED_ALERTS } from 'src/consts/url-consts';
import { TriggeredAlertsComponent } from './triggered-alerts/triggered-alerts.component';

import { VwapTriggeredAlertsComponent } from './vwap-triggered-alerts/vwap-triggered-alerts.component';
import { CoinsComponent } from './coins/coins.component';
// Import your route constants

const routes: Routes = [
  { path: '', component: TriggeredAlertsComponent },
  {
    path: VWAP_TRIGGERED_ALERTS,
    component: VwapTriggeredAlertsComponent,
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
