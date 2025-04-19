import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { AlertsGenericService } from 'src/service/alerts/alerts-generic.service';
import { CoinLinksService } from 'src/service/coin-links.service';
import { SelectionService } from 'src/service/selection.service';
import { Alert } from '../models/alerts/alert';
import { AlertsCollection } from '../models/alerts/alerts-collections';
import { Coin } from '../models/coin/coin';

@Component({
  selector: 'app-triggered-line-alerts',
  templateUrl: './triggered-line-alerts.component.html',
  styleUrls: ['./triggered-line-alerts.component.css'],
})
export class TriggeredLineAlertsComponent implements OnInit, OnDestroy {
  counter = 0;
  isRotating = false;
  isDeleteDisable = false;
  alerts: Alert[] = [];
  isAscending = false;
  private openedWindows: Window[] = [];
  private subscription = new Subscription();
  defaultLink = 'https://www.tradingview.com/chart?symbol=BINANCE:BTCUSDT.P';

  // Constructor
  constructor(
    private alertsService: AlertsGenericService,
    public selectionService: SelectionService<any>,
    private coinsLinksService: CoinLinksService
  ) {}

  // Lifecycle Hooks
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.refreshDataTable();
    this.subscription.add(
      this.alertsService
        .alerts$(AlertsCollection.TriggeredAlerts)
        .subscribe((data: Alert[]) => {
          this.isDeleteDisable = data.length === 0 ? true : false;
          data.sort((a, b) => {
            if (a.activationTime === undefined) return 1; // Place undefined values last
            if (b.activationTime === undefined) return -1; // Place undefined values last
            return Number(b.activationTime) - Number(a.activationTime); // Sort by activationTime in descending order
          });
        })
    );

    this.subscription.add(
      this.selectionService.selectionCounter$.subscribe((count) => {
        this.counter = count;
      })
    );
  }

  refreshDataTable() {
    this.subscription.add(
      this.alertsService
        .getAllAlerts(AlertsCollection.TriggeredAlerts)
        .subscribe((data: Alert[]) => {
          console.log('Triggered Alerts data', data);
          this.alerts = data;
          this.selectionService.clear();
        })
    );
    this.isRotating = true;
    setTimeout(() => {
      this.isRotating = false;
    }, 1000);
  }

  toggleAll(): void {
    this.selectionService.isAllSelected(this.alerts)
      ? this.selectionService.clear()
      : this.selectionService.select(this.alerts);
  }

  rotateIcon() {
    this.isRotating = true;
    this.refreshDataTable();
    setTimeout(() => (this.isRotating = false), 1000); // Match animation duration
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

  onOpenTradingview(): void {
    this.openWindowsFromSelection();
  }

  onOpenSingleTradingview(): void {
    const newWindow = window.open(this.defaultLink, '_blank');
    if (newWindow) this.openedWindows.push(newWindow);
  }

  private openWindowsFromSelection(): void {
    this.selectionService
      .selectedValues()
      .slice(0, 1)
      .forEach((v: Coin, index: number) => {
        setTimeout(() => {
          const newWindow = window.open(
            this.coinsLinksService.tradingViewLink(v.symbol, v.exchanges),
            '_blank'
          );
          if (newWindow) this.openedWindows.push(newWindow);
        }, index * 1500);
      });
    this.selectionService.clear();
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
