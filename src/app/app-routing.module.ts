import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  LOGIN,
  TRIGGERED_LINE_ALERTS,
  TRIGGERED_VWAP_ALERTS,
} from 'src/consts/url-consts';
// import { AuthGuard } from './login/guards/auth.guard'; // Uncomment if you have an AuthGuard
import { TestComponent } from './test/test.component';
import { AuthGuard } from './login/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./triggered-line-alerts/triggered-line-alerts.module').then(
        (m) => m.TriggeredLineAlertsModule
      ),
    canActivate: [AuthGuard], // Uncomment if you want to protect this route
  },
  {
    path: TRIGGERED_VWAP_ALERTS,
    loadChildren: () =>
      import('./triggered-vwap-alerts/triggered-vwap-alerts.module').then(
        (m) => m.TriggeredVwapAlertsModule
      ),
    canActivate: [AuthGuard], // Uncomment if you want to protect this route
  },
  {
    path: LOGIN,
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule), // Ensure LoginModule exists
  },
  { path: 'test', component: TestComponent },
  { path: TRIGGERED_LINE_ALERTS, redirectTo: '', pathMatch: 'full' }, // Add pathMatch for redirects
  { path: '**', redirectTo: '' }, // Wildcard route for unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
