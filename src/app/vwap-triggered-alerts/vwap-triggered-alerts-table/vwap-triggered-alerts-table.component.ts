import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AlertsCollection } from 'models/alerts/alerts-collections';
import { Alert } from 'models/alerts/alert';

import { CoinsGenericService } from 'src/service/coins/coins-generic.service';

import { Subscription } from 'rxjs';
import { CoinLinksService } from 'src/service/coin-links.service';
import { WorkingCoinsService } from 'src/service/coins/working-coins.service';
import { Coin } from 'models/coin/coin';
import { VwapAlertsGenericService } from 'src/service/vwap-alerts/vwap-alerts-generic.service';
import { VwapAlert } from 'models/vwap/vwap-alert';
import { Router } from '@angular/router';

/**
 * @title Table with sorting
 */

@Component({
  selector: 'app-vwap-triggered-alerts-table',
  templateUrl: './vwap-triggered-alerts-table.component.html',
  styleUrls: [
    './vwap-triggered-alerts-table.component.css',
    './../../../styles-alerts.css',
    './../../../styles-vwap-tables.css',
  ],
})
export class VwapTriggeredAlertsTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'symbol',
    // 'anchorTime',
    'activationTimeStr',
    'select',
  ];
  sub!: Subscription | null;
  filterValue = '';
  dataSource!: any;
  buttonsDisabled = true;
  isRotating = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  searchKeywordFilter = new FormControl();
  selection = new SelectionModel<any>(true, []);
  constructor(
    private router: Router,
    private alertsService: VwapAlertsGenericService,
    private matDialog: MatDialog,
    public coinLinksService: CoinLinksService,
    private coinsService: CoinsGenericService,
    private workingCoinsService: WorkingCoinsService
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.refreshDataTable();
    this.workingCoinsService.getAllWorkingCoins();
    this.sub = this.alertsService
      .alerts$(AlertsCollection.TriggeredAlerts)
      .subscribe((data: VwapAlert[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  refreshDataTable() {
    this.isRotating = true;
    this.alertsService
      .getAllAlerts(AlertsCollection.TriggeredAlerts)
      .subscribe((data) => {
        console.log('Vwap Triggered Alerts data', data);
      });
    setTimeout(() => {
      this.isRotating = false;
    }, 1000);
  }

  // Filter function
  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDataToggled(data: any) {
    this.selection.toggle(data);
    this.buttonsDisabled = this.selection.selected.length > 0 ? false : true;
  }
  // Toggle "Select All" checkbox
  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.buttonsDisabled = true;
    } else {
      this.selection.select(...this.dataSource.data);
      this.buttonsDisabled = false;
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length; // Use dataSource.data.length
    return numSelected === numRows;
  }

  onDeleteSelected() {
    const alerts = this.selection.selected as VwapAlert[];
    const ids = alerts.map((a) => a.id);
    this.alertsService.deleteMany(AlertsCollection.TriggeredAlerts, ids);
    this.buttonsDisabled = true;
    this.selection.clear();
  }

  clearInput() {
    this.filterValue = '';
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  onMoveToWorkingCoins() {
    const selectedAlerts = this.selection.selected as Alert[];
    const selectedSymbols = new Set(selectedAlerts.map((a) => a.symbol)); // Use a Set for efficiency
    console.log(selectedSymbols);

    const coins = this.coinsService.getCoins();
    console.log('Coins', coins.length);
    const workingCoins = new Set(
      this.workingCoinsService.getCoins().map((c) => c.symbol)
    ); // Convert to Set for fast lookup

    // 🔹 Find coins whose symbol is in selectedSymbols but NOT in workingCoins
    const triggeredCoins = coins.filter(
      (coin: Coin) =>
        selectedSymbols.has(coin.symbol) && !workingCoins.has(coin.symbol)
    );
    if (triggeredCoins.length > 0) {
      this.workingCoinsService.addWorkingCoin(triggeredCoins[0]);
    }
    this.selection.clear();
    this.buttonsDisabled = true;
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
