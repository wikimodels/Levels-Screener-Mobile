import { Injectable } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectionService<T> {
  // Shared SelectionModel to manage selected items
  private selection = new SelectionModel<T>(true);

  // BehaviorSubject to emit changes in selection across components
  private selectionSubject = new BehaviorSubject<T[]>(this.selection.selected);

  // BehaviorSubject to track the count of selected items
  private selectionCounterSubject = new BehaviorSubject<number>(0);

  // Expose selection changes as an observable for all components
  selectionChanges$: Observable<T[]> = this.selectionSubject.asObservable();

  // Expose selection counter as an observable
  selectionCounter$: Observable<number> =
    this.selectionCounterSubject.asObservable();

  constructor() {
    // Listen to changes in selection and update both BehaviorSubjects
    this.selection.changed.subscribe(() => {
      const selectedItems = this.selection.selected;
      this.selectionSubject.next(selectedItems);
      this.selectionCounterSubject.next(selectedItems.length); // Update the counter
    });
  }

  // Methods to interact with the shared selection model
  select(items: T[]): void {
    this.selection.select(...items);
  }

  deselect(item: T): void {
    this.selection.deselect(item);
  }

  toggle(item: T): void {
    this.selection.toggle(item);
  }

  isSelected(item: T): boolean {
    return this.selection.isSelected(item);
  }

  isAllSelected(any: T[]): boolean {
    return this.selection.selected.length === any.length;
  }

  clear(): void {
    this.selection.clear();
  }

  hasValue(): boolean {
    return this.selection.hasValue();
  }

  selectedValues(): T[] {
    return this.selection.selected;
  }

  // Method to get the current count of selected items (optional)
  getSelectionCount(): number {
    return this.selection.selected.length;
  }
}
