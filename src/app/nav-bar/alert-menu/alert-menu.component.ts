import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  TRIGGERED_LINE_ALERTS,
  TRIGGERED_VWAP_ALERTS,
} from 'src/consts/url-consts';

@Component({
  selector: 'app-alert-menu',
  templateUrl: './alert-menu.component.html',
  styleUrls: ['./alert-menu.component.css'],
})
export class AlertMenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToTriggeredLineAlerts() {
    this.router.navigate([TRIGGERED_LINE_ALERTS]);
  }

  goToVwapTriggeredAlerts() {
    this.router.navigate([TRIGGERED_VWAP_ALERTS]);
  }
  goToCoins() {
    this.router.navigate(['coins']);
  }

  selectedAlert = 'Triggered Line Alerts'; // Default text [[1]][[4]]

  // Method to update selected alert text
  selectAlert(alertType: string): void {
    this.selectedAlert = alertType;
    // Add navigation logic based on alertType [[3]][[10]]
    if (alertType === 'Triggered Vwap Alerts') {
      this.goToVwapTriggeredAlerts(); // Call existing method [[3]]
    } else if (alertType === 'Triggered Line Alerts') {
      this.goToTriggeredLineAlerts(); // Call existing method [[3]]
    } else if (alertType === 'Coins') {
      this.goToCoins(); // Call existing method [[3]]
    }
  }
}
