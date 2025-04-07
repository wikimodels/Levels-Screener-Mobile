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

import { TriggeredAlertsTableComponent } from './triggered-alerts/triggered-alerts-table/triggered-alerts-table.component';
import { TriggeredAlertsComponent } from './triggered-alerts/triggered-alerts.component';

import { VwapTriggeredAlertsComponent } from './vwap-triggered-alerts/vwap-triggered-alerts.component';
import { VwapTriggeredAlertsTableComponent } from './vwap-triggered-alerts/vwap-triggered-alerts-table/vwap-triggered-alerts-table.component';
import { AlertMenuComponent } from './nav-bar/alert-menu/alert-menu.component';

import { WorkItemComponent } from './coins/work-item/work-item.component';
import { CoinsComponent } from './coins/coins.component';
import { CoinsFieldComponent } from './coins/coins-field/coins-field.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertMenuComponent,
    NavBarComponent,
    SnackbarComponent,
    TriggeredAlertsComponent,
    TriggeredAlertsTableComponent,
    VwapTriggeredAlertsComponent,
    VwapTriggeredAlertsTableComponent,
    WorkItemComponent,
    CoinsComponent,
    CoinsFieldComponent,
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
