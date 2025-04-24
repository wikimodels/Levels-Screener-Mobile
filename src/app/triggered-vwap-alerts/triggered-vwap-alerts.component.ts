import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { SelectionService } from 'src/service/selection.service';
import { VwapAlertsGenericService } from 'src/service/vwap-alerts/vwap-alerts-generic.service';
import { AlertsCollection } from '../models/alerts/alerts-collections';
import { VwapAlert } from '../models/vwap/vwap-alert';
import { ButtonsPanelService } from '../shared/services/buttons-panel.service';

@Component({
  selector: 'app-triggered-vwap-alerts',
  templateUrl: './triggered-vwap-alerts.component.html',
  styleUrls: ['./triggered-vwap-alerts.component.css'],
})
export class TriggeredVwapAlertsComponent implements OnInit, OnDestroy {
  alerts: VwapAlert[] = [];
  isAscending = false;
  private subscription = new Subscription();
  defaultLink = 'https://www.tradingview.com/chart?symbol=BINANCE:BTCUSDT.P';

  // Constructor
  constructor(
    private alertsService: VwapAlertsGenericService,
    public selectionService: SelectionService<any>,
    private buttonsPanelService: ButtonsPanelService
  ) {}

  // Lifecycle Hooks
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.refreshDataTable();

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
      .subscribe((data: VwapAlert[]) => {
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
  sortByActivationTime(alerts: VwapAlert[], ascending: boolean): VwapAlert[] {
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
    const alerts = this.selectionService.selectedValues() as VwapAlert[];
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
