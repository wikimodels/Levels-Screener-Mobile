import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Coin } from 'src/app/models/coin/coin';
import { DESCRIPTION, VIBRATIONS } from 'src/consts/url-consts';
import { CoinLinksService } from 'src/service/coin-links.service';
import { SelectionService } from 'src/service/selection.service';
import { ButtonsPanelService } from '../services/buttons-panel.service';
import { runVibration } from 'src/functions/run-vibration';

@Component({
  selector: 'app-buttons-panel',
  templateUrl: './buttons-panel.component.html',
  styleUrls: ['./buttons-panel.component.css'],
})
export class ButtonsPanelComponent implements OnDestroy {
  openedWindows: Window[] = [];

  defaultLink = 'https://www.tradingview.com/chart?symbol=BINANCE:BTCUSDT.P';
  counter = 0;
  subscription = new Subscription();

  constructor(
    public buttonsPanelService: ButtonsPanelService,
    public selectionService: SelectionService<any>,
    private coinsLinksService: CoinLinksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.selectionService.selectionCounter$.subscribe((count) => {
        this.counter = count;
      })
    );
  }

  onOpenTradingview(): void {
    console.log('Open Tradingview', this.selectionService.selectedValues());
    runVibration(VIBRATIONS.routine);
    this.openWindowsFromSelection();
  }

  onShowScreens(): void {
    runVibration(VIBRATIONS.routine);
    const alert = this.selectionService.selectedValues()[0] as any;
    console.log('Alert', alert);

    if (!alert) {
      console.error('No alert selected. Cannot open modal.');
      return;
    }
    this.router.navigate([DESCRIPTION], { state: { alert } });
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

  onSendRefreshSignal() {
    runVibration(VIBRATIONS.routine);
    this.buttonsPanelService.sendRefreshSignal();
  }

  onSendDeletionSignal() {
    runVibration(VIBRATIONS.routine);
    this.buttonsPanelService.sendDeletionSignal();
  }

  onSortDirectionSignal() {
    runVibration(VIBRATIONS.routine);
    this.buttonsPanelService.sendSortDirectionSignal();
  }

  onSendToggleSelectionSignal() {
    runVibration(VIBRATIONS.routine);
    this.buttonsPanelService.sendToggleSelectionSignal();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
