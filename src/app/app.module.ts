import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; // ✅ Added to declarations

import { AppMaterialModule } from './material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { SnackbarComponent } from './shared/snackbar/snackbar.component';

import { AlertMenuComponent } from './nav-bar/alert-menu/alert-menu.component';

import { TriggeredLineAlertsComponent } from './triggered-line-alerts/triggered-line-alerts.component';
import { TriggeredLineAlertsFieldComponent } from './triggered-line-alerts/triggered-line-alerts-field/triggered-line-alerts-field.component';
import { TriggeredLineAlertItemComponent } from './triggered-line-alerts/triggered-line-alert-item/triggered-line-alert-item.component';
import { TriggeredVwapAlertsFieldComponent } from './triggered-vwap-alerts/triggered-vwap-alerts-field/triggered-vwap-alerts-field.component';
import { TriggeredVwapAlertItemComponent } from './triggered-vwap-alerts/triggered-vwap-alert-item/triggered-vwap-alert-item.component';
import { TriggeredVwapAlertsComponent } from './triggered-vwap-alerts/triggered-vwap-alerts.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './login/user-profile/user-profile.component';
import { LoginModule } from './login/login.module';
import { TriggeredLineAlertsModule } from './triggered-line-alerts/triggered-line-alerts.module';
import { TriggeredVwapAlertsModule } from './triggered-vwap-alerts/triggered-vwap-alerts.module';

@NgModule({
  declarations: [
    AppComponent,
    AlertMenuComponent,
    NavBarComponent,
    SnackbarComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LoginModule,
    TriggeredLineAlertsModule,
    TriggeredVwapAlertsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
