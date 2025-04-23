import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { env } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; // ✅ Added to declarations

import { AppMaterialModule } from './material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';

// import { HtmlSnackbarComponent } from './shared/html-snackbar/html-snackbar.component';

import { AlertMenuComponent } from './nav-bar/alert-menu/alert-menu.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { TriggeredLineAlertsModule } from './triggered-line-alerts/triggered-line-alerts.module';
import { TriggeredVwapAlertsModule } from './triggered-vwap-alerts/triggered-vwap-alerts.module';
import { TestComponent } from './test/test.component';
import { GoogleButtonModule } from './google-button/google-button.module';
import { LoginModule } from './login/login.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgOptimizedImage } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from './shared/shared.module';
import { DescriptionModule } from './description/description.module';

@NgModule({
  declarations: [
    AppComponent,
    AlertMenuComponent,
    NavBarComponent,
    // HtmlSnackbarComponent,
    TestComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //-----------------
    ScrollingModule,
    NgOptimizedImage,
    MatProgressSpinnerModule,
    MatDialogModule,
    //------------------
    TriggeredLineAlertsModule,
    TriggeredVwapAlertsModule,
    AngularFireModule.initializeApp(env.firebaseConfig),
    AngularFireAuthModule,
    LoginModule,
    DescriptionModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    GoogleButtonModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
