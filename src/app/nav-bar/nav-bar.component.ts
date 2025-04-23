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

  test() {
    this.router.navigate(['test']);
  }
}
