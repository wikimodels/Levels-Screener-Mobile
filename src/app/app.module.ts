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

import { ServiceWorkerModule } from '@angular/service-worker';
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
