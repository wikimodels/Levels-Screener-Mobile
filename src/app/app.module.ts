import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    AlertMenuComponent,
    NavBarComponent,
    SnackbarComponent,
    TriggeredLineAlertsComponent,
    TriggeredLineAlertsFieldComponent,
    TriggeredLineAlertItemComponent,
    TriggeredVwapAlertsFieldComponent,
    TriggeredVwapAlertItemComponent,
    TriggeredVwapAlertsComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
