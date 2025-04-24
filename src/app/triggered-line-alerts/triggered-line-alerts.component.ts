import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { AlertsGenericService } from 'src/service/alerts/alerts-generic.service';
import { SelectionService } from 'src/service/selection.service';
import { Alert } from '../models/alerts/alert';
import { AlertsCollection } from '../models/alerts/alerts-collections';
import { ButtonsPanelService } from '../shared/services/buttons-panel.service';

@Component({
  selector: 'app-triggered-line-alerts',
  templateUrl: './triggered-line-alerts.component.html',
  styleUrls: ['./triggered-line-alerts.component.css'],
})
export class TriggeredLineAlertsComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  isAscending = false;

  private subscription = new Subscription();
  defaultLink = 'https://www.tradingview.com/chart?symbol=BINANCE:BTCUSDT.P';

  // Constructor
  constructor(
    private alertsService: AlertsGenericService,
    public selectionService: SelectionService<any>,
    private buttonsPanelService: ButtonsPanelService
  ) {}

  // Lifecycle Hooks
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.refreshDataTable();
    this.subscription.add(
      this.alertsService
        .alerts$(AlertsCollection.TriggeredAlerts)
        .subscribe((data: Alert[]) => {
          this.alerts = data.sort((a, b) => {
            if (a.activationTime === undefined) return 1; // Place undefined values last
            if (b.activationTime === undefined) return -1; // Place undefined values last
            return Number(b.activationTime) - Number(a.activationTime); // Sort by activationTime in descending order
          });
          console.log(this.alerts);
        })
    );

    this.subscription.add(
      this.buttonsPanelService.toggleSelectionSignal$.subscribe(() => {
        this.toggleAll();
      })
    );

    this.subscription.add(
      this.buttonsPanelService.toggleDeletionSubject$.subscribe(() => {
        this.onDeleteSelected();
      })
    );

    this.subscription.add(
      this.buttonsPanelService.toggleRefreshSubject$.subscribe(() => {
        this.refreshDataTable();
      })
    );

    this.subscription.add(
      this.buttonsPanelService.toggleSortDirectionSubject$.subscribe(() => {
        this.sortAlerts();
      })
    );
  }

  refreshDataTable() {
    this.alertsService
      .getAllAlerts(AlertsCollection.TriggeredAlerts)
      .subscribe((data: Alert[]) => {
        console.log('Triggered Alerts data', data);
        this.alerts = data;
        this.selectionService.clear();
      });
  }

  toggleAll(): void {
    this.selectionService.isAllSelected(this.alerts)
      ? this.selectionService.clear()
      : this.selectionService.select(this.alerts);
  }

  isAllSelected(): boolean {
    return this.selectionService.isAllSelected(this.alerts);
  }

  sortAlerts(): void {
    console.log(
      'Before sorting:',
      this.alerts.map((alert) => alert.activationTime)
    );

    // Toggle the sort direction
    this.isAscending = !this.isAscending;

    // Sort the alerts based on the current direction
    this.alerts = this.sortByActivationTime(this.alerts, this.isAscending);

    console.log(
      'After sorting:',
      this.alerts.map((alert) => alert.activationTime)
    );
  }

  // Sorting logic with direction parameter
  sortByActivationTime(alerts: Alert[], ascending: boolean): Alert[] {
    console.log(
      `Sorting alerts in ${ascending ? 'ascending' : 'descending'} order...`
    );
    return [...alerts].sort((a, b) => {
      if (a.activationTime === undefined) return 1; // Place undefined values last
      if (b.activationTime === undefined) return -1; // Place undefined values last

      const comparison = Number(a.activationTime) - Number(b.activationTime);
      return ascending ? comparison : -comparison; // Toggle sort order
    });
  }

  onDeleteSelected() {
    const alerts = this.selectionService.selectedValues() as Alert[];
    const ids = alerts.map((a) => a.id);
    if (alerts.length === 0) return;
    this.alertsService
      .deleteMany(AlertsCollection.TriggeredAlerts, ids)
      .subscribe((data) => {
        this.selectionService.clear();
        this.refreshDataTable();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
