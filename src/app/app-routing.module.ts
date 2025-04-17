import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  LOGIN,
  TRIGGERED_LINE_ALERTS,
  TRIGGERED_VWAP_ALERTS,
} from 'src/consts/url-consts';
import { TriggeredLineAlertsComponent } from './triggered-line-alerts/triggered-line-alerts.component';
import { TriggeredVwapAlertsComponent } from './triggered-vwap-alerts/triggered-vwap-alerts.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/guards/auth.guard';
// Import your route constants

const routes: Routes = [
  { path: '', component: TriggeredLineAlertsComponent },
  {
    path: TRIGGERED_LINE_ALERTS,
    loadChildren: () =>
      import('./triggered-line-alerts/triggered-line-alerts.module').then(
        (m) => m.TriggeredLineAlertsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: TRIGGERED_VWAP_ALERTS,
    loadChildren: () =>
      import('./triggered-vwap-alerts/triggered-vwap-alerts.module').then(
        (m) => m.TriggeredVwapAlertsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: LOGIN,
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule), // Replace with your login Component,
  },

  { path: '**', redirectTo: '' }, // Your existing routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
