import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DESCRIPTION, VIBRATIONS } from 'src/consts/url-consts';
import { runVibration } from 'src/functions/run-vibration';
import { SelectionService } from 'src/service/selection.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(
    public selectionService: SelectionService<any>,
    private router: Router
  ) {}
  onGoToBitcoin() {
    runVibration(VIBRATIONS.routine);
    window.open(
      `https://www.tradingview.com/chart?symbol=BYBIT:${'BTCUSDT'}.P`,
      '_blank'
    );
  }

  onShowScreens(): void {
    const alert = this.selectionService.selectedValues()[0] as any;
    console.log('Alert', alert);

    if (!alert) {
      console.error('No alert selected. Cannot open modal.');
      return;
    }
    this.router.navigate([DESCRIPTION], { state: { alert } });
  }

  test() {
    this.router.navigate(['test']);
  }
}
