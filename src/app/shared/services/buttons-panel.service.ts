// alerts-interaction.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ButtonsPanelService {
  //-------------IS ROTATING---------------------------
  private isRotating = new BehaviorSubject<boolean>(false);
  isRotating$ = this.isRotating.asObservable();

  get isRotatingValue(): boolean {
    return this.isRotating.value;
  }

  set isRotatingValue(value: boolean) {
    this.isRotating.next(value);
  }

  //------------------IS ASCENDING---------------------------
  private isAscending = new BehaviorSubject<boolean>(false);
  isAscending$ = this.isAscending.asObservable();

  get isAscendingValue(): boolean {
    return this.isAscending.value;
  }

  set isAscendingValue(value: boolean) {
    this.isAscending.next(value);
  }

  //--------------- TOGGLE DELETING ----------------
  private toggleDeletionSubject = new Subject<void>();
  toggleDeletionSubject$ = this.toggleDeletionSubject.asObservable();
  sendDeletionSignal() {
    this.toggleDeletionSubject.next();
  }

  //--------------- TOGGLE SELECTION ----------------
  private toggleSelectionSubject = new Subject<void>();
  toggleSelectionSignal$ = this.toggleSelectionSubject.asObservable();
  sendToggleSelectionSignal() {
    this.toggleSelectionSubject.next();
  }

  //--------------- TOGGLE REFRESH ----------------
  private toggleRefreshSubject = new Subject<void>();
  toggleRefreshSubject$ = this.toggleRefreshSubject.asObservable();
  sendRefreshSignal() {
    this.toggleRefreshSubject.next();
    this.isRotatingValue = true;
    setTimeout(() => (this.isRotatingValue = false), 1000);
  }

  //--------------- TOGGLE SORT DIRECTION ----------------
  private toggleSortDirectionSubject = new Subject<void>();
  toggleSortDirectionSubject$ = this.toggleSortDirectionSubject.asObservable();
  sendSortDirectionSignal() {
    this.toggleSortDirectionSubject.next();
    this.isAscendingValue = !this.isAscendingValue;
  }
}
