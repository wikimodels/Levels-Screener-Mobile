import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TriggeredLineAlertsComponent } from './triggered-line-alerts.component';

export const routes: Routes = [
  { path: '', component: TriggeredLineAlertsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TriggeredLineAlertsRoutingModule {}
