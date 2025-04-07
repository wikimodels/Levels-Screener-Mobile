import { Component } from '@angular/core';

import { SelectionService } from 'src/service/selection.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(public selectionService: SelectionService<any>) {}
  onGoToBitcoin() {
    window.open(
      `https://www.tradingview.com/chart?symbol=BYBIT:${'BTCUSDT'}.P`,
      '_blank'
    );
  }
}
