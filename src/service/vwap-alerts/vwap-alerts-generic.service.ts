import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { SnackbarService } from '../snackbar.service';

import { VWAP_ALERTS_URLS } from 'src/consts/url-consts';
import { createHttpParams } from 'src/functions/create-params';
import { InsertResult, MoveResult } from 'models/mongodb/operations';
import { SnackbarType } from 'models/shared/snackbar-type';
import { VwapAlert } from 'models/vwap/vwap-alert';

@Injectable({ providedIn: 'root' })
export class VwapAlertsGenericService {
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

  private AlertCollections: Map<string, BehaviorSubject<VwapAlert[]>> =
    new Map();

  private getOrCreateCollection(
    collectionName: string
  ): BehaviorSubject<VwapAlert[]> {
    if (!this.AlertCollections.has(collectionName)) {
      this.AlertCollections.set(
        collectionName,
        new BehaviorSubject<VwapAlert[]>([])
      );
    }
    return this.AlertCollections.get(collectionName)!;
  }

  public alerts$(collectionName: string): Observable<VwapAlert[]> {
    return this.getOrCreateCollection(collectionName).asObservable();
  }

  public setAlerts(collectionName: string, Alerts: VwapAlert[]): void {
    const alertCollection = this.getOrCreateCollection(collectionName);
    alertCollection.next(Alerts);
  }

  public getAlerts(collectionName: string): VwapAlert[] {
    return this.getOrCreateCollection(collectionName).value;
  }

  public getAllAlerts(collectionName: string): Observable<VwapAlert[]> {
    // HTTP request to add a VwapAlert with query parameters
    const params = createHttpParams({ collectionName });
    const options = { ...this.httpOptions, params };
    return this.http
      .get<VwapAlert[]>(VWAP_ALERTS_URLS.vwapAlertsUrl, options)
      .pipe(
        // Sort alerts by activationTime in descending order
        map((data) => {
          return data.sort((a, b) => {
            if (a.activationTime === undefined) return 1; // Place undefined values last
            if (b.activationTime === undefined) return -1; // Place undefined values last
            return Number(b.activationTime) - Number(a.activationTime); // Descending order
          });
        }),
        tap((sortedAlerts) => {
          this.setAlerts(collectionName, []);
          this.setAlerts(collectionName, sortedAlerts);
          console.log(
            `Brought from server --> CollectionName: ${collectionName}`,
            sortedAlerts
          );
        }),
        catchError((error) => {
          this.handleError(error); // Centralized error handling
          return throwError(
            () => new Error(`Failed to fetch alerts: ${error.message}`)
          );
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
      .delete<any>(`${VWAP_ALERTS_URLS.vwapAlertsDeleteManyUrl}`, options)
      .pipe(
        tap((response) => {
          console.log('deleteMany response --> ', response);
          this.snackbarService.showSnackBar('Ok');
        }),
        catchError((error) => {
          this.handleError(error);
          return throwError(
            () => new Error(`Failed to delete alerts: ${error.message}`)
          );
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
    return throwError(() => new Error('Something went wrong! ', error));
  }
}
