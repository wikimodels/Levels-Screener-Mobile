import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TriggeredVwapAlertsComponent } from './triggered-vwap-alerts.component';

export const routes: Routes = [
  { path: '', component: TriggeredVwapAlertsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TriggeredVwapAlertsRoutingModule {}
