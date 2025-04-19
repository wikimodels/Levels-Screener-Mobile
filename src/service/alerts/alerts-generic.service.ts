import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SnackbarService } from '../snackbar.service';

import { ALERTS_URLS } from 'src/consts/url-consts';
import { createHttpParams } from 'src/functions/create-params';
import { Alert } from 'src/app/models/alerts/alert';
import { DeleteResult } from 'src/app/models/mongodb/operations';
import { SnackbarType } from 'src/app/models/shared/snackbar-type';

@Injectable({ providedIn: 'root' })
export class AlertsGenericService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {}

  private AlertCollections: Map<string, BehaviorSubject<Alert[]>> = new Map();

  private getOrCreateCollection(
    collectionName: string
  ): BehaviorSubject<Alert[]> {
    if (!this.AlertCollections.has(collectionName)) {
      this.AlertCollections.set(
        collectionName,
        new BehaviorSubject<Alert[]>([])
      );
    }
    return this.AlertCollections.get(collectionName)!;
  }

  public alerts$(collectionName: string): Observable<Alert[]> {
    return this.getOrCreateCollection(collectionName).asObservable();
  }

  public setAlerts(collectionName: string, Alerts: Alert[]): void {
    const alertCollection = this.getOrCreateCollection(collectionName);
    alertCollection.next(Alerts);
  }

  public getAlerts(collectionName: string): Alert[] {
    return this.getOrCreateCollection(collectionName).value;
  }

  public getAllAlerts(collectionName: string): Observable<Alert[]> {
    // Create HTTP query parameters
    const params = createHttpParams({ collectionName });
    const options = { ...this.httpOptions, params };

    // Make the HTTP GET request and handle the response
    return this.http.get<Alert[]>(ALERTS_URLS.alertsUrl, options).pipe(
      tap((alerts: Alert[]) => {
        console.log('Fresh Alerts --> ', alerts);
        // 🔹 Clear the local store before updating with new alerts
        this.setAlerts(collectionName, []);
        this.setAlerts(collectionName, alerts);
        console.log('getAllAlerts --> ', collectionName, alerts);

        this.snackbarService.showIcon(
          2000,
          'assets/icons/thumb-up-in-circle.svg'
        );
      }),
      catchError((error) => {
        console.error('Error fetching alerts:', error);
        this.handleError(error); // Call your custom error handler
        throw error; // Re-throw the error to propagate it further
      })
    );
  }

  public deleteMany(collectionName: string, ids: string[]): Observable<any> {
    const currentAlerts = this.getAlerts(collectionName);
    const remainingAlerts = currentAlerts.filter(
      (alert) => !ids.includes(alert.id)
    );
    this.setAlerts(collectionName, remainingAlerts);

    const params = createHttpParams({ collectionName });

    const options = {
      ...this.httpOptions,
      params: params,
      body: { ids },
    };

    console.log(options);

    return this.http
      .delete<DeleteResult>(`${ALERTS_URLS.alertsDeleteManyUrl}`, options)
      .pipe(
        tap((data) => {
          console.log('deleteMany response --> ', data);
          this.snackbarService.showIcon(
            2000,
            'assets/icons/thumb-up-in-circle.svg'
          );
        }),
        catchError((error) => {
          console.error('Error deleting alerts:', error);
          this.handleError(error); // Call your custom error handler
          throw error; // Re-throw the error to propagate it further
        })
      );
  }

  //---------------------------------------------
  // ✅ ERROR HANDLING
  //---------------------------------------------
  private handleError(error: Error): Observable<never> {
    console.error('An error occurred:', error);
    const msg = 'ERROR: ' + error.message;
    this.snackbarService.showSnackBar(msg, '', 8000, SnackbarType.Error);
    return throwError(() => new Error('Something went wrong!', error));
  }
}
